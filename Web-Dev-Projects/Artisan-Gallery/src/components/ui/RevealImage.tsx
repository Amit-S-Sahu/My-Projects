import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface RevealImageProps {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}

const RevealImage: React.FC<RevealImageProps> = ({ src, alt, className = '', delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 1, 
        ease: [0.6, 0.05, 0.01, 0.9],
        delay: delay * 0.2
      } 
    }
  };

  const overlayVariants = {
    hidden: { scaleX: 1 },
    visible: { 
      scaleX: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.6, 0.05, 0.01, 0.9],
        delay: delay * 0.2
      }
    }
  };

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 bg-primary origin-right z-10"
        variants={overlayVariants}
        initial="hidden"
        animate={controls}
      />
      <motion.img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover"
        variants={imageVariants}
        initial="hidden"
        animate={controls}
      />
    </div>
  );
};

export default RevealImage;