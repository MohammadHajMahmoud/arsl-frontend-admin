import React, { useEffect,useState } from "react";
import {useParams,} from "react-router-dom";
import axios from "axios";
function Validate(){
    const [videoUrl, setVideo] = useState("");
    let {action} = useParams();
    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get(`http://localhost:8080/actions/${action}/demo`)
          .then((response) => {
                console.log(response)
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);
  
    return (
      <div>
        {videoUrl ? (
          <video controls>
            <source src={videoUrl} type="video/mp4" />
            {/* Add additional source elements for different video formats if needed */}
          </video>
        ) : (
          <p>Loading video...</p>
        )}
      </div>
    );
  };

export default Validate