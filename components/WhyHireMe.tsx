
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClipboard, FiCheck, FiCpu, FiLoader } from 'react-icons/fi';
import { Person } from '../types.ts';
import { GoogleGenAI } from '@google/genai';
import { useSound } from '../hooks/useSound.ts';

interface WhyHireMeProps {
  person: Person;
}

const WhyHireMe: React.FC<WhyHireMeProps> = ({ person }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [pitch, setPitch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { playSound } = useSound();
  const themeColor = person.theme.color;

  const handleGeneratePitch = async () => {
    if (!jobDescription.trim()) return;

    playSound('click');
    setIsLoading(true);
    setPitch('');

    const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : undefined;
    if (!apiKey) {
      setPitch('The AI pitch generator is not available. API key is not configured.');
      setIsLoading(false);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are an expert career coach writing a personalized pitch for ${person.name}. Based on their portfolio information and the provided job description, generate a compelling, concise paragraph (3-4 sentences) explaining why they are a perfect fit for the role. Highlight their most relevant skills and experiences. Be professional and persuasive, writing in the first person (from ${person.name}'s perspective).

      **${person.name}'s Portfolio:**
      - About: ${person.about}
      - Core Skills: ${person.coreSkills.join(', ')}
      - Work Experience: ${person.workExperience.map(p => `${p.title}: ${p.description}`).join('; ')}

      **Job Description / Company Values:**
      "${jobDescription}"`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setPitch(response.text);
    } catch (error) {
      console.error('Error generating pitch:', error);
      setPitch('Sorry, I encountered an error while generating the pitch. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(pitch);
    setIsCopied(true);
    playSound('open');
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } }}
      className="mt-8"
    >
      <h3 className={`text-xl font-semibold border-b-2 border-${themeColor}/50 pb-2 mb-4 text-${themeColor}`}>
        WHY HIRE ME?
      </h3>
      <p className="text-gray-400 text-sm mb-4">
        Paste a job description or company values below, and I'll generate a personalized pitch explaining why I'm the perfect fit for the role.
      </p>
      <div className="relative">
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description here..."
          rows={5}
          className={`w-full p-3 bg-gray-800/80 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-${themeColor} transition-all custom-scrollbar`}
          disabled={isLoading}
        />
        <button
          onClick={handleGeneratePitch}
          disabled={isLoading || !jobDescription.trim()}
          className={`absolute bottom-3 right-3 flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-${themeColor}/80 rounded-full transition-all hover:bg-${themeColor} disabled:bg-gray-600 disabled:cursor-not-allowed`}
        >
          {isLoading ? (
            <>
              <FiLoader className="animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <FiCpu size={16} />
              <span>Generate Pitch</span>
            </>
          )}
        </button>
      </div>

      <AnimatePresence>
        {pitch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4 bg-gray-800/50 border border-gray-700 rounded-lg relative overflow-hidden"
          >
            <p className="text-gray-300 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: pitch.replace(/\n/g, '<br />') }} />
            <button
              onClick={handleCopy}
              className={`absolute top-2 right-2 p-2 rounded-full text-gray-400 hover:text-${themeColor} hover:bg-${themeColor}/20 transition-colors`}
              aria-label="Copy pitch"
            >
              {isCopied ? <FiCheck className={`text-${themeColor}`} /> : <FiClipboard />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WhyHireMe;