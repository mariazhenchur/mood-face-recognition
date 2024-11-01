import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

const App = () => {
  const videoRef = useRef(null);
  const [emotion, setEmotion] = useState('');
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  // Load Face API models on mount
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model';
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      setIsModelLoaded(true);
    };

    loadModels();
  }, []);

  // Start video stream from webcam
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => console.error('Error accessing webcam:', error));
  };

  // Start detecting emotions when video is playing
  const handleVideoPlay = () => {
    const interval = setInterval(async () => {
      if (videoRef.current && isModelLoaded) {
        const detections = await faceapi
          .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();

        if (detections) {
          // Find the emotion with the highest probability
          const expressions = detections.expressions;
          const maxExpression = Object.entries(expressions).reduce((a, b) => (a[1] > b[1] ? a : b));
          setEmotion(maxExpression[0]);
        }
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (isModelLoaded) {
      startVideo();
    }
  }, [isModelLoaded]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Mood Detector</h1>
      {!isModelLoaded ? (
        <p>Loading models...</p>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            onPlay={handleVideoPlay}
            style={{ width: '100%', maxWidth: '500px', marginTop: '20px' }}
          />
          <h2>Your mood: {emotion}</h2>
        </>
      )}
    </div>
  );
};

export default App;


