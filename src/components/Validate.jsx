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

  const holistic = HolisticModel( (result) => {
    resultFrames.push(formatResult(result));
  });

  
  let interval;
  const onPlay = () => {
    let context;
    if(canvas) {
      context = canvas.getContext('2d');
    }
    interval = setInterval(() => { 
      videoElement.play();
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
    console.log(rawFrames);
    console.log(resultFrames);
  };

  async function fetchVideo(action) {
    const response = await persistenceApi.get(`/actions/${action}/videos/single`, { responseType: 'blob' });
    setVideoType(response.headers.get("Content-Type"));
    setVideo(URL.createObjectURL(response.data));
    setVideoElement(document.createElement('video'));
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
      // videoRef.current.play(); todo make it play at the right time
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
      muted controls>
          <source src={video} type={videoType} />
          Your browser does not support the video tag.
      </video>:
      <p>Loading video...</p>
      }
      <canvas ref={canvasRef}  />
      <button>
        valid
      </button>

      <button>
        reject
      </button>
    </div>
  );
}

export default Validate;