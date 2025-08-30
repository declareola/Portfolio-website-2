
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiLoader } from 'react-icons/fi';
import { Person, Skill } from '../types.ts';
import { GoogleGenAI } from '@google/genai';

interface SkillDetailModalProps {
  skill: Skill;
  person: Person;
  onClose: () => void;
}

const SkillDetailModal: React.FC<SkillDetailModalProps> = ({ skill, person, onClose }) => {
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const themeColor = person.theme.color;
  
  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    const generateDescription = async () => {
      setIsLoading(true);
      const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : undefined;
      if (!apiKey) {
        setDescription('Could not generate details. API key is not configured.');
        setIsLoading(false);
        return;
      }

      try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `Based on the portfolio of ${person.name}, a ${person.title}, provide a concise, one-paragraph explanation of their expertise in "${skill.name}". You can infer from their projects or general about section. For example, connect the skill to a specific achievement or project mentioned.
        
        Portfolio context:
        - About: ${person.about}
        // FIX: Property 'projects' does not exist on type 'Person'. Replaced with 'workExperience' and 'volunteerActivities'.
        - Projects: ${[...person.workExperience, ...person.volunteerActivities].map(p => `${p.title}: ${p.description}`).join('; ')}
        
        Generate a compelling, short narrative.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        setDescription(response.text);
      } catch (error) {
        console.error('Error generating skill description:', error);
        setDescription('Could not generate details for this skill at the moment. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    generateDescription();
  }, [skill, person]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`relative w-full max-w-lg bg-gray-900/80 rounded-2xl border border-${themeColor}/50 p-6 ${person.theme.shadow}`}
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={handleClose} 
            className={`absolute top-4 right-4 text-gray-400 hover:text-${themeColor} transition-colors p-1 rounded-full`} 
            aria-label="Close modal"
          >
            <FiX size={24} />
          </button>
          
          <div className="flex items-center gap-4 mb-4">
            <skill.icon className={`text-${themeColor}`} size={32} />
            <h3 className={`text-2xl font-bold text-${themeColor}`}>
              {skill.name}
            </h3>
          </div>
          
          <div className="min-h-[100px]">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <FiLoader className={`animate-spin text-${themeColor}`} size={32} />
              </div>
            ) : (
              <p className="text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br />') }} />
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SkillDetailModal;