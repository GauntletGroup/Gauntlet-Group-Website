import React from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Wifi, HardDrive, Database, Cpu } from 'lucide-react';

export const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0 }}
      animate={{ 
        y: [0, -20, 0],
        opacity: [0.3, 0.6, 0.3],
        rotate: [0, 180, 360]
      }}
      transition={{ 
        duration: 3 + Math.random() * 4,
        repeat: Infinity,
        delay: Math.random() * 5
      }}
      className="absolute w-1 h-1 bg-cyan-400 rounded-full"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    />
  ));
  return <>{particles}</>;
};

export const FloatingTechIcons = () => {
  const icons = [Code, Server, Wifi, HardDrive, Database, Cpu];
  return (
    <>
      {icons.map((Icon, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            y: [0, -30, 0],
            x: [0, (i % 2 === 0 ? 10 : -10), 0],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 90, 0]
          }}
          transition={{ 
            duration: 6 + Math.random() * 5,
            repeat: Infinity,
            delay: i * 0.5
          }}
          className="absolute text-cyan-400/20"
          style={{
            left: `${10 + (i * 15)}%`,
            top: `${20 + (i % 3) * 30}%`,
          }}
        >
          <Icon size={24 + Math.random() * 16} />
        </motion.div>
      ))}
    </>
  );
};
