import React from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '../../store/theme';
import { Artwork } from '../../types';

interface ArtworkCardProps {
  artwork: Artwork;
  index: number;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, index }) => {
  const { isDark } = useThemeStore();

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    }),
  };

  const overlayVariants = {
    initial: { opacity: 0 },
    hover: { 
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
  };

  const contentVariants = {
    initial: { y: 20, opacity: 0 },
    hover: { 
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.1
      }
    },
  };

  const imageVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.5
      }
    },
  };

  return (
    <motion.div 
      className={`group relative overflow-hidden rounded-lg ${
        isDark ? 'shadow-lg shadow-primary/10' : 'shadow-md'
      }`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover="hover"
    >
      <motion.div 
        className="w-full h-full overflow-hidden"
        variants={imageVariants}
        initial="initial"
      >
        <img 
          src={artwork.imageUrl} 
          alt={artwork.title} 
          className="w-full h-auto object-cover"
        />
      </motion.div>
      
      <motion.div 
        className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-t from-dark via-dark/80 to-transparent' 
            : 'bg-gradient-to-t from-black/90 to-black/30'
        }`}
        variants={overlayVariants}
        initial="initial"
      >
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-6"
          variants={contentVariants}
        >
          <h3 className="text-white font-display text-xl mb-1">{artwork.title}</h3>
          <p className="text-gray-200 text-sm mb-2">{artwork.artist}</p>
          <div className="flex items-center justify-between">
            <span className="text-gray-300 text-xs">{artwork.year}</span>
            <span className="text-primary text-sm font-medium bg-primary/10 px-3 py-1 rounded-full">
              {artwork.category}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ArtworkCard;