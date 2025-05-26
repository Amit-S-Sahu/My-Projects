import React, { createContext, useContext, useState, ReactNode } from 'react';

export type PoseAction = 'neutral' | 'punch';

export interface PoseData {
  action: PoseAction;
  confidence: number;
  keypoints: Array<{
    x: number;
    y: number;
    score: number;
    name: string;
  }> | null;
  lastMovementTime: number;
}

interface PoseContextType {
  poseData: PoseData;
  setPoseData: React.Dispatch<React.SetStateAction<PoseData>>;
  isDetecting: boolean;
  setIsDetecting: React.Dispatch<React.SetStateAction<boolean>>;
  isPunchDetected: boolean;
  confidenceHistory: number[];
  addConfidenceValue: (value: number) => void;
  isIdle: boolean;
}

const PoseContext = createContext<PoseContextType | undefined>(undefined);

export function PoseProvider({ children }: { children: ReactNode }) {
  const [poseData, setPoseData] = useState<PoseData>({
    action: 'neutral',
    confidence: 0,
    keypoints: null,
    lastMovementTime: Date.now(),
  });
  
  const [isDetecting, setIsDetecting] = useState(false);
  const [confidenceHistory, setConfidenceHistory] = useState<number[]>(Array(20).fill(0));
  const [isIdle, setIsIdle] = useState(false);
  
  // Check if the user has been idle for more than 10 seconds
  React.useEffect(() => {
    const idleCheckInterval = setInterval(() => {
      const currentTime = Date.now();
      const idleTime = currentTime - poseData.lastMovementTime;
      
      if (idleTime > 10000) { // 10 seconds
        setIsIdle(true);
      } else {
        setIsIdle(false);
      }
    }, 1000);
    
    return () => clearInterval(idleCheckInterval);
  }, [poseData.lastMovementTime]);
  
  const isPunchDetected = poseData.action === 'punch';
  
  const addConfidenceValue = (value: number) => {
    setConfidenceHistory(prev => [...prev.slice(1), value]);
  };
  
  return (
    <PoseContext.Provider 
      value={{ 
        poseData, 
        setPoseData, 
        isDetecting, 
        setIsDetecting,
        isPunchDetected,
        confidenceHistory,
        addConfidenceValue,
        isIdle
      }}
    >
      {children}
    </PoseContext.Provider>
  );
}

export function usePose() {
  const context = useContext(PoseContext);
  if (context === undefined) {
    throw new Error('usePose must be used within a PoseProvider');
  }
  return context;
}