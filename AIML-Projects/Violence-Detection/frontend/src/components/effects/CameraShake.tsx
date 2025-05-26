import React, { useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

interface CameraShakeProps {
  active: boolean;
  children: React.ReactNode;
}

function CameraShake({ active, children }: CameraShakeProps) {
  const controls = useAnimationControls();
  const wasActive = useRef(false);
  
  useEffect(() => {
    if (active && !wasActive.current) {
      // Start shake animation
      controls.start({
        x: [0, -4, 5, -5, 4, 0],
        y: [0, 4, -6, 5, -4, 0],
        transition: { duration: 0.4, ease: "easeInOut" }
      });
      wasActive.current = true;
    } else if (!active && wasActive.current) {
      // Reset
      wasActive.current = false;
    }
  }, [active, controls]);
  
  return (
    <motion.div
      animate={controls}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}

export default CameraShake;