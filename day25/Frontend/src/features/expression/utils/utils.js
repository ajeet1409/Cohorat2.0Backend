import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

//
export const init = async ({ faceLandmarkerRef, videoRef }) => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm",
  );

  faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
    },
    outputFaceBlendshapes: true,
    runningMode: "VIDEO",
    numFaces: 1,
  });

  startCamera({ videoRef });
};

const startCamera = async ({ faceLandmarkerRef, videoRef, setEmotion }) => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });

  if (videoRef.current) {
    videoRef.current.srcObject = stream;

    videoRef.current.onloadeddata = () => {
      detect({ faceLandmarkerRef, videoRef, setEmotion });
    };
  }
};

export const detect = ({ faceLandmarkerRef, videoRef, setEmotion }) => {
  // console.log(videoRef.current,"hhhhh")
  if (!videoRef.current || !faceLandmarkerRef.current) return;

  const result = faceLandmarkerRef.current.detectForVideo(
    videoRef.current,
    Date.now(),
  );

  if (result?.faceBlendshapes?.length > 0) {
    const blendshapes = result.faceBlendshapes[0].categories;

    const getScore = (name) =>
      blendshapes.find((b) => b.categoryName === name)?.score || 0;

    const smile =
      (getScore("mouthSmileLeft") + getScore("mouthSmileRight")) / 2;

    const frownLeft = getScore("mouthFrownLeft");
    const frownRight = getScore("mouthFrownRight");

    const brow = getScore("browInnerUp");
    const jaw = getScore("jawOpen");

    // Emotion Logic
    alert("clcik");

    let currentExpression = "Neutral";
    if (smile > 0.6) {
      currentExpression = "happy ";

      setEmotion("happy");
    } else if (brow > 0.4 && jaw > 0.4) {
      currentExpression = "surprised";
      setEmotion(" surprised");
    } else if (frownLeft > 0.0001 && frownRight > 0.0001) {
      currentExpression = "sad";
      setEmotion(" sad");
    } else {
      setEmotion("Neutral");
    }
    return currentExpression
  }

  // requestAnimationFrame(detect); // ✅ continuous detection
};
