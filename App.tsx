
import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import SplashScreen from './components/SplashScreen.tsx';
import LandingPage from './components/LandingPage.tsx';
import PortfolioDetail from './components/PortfolioDetail.tsx';
import ChatBot from './components/ChatBot.tsx';
import { Person } from './types.ts';
import { SoundProvider } from './contexts/SoundContext.tsx';
import { useSound } from './hooks/useSound.ts';
import SoundToggle from './components/SoundToggle.tsx';
import InteractiveBackground from './components/InteractiveBackground.tsx';
import useAssetPreloader from './hooks/useAssetPreloader.ts';
import { PORTFOLIO_DATA } from './constants.ts';
import { ChatProvider } from './contexts/ChatContext.tsx';
import ProactiveChatPrompt from './components/ProactiveChatPrompt.tsx';

const assetUrls = PORTFOLIO_DATA.map(p => p.imageUrl);

const AppContent: React.FC = () => {
  const isLoading = useAssetPreloader(assetUrls, 2000);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const { playSound } = useSound();

  const handleSelectPerson = (person: Person) => {
    playSound('transition');
    setSelectedPerson(person);
  };

  const handleBack = () => {
    playSound('transition');
    setSelectedPerson(null);
  };

  return (
    <ChatProvider person={selectedPerson}>
      <div 
        style={{ isolation: 'isolate' }}
        className="relative min-h-screen w-full bg-[#010409] font-sans overflow-hidden star-bg animate-star-roam noise-bg"
      >
        <InteractiveBackground />
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/50" />
        <LayoutGroup>
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div key="splash">
                <SplashScreen />
              </motion.div>
            ) : selectedPerson ? (
               <motion.div key="detail" className="w-full min-h-screen flex items-center justify-center p-4 md:p-8">
                  <PortfolioDetail person={selectedPerson} onBack={handleBack} />
               </motion.div>
            ) : (
              <motion.div key="landing" className="w-full min-h-screen flex items-center justify-center">
                <LandingPage onSelect={handleSelectPerson} />
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
        {!isLoading && <SoundToggle />}
        {!isLoading && <ProactiveChatPrompt />}
        {!isLoading && <ChatBot />}
      </div>
    </ChatProvider>
  );
};


const App: React.FC = () => {
  return (
    <SoundProvider>
        <AppContent />
    </SoundProvider>
  );
};

export default App;