import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap } from 'lucide-react';
import PoseDetector from './components/PoseDetector';
import AppHeader from './components/AppHeader';
import { PoseProvider } from './contexts/PoseContext';
import IdleDetector from './components/effects/IdleDetector';
import ConfidenceGraph from './components/ui/ConfidenceGraph';

function App() {
  return (
    <PoseProvider>
      <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-cyan-900/10 z-0" />
        
        {/* Scanner lines animation */}
        <div className="absolute inset-0 z-0 overflow-hidden opacity-20 pointer-events-none">
          <motion.div 
            className="w-full h-1 bg-cyan-500"
            animate={{ 
              y: ["0%", "100%", "0%"], 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 8,
              ease: "linear"
            }}
          />
          <motion.div 
            className="h-full w-1 bg-magenta-500"
            animate={{ 
              x: ["0%", "100%", "0%"], 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 12,
              ease: "linear"
            }}
          />
        </div>
        
        <IdleDetector />
        
        <AppHeader />
        
        <main className="container mx-auto px-4 pt-20 pb-8 relative z-10 flex flex-col items-center">
          {/* Detector view */}
          <PoseDetector />
          
          {/* Status indicators */}
          <div className="w-full max-w-5xl mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Action panel */}
              <motion.div 
                className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-6 overflow-hidden relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5" />
                <div className="flex items-center space-x-3 mb-2">
                  <Activity className="w-5 h-5 text-purple-400" />
                  <h2 className="text-lg font-medium text-purple-300">Action Detection</h2>
                </div>
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Current Action:</span>
                    <motion.div
                      className="px-4 py-1 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-400 font-medium"
                      layout
                    >
                      <motion.span>Neutral</motion.span>
                    </motion.div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Tracker Status:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-green-400">Active</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Stats panel */}
              <motion.div 
                className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-6 overflow-hidden relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5" />
                <div className="flex items-center space-x-3 mb-2">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-lg font-medium text-cyan-300">Performance Metrics</h2>
                </div>
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">FPS:</span>
                    <span className="text-white font-mono">30</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Model:</span>
                    <span className="text-white">MoveNet</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Latency:</span>
                    <span className="text-white font-mono">42ms</span>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Confidence graph */}
            <motion.div
              className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl mt-6 p-6 overflow-hidden relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
              <div className="flex items-center space-x-3 mb-4">
                <Activity className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-medium text-blue-300">Confidence Graph</h2>
              </div>
              <div className="relative z-10 h-32">
                <ConfidenceGraph />
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </PoseProvider>
  );
}

export default App;