
import { Person } from './types.ts';
// FIX: Replace unavailable SiPowerbi icon with FiBarChart2 from Feather Icons.
import { 
    FiDatabase, FiLayers, FiCode, FiFigma, FiPenTool, FiCamera, 
    FiGithub, FiLinkedin, FiMail, FiTwitter, FiInstagram, FiDribbble, FiBarChart2
} from 'react-icons/fi';
import { FaReact, FaNodeJs, FaPalette, FaQuoteLeft, FaHtml5, FaJsSquare } from 'react-icons/fa';
import { SiTailwindcss, SiAdobeillustrator, SiTableau, SiZapier } from 'react-icons/si';

export const PORTFOLIO_DATA: Person[] = [
  {
    id: 'olabode',
    name: 'Olabode Ilesanmi',
    title: 'Technical Executive Assistant & Developer',
    imageUrl: 'https://images.weserv.nl/?url=i.imgur.com/CqXf9Vf.jpeg',
    about: "Technical Executive Assistant with 5+ years of experience in executive support, IT operations, and data analytics. Expert in Microsoft 365, Power BI, Google Workspace, and web development (HTML/CSS, React). Proven track record managing C-level executives, automating workflows, and delivering data-driven insights for remote and hybrid teams.",
    resumeUrl: '#', // Placeholder URL
    coreSkills: [
      'Executive & Administrative Support',
      'Global Calendar Management',
      'High-Volume Communication Triage',
      'Board Meeting Preparation',
      'Confidential Data Management (GDPR)',
      'Workflow Automation',
    ],
    expertise: [
      { name: 'React', icon: FaReact },
      // FIX: Use FiBarChart2 for Power BI as SiPowerbi is not available.
      { name: 'Power BI', icon: FiBarChart2 },
      { name: 'JavaScript', icon: FaJsSquare },
      { name: 'Data & Analytics', icon: FiDatabase },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'API Integration', icon: FiCode },
    ],
    projects: [
      {
        title: 'DPR Compliance Platform Onboarding',
        description: 'Led the onboarding process for the company onto the Department of Petroleum Resources (DPR) online platform, securing 100% of required approvals for gas plants and fuel stations.',
        tech: ['Regulatory Compliance', 'Documentation', 'Project Management'],
      },
      {
        title: 'Inventory & Supply Chain Optimization',
        description: 'Optimized inventory and supply chain for Forte Oil (now Ardova Plc) by proactively allocating fuel resources, reducing stock outages by 15% and reconciling over ₦50 million in monthly settlements.',
        tech: ['Data Analysis', 'Logistics', 'Inventory Management', 'Excel'],
      },
      {
        title: 'IT Infrastructure & Support Enhancement',
        description: 'Installed, configured, and maintained computer systems and IT infrastructure across multiple departments, improving IT support response time by 30% and achieving a 98% uptime.',
        tech: ['System Administration', 'Hardware', 'Software', 'Troubleshooting'],
      },
    ],
    testimonials: [
      {
        quote: "Olabode's technical expertise and proactive approach were instrumental in streamlining our operations. His ability to manage data-driven insights is exceptional.",
        author: 'Jane Doe',
        role: 'Regional Manager, RCCG City of Grace',
      },
      {
        quote: "Working with Olabode on the DPR platform was a seamless experience. His attention to detail and commitment to compliance ensured we met all regulatory requirements ahead of schedule.",
        author: 'John Smith',
        role: 'CEO, Always Petroleum',
      },
    ],
    connect: [
      { name: 'GitHub', icon: FiGithub, url: 'https://github.com' },
      { name: 'LinkedIn', icon: FiLinkedin, url: 'https://linkedin.com' },
      { name: 'Mail', icon: FiMail, url: 'mailto:ilesanmiolabode2@gmail.com' },
    ],
    theme: {
      color: 'brand-blue',
      shadow: 'shadow-[0_0_30px_5px_rgba(0,191,255,0.4)]',
      border: 'border-brand-blue',
    },
  },
  {
    id: 'aisha',
    name: 'Aisha Kadir',
    title: 'Creative Designer',
    imageUrl: 'https://images.weserv.nl/?url=i.imgur.com/N7b2oJp.jpeg',
    about: "A creative visionary with a passion for crafting beautiful and intuitive user experiences. Specializing in branding, illustration, and digital product design. My goal is to merge aesthetics with functionality to create products that are not only stunning but also a joy to use. Let's create something amazing together.",
    resumeUrl: '#', // Placeholder URL
    coreSkills: [
      'Brand Strategy & Identity',
      'User Interface (UI) Design',
      'User Experience (UX) Research',
      'Visual Storytelling',
      'Digital Illustration',
      'Prototyping & User Testing',
    ],
    expertise: [
      { name: 'Figma', icon: FiFigma },
      { name: 'Illustrator', icon: SiAdobeillustrator },
      { name: 'UI Design', icon: FaPalette },
      { name: 'Illustration', icon: FiPenTool },
      { name: 'Branding', icon: FiLayers },
      { name: 'Photography', icon: FiCamera },
    ],
     projects: [
        {
          title: 'Global Brand Identity Redesign',
          description: 'Led the complete redesign of a major e-commerce brand, including logo, packaging, and digital assets, resulting in a 40% increase in brand recognition.',
          tech: ['Figma', 'Illustrator', 'Brand Strategy'],
        },
        {
          title: 'Interactive Web App UI/UX',
          description: 'Designed a highly intuitive and visually stunning user interface for a new mobile banking application, improving user engagement by over 25%.',
          tech: ['UI/UX Research', 'Prototyping', 'User Testing'],
        },
    ],
    testimonials: [
        {
          quote: 'Aisha has an incredible eye for detail and a deep understanding of user-centric design. She transformed our vision into a beautiful and functional product.',
          author: 'Emily White',
          role: 'Product Manager, FinTech Corp',
        },
    ],
    connect: [
      { name: 'Dribbble', icon: FiDribbble, url: 'https://dribbble.com' },
      { name: 'Instagram', icon: FiInstagram, url: 'https://instagram.com' },
      { name: 'Twitter', icon: FiTwitter, url: 'https://twitter.com' },
    ],
    theme: {
      color: 'brand-pink',
      shadow: 'shadow-[0_0_30px_5px_rgba(255,0,127,0.4)]',
      border: 'border-brand-pink',
    },
  },
];