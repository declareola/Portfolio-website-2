
import React from 'react';
import { motion } from 'framer-motion';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';
import { useSound } from '../hooks/useSound.ts';

// FIX: Removed React.FC to resolve issue with framer-motion prop types.
const SoundToggle = () => {
  const { isMuted, toggleMute } = useSound();

  const handleToggle = () => {
    toggleMute();
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleToggle}
      className={`fixed bottom-6 left-6 z-50 p-4 rounded-full shadow-lg transition-colors
        ${isMuted 
          ? 'bg-gray-600/70 text-white' 
          : 'bg-brand-blue/80 text-white shadow-[0_0_20px_5px_rgba(0,191,255,0.3)]'
        }
      `}
      aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
    >
      {isMuted ? <FiVolumeX size={24} /> : <FiVolume2 size={24} />}
    </motion.button>
  );
};

export default SoundToggle;