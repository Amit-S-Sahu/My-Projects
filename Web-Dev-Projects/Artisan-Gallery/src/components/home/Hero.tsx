import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedText from '../ui/AnimatedText';
import { useThemeStore } from '../../store/theme';

const Hero = () => {
  const controls = useAnimation();
  const { isDark } = useThemeStore();

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  const backgroundVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 1.5,
        ease: [0.6, 0.05, 0.01, 0.9],
      } 
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        delay: 1.3,
        ease: 'easeOut'
      } 
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <motion.div 
        className="absolute inset-0 z-0"
        variants={backgroundVariants}
        initial="hidden"
        animate={controls}
      >
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-b from-black/60 to-black/40' 
            : 'bg-gradient-to-b from-black/40 to-black/20'
        } z-10`} />
        <img 
          src="https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1" 
          alt="Art gallery interior" 
          className="w-full h-full object-cover object-center"
        />
      </motion.div>
      
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center text-white px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedText 
            text="Discover Extraordinary Art" 
            className="mb-4"
            tag="h1"
            delay={0.5}
          />
          
          <div className="mb-8">
            <AnimatedText 
              text="Explore our curated collection of contemporary and classic artworks from emerging and established artists around the world."
              className="text-xl text-gray-200 max-w-2xl mx-auto"
              delay={0.8}
            />
          </div>
          
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate={controls}
          >
            <Link 
              to="/gallery" 
              className="inline-block px-8 py-3 bg-primary text-white font-medium rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Explore Gallery
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;