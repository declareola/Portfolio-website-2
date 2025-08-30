
import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { sounds, SoundType } from '../assets/sounds.ts';

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playSound: (sound: SoundType) => void;
}

export const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    try {
      const item = window.localStorage.getItem('soundMuted');
      return item ? JSON.parse(item) : false;
    } catch (error) {
      console.error(error);
      return false;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('soundMuted', JSON.stringify(isMuted));
    } catch (error) {
      console.error(error);
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const playSound = useCallback((sound: SoundType) => {
    if (!isMuted) {
      const audio = sounds[sound];
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(error => console.error(`Error playing sound: ${sound}`, error));
      }
    }
  }, [isMuted]);

  const value = { isMuted, toggleMute, playSound };

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  );
};
