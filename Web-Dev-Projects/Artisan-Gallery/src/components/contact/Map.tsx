import React from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '../../store/theme';

const Map = () => {
  const { isDark } = useThemeStore();

  return (
    <motion.div 
      className={`w-full h-80 md:h-96 rounded-lg ${
        isDark ? 'shadow-lg shadow-primary/10' : 'shadow-md'
      } overflow-hidden`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3440.7111194664562!2d77.9668366!3d30.415937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908d4890d7c1735%3A0x22d3ae324c238e3c!2sUPES!5e0!3m2!1sen!2sin!4v1745824721423!5m2!1sen!2sin" 
        width="100%" 
        height="100%" 
        style={{ border: 0 }} 
        allowFullScreen 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        title="Gallery Location"
      />
    </motion.div>
  );
};

export default Map;