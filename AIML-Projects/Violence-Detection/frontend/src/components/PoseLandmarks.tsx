import React, { useEffect } from 'react';
import { usePose } from '../contexts/PoseContext';

// Connection lines between keypoints for visualization
const POSE_CONNECTIONS = [
  ['nose', 'left_eye'],
  ['nose', 'right_eye'],
  ['left_eye', 'left_ear'],
  ['right_eye', 'right_ear'],
  ['left_shoulder', 'right_shoulder'],
  ['left_shoulder', 'left_elbow'],
  ['right_shoulder', 'right_elbow'],
  ['left_elbow', 'left_wrist'],
  ['right_elbow', 'right_wrist'],
  ['left_shoulder', 'left_hip'],
  ['right_shoulder', 'right_hip'],
  ['left_hip', 'right_hip'],
  ['left_hip', 'left_knee'],
  ['right_hip', 'right_knee'],
  ['left_knee', 'left_ankle'],
  ['right_knee', 'right_ankle'],
];

interface PoseLandmarksProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

function PoseLandmarks({ canvasRef }: PoseLandmarksProps) {
  const { poseData, isPunchDetected } = usePose();
  
  useEffect(() => {
    if (!canvasRef.current || !poseData.keypoints) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear previous drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set line and point styles based on action
    const glowColor = isPunchDetected ? 'rgba(255, 0, 128, 0.5)' : 'rgba(0, 255, 255, 0.5)';
    const lineColor = isPunchDetected ? '#ff3e88' : '#00e1ff';
    const keyPointColor = isPunchDetected ? '#ff006e' : '#00c9ff';
    
    // Apply glow effect
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 15;
    
    // Draw connections between keypoints
    ctx.lineWidth = 3;
    ctx.strokeStyle = lineColor;
    
    POSE_CONNECTIONS.forEach(([startPoint, endPoint]) => {
      const start = poseData.keypoints?.find(kp => kp.name === startPoint);
      const end = poseData.keypoints?.find(kp => kp.name === endPoint);
      
      if (start && end && start.score > 0.5 && end.score > 0.5) {
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      }
    });
    
    // Draw keypoints
    ctx.fillStyle = keyPointColor;
    
    poseData.keypoints?.forEach(keypoint => {
      if (keypoint.score > 0.5) {
        ctx.beginPath();
        ctx.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);
        ctx.fill();
      }
    });
    
    // Draw aura if punch detected
    if (isPunchDetected) {
      // Create a silhouette effect for the detected pose
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = '#ff006e';
      ctx.shadowColor = 'rgba(255, 0, 110, 0.8)';
      ctx.shadowBlur = 30;
      
      const torsoPoints = poseData.keypoints?.filter(kp => 
        ['left_shoulder', 'right_shoulder', 'left_hip', 'right_hip'].includes(kp.name || '')
      );
      
      if (torsoPoints?.length === 4) {
        ctx.beginPath();
        ctx.moveTo(torsoPoints[0].x, torsoPoints[0].y);
        for (let i = 1; i < torsoPoints.length; i++) {
          ctx.lineTo(torsoPoints[i].x, torsoPoints[i].y);
        }
        ctx.closePath();
        ctx.fill();
      }
      
      ctx.globalAlpha = 1;
    }
    
  }, [canvasRef, poseData.keypoints, isPunchDetected]);
  
  return null; // Component doesn't render anything itself, it just manipulates the canvas
}

export default PoseLandmarks;