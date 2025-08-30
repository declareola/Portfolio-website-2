import React from 'react';
// FIX: Re-imported 'Variants' and applied it to variant objects. The 'Variants' type helps TypeScript correctly infer the types for animation properties like 'ease', resolving the assignment error.
import { motion, Variants } from 'framer-motion';

const SplashScreen: React.FC = () => {
  // FIX: Added Variants type to fix type error.
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2,
      },
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeInOut' }
    }
  };

  // FIX: Added Variants type for consistency.
  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 flex items-center justify-center bg-[#010409]/50 backdrop-blur-sm z-50"
    >
      <motion.div className="flex text-7xl md:text-9xl font-bold tracking-widest text-white/90">
        <motion.span variants={letterVariants} className="text-brand-blue">O</motion.span>
        <motion.span variants={letterVariants} className="text-brand-blue">L</motion.span>
        <motion.span variants={letterVariants} className="text-brand-pink">A</motion.span>
        <motion.span variants={letterVariants} className="text-brand-pink">K</motion.span>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;