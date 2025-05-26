import React, { useEffect, useRef } from 'react';
import { usePose } from '../../contexts/PoseContext';

function ConfidenceGraph() {
  const { confidenceHistory, isPunchDetected } = usePose();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);
    
    // Draw background grid
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 0.5;
    
    // Vertical grid lines
    for (let i = 0; i < confidenceHistory.length; i++) {
      const x = (i / (confidenceHistory.length - 1)) * rect.width;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, rect.height);
    }
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = rect.height - (i / 5) * rect.height;
      ctx.moveTo(0, y);
      ctx.lineTo(rect.width, y);
    }
    
    ctx.stroke();
    
    // Set graph style
    const baseColor = isPunchDetected ? 'rgba(236, 72, 153, 1)' : 'rgba(14, 165, 233, 1)';
    const gradientColor = isPunchDetected ? 'rgba(236, 72, 153, 0)' : 'rgba(14, 165, 233, 0)';
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, rect.height);
    gradient.addColorStop(0, baseColor);
    gradient.addColorStop(1, gradientColor);
    
    // Draw confidence line
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = baseColor;
    
    // Move to first point
    const firstX = 0;
    const firstY = rect.height - (confidenceHistory[0] * rect.height);
    ctx.moveTo(firstX, firstY);
    
    // Create line through all points
    for (let i = 1; i < confidenceHistory.length; i++) {
      const x = (i / (confidenceHistory.length - 1)) * rect.width;
      const y = rect.height - (confidenceHistory[i] * rect.height);
      
      // Add some smoothing with quadratic curves
      const prevX = ((i - 1) / (confidenceHistory.length - 1)) * rect.width;
      const prevY = rect.height - (confidenceHistory[i - 1] * rect.height);
      
      const cpX = (prevX + x) / 2;
      
      ctx.quadraticCurveTo(cpX, prevY, x, y);
    }
    
    ctx.stroke();
    
    // Fill area under the curve
    ctx.lineTo(rect.width, rect.height);
    ctx.lineTo(0, rect.height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.globalAlpha = 0.2;
    ctx.fill();
    ctx.globalAlpha = 1;
    
    // Add glow effect
    ctx.shadowColor = baseColor;
    ctx.shadowBlur = 10;
    ctx.strokeStyle = baseColor;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Add reference line for current confidence
    if (confidenceHistory.length > 0) {
      const lastConfidence = confidenceHistory[confidenceHistory.length - 1];
      const y = rect.height - (lastConfidence * rect.height);
      
      ctx.beginPath();
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.shadowBlur = 0;
      ctx.moveTo(0, y);
      ctx.lineTo(rect.width, y);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Draw confidence value
      ctx.font = '12px monospace';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'right';
      ctx.fillText(`${Math.round(lastConfidence * 100)}%`, rect.width - 10, y - 8);
    }
  }, [confidenceHistory, isPunchDetected]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full"
    />
  );
}

export default ConfidenceGraph;