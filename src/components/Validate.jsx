
import { useEffect, useRef, useState } from "react";
import HolisticModel from "./HolisticModel";
import { useParams } from "react-router";

function Validate(){
  const [video, setVideo] = useState(null);
  const [videoType, setVideoType] = useState(null);
  const { action } = useParams();
  const videoRef = useRef(null);

    useEffect(() => {
      
      fetch(`http://localhost:8080/actions/${action}/videos/single`)
        .then( (response) => {
          const blob = response.blob();
          setVideoType(response.headers.get("Content-Type"));
          return blob;
        })
        .then( (blob) => {
          setVideo(blob);
        });

      
      // const holistic = HolisticModel(() => { });
  
      // holistic.send({
      //   image: videoRef.current
      // });
    
      // return () => {
      //   holistic.close();
      // };
   }, []);
   
   return (
    <div>
      <video autoPlay>
          <source src={video} type={videoType} />
          Your browser does not support the video tag.
      </video>

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