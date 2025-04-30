import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { TextureLoader } from 'three';
import { motion } from 'framer-motion';
import PageTransition from '../components/ui/PageTransition';
import AnimatedText from '../components/ui/AnimatedText';
import collections from '../data/collections';
import { useThemeStore } from '../store/theme';

const ArtFrame = ({ position, rotation, texture, title, onClick }: any) => {
  const mesh = useRef<THREE.Mesh>(null);
  const textureMap = useLoader(TextureLoader, texture);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh ref={mesh} onClick={onClick}>
        <planeGeometry args={[3, 2]} />
        <meshBasicMaterial 
          map={textureMap}
          transparent={true}
          opacity={1}
        />
      </mesh>
      <Text
        position={[0, -1.2, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {title}
      </Text>
    </group>
  );
};

const Collections = () => {
  const { isDark } = useThemeStore();

  const handleArtworkClick = (collection: any) => {
    window.open(collection.thumbnail, '_blank');
  };

  return (
    <PageTransition>
      <section className={`min-h-screen ${isDark ? 'bg-dark' : 'bg-light'}`}>
        <div className="container mx-auto max-w-7xl pt-32 pb-16 px-4">
          <div className="text-center mb-16">
            <AnimatedText 
              text="3D Art Gallery" 
              className={`text-5xl md:text-6xl font-display font-medium mb-4 ${
                isDark ? 'text-white' : 'text-dark'
              }`}
              tag="h1"
            />
            <AnimatedText 
              text="Navigate through our virtual gallery using your mouse or touch controls"
              className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}
              delay={0.3}
            />
          </div>
        </div>

        <div className="w-full h-[800px]">
          <Canvas 
            camera={{ position: [0, 0, 8], fov: 75 }}
            gl={{ antialias: true }}
          >
            <color attach="background" args={[isDark ? '#121212' : '#f8f8f8']} />
            <Suspense fallback={null}>
              <ambientLight intensity={1.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <pointLight position={[-10, -10, -10]} intensity={1} />
              <spotLight
                position={[0, 5, 5]}
                angle={0.7}
                penumbra={1}
                intensity={1}
                castShadow
              />
              
              {collections.map((collection, index) => {
                const angle = (index / collections.length) * Math.PI * 2;
                const radius = 5;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                
                return (
                  <motion.group
                    key={collection.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                  >
                    <ArtFrame
                      position={[x, 0, z]}
                      rotation={[0, -angle + Math.PI, 0]}
                      texture={collection.thumbnail}
                      title={collection.title}
                      onClick={() => handleArtworkClick(collection)}
                    />
                  </motion.group>
                );
              })}
              
              <OrbitControls
                enableZoom={true}
                enablePan={false}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 2}
                minDistance={4}
                maxDistance={12}
                autoRotate
                autoRotateSpeed={0.5}
              />
            </Suspense>
          </Canvas>
        </div>

        <div className="container mx-auto max-w-2xl px-4 py-16 text-center">
          <h2 className={`text-2xl font-display font-medium mb-4 ${
            isDark ? 'text-white' : 'text-dark'
          }`}>
            How to Navigate
          </h2>
          <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            <li>• Click and drag to rotate the gallery</li>
            <li>• Click on any artwork to view it in full size</li>
            <li>• Use mouse wheel or pinch gestures to zoom</li>
            <li>• The gallery slowly rotates automatically</li>
          </ul>
        </div>
      </section>
    </PageTransition>
  );
};

export default Collections;