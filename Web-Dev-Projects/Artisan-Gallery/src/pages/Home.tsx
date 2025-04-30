import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PageTransition from '../components/ui/PageTransition';
import Hero from '../components/home/Hero';
import AnimatedText from '../components/ui/AnimatedText';
import { Link } from 'react-router-dom';
import artworks from '../data/artworks';
import collections from '../data/collections';
import { useThemeStore } from '../store/theme';

const Home = () => {
  const { isDark } = useThemeStore();
  const controlsFeature = useAnimation();
  const [refFeature, inViewFeature] = useInView({ threshold: 0.3, triggerOnce: true });
  
  const controlsCollection = useAnimation();
  const [refCollection, inViewCollection] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inViewFeature) {
      controlsFeature.start('visible');
    }
    if (inViewCollection) {
      controlsCollection.start('visible');
    }
  }, [controlsFeature, controlsCollection, inViewFeature, inViewCollection]);

  const featuredArtworks = artworks.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <PageTransition>
      <Hero />
      
      <section className={`py-20 px-4 transition-colors duration-300 ${
        isDark ? 'bg-dark' : 'bg-light'
      }`}>
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <AnimatedText 
              text="Featured Artworks" 
              className={`text-4xl md:text-5xl font-display font-medium mb-4 ${
                isDark ? 'text-white' : 'text-dark'
              }`}
              tag="h2"
            />
            <AnimatedText 
              text="Discover our handpicked selection of extraordinary pieces"
              className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}
              delay={0.3}
            />
          </div>
          
          <motion.div 
            ref={refFeature}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={controlsFeature}
          >
            {featuredArtworks.map((artwork, index) => (
              <motion.div 
                key={artwork.id}
                className={`group overflow-hidden rounded-lg ${
                  isDark ? 'shadow-lg shadow-primary/10' : 'shadow-md'
                }`}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img 
                    src={artwork.imageUrl} 
                    alt={artwork.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 ${
                    isDark 
                      ? 'bg-gradient-to-t from-dark via-dark/80 to-transparent' 
                      : 'bg-gradient-to-t from-black/80 via-black/30 to-transparent'
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6`}>
                    <h3 className="text-white font-display text-xl">{artwork.title}</h3>
                    <p className="text-gray-200">by {artwork.artist}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <Link 
              to="/gallery" 
              className={`inline-block px-6 py-3 border-2 border-primary ${
                isDark 
                  ? 'text-primary hover:bg-primary hover:text-white' 
                  : 'text-primary hover:bg-primary hover:text-white'
              } font-medium transition-colors duration-300`}
            >
              View All Artworks
            </Link>
          </div>
        </div>
      </section>
      
      <section className={`py-20 px-4 ${
        isDark ? 'bg-dark-lighter' : 'bg-dark'
      } text-white transition-colors duration-300`}>
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <AnimatedText 
              text="Explore Our Collections" 
              className="text-4xl md:text-5xl font-display font-medium mb-4"
              tag="h2"
            />
            <AnimatedText 
              text="Carefully curated selections organized by theme and style"
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              delay={0.3}
            />
          </div>
          
          <motion.div 
            ref={refCollection}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={controlsCollection}
          >
            {collections.map((collection, index) => (
              <motion.div 
                key={collection.id}
                className={`relative overflow-hidden rounded-lg ${
                  isDark ? 'shadow-lg shadow-primary/10' : 'shadow-md'
                } aspect-video`}
                variants={itemVariants}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <img 
                  src={collection.thumbnail} 
                  alt={collection.title} 
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 ${
                  isDark 
                    ? 'bg-gradient-to-t from-dark via-dark/80 to-transparent' 
                    : 'bg-gradient-to-t from-black/80 to-black/10'
                } flex flex-col justify-end p-6`}>
                  <h3 className="text-white font-display text-xl mb-2">{collection.title}</h3>
                  <Link 
                    to="/collections" 
                    className="text-primary text-sm font-medium hover:underline"
                  >
                    View Collection →
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      <section className={`py-20 px-4 transition-colors duration-300 ${
        isDark ? 'bg-dark' : 'bg-white'
      }`}>
        <div className="container mx-auto max-w-5xl">
          <div className={`${
            isDark ? 'bg-dark-lighter' : 'bg-primary/5'
          } rounded-lg p-8 md:p-12 text-center`}>
            <AnimatedText 
              text="Visit Our Gallery" 
              className={`text-3xl md:text-4xl font-display font-medium mb-4 ${
                isDark ? 'text-white' : 'text-dark'
              }`}
              tag="h2"
            />
            <AnimatedText 
              text="Experience art in person at our gallery space located in the heart of the city"
              className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto mb-8`}
              delay={0.3}
            />
            <Link 
              to="/contact" 
              className="inline-block px-8 py-3 bg-primary text-white font-medium rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Plan Your Visit
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;