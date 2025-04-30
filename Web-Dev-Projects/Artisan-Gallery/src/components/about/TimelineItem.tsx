import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TimelineEvent } from '../../types';
import { useThemeStore } from '../../store/theme';

interface TimelineItemProps {
  event: TimelineEvent;
  index: number;
  isLeft: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ event, index, isLeft }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const { isDark } = useThemeStore();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: isLeft ? -50 : 50 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8, 
        delay: index * 0.2,
        ease: [0.6, 0.05, 0.01, 0.9],
      } 
    }
  };

  const dotVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: { 
        duration: 0.4, 
        delay: index * 0.2 + 0.3,
      } 
    }
  };

  return (
    <div ref={ref} className={`flex w-full ${isLeft ? 'justify-start' : 'justify-end'} mb-8`}>
      <div className={`relative w-full md:w-5/12 ${isLeft ? 'md:text-right md:pr-8' : 'md:pl-8'}`}>
        <motion.div 
          className={`${
            isDark ? 'bg-dark-lighter' : 'bg-white'
          } p-6 rounded-lg shadow-md transition-colors duration-300`}
          variants={itemVariants}
          initial="hidden"
          animate={controls}
        >
          <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full mb-3">
            {event.year}
          </span>
          <h3 className={`text-xl font-display font-medium mb-2 ${
            isDark ? 'text-white' : 'text-dark'
          }`}>{event.title}</h3>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{event.description}</p>
          
          {event.imageUrl && (
            <div className="mt-4 overflow-hidden rounded">
              <img src={event.imageUrl} alt={event.title} className="w-full h-auto" />
            </div>
          )}
        </motion.div>
        
        <motion.div 
          className="absolute top-6 bg-primary rounded-full w-4 h-4 z-10 hidden md:block"
          style={{ 
            [isLeft ? 'right' : 'left']: '-12px',
          }}
          variants={dotVariants}
          initial="hidden"
          animate={controls}
        />
      </div>
    </div>
  );
};

export default TimelineItem;