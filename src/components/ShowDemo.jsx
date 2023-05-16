import React, { useEffect, useState,useRef } from "react";
import { Link, useParams } from "react-router-dom";

function ShowDemo() {
  const [blob, setBlob] = useState(null);
  const [type, setType] = useState(null);
  const { action } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/actions/${action}/demo`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error retrieving blob data");
        }
        setType(response.headers.get("Content-Type"));
        return response.blob();
      }).then((blob) => {
        setBlob(URL.createObjectURL(blob));
      }).catch( (error) => {
        console.error("Error retrieving blob data:", error);
      });

  }, []);

  
  return (
    <div>
      {blob ? (
        <video id="vod" controls>
          <source src={blob} type={type} />
        </video>
      ) : (
        <p>Loading video...</p>
      )}
      <Link to={`/validate/${action}`}>validate Ze Data</Link>
    </div>
  );
}

export default ShowDemo;
