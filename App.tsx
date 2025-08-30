
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import SplashScreen from './components/SplashScreen.tsx';
import LandingPage from './components/LandingPage.tsx';
import PortfolioDetail from './components/PortfolioDetail.tsx';
import ChatBot from './components/ChatBot.tsx';
import { Person } from './types.ts';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectPerson = (person: Person) => {
    setSelectedPerson(person);
  };

  const handleBack = () => {
    setSelectedPerson(null);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#010409] font-sans overflow-hidden star-bg animate-star-roam noise-bg">
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
      {!isLoading && <ChatBot person={selectedPerson} />}
    </div>
  );
};

export default App;