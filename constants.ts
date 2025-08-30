
import { Person } from './types.ts';
// FIX: Replace unavailable SiPowerbi icon with FiBarChart2 from Feather Icons.
import { 
    FiDatabase, FiLayers, FiCode, FiFigma, FiPenTool, FiCamera, 
    FiGithub, FiLinkedin, FiMail, FiTwitter, FiInstagram, FiDribbble, FiBarChart2, FiZap
} from 'react-icons/fi';
// FIX: Import FaFileExcel to replace SiMicrosoftexcel which does not exist.
import { FaReact, FaNodeJs, FaPalette, FaQuoteLeft, FaHtml5, FaJsSquare, FaFileExcel, FaCss3Alt } from 'react-icons/fa';
// FIX: Removed SiMicrosoftexcel as it is not an exported member of 'react-icons/si'.
// FIX: Removed SiMicrosoftpowerautomate as it is not an exported member of 'react-icons/si'.
import { SiTailwindcss, SiAdobeillustrator, SiTableau, SiZapier, SiCanva, SiAdobephotoshop, SiAdobeindesign, SiAdobexd, SiGoogledrive, SiKaggle } from 'react-icons/si';

export const PORTFOLIO_DATA: Person[] = [
  {
    id: 'olabode',
    name: 'Olabode Ilesanmi',
    title: 'Technical Executive Assistant & Developer',
    imageUrl: 'https://drive.google.com/file/d/1yw8UHB4_a5muzALZJM1LmWdVEG9aHP65/view?usp=drivesdk',
    about: "Technical Executive Assistant with 5+ years of experience in executive support, IT operations, and data analytics. Expert in Microsoft 365, Power BI, Google Workspace, and web development (HTML/CSS, React). Proven track record managing C-level executives, automating workflows, and delivering data-driven insights for remote and hybrid teams.",
    resumeUrl: 'https://docs.google.com/document/d/1jkHKWUpL8lPzub4HRS3QkaV97gxJSou5/export?format=pdf',
    coreSkills: [
      'Executive & Administrative Support',
      'Global Calendar Management',
      'Executive Travel Coordination',
      'High-Volume Communication Triage',
      'Board Meeting Preparation',
      'Confidential Data Management (GDPR)',
      'Virtual Meeting Coordination',
      'Asynchronous Communication (Slack)',
      'Cloud Document Systems',
    ],
    expertise: [
      { name: 'HTML5', icon: FaHtml5 },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'JavaScript', icon: FaJsSquare },
      { name: 'React', icon: FaReact },
      { name: 'API Integration', icon: FiCode },
      { name: 'Power BI', icon: FiBarChart2 },
      { name: 'Tableau', icon: SiTableau },
      { name: 'Excel', icon: FaFileExcel },
      { name: 'Kaggle', icon: SiKaggle },
      { name: 'Data & Analytics', icon: FiDatabase },
      { name: 'Zapier', icon: SiZapier },
      { name: 'Power Automate', icon: FiZap },
    ],
    workExperience: [
      {
        title: 'Administrative Assistant | RCCG, City of Grace',
        description: 'Managed a complex calendar with 10+ weekly appointments, streamlined communication for over 50 stakeholders, and implemented a digital filing system that reduced document retrieval time by 40%. Coordinated daily office operations for a team of 10+, improving workflow efficiency by 25%.',
        tech: ['Calendar Management', 'Stakeholder Communication', 'Digital Filing', 'Office Operations'],
      },
      {
        title: 'Information Technology Manager | Always Petroleum and Energy Services',
        description: 'Onboarded the company onto the DPR online platform, securing 100% of required approvals. Optimized inventory and supply chain for Forte Oil (now Ardova Plc), reducing stock outages by 15%. Monitored a fleet of 10+ trucks with GPS and dashboards, reducing fuel theft by 20%.',
        tech: ['Regulatory Compliance', 'Inventory Management', 'Logistics', 'System Configuration', 'IT Support'],
      },
      {
        title: 'Information Technology Administrator | Motech Nigeria Trading Company',
        description: 'Facilitated logistics for Dangote Cement, coordinating dispatches of 500+ metric tons of cement monthly. Reconciled over ₦30 million in monthly financial settlements. Installed, configured, and maintained IT infrastructure, achieving 98% uptime across workstations.',
        tech: ['Logistics', 'Financial Reconciliation', 'IT Infrastructure', 'System Maintenance'],
      },
      {
        title: 'Digital Champion Officer | United Bank for Africa, PLC',
        description: 'Collaborated with 5+ Customer Relationship Officers to enroll over 1,000 customers onto the bank\'s electronic platforms. Provided technical support for mobile banking, internet banking, and ATM services, reducing digital service-related complaints by 30% in the first quarter.',
        tech: ['Customer Onboarding', 'Technical Support', 'Digital Banking', 'Customer Service'],
      },
    ],
    volunteerActivities: [],
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
      { name: 'GitHub', icon: FiGithub, url: 'https://github.com/declareola' },
      { name: 'LinkedIn', icon: FiLinkedin, url: 'https://www.linkedin.com/in/olabode-johnson-ilesanmi-20193795' },
      { name: 'Mail', icon: FiMail, url: 'mailto:ilesanmiolabode2@gmail.com' },
    ],
    certifications: [
      { name: 'Data Analysis & Visualization', issuer: '3MTT Nigeria', date: 'Dec 2024' },
      { name: 'Data Analytics Essentials', issuer: 'Cisco', date: 'Nov 2024' },
      { name: 'English for IT 1', issuer: 'Cisco', date: 'Nov 2024' },
      { name: 'Introduction to Data Analysis using Microsoft Excel', issuer: 'Coursera', date: 'Feb 2024' },
      { name: 'Data Modeling in Power BI', issuer: 'Microsoft', date: 'Dec 2023' },
      { name: 'Extract, Transform and Load Data in Power BI', issuer: 'Microsoft', date: 'Nov 2023' },
      { name: 'Harnessing the Power of Data with Power BI', issuer: 'Microsoft', date: 'Nov 2023' },
      { name: 'Preparing Data for Analysis with Microsoft Excel', issuer: 'Microsoft', date: 'Nov 2023' },
      { name: 'Entrepreneurship and Employability Training', issuer: 'Whitefield Foundation', date: 'Dec 2020' },
      { name: 'Master in Power BI Desktop and Service', issuer: 'Udemy', date: 'Dec 2020' },
      { name: 'Shopify Guide: The Complete Shopify Store Creation', issuer: 'Udemy', date: 'Nov 2020' },
      { name: 'Technical Support Fundamentals', issuer: 'Coursera / Google', date: 'May 2019' },
      { name: 'Project Management Professional (PMP)', issuer: 'Classic Systems Infotech', date: 'Apr 2016' },
    ],
    education: [
       { 
        degree: 'Bachelor of Science', 
        institution: 'Madonna University, Okija', 
        date: '2014', 
        details: []
      }
    ],
    interests: [],
    theme: {
      color: 'brand-blue',
      shadow: 'shadow-[0_0_30px_5px_rgba(0,191,255,0.4)]',
      border: 'border-brand-blue',
    },
  },
  {
    id: 'aisha',
    name: 'Aishat Kadir',
    title: 'Administrative Assistant',
    imageUrl: 'https://imgur.com/a/jaTWoTv',
    about: "Aishat Kadir is a proactive Virtual Assistant with hands-on remote experience in client coordination, administrative support, and calendar and email management. She is skilled in using Google Workspace, Zoom, Canva, and Microsoft Excel, and has a proven ability to support teams across multiple time zones and streamline workflows. She is dedicated to enhancing business productivity through operational efficiency and seamless virtual support.",
    resumeUrl: '#', // Placeholder URL
    coreSkills: [
      'Virtual Assistance',
      'Remote Administration',
      'Calendar & Email Management',
      'Data Entry & Record Keeping',
      'Digital Report Writing',
      'Remote Collaboration',
    ],
    expertise: [
      { name: 'Canva', icon: SiCanva },
      { name: 'Google Workspace', icon: SiGoogledrive },
      // FIX: Replaced SiMicrosoftexcel with FaFileExcel as it is not an exported member of 'react-icons/si'.
      { name: 'Microsoft Excel', icon: FaFileExcel },
      { name: 'Adobe Photoshop', icon: SiAdobephotoshop },
      { name: 'Adobe InDesign', icon: SiAdobeindesign },
      { name: 'Adobe XD', icon: SiAdobexd },
    ],
     workExperience: [
        {
          title: 'Virtual Facilitator | Champions Coaching Academy',
          description: 'Facilitated virtual sessions that engaged more than 30 participants in interactive discussions. Managed sessions and resources using Zoom and Google Workspace, which ensured 100% session readiness and smooth delivery.',
          tech: ['Zoom', 'Google Workspace', 'Virtual Facilitation'],
        },
        {
          title: 'Financial Services Manager | Deeza Hospital',
          description: 'Managed and processed over 30 financial transactions, including billing and payments, daily with zero discrepancies. Kept digital logs of more than 100 transactions to ensure records were accurate and up-to-date for compliance and financial reporting.',
          tech: ['Financial Management', 'Data Entry', 'Compliance'],
        },
        {
          title: 'Student Intern | Bioresources Development Centre (BIODEC)',
          description: 'Independently managed tasks and completed over 10 research reports using digital tools. Utilized Microsoft Excel for data analysis in biological research. Conducted field-based research in aquaculture, phytochemical studies, and livestock management, demonstrating strong analytical and investigative skills.',
          tech: ['Research', 'Data Analysis', 'Microsoft Excel'],
        },
        {
          title: 'Sales Manager | Salamat Enterprise',
          description: 'Increased sales revenue by 80% within one year, consistently surpassing sales targets and contributing significantly to enterprise profitability. Systematically managed and analyzed sales data to inform strategic sales initiatives, identify trends, and track performance.',
          tech: ['Sales Growth', 'Data Analysis', 'Client Relations'],
        },
    ],
    volunteerActivities: [
      {
        title: 'Program assistant and M&E Officer | HIUC Foundation',
        description: 'Provided program assistance to the Program Lead, coordinating projects for over 200 participants and ensuring smooth operations. Worked with the Monitoring & Evaluation Officer to help with program documentation, data collection, and evaluation processes.',
        tech: ['Program Assistance', 'Monitoring & Evaluation', 'Data Collection'],
      },
      {
        title: 'Outreach Contributor | Society For Girl Care Ambassadors (SOGCAM)',
        description: 'Contributed to an initiative advocating for reusable sanitary pads to promote women\'s health and empowerment.',
        tech: ['Advocacy', 'Women\'s Empowerment'],
      },
      {
        title: 'Climate Change Research & Advocacy Contributor | Al-Huda Health and Youth Development Organization',
        description: 'Took part in climate change research and advocacy, with a focus on its effects on public health in Nigeria. Collaborated remotely in virtual meetings to create advocacy materials and content for social media outreach.',
        tech: ['Climate Research', 'Advocacy', 'Content Creation'],
      },
    ],
    testimonials: [],
    connect: [
      { name: 'Mail', icon: FiMail, url: 'mailto:aishatkadeer@gmail.com' },
    ],
    certifications: [
      { name: 'Executive Virtual Assistant', issuer: 'Jobberman', date: 'Aug 2025' },
      { name: 'Virtual Assistant Essentials', issuer: 'Champions Coaching Academy', date: 'Jul 2025' },
      { name: 'Soft-Skills Training', issuer: 'Jobberman', date: 'Dec 2022' },
      { name: 'Computer Operating', issuer: 'EVA GREEN Skill Acquisitions', date: 'Dec 2020' },
    ],
    education: [
      { 
        degree: 'B.Sc. Applied Biology, First Class Honors', 
        institution: 'Bayero University - West Africa', 
        date: 'Jan 2020 - Mar 2025', 
        details: [
          'Relevant coursework: Data Analysis, Scientific Research Methods, and Environmental Studies.', 
          'Gained hands-on experience in research, data analysis, and scientific investigation.',
        ]
      }
    ],
    interests: [
      'Digital Innovation',
      'Women Empowerment & Sustainable Development',
      'Scientific Innovation & Community Impact',
    ],
    theme: {
      color: 'brand-pink',
      shadow: 'shadow-[0_0_30px_5px_rgba(255,0,127,0.4)]',
      border: 'border-brand-pink',
    },
  },
];
