import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { persistenceApi } from "./apis";
import axios from "axios";
function ShowDemo() {
  const [blob, setBlob] = useState(null);
  const [type, setType] = useState(null);
  const { action } = useParams();

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    persistenceApi.get(`/actions/${action}/demo`, { responseType: 'blob' })
      .then( (response) => {
        if ( response.status > 299 || response.status < 200) {
          throw new Error("Error retrieving blob data");
        }
        setBlob(URL.createObjectURL(response.data));
        setType(response.headers.get("Content-Type"));
      }).catch( (error) => {
        console.error("Error retrieving blob data:", error);
      });

  }, []);

  
  return (
    <div className="reqWebCon">
      
      {blob ? (
        <video id="vod" className="reqWebc" controls>
          <source src={blob} type={type} />
        </video>
      ) : (
        <p>Loading video...</p>
      )}
        <div className="reQbuttons">
        <button className="bot vil">
      <Link to={`/validate/${action}`}>proceed to validation page</Link>
      </button>
        </div>
      
    </div>
  );
}

export default ShowDemo;
