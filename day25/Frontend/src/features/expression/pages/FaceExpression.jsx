import React, { useEffect, useRef, useState } from "react";

import {init,detect} from '../utils/utils.js'

export default function FaceEmotion() {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);

  const [emotion, setEmotion] = useState("Detecting...");

  

  useEffect(() => {
    init({faceLandmarkerRef,videoRef});
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Emotion: {emotion}</h2>
      <video ref={videoRef} autoPlay playsInline/>
     <div>
       <button onClick={()=>{detect({faceLandmarkerRef,videoRef,setEmotion})}}>Detect Expression</button>
     </div>
    </div>
  );
}