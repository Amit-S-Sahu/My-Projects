import React from 'react';
import { motion } from 'framer-motion';
import { usePose } from '../../contexts/PoseContext';

function HolographicHUD() {
  const { poseData } = usePose();
  
  // Specifically track important joints
  const trackedJoints = ['left_wrist', 'right_wrist', 'left_shoulder', 'right_shoulder'];
  
  return (
    <>
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-grid-pattern opacity-10" />
      </div>
      
      {/* Joint labels */}
      {poseData.keypoints?.filter(kp => 
        trackedJoints.includes(kp.name || '') && kp.score > 0.5
      ).map((keypoint, index) => (
        <motion.div
          key={keypoint.name}
          className="absolute pointer-events-none flex flex-col items-center"
          style={{
            left: keypoint.x,
            top: keypoint.y,
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.9, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          {/* Targeting circle */}
          <motion.div 
            className="w-8 h-8 rounded-full border border-cyan-500/50 flex items-center justify-center mb-1"
            animate={{
              boxShadow: ['0 0 0px rgba(6, 182, 212, 0.3)', '0 0 8px rgba(6, 182, 212, 0.6)', '0 0 0px rgba(6, 182, 212, 0.3)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div 
              className="w-1 h-1 bg-cyan-500 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          
          {/* Text label */}
          <div className="bg-black/50 px-2 py-1 rounded-sm text-[10px] text-cyan-400 uppercase tracking-wider font-mono">
            {keypoint.name?.replace('_', ' ')}
          </div>
        </motion.div>
      ))}
      
      {/* Scan lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-scan-line opacity-5"
          animate={{ 
            backgroundPositionY: ['0%', '100%']
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </>
  );
}

export default HolographicHUD;