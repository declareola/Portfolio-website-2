
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend, FiLoader, FiUser, FiCpu } from 'react-icons/fi';
import { Person } from '../types.ts';

interface ChatBotProps {
  person: Person | null;
}

interface Message {
  role: 'user' | 'model' | 'system';
  text: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ person }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState<any | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const themeColor = person ? person.theme.color : 'brand-blue';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const initializeChat = async () => {
        const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : undefined;
        if (!apiKey) {
            setMessages([{ role: 'model', text: 'The AI assistant is not available. API key is not configured.' }]);
            return;
        }
        
        try {
            const { GoogleGenAI } = await import('@google/genai');
            const ai = new GoogleGenAI({ apiKey });
            
            const personContext = person 
              ? `You are an expert AI assistant for ${person.name}, a ${person.title}.
                Here is their portfolio information:
                - About: ${person.about}
                - Core Skills: ${person.coreSkills.join(', ')}
                - Expertise: ${person.expertise.map(e => e.name).join(', ')}
                - Projects: ${person.projects.map(p => `${p.title}: ${p.description}`).join('; ')}
                Your role is to answer questions from potential recruiters or collaborators concisely and professionally based ONLY on this information.
                If a question is outside this scope, politely decline to answer.
                Start the conversation by introducing yourself and offering help.`
              : `You are a helpful AI assistant for the OLAK interactive portfolio, which showcases Olabode Ilesanmi and Aisha Kadir.
                Olabode is a Technical Executive Assistant & Developer.
                Aisha is a Creative Designer.
                Your role is to help visitors navigate the portfolio and answer general questions about the two professionals.
                Start the conversation by introducing yourself and explaining what you can do.`;

            const newChat = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: personContext,
                },
            });
            setChat(newChat);
            
            const initialMessage: Message = {
                role: 'model',
                text: person 
                    ? `Hello! I'm ${person.name.split(' ')[0]}'s AI assistant. How can I help you learn more about their skills and experience?`
                    : `Hello! I'm the AI assistant for the OLAK portfolio. You can ask me about Olabode or Aisha. Who would you like to know more about?`
            };
            setMessages([initialMessage]);
        } catch (error) {
            console.error("Failed to load or initialize AI chat:", error);
            setMessages([{ role: 'model', text: 'Failed to initialize AI assistant.' }]);
        }
    };

    if (isOpen) {
      initializeChat();
    } else {
      setMessages([]);
      setChat(null);
    }
  }, [isOpen, person]);

  const handleSend = async () => {
    if (!input.trim() || !chat) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chat.sendMessage({ message: input });
      const modelMessage: Message = { role: 'model', text: response.text };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      const errorMessage: Message = { role: 'model', text: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
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
                disabled={isLoading || !chat}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim() || !chat}
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