import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare } from 'react-icons/fi';
import { useChat } from '../hooks/useChat.ts';
import { useSound } from '../hooks/useSound.ts';

const ProactiveChatPrompt: React.FC = () => {
  const { proactivePrompt, acceptProactivePrompt, dismissProactivePrompt, person } = useChat();
  const { playSound } = useSound();
  const themeColor = person ? person.theme.color : 'brand-blue';

  useEffect(() => {
    // FIX: Changed type from 'number' to 'ReturnType<typeof setTimeout>' to handle potential NodeJS.Timeout type from conflicting @types/node, resolving the assignment error.
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (proactivePrompt) {
      timer = setTimeout(() => {
        dismissProactivePrompt();
      }, 4000); // Auto-dismiss after 4 seconds
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [proactivePrompt, dismissProactivePrompt]);

  const handleClick = () => {
    playSound('open');
    acceptProactivePrompt();
  }

  return (
    <AnimatePresence>
      {proactivePrompt && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-xs cursor-pointer"
          onClick={handleClick}
        >
          <div className={`relative p-4 rounded-xl bg-gray-800/90 backdrop-blur-md border border-${themeColor}/50 shadow-lg`}>
            <div className={`absolute -bottom-2 right-6 w-4 h-4 bg-gray-800/90 border-b border-r border-${themeColor}/50 transform rotate-45`}></div>
            <div className="flex items-start gap-3">
              <div className={`mt-1 flex-shrink-0 p-2 rounded-full bg-${themeColor}/30 text-${themeColor}`}>
                <FiMessageSquare size={16} />
              </div>
              <p className="text-sm text-gray-200">{proactivePrompt}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProactiveChatPrompt;