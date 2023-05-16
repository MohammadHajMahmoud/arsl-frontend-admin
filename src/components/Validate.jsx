import { useEffect, useRef, useState } from "react";
import HolisticModel from "./HolisticModel";
import { useParams } from "react-router";
import { persistenceApi } from "./apis";

function Validate(){
  const [video, setVideo] = useState(null);
  const [videoType, setVideoType] = useState(null);
  const { action } = useParams();
  const videoRef = useRef(null);
  const FRAME_RATE = 15;
  let handleFrameUpdate = null;


  async function fetchVideo(action){
    const response = await persistenceApi.get(`/actions/${action}/videos/single`, { responseType: 'blob' })
    setVideo(URL.createObjectURL(response.data));
    setVideoType(response.headers.get("Content-Type"));
  }
  async function setup(action){
    await fetchVideo(action);
    
    while(videoRef.current);

    videoRef.current.addEventListener('timeupdate', handleFrameUpdate);  
  }

    useEffect(() => {
      setup(action);

      // const holistic = HolisticModel(console.log);


      return () => {
        // holistic.close();
        videoRef.current.removeEventListener('timeupdate', handleFrameUpdate);
      };
   }, []);
   
   return (
    <div>
      {video? 
      <video ref={videoRef}
      autoPlay muted >
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