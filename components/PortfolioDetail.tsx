
import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { Person, Skill } from '../types.ts';
import { FiArrowLeft, FiCheckCircle, FiDownload } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import SkillDetailModal from './SkillDetailModal.tsx';

interface PortfolioDetailProps {
  person: Person;
  onBack: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const PortfolioDetail: React.FC<PortfolioDetailProps> = ({ person, onBack }) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  return (
    <>
    <motion.div
      layoutId={`card-container-${person.id}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`relative w-full max-w-5xl bg-black/30 backdrop-blur-md rounded-2xl border border-${person.theme.color}/50 p-6 md:p-10 ${person.theme.shadow} max-h-[90vh] flex flex-col`}
    >
      <motion.button 
        onClick={onBack} 
        className={`absolute top-4 left-4 text-gray-400 hover:text-${person.theme.color} transition-colors z-10 p-2 rounded-full hover:bg-${person.theme.color}/20`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Go back"
      >
        <FiArrowLeft size={24} />
      </motion.button>

      <div className={`flex flex-col lg:flex-row gap-8 lg:gap-12 flex-1 min-h-0 overflow-y-auto pr-4 custom-scrollbar ${person.theme.color === 'brand-blue' ? 'custom-scrollbar-blue' : 'custom-scrollbar-pink'}`}>
        {/* Left Side */}
        <motion.div 
          variants={itemVariants} 
          className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-1/3 pt-8 lg:pt-0"
        >
          <motion.div layoutId={`image-container-${person.id}`} className={`p-2 rounded-full border-2 ${person.theme.border} mb-4 flex-shrink-0`}>
            <img
              src={person.imageUrl}
              alt={person.name}
              className="w-40 h-40 rounded-full object-cover"
            />
          </motion.div>
          <motion.div layoutId={`text-container-${person.id}`} className="flex-shrink-0">
            <h2 className="text-3xl font-bold text-white">{person.name}</h2>
            <p className={`text-lg font-medium text-${person.theme.color}`}>{person.title}</p>
          </motion.div>
          <motion.p variants={itemVariants} className="text-gray-300 mt-4 text-sm leading-relaxed">
            {person.about}
          </motion.p>
           {person.resumeUrl && (
            <motion.a
                variants={itemVariants}
                href={person.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 mt-6 text-white bg-${person.theme.color}/80 rounded-full font-semibold transition-colors hover:bg-${person.theme.color}`}
                whileHover={{ scale: 1.05, y: -2, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
                aria-label="Download Resume"
            >
                <FiDownload />
                <span>Download Resume</span>
            </motion.a>
          )}
          <motion.div variants={itemVariants} className="mt-6 w-full flex-shrink-0">
            <h3 className={`text-lg font-semibold mb-3 text-${person.theme.color} text-center lg:text-left`}>
              CORE SKILLS
            </h3>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              {person.coreSkills.map(skill => (
                 <motion.div
                  key={skill}
                  className={`flex items-center gap-2 p-3 bg-gray-800/50 border border-${person.theme.color}/50 rounded-lg shadow-sm`}
                  whileHover={{
                    scale: 1.05,
                    y: -4,
                    boxShadow: person.theme.color === 'brand-blue'
                      ? '0 0 15px rgba(0, 191, 255, 0.4)'
                      : '0 0 15px rgba(255, 0, 127, 0.4)',
                    borderColor: person.theme.color === 'brand-blue' ? '#00bfff' : '#ff007f',
                    transition: { duration: 0.2 },
                  }}
                >
                  <FiCheckCircle className={`text-${person.theme.color} flex-shrink-0`} />
                  <span className="text-gray-200 text-sm">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side */}
        <div className="lg:w-2/3 space-y-8">
          {/* Expertise */}
          <motion.div variants={itemVariants}>
            <h3 className={`text-xl font-semibold border-b-2 border-${person.theme.color}/50 pb-2 mb-4 text-${person.theme.color}`}>
              EXPERTISE
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {person.expertise.map((skill) => (
                <motion.div 
                  key={skill.name} 
                  className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg cursor-pointer"
                  whileHover={{ scale: 1.08, y: -4, transition: { duration: 0.2 } }}
                  onClick={() => setSelectedSkill(skill)}
                >
                  <skill.icon className={`text-${person.theme.color}`} size={20} />
                  <span className="text-gray-200">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Projects */}
          <motion.div variants={itemVariants}>
            <h3 className={`text-xl font-semibold border-b-2 border-${person.theme.color}/50 pb-2 mb-4 text-${person.theme.color}`}>
              PROJECTS
            </h3>
            <div className="space-y-4">
              {person.projects.map((project) => (
                <motion.div 
                  key={project.title} 
                  className="p-4 bg-gray-800/50 rounded-lg transition-colors hover:bg-gray-800/80"
                  whileHover={{ y: -2 }}
                >
                  <h4 className="font-bold text-white">{project.title}</h4>
                  <p className="text-sm text-gray-300 my-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tech.map(t => <span key={t} className={`text-xs bg-${person.theme.color}/10 text-${person.theme.color} px-2 py-1 rounded-full`}>{t}</span>)}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div variants={itemVariants}>
            <h3 className={`text-xl font-semibold border-b-2 border-${person.theme.color}/50 pb-2 mb-4 text-${person.theme.color}`}>
              TESTIMONIALS
            </h3>
            <div className="space-y-4">
              {person.testimonials.map((testimonial) => (
                <div key={testimonial.author} className="p-4 bg-gray-800/50 rounded-lg italic relative">
                  <FaQuoteLeft className={`absolute top-3 left-3 text-${person.theme.color}/30`} size={20} />
                  <p className="pl-8 text-gray-300">"{testimonial.quote}"</p>
                  <p className="text-right mt-2 text-sm font-semibold text-gray-400 not-italic">
                    - {testimonial.author}, {testimonial.role}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Connect */}
          <motion.div variants={itemVariants} className="pb-4">
            <h3 className={`text-xl font-semibold border-b-2 border-${person.theme.color}/50 pb-2 mb-4 text-${person.theme.color}`}>
              CONNECT
            </h3>
            <div className="flex items-center gap-4">
              {person.connect.map((link) => (
                <motion.a 
                  key={link.name} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 bg-gray-800/50 rounded-full text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors"
                  aria-label={link.name}
                  whileHover={{ scale: 1.2, y: -2, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.9 }}
                >
                  <link.icon size={22} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
    <AnimatePresence>
      {selectedSkill && (
        <SkillDetailModal 
          skill={selectedSkill} 
          person={person} 
          onClose={() => setSelectedSkill(null)} 
        />
      )}
    </AnimatePresence>
    </>
  );
};

export default PortfolioDetail;