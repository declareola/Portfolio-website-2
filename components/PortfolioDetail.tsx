import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Person, Skill } from '../types.ts';
import { FiArrowLeft, FiCheckCircle, FiDownload } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import SkillDetailModal from './SkillDetailModal.tsx';
import { useSound } from '../hooks/useSound.ts';
import WhyHireMe from './WhyHireMe.tsx';
import { useProactiveTrigger } from '../hooks/useProactiveTrigger.ts';

interface PortfolioDetailProps {
  person: Person;
  onBack: () => void;
}

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      // FIX: Use 'as const' to assert the literal type for 'ease', resolving an issue with framer-motion's Transition type where a generic 'string' is not assignable.
      ease: 'easeOut' as const,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3, ease: 'easeIn' as const },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// FIX: Removed React.FC to resolve issue with framer-motion prop types.
const PortfolioDetail = ({ person, onBack }: PortfolioDetailProps) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const { playSound } = useSound();

  const expertiseRef = useRef<HTMLDivElement>(null);
  const workExperienceRef = useRef<HTMLDivElement>(null);

  useProactiveTrigger(
    expertiseRef,
    `I see you're exploring my skills. I'd be happy to elaborate on how I've applied any of these in my projects. Just ask!`,
    10000
  );

  useProactiveTrigger(
    workExperienceRef,
    `These are some of my key projects. Feel free to ask for more details on the challenges, my specific role, or the outcomes of any of them.`,
    12000
  );

  const handleBackClick = () => {
    playSound('click');
    onBack();
  };

  const handleSkillClick = (skill: Skill) => {
    playSound('open');
    setSelectedSkill(skill);
  };

  const handleCloseModal = () => {
    playSound('close');
    setSelectedSkill(null);
  };

  const skillItemVariants = {
    initial: {},
    hover: {
      scale: 1.08,
      y: -4,
      transition: { duration: 0.2 }
    }
  };

  const skillIconVariants = {
    initial: {
      scale: 1,
      rotate: 0,
    },
    hover: {
      scale: 1.2,
      rotate: -8,
      // FIX: Use 'as const' to assert the literal type for 'type', resolving an issue with framer-motion's Transition type where a generic 'string' is not assignable.
      transition: { type: 'spring' as const, stiffness: 400, damping: 10 }
    }
  };

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
        onClick={handleBackClick} 
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
              className="w-40 h-40 rounded-full object-contain"
            />
          </motion.div>
          <motion.div layoutId={`text-container-${person.id}`} className="flex-shrink-0">
            <h2 className="text-3xl font-bold text-white">{person.name}</h2>
            <p className={`text-lg font-medium text-${person.theme.color}`}>{person.title}</p>
          </motion.div>
          <motion.p variants={itemVariants} className="text-gray-300 mt-4 text-sm leading-relaxed">
            {person.about}
          </motion.p>
           {person.resumeUrl && person.resumeUrl !== '#' && (
            <motion.a
                variants={itemVariants}
                href={person.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('click')}
                // FIX: Replaced deprecated onHoverStart with onMouseEnter.
                onMouseEnter={() => playSound('hover')}
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
                  // FIX: Replaced deprecated onHoverStart with onMouseEnter.
                  onMouseEnter={() => playSound('hover')}
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
          <motion.div variants={itemVariants} ref={expertiseRef}>
            <h3 className={`text-xl font-semibold border-b-2 border-${person.theme.color}/50 pb-2 mb-4 text-${person.theme.color}`}>
              EXPERTISE
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {person.expertise.map((skill) => (
                <motion.div 
                  key={skill.name} 
                  className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg cursor-pointer"
                  variants={skillItemVariants}
                  initial="initial"
                  whileHover="hover"
                  // FIX: Replaced deprecated onHoverStart with onMouseEnter.
                  onMouseEnter={() => playSound('hover')}
                  onClick={() => handleSkillClick(skill)}
                >
                  <motion.div variants={skillIconVariants}>
                    <skill.icon className={`text-${person.theme.color}`} size={20} />
                  </motion.div>
                  <span className="text-gray-200">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Work Experience */}
          {person.workExperience.length > 0 && (
            <motion.div variants={itemVariants} ref={workExperienceRef}>
              <h3 className={`text-xl font-semibold border-b-2 border-${person.theme.color}/50 pb-2 mb-4 text-${person.theme.color}`}>
                WORK EXPERIENCE
              </h3>
              <div className="space-y-4">
                {person.workExperience.map((project) => (
                  <motion.div 
                    key={project.title} 
                    className="p-4 bg-gray-800/50 rounded-lg transition-colors hover:bg-gray-800/80"
                    whileHover={{ y: -2 }}
                  >
                    <h4 className="font-bold text-white">{project.title}</h4>
                    <p className="text-sm text-gray-300 my-1" dangerouslySetInnerHTML={{ __html: project.description }} />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tech.map(t => <span key={t} className={`text-xs bg-${person.theme.color}/10 text-${person.theme.color} px-2 py-1 rounded-full`}>{t}</span>)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Volunteer Activities */}
          {person.volunteerActivities.length > 0 && (
            <motion.div variants={itemVariants}>
              <h3 className={`text-xl font-semibold border-b-2 border-${person.theme.color}/50 pb-2 mb-4 text-${person.theme.color}`}>
                VOLUNTEER ACTIVITIES
              </h3>
              <div className="space-y-4">
                {person.volunteerActivities.map((project) => (
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
          )}

          {/* Education */}
          {person.education.length > 0 && (
            <motion.div variants={itemVariants}>
              <h3 className={`text-xl font-semibold border-b-2 border-${person.theme.color}/50 pb-2 mb-4 text-${person.theme.color}`}>
                EDUCATION
              </h3>
              <div className="space-y-4">
                {person.education.map((edu, index) => (
                  <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-white">{edu.degree}</h4>
                      <span className="text-sm text-gray-400">{edu.date}</span>
                    </div>
                    <p className="text-sm text-gray-300 my-1">{edu.institution}</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      {edu.details.map(detail => <li key={detail} className="text-xs text-gray-400">{detail}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

           {/* Certifications */}
          {person.certifications.length > 0 && (
            <motion.div variants={itemVariants}>
              <h3 className={`text-xl font-semibold border-b-2 border-${person.theme.color}/50 pb-2 mb-4 text-${person.theme.color}`}>
                CERTIFICATIONS
              </h3>
              <div className="space-y-3">
                {person.certifications.map((cert, index) => (
                  <div key={index} className="p-3 bg-gray-800/50 rounded-lg flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-white text-sm">{cert.name}</h4>
                      <p className="text-xs text-gray-400">{cert.issuer}</p>
                    </div>
                    <span className={`text-xs bg-${person.theme.color}/10 text-${person.theme.color} px-2 py-1 rounded-full whitespace-nowrap`}>{cert.date}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Testimonials */}
          {person.testimonials.length > 0 && (
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
          )}

          {/* Interests */}
          {person.interests.length > 0 && (
            <motion.div variants={itemVariants}>
              <h3 className={`text-xl font-semibold border-b-2 border-${person.theme.color}/50 pb-2 mb-4 text-${person.theme.color}`}>
                INTERESTS
              </h3>
              <div className="flex flex-wrap gap-2">
                {person.interests.map(interest => (
                  <span key={interest} className={`text-sm bg-${person.theme.color}/20 text-gray-200 px-3 py-1 rounded-full`}>{interest}</span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Why Hire Me */}
          <WhyHireMe person={person} />
          
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
                  // FIX: Replaced deprecated onHoverStart with onMouseEnter.
                  onMouseEnter={() => playSound('hover')}
                  onClick={() => playSound('click')}
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
          onClose={handleCloseModal} 
        />
      )}
    </AnimatePresence>
    </>
  );
};

export default PortfolioDetail;