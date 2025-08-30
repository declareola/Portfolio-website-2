
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend, FiLoader, FiUser, FiCpu } from 'react-icons/fi';
import { useSound } from '../hooks/useSound.ts';
import { useChat } from '../hooks/useChat.ts';

// FIX: Removed React.FC to resolve issue with framer-motion prop types.
const ChatBot = () => {
  const { person, isOpen, toggleChat, messages, isLoading, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { playSound } = useSound();

  const themeColor = person ? person.theme.color : 'brand-blue';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    playSound('click');
    const messageToSend = input;
    setInput('');
    await sendMessage(messageToSend);
  };

  const handleToggle = () => {
    playSound(isOpen ? 'close' : 'open');
    toggleChat();
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleToggle}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-${themeColor} text-white shadow-lg ${person ? person.theme.shadow : 'shadow-[0_0_30px_5px_rgba(0,191,255,0.4)]'}`}
        aria-label="Open chat assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? <motion.div key="close"><FiX size={24} /></motion.div> : <motion.div key="open"><FiMessageSquare size={24} /></motion.div>}
        </AnimatePresence>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`fixed bottom-24 right-6 z-40 w-[90vw] max-w-sm h-[60vh] bg-black/50 backdrop-blur-xl rounded-2xl border border-${themeColor}/50 flex flex-col shadow-2xl`}
          >
            <header className={`p-4 border-b border-${themeColor}/50 text-center font-bold`}>
              AI Assistant {person && `for ${person.name}`}
            </header>
            
            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                    {msg.role === 'model' && <div className={`p-2 rounded-full bg-${themeColor}/30 text-${themeColor}`}><FiCpu size={16} /></div>}
                    <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? `bg-${themeColor}/80 text-white` : 'bg-gray-800/80'}`}>
                       <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />
                    </div>
                     {msg.role === 'user' && <div className={`p-2 rounded-full bg-gray-700`}><FiUser size={16} /></div>}
                  </div>
                ))}
                {isLoading && (
                   <div className="flex items-start gap-3">
                     <div className={`p-2 rounded-full bg-${themeColor}/30 text-${themeColor}`}><FiCpu size={16} /></div>
                     <div className="max-w-[80%] p-3 rounded-lg bg-gray-800/80 flex items-center">
                       <FiLoader className="animate-spin" />
                     </div>
                   </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className={`p-4 border-t border-${themeColor}/50 flex items-center gap-2`}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask a question..."
                className={`flex-1 bg-gray-800/80 border border-gray-700 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-${themeColor}`}
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className={`p-2.5 rounded-full bg-${themeColor} text-white disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors`}
              >
                <FiSend size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;