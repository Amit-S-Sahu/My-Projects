import React, { useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { usePose } from '../../contexts/PoseContext';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import { Engine } from 'tsparticles-engine';

function ActionEffect() {
  const { isPunchDetected } = usePose();
  const labelControls = useAnimationControls();
  
  useEffect(() => {
    if (isPunchDetected) {
      labelControls.start({
        scale: [1, 1.2, 1],
        opacity: 1,
        transition: {
          duration: 0.3,
          times: [0, 0.5, 1]
        }
      });
    } else {
      labelControls.start({
        opacity: 0.7,
        scale: 1
      });
    }
  }, [isPunchDetected, labelControls]);

  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };

  return (
    <>
      {/* Action Label */}
      <motion.div 
        className="absolute top-4 right-4 z-20"
        animate={labelControls}
        initial={{ opacity: 0.7 }}
      >
        <motion.div
          className={`px-4 py-2 rounded-lg font-bold tracking-wider ${
            isPunchDetected 
              ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white' 
              : 'bg-gradient-to-r from-cyan-800 to-blue-800 text-cyan-300'
          }`}
          animate={{ 
            boxShadow: isPunchDetected 
              ? ['0 0 10px rgba(236, 72, 153, 0.5)', '0 0 25px rgba(236, 72, 153, 0.7)', '0 0 10px rgba(236, 72, 153, 0.5)'] 
              : '0 0 10px rgba(8, 145, 178, 0.5)'
          }}
          transition={{ duration: 0.5, repeat: isPunchDetected ? Infinity : 0 }}
        >
          {isPunchDetected ? 'PUNCH' : 'NEUTRAL'}
        </motion.div>
      </motion.div>

      {/* Particle Effects for Punch */}
      {isPunchDetected && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              fullScreen: false,
              fpsLimit: 120,
              particles: {
                number: {
                  value: 80,
                  density: {
                    enable: true,
                    value_area: 800
                  }
                },
                color: {
                  value: ["#ff0099", "#ff4ecd", "#9900ff", "#00aaff"]
                },
                shape: {
                  type: "circle"
                },
                opacity: {
                  value: 1,
                  random: true,
                  anim: {
                    enable: true,
                    speed: 3,
                    opacity_min: 0,
                    sync: false
                  }
                },
                size: {
                  value: 3,
                  random: true
                },
                move: {
                  enable: true,
                  speed: 6,
                  direction: "none",
                  random: true,
                  straight: false,
                  out_mode: "out",
                  bounce: false
                },
                life: {
                  duration: {
                    value: 1
                  }
                }
              },
              retina_detect: true
            }}
          />
        </div>
      )}
    </>
  );
}

export default ActionEffect;