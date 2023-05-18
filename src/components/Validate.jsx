import { useEffect, useRef, useState } from "react";
import HolisticModel from "./HolisticModel";
import { useParams } from "react-router";
import { persistenceApi } from "./apis";
import formatResult from "./formatResult";


function Validate(){
  const [video, setVideo] = useState(null);
  const [videoElement, setVideoElement] = useState(null);
  const [videoType, setVideoType] = useState(null);
  const { action } = useParams();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const FRAME_RATE = 15;
  const rawFrames = [];
  const resultFrames = [];
  const canvas = canvasRef.current;
  let videoKey = null;

  const onValidation = async () => {
    await persistenceApi.put(`/actions/${action}/videos/${videoKey}/approve`, {
      frames: resultFrames
    });
    videoKey = null;
    await fetchVideo(action);
  }

  const onRejection = async () => {
    await persistenceApi.put(`/actions/${action}/videos/${videoKey}/reject`);
    videoKey = null;
    await fetchVideo(action);
  }

  const holistic = HolisticModel( (result) => {
    resultFrames.push(formatResult(result));
  });

  let interval;
  const onPlay = () => {
    if( resultFrames.length >= 30 ) {
      return;
    }
    resultFrames.length=0;
    videoElement.play();
    let context;
    if(canvas) {
      context = canvas.getContext('2d');
    }
    interval = setInterval(() => { 
      context.drawImage(videoElement, 0, 0);
      const imageData = context.getImageData(0, 0, videoElement.videoWidth, videoElement.videoHeight);
      rawFrames.push(imageData);
    }, 1000/FRAME_RATE);
  };

  const onEnd = async () => {
    clearInterval(interval);

    for(const imageData of rawFrames){
      await holistic.send({ image: imageData })
    }
    rawFrames.length = 0;
    resultFrames.splice(0, resultFrames.length-30);
  };

  async function fetchVideo(action) {
    const response = await persistenceApi.get(`/actions/${action}/videos/single`, { responseType: 'blob' });
    setVideoType(response.headers.get("Content-Type"));
    setVideo(URL.createObjectURL(response.data));
    setVideoElement(document.createElement('video'));
    videoKey = response.headers.get('video-key'); // FIX:: this is null. findout why and solve it plz.
  }
  
  useEffect(() => {
  
    fetchVideo(action);
    
    return () => {
      holistic.close();
    };
   }, []);

   useEffect(() => {
    if(videoRef.current){
      videoRef.current.addEventListener('play', onPlay);
      videoRef.current.addEventListener('ended', onEnd);

      videoElement.src = video;
      videoElement.load();
    }
    return () => {
      if(videoRef.current){  
        videoRef.current.removeEventListener('play', onPlay);
        videoRef.current.removeEventListener('ended', onEnd);
      }
    };
    
   }, [video]);

   return (
    <div>
      {video? 
      <video ref={videoRef}
      muted controls autoPlay>
          <source src={video} type={videoType} />
          Your browser does not support the video tag.
      </video>:
      <p>Loading video...</p>
      }
      <canvas ref={canvasRef} style={{display: 'none'}} width={1000} height={1000}/>
      <button onClick={onValidation}>
        Validate
      </button>

      <button onClick={onRejection}>
        Reject
      </button>
    </div>
  );
}

export default Validate;