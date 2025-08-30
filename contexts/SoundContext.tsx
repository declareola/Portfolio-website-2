
import React, { createContext, useState, useEffect, useCallback, ReactNode, useRef } from 'react';
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
  const hasInteracted = useRef(false);

  useEffect(() => {
    try {
      window.localStorage.setItem('soundMuted', JSON.stringify(isMuted));
    } catch (error) {
      console.error(error);
    }
  }, [isMuted]);

  // This function will be called on the first user interaction to unlock audio playback.
  const unlockAudio = useCallback(() => {
    if (!hasInteracted.current) {
        hasInteracted.current = true;
    }
  }, []);

  useEffect(() => {
    // Attach listeners to detect the first user interaction.
    // The { once: true } option ensures the listener is automatically removed after firing once.
    window.addEventListener('click', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });
    window.addEventListener('touchstart', unlockAudio, { once: true });

    return () => {
      // Cleanup listeners if the component unmounts before any interaction.
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
  }, [unlockAudio]);

  const toggleMute = useCallback(() => {
    // A mute toggle is a user interaction, so we can ensure audio is unlocked.
    if (!hasInteracted.current) {
      hasInteracted.current = true;
    }
    setIsMuted(prev => !prev);
  }, []);

  const playSound = useCallback((sound: SoundType) => {
    // Only play sound if not muted AND the user has interacted with the page.
    if (!isMuted && hasInteracted.current) {
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
