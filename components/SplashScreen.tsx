import React from 'react';
import { motion } from 'framer-motion';

// FIX: Removed React.FC to resolve issue with framer-motion prop types.
const SplashScreen = () => {
  const containerVariants = {
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
      // FIX: Use 'as const' to assert the literal type for 'ease', resolving an issue with framer-motion's Transition type where a generic 'string' is not assignable.
      transition: { duration: 0.5, ease: 'easeInOut' as const }
    }
  };

  const letterVariants = {
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