
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../hooks/useCursor.ts';

const CustomCursor: React.FC = () => {
  const { variant } = useCursor();
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', mouseMove);
    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  const mainCursorVariants = {
    default: {
      height: 8,
      width: 8,
      backgroundColor: '#ff007f',
      border: 'none',
      mixBlendMode: 'difference',
      opacity: 1,
    },
    hover: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '2px solid #e6edf3',
      mixBlendMode: 'normal',
      opacity: 1,
    },
    text: {
        height: 24,
        width: 4,
        borderRadius: '2px',
        backgroundColor: '#ff007f',
        border: 'none',
        mixBlendMode: 'difference',
        opacity: 1,
    }
  };

  return (
    <>
      <motion.div
        variants={mainCursorVariants}
        className="fixed top-0 left-0 rounded-full z-[100] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        animate={variant}
        style={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 40 }}
      />
    </>
  );
};

export default CustomCursor;