import React from 'react';
// FIX: Import Variants from framer-motion to explicitly type animation variants.
import { motion, Variants } from 'framer-motion';

const SplashScreen: React.FC = () => {
  // FIX: Add Variants type to fix type error on `ease` property.
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

  // FIX: Add Variants type for consistency.
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
      className="fixed inset-0 flex items-center justify-center bg-[#010409] z-50"
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
