import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Palette, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useThemeStore } from '../../store/theme';

interface NavbarProps {
  scrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const { isDark } = useThemeStore();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Collections', path: '/collections' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const navbarBackground = useTransform(
    scrollYProgress,
    [0, 0.2],
    isDark 
      ? ['rgba(18, 18, 18, 0)', 'rgba(18, 18, 18, 0.9)']
      : ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.9)']
  );

  const logoVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const linkVariants = {
    initial: { opacity: 0, y: -10 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
      },
    }),
  };

  return (
    <>
      <motion.header 
        className={`fixed w-full z-50 backdrop-blur-sm ${isDark ? 'text-white' : 'text-dark'}`}
        style={{ 
          backgroundColor: navbarBackground,
          boxShadow: scrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
        }}
        initial={false}
        animate={scrolled ? "scrolled" : "top"}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div 
                variants={logoVariants} 
                initial="initial" 
                animate="animate"
                className="relative"
              >
                <Palette className="w-8 h-8 text-primary relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-primary/20 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
              </motion.div>
              <motion.span 
                className="text-xl font-display font-semibold"
                variants={logoVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.2 }}
              >
                Artisan Gallery
              </motion.span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  variants={linkVariants}
                  initial="initial"
                  animate="animate"
                  custom={index}
                >
                  <Link 
                    to={link.path}
                    className={`relative font-medium text-sm tracking-wide transition-colors duration-300 hover:text-primary ${
                      location.pathname === link.path ? 'text-primary' : ''
                    }`}
                  >
                    {link.name}
                    {location.pathname === link.path && (
                      <motion.span 
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"
                        layoutId="navIndicator"
                        transition={{ 
                          type: "spring", 
                          stiffness: 380, 
                          damping: 30 
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
              <ThemeToggle />
            </nav>
            
            <div className="md:hidden flex items-center space-x-4">
              <ThemeToggle />
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mobileMenuOpen ? 'close' : 'menu'}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {mobileMenuOpen ? (
                      <X className="w-6 h-6" />
                    ) : (
                      <Menu className="w-6 h-6" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.header>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className={`fixed inset-0 z-40 ${
              isDark 
                ? 'bg-dark-lighter/90' 
                : 'bg-white/90'
            } backdrop-blur-md flex flex-col pt-20 pb-6 px-4`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col space-y-6 items-center mt-10">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    to={link.path}
                    className={`text-xl font-medium transition-colors duration-300 hover:text-primary ${
                      location.pathname === link.path ? 'text-primary' : ''
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;