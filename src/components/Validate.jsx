import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { persistenceApi } from "./apis";
import "./cssFile/request.css"
import { ToastContainer,toast } from "react-toastify";
function Validate(){
  const [video, setVideo] = useState(null);
  const [videoElement, setVideoElement] = useState(null);
  const [videoType, setVideoType] = useState(null);
  const [videoKey, setVideoKey] = useState(null);
  const { action } = useParams();
  const videoRef = useRef(null);


  const onValidation = async () => {
    await persistenceApi.put(`/actions/${action}/videos/${videoKey}/approve`);
    window.location.reload()
  }

  const onRejection = async () => {
    await persistenceApi.put(`/actions/${action}/videos/${videoKey}/reject`);
    window.location.reload()
  }

  function fetchVideo(action) {
    console.log('fetching video');
    persistenceApi.get(`/actions/${action}/videos/single`)
    .then( (response) => {
      setVideoKey(response.data['video-key']);
      return persistenceApi.get(`/actions/${action}/videos/${response.data['video-key']}/download`, {
        responseType: 'blob'
      });
    }).then( (response) => {
      setVideoType(response.headers.get("Content-Type"));
      setVideo(URL.createObjectURL(response.data));
      setVideoElement(document.createElement('video'));
    }).catch((err)=>{
      toast.warning("there is no more videos to validate :)",{position : toast.POSITION.TOP_CENTER})
    });
  }
  
  useEffect(() => {
    fetchVideo(action);
   }, []);

  

   return (
    <div className="reqWebCon ">
      <ToastContainer/>
      {video? 
      <video className="reqWebc" ref={videoRef}
      muted controls autoPlay>
          <source src={video} type={videoType} />
          Your browser does not support the video tag.
      </video>:
      <p>Loading video...</p>
      }
      <div className="reQbuttons">
      <button className="bot val" onClick={onValidation}>
        Validate
      </button>

      <button className="bot reg" onClick={onRejection}>
        Reject
      </button>
      </div>
  
    </div>
    
  );
}

export default Validate;