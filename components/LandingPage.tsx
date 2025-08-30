
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../constants.ts';
import { Person } from '../types.ts';
import { useSound } from '../hooks/useSound.ts';
import { useCursor } from '../hooks/useCursor.ts';

interface LandingPageProps {
  onSelect: (person: Person) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.2,
      when: 'beforeChildren',
      staggerChildren: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

const PortfolioCard: React.FC<{ person: Person; onSelect: (person: Person) => void; rotate: { x: number; y: number } }> = ({ person, onSelect, rotate }) => {
  const { playSound } = useSound();
  const { setVariant } = useCursor();
  
  return (
    <motion.div
      layoutId={`card-container-${person.id}`}
      onClick={() => {
        playSound('click');
        setVariant('default');
        onSelect(person);
      }}
      onHoverStart={() => playSound('hover')}
      onMouseEnter={() => setVariant('hover')}
      onMouseLeave={() => setVariant('default')}
      className="relative flex flex-col items-center justify-center p-8 space-y-4 cursor-pointer w-full max-w-sm md:max-w-md lg:max-w-lg group"
      // FIX: Moved rotateX and rotateY from the style prop to the animate prop to comply with recent framer-motion API changes.
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      style={{
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      transition={{ type: 'spring', stiffness: 350, damping: 40, mass: 1.2 }}
    >
      <div className={`absolute inset-0 border-2 ${person.theme.border} rounded-xl opacity-50 transition-opacity duration-300 group-hover:opacity-100`}></div>
      <motion.div
        layoutId={`image-container-${person.id}`}
        className={`relative rounded-full p-2 border-2 ${person.theme.border} ${person.theme.shadow} transition-all duration-300`}
        style={{ transform: 'translateZ(50px)' }}
      >
        <img
          src={person.imageUrl}
          alt={person.name}
          className="w-48 h-48 md:w-64 md:h-64 rounded-full object-contain"
        />
      </motion.div>
      <motion.div layoutId={`text-container-${person.id}`} className="text-center" style={{ transform: 'translateZ(40px)' }}>
        <h2 className="text-2xl md:text-3xl font-bold text-white">{person.name}</h2>
        <p className="text-sm md:text-base text-gray-400">{person.title}</p>
      </motion.div>
    </motion.div>
  );
};


const LandingPage: React.FC<LandingPageProps> = ({ onSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    setRotate({
      x: yPct * -15,
      y: xPct * 15,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };
  
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative flex flex-col md:flex-row items-center justify-center w-full min-h-screen gap-16 md:gap-24 p-4"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // FIX: The 'perspective' property is no longer accepted directly in style types in recent framer-motion versions. It should be applied via the 'transform' property.
      style={{ transform: 'perspective(1200px)', transformStyle: 'preserve-3d' }}
    >
      <PortfolioCard person={PORTFOLIO_DATA[0]} onSelect={onSelect} rotate={rotate} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1, rotateX: rotate.x * 1.5, rotateY: rotate.y * 1.5 }}
        transition={{ delay: 0.8, duration: 0.5, type: 'spring' }}
        // FIX: Moved rotateX and rotateY to the animate prop.
        style={{ 
          transform: 'translateZ(60px)'
        }}
        className="absolute text-5xl md:text-7xl font-bold text-white/50 pointer-events-none"
      >
        <span className="text-brand-blue">O</span>L<span className="text-brand-pink">A</span>K
      </motion.div>

      <PortfolioCard person={PORTFOLIO_DATA[1]} onSelect={onSelect} rotate={rotate} />
    </motion.div>
  );
};

export default LandingPage;