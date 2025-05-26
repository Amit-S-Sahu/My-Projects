import React from 'react';
import { motion } from 'framer-motion';
import { Scan, Camera, Menu } from 'lucide-react';
import { usePose } from '../contexts/PoseContext';

function AppHeader() {
  const { isDetecting } = usePose();

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 bg-black/30 backdrop-blur-md z-50 border-b border-white/10"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-cyan-500 to-purple-500 p-2 rounded-md">
            <Scan className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            NEURO•POSE
          </h1>
        </div>
        
        {/* Status indicator */}
        <div className="hidden md:flex items-center">
          <div className="flex items-center bg-black/50 rounded-full px-4 py-1.5 border border-white/10">
            <span 
              className={`w-2 h-2 rounded-full ${isDetecting ? 'bg-green-500 animate-pulse' : 'bg-red-500'} mr-2`} 
            />
            <span className={`text-sm ${isDetecting ? 'text-green-400' : 'text-red-400'}`}>
              {isDetecting ? 'Detection Active' : 'Initializing...'}
            </span>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex items-center space-x-4">
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors">
            <Camera className="w-5 h-5 text-cyan-400" />
          </button>
          <button className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors">
            <Menu className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}

export default AppHeader;