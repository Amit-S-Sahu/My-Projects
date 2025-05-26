import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePose } from '../../contexts/PoseContext';

function IdleDetector() {
  const { isIdle } = usePose();
  const [matrixChars, setMatrixChars] = useState<string[]>([]);
  
  // Generate matrix characters
  useEffect(() => {
    if (isIdle) {
      const chars: string[] = [];
      const charset = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
      
      for (let i = 0; i < 100; i++) {
        const char = charset[Math.floor(Math.random() * charset.length)];
        chars.push(char);
      }
      
      setMatrixChars(chars);
      
      // Update characters periodically
      const interval = setInterval(() => {
        const newChars = [...chars];
        const numToChange = Math.floor(Math.random() * 20) + 10;
        
        for (let i = 0; i < numToChange; i++) {
          const index = Math.floor(Math.random() * newChars.length);
          newChars[index] = charset[Math.floor(Math.random() * charset.length)];
        }
        
        setMatrixChars(newChars);
      }, 200);
      
      return () => clearInterval(interval);
    }
  }, [isIdle]);
  
  return (
    <AnimatePresence>
      {isIdle && (
        <motion.div 
          className="fixed inset-0 z-50 bg-black/90 flex overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Matrix rain columns */}
          <div className="w-full h-full relative">
            {matrixChars.map((_, index) => (
              <motion.div
                key={index}
                className="absolute top-0 text-green-500 text-opacity-80 font-mono text-sm flex flex-col items-center whitespace-nowrap"
                style={{
                  left: `${Math.random() * 100}%`,
                  transform: 'translateZ(0)'
                }}
                initial={{ y: -100 }}
                animate={{ 
                  y: ['0%', '100%'],
                  opacity: [0, 1, 1, 0.5, 0]
                }}
                transition={{ 
                  duration: Math.random() * 10 + 10, 
                  ease: "linear",
                  repeat: Infinity,
                  opacity: {
                    times: [0, 0.1, 0.8, 0.9, 1]
                  }
                }}
              >
                {Array.from({ length: 30 }).map((_, i) => (
                  <div 
                    key={i}
                    className={`my-1 ${i === 0 ? 'text-white' : ''} ${i < 5 ? 'text-opacity-90' : 'text-opacity-70'}`}
                    style={{ opacity: 1 - (i * 0.03) }}
                  >
                    {matrixChars[(index + i) % matrixChars.length]}
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
          
          {/* Idle message */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <div className="text-center">
              <motion.div 
                className="mb-6 text-4xl font-bold tracking-widest text-green-400"
                animate={{ textShadow: ['0 0 10px rgba(74, 222, 128, 0.5)', '0 0 20px rgba(74, 222, 128, 0.8)', '0 0 10px rgba(74, 222, 128, 0.5)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                SYSTEM IDLE
              </motion.div>
              <p className="text-green-300 text-xl">Move to resume scanning</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default IdleDetector;