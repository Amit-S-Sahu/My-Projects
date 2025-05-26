import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { motion } from 'framer-motion';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import { usePose } from '../contexts/PoseContext';
import PoseLandmarks from './PoseLandmarks';
import ActionEffect from './effects/ActionEffect';
import CameraShake from './effects/CameraShake';
import HolographicHUD from './effects/HolographicHUD';

function PoseDetector() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const previousPoseRef = useRef<any>(null);
  
  const { 
    setPoseData, 
    setIsDetecting,
    isPunchDetected,
    addConfidenceValue
  } = usePose();

  // Initialize TensorFlow.js and the pose detector
  useEffect(() => {
    const loadModel = async () => {
      try {
        await tf.setBackend('webgl');
        await tf.ready();
        
        const model = poseDetection.SupportedModels.MoveNet;
        const detector = await poseDetection.createDetector(
          model, 
          { 
            modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING 
          }
        );
        
        setIsModelLoading(false);
        
        if (webcamRef.current && detector) {
          setIsDetecting(true);
          detectPose(detector);
        }
      } catch (error) {
        console.error('Error loading pose detection model:', error);
        setIsModelLoading(false);
      }
    };

    loadModel();
    
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => setCameraPermission(true))
      .catch(() => setCameraPermission(false));
      
    return () => {
      setIsDetecting(false);
    };
  }, [setIsDetecting]);

  const detectMovement = (currentPose: any) => {
    if (!previousPoseRef.current) {
      previousPoseRef.current = currentPose;
      return false;
    }

    const threshold = 10; // Minimum pixel movement to consider as motion
    let movement = false;

    currentPose.keypoints.forEach((keypoint: any, index: number) => {
      const prevKeypoint = previousPoseRef.current.keypoints[index];
      const dx = keypoint.x - prevKeypoint.x;
      const dy = keypoint.y - prevKeypoint.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > threshold) {
        movement = true;
      }
    });

    previousPoseRef.current = currentPose;
    return movement;
  };

  const detectPose = async (detector: poseDetection.PoseDetector) => {
    if (
      webcamRef.current && 
      webcamRef.current.video && 
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;
      
      if (canvasRef.current) {
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;
      }
      
      const poses = await detector.estimatePoses(video);
      
      if (poses.length > 0) {
        const pose = poses[0];
        const hasMovement = detectMovement(pose);
        
        const leftWrist = pose.keypoints.find(kp => kp.name === 'left_wrist');
        const leftShoulder = pose.keypoints.find(kp => kp.name === 'left_shoulder');
        const rightWrist = pose.keypoints.find(kp => kp.name === 'right_wrist');
        const rightShoulder = pose.keypoints.find(kp => kp.name === 'right_shoulder');
        
        let action: 'neutral' | 'punch' = 'neutral';
        let confidence = 0;
        
        if (leftWrist && leftShoulder && rightWrist && rightShoulder) {
          const leftExtension = leftWrist.y < leftShoulder.y - 100;
          const rightExtension = rightWrist.y < rightShoulder.y - 100;
          
          if (leftExtension || rightExtension) {
            action = 'punch';
            confidence = leftExtension && rightExtension ? 0.95 : 0.75;
          } else {
            action = 'neutral';
            confidence = 0.9;
          }
          
          setPoseData({
            action,
            confidence,
            keypoints: pose.keypoints,
            lastMovementTime: hasMovement ? Date.now() : previousPoseRef.current?.lastMovementTime || Date.now()
          });
          
          addConfidenceValue(confidence);
        }
      }
      
      requestAnimationFrame(() => detectPose(detector));
    } else {
      requestAnimationFrame(() => detectPose(detector));
    }
  };
  
  if (cameraPermission === false) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-black/40 backdrop-blur-md rounded-2xl border border-red-500/30 text-center max-w-md mx-auto">
        <h2 className="text-red-400 text-2xl mb-4">Camera Access Required</h2>
        <p className="text-white/70 mb-6">
          This application needs access to your camera to detect poses. Please enable camera access and reload the page.
        </p>
        <button 
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
          onClick={() => window.location.reload()}
        >
          Reload Application
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden bg-black/20 border border-white/10"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {isModelLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-cyan-400 text-lg">Initializing AI Model...</p>
          </div>
        </div>
      )}
      
      <CameraShake active={isPunchDetected}>
        <div className="relative aspect-video">
          <Webcam
            ref={webcamRef}
            mirrored
            className="absolute inset-0 w-full h-full object-cover"
            videoConstraints={{
              facingMode: "user",
            }}
          />
          
          <canvas 
            ref={canvasRef}
            className="absolute inset-0 w-full h-full" 
          />
          
          <PoseLandmarks canvasRef={canvasRef} />
          <HolographicHUD />
          <ActionEffect />
          
          <div className="absolute inset-0 border-2 border-cyan-500/30 pointer-events-none">
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-cyan-500" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-cyan-500" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-cyan-500" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-cyan-500" />
          </div>
        </div>
      </CameraShake>
    </motion.div>
  );
}

export default PoseDetector;