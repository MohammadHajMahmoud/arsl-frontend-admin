import { useEffect, useRef, useState, useCallback } from "react";
import HolisticModel from "./HolisticModel";
import { useParams } from "react-router";
import { persistenceApi } from "./apis";
import formatResult from "./formatResult";


function Validate(){
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
 

  const [video, setVideo] = useState(null);
  const [videoType, setVideoType] = useState(null);
  const [videoKey, setVideoKey] = useState(null);
  const { action } = useParams();
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  const FRAME_RATE = 15;
  const VIDEO_LENGTH = 2;
  
  const rawFrames = [];
  const resultFrames = [];
  const [finalFrames, setFinalFrames] = useState([]);
  const holistic = HolisticModel( (result) => {
    resultFrames.push(formatResult(result));
  });

  const onValidation = async () => {
    await persistenceApi.put(`/actions/${action}/videos/${videoKey}/approve`, {
      'frames': finalFrames
    });
    setVideoKey(null);
    setFinalFrames([]);
    await fetchVideo(action);
    forceUpdate();
  }

  const onRejection = async () => {
    await persistenceApi.put(`/actions/${action}/videos/${videoKey}/reject`);
    setFinalFrames([]);
    setVideoKey(null);
    await fetchVideo(action);
    forceUpdate();
  }

  async function fetchVideo(action) {

    const videoKeyTemp = (await persistenceApi.get(`/actions/${action}/videos/single`)).data['video-key'];
    setVideoKey(videoKeyTemp);
    const videoResponse = 
      await persistenceApi
      .get(`/actions/${action}/videos/${videoKeyTemp}/download`, {
        responseType: 'blob'
      });

    setVideoType(videoResponse.headers.get("Content-Type"));
    setVideo(URL.createObjectURL(videoResponse.data));
  }
  
  useEffect(() => {
    fetchVideo(action);
    
    return () => {
      holistic.close();
    };
   }, []);

   useEffect(() => {

    let interval;
    const onPlay = () => {
      if( resultFrames.length >= FRAME_RATE * VIDEO_LENGTH ) {
        return;
      }
      resultFrames.length = 0;
      let context;
      if(canvasRef.current) {
        context = canvasRef.current.getContext('2d');
      } else {
        return;
      }
      interval = setInterval(() => { 
        context.drawImage(videoRef.current, 0, 0);
        const imageData = context.getImageData(0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);
        rawFrames.push(imageData);
      }, 1000/FRAME_RATE);
    };
  
    const onEnd = async () => {
      clearInterval(interval);
      console.log(rawFrames)
      for(const imageData of rawFrames){
        await holistic.send({ image: imageData })
      }
      rawFrames.length = 0;
      resultFrames.splice(0, resultFrames.length - VIDEO_LENGTH * FRAME_RATE);
      setFinalFrames(resultFrames);
    };
    
      if(videoRef.current){
      videoRef.current.addEventListener('play', onPlay);
      videoRef.current.addEventListener('ended', onEnd);
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
      <canvas ref={canvasRef} style={{display: 'none'}} width={1000} height={1000}/>
      {finalFrames.length>=30 && <button 
      onClick={onValidation}>
        Validate
      </button>}

      {finalFrames.length>=30 && <button 
      onClick={onRejection}>
        Reject
      </button>}
    </div>
  );
}

export default Validate;