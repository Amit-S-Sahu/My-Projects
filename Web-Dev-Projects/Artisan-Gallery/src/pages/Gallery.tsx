import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Masonry from 'react-masonry-css';
import PageTransition from '../components/ui/PageTransition';
import AnimatedText from '../components/ui/AnimatedText';
import ArtworkCard from '../components/gallery/ArtworkCard';
import artworks from '../data/artworks';
import { Artwork } from '../types';
import { useThemeStore } from '../store/theme';

const Gallery = () => {
  const [displayedArtworks, setDisplayedArtworks] = useState<Artwork[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [filter, setFilter] = useState<string>('All');
  const [hasMore, setHasMore] = useState(true);
  const { isDark } = useThemeStore();
  
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const categories = ['All', ...Array.from(new Set(artworks.map(a => a.category)))];

  useEffect(() => {
    const filtered = filter === 'All' 
      ? artworks 
      : artworks.filter(artwork => artwork.category === filter);
    
    setDisplayedArtworks(filtered.slice(0, visibleCount));
    setHasMore(visibleCount < filtered.length);
  }, [filter, visibleCount]);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView, displayedArtworks]);

  const loadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  const handleFilterChange = (category: string) => {
    setDisplayedArtworks([]);
    setFilter(category);
    setVisibleCount(8);
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const filterVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    }),
  };

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <PageTransition>
      <section className={`py-24 px-4 min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-dark-lighter' : 'bg-light'
      }`}>
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <AnimatedText 
              text="Our Gallery" 
              className={`text-5xl md:text-6xl font-display font-medium mb-4 ${
                isDark ? 'text-white' : 'text-dark'
              }`}
              tag="h1"
            />
            <AnimatedText 
              text="Explore our curated collection of exceptional artworks"
              className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}
              delay={0.3}
            />
          </div>
          
          <div className="mb-12">
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  variants={filterVariants}
                  custom={index}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    filter === category 
                      ? 'bg-primary text-white scale-105' 
                      : isDark
                        ? 'bg-dark-light text-white hover:bg-dark'
                        : 'bg-white text-dark hover:bg-gray-100'
                  }`}
                  onClick={() => handleFilterChange(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          </div>
          
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="mb-12"
          >
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="flex w-auto -ml-4"
              columnClassName="pl-4 bg-clip-padding"
            >
              {displayedArtworks.map((artwork, index) => (
                <motion.div 
                  key={artwork.id} 
                  className="mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ArtworkCard artwork={artwork} index={index} />
                </motion.div>
              ))}
            </Masonry>
          </motion.div>
          
          {hasMore && (
            <div className="text-center">
              <motion.button
                onClick={loadMore}
                className={`px-8 py-3 font-medium rounded-md transition-all duration-300 ${
                  isDark 
                    ? 'bg-dark-light text-white hover:bg-dark border-dark-light' 
                    : 'bg-white border border-gray-300 text-dark hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Load More
              </motion.button>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
};

export default Gallery;