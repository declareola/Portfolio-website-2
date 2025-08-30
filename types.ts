// FIX: Import IconType from 'react-icons/lib' to resolve module export error.
import { IconType } from 'react-icons/lib';

export interface Skill {
  name: string;
  icon: IconType;
}

export interface SocialLink {
  name: string;
  icon: IconType;
  url: string;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface Education {
  degree: string;
  institution: string;
  date: string;
  details: string[];
}

export interface Person {
  id: string;
  name: string;
  title: string;
  imageUrl: string;
  about: string;
  coreSkills: string[];
  expertise: Skill[];
  workExperience: Project[];
  volunteerActivities: Project[];
  testimonials: Testimonial[];
  connect: SocialLink[];
  resumeUrl?: string;
  certifications: Certification[];
  education: Education[];
  interests: string[];
  theme: {
    color: string;
    shadow: string;
    border: string;
  };
}
