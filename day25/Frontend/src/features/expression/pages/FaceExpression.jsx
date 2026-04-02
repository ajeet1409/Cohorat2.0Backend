import React, { useEffect, useRef, useState } from "react";

import {init,detect} from '../utils/utils.js'

export default function FaceExpression({onClick=()=>{}}) {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);

  const [emotion, setEmotion] = useState("Detecting...");

  


  const handleClick=()=>{
    const expression = detect({faceLandmarkerRef,videoRef,setEmotion})
    onClick(expression)
    // console.log(expression)
  }

  

  useEffect(() => {
    init({faceLandmarkerRef,videoRef});
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Emotion: {emotion}</h2>
      <video ref={videoRef} autoPlay playsInline/>
     <div>
       <button onClick={handleClick}>Detect Expression</button>
     </div>
    </div>
  );
}