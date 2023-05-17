import { useEffect, useRef, useState } from "react";
import HolisticModel from "./HolisticModel";
import { useParams } from "react-router";
import { persistenceApi } from "./apis";
import formatResult from "./formatResult";
import { waitFor } from "@testing-library/react";
import { wait } from "@testing-library/user-event/dist/utils";


function Validate(){
  const [video, setVideo] = useState(null);
  const [videoType, setVideoType] = useState(null);
  const { action } = useParams();
  const videoRef = useRef(null);
  const FRAME_RATE = 15;
        
  const holistic = HolisticModel( (result) => {
    frames.push(formatResult(result));
  });

  let currentFrame = 0;
  let interval;
  const onPlay = () => {
    interval = setInterval(() => {
      console.log(currentFrame++);
      // holistic.send({ image: imageData }); TODO: findout what to send in image
    }, 1000/FRAME_RATE);    
  };

  const onEnd = () => {
    clearInterval(interval);
    console.log(`this video is ${currentFrame/FRAME_RATE} seconds long`);
    console.log(frames.splice(-30));
  };

  let frames = [];

  async function fetchVideo(action) {
    const response = await persistenceApi.get(`/actions/${action}/videos/single`, { responseType: 'blob' })
    setVideoType(response.headers.get("Content-Type"));
    setVideo(URL.createObjectURL(response.data));
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