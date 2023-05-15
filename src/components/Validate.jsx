import React, { useEffect, useState,useRef } from "react";
import { useParams } from "react-router-dom";
import {Holistic} from "@mediapipe/holistic";

function Validate() {
  const [blob, setBlobData] = useState("");
  let { action } = useParams();
  const videoRef = useRef(null);
  useEffect(() => {

    const holistic = new Holistic({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`
        },
      })

      holistic.setOptions({
        upperBodyOnly: true,
        smoothLandmarks: false,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.7,
      })

      holistic.onResults(onResults)
      function onResults(results){
        console.log(results)
        console.log("hi")
      }
              holistic.send({
                image: videoRef.current
              });

         
 },[])
   
      
   
  useEffect(() => {
    async function fetchBlobData() {
      try {
        const response = await fetch(
          `http://localhost:8080/actions/${action}/demo`
        );

        if (!response.ok) {
          throw new Error("Error retrieving blob data");
        }

        const blob = await response.blob();

        setBlobData(URL.createObjectURL(blob));
      } catch (error) {
        console.error("Error retrieving blob data:", error);
      }
    }
    fetchBlobData();


  }, []);
  function approveVideo() {

  }

 
  
  
  
  return (
    <div>
      {blob ? (
        <video id="vod" ref={videoRef} controls>
          <source src={blob} type="video/mp4" />
        </video>
      ) : (
        <p>Loading video...</p>
      )}
      <button></button>
    </div>
  );
}

export default Validate;
