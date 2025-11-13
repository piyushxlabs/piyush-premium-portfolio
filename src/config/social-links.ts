// Centralized social links configuration
import { Github, Linkedin, Twitter, Instagram, Mail, LucideIcon } from 'lucide-react';

export interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
  username?: string;
}

export const socialLinks: SocialLink[] = [
  { 
    icon: Github, 
    href: "https://github.com/piyushxlabs", 
    label: "GitHub",
    username: "@piyushxlabs"
  },
  { 
    icon: Linkedin, 
    href: "https://www.linkedin.com/in/piyush-jaguri-a9169338b/", 
    label: "LinkedIn",
    username: "Piyush Jaguri"
  },
  { 
    icon: Twitter, 
    href: "https://x.com/piyushxlabs", 
    label: "Twitter",
    username: "@piyushxlabs"
  },
  { 
    icon: Instagram, 
    href: "https://www.instagram.com/lost.in.piyush?igsh=MXN4NWY5YW80YTc1Mw==", 
    label: "Instagram",
    username: "@lost.in.piyush"
  },
  { 
    icon: Mail, 
    href: "mailto:piyushjaguri13@gmail.com", 
    label: "Email",
    username: "piyushjaguri13@gmail.com"
  },
];

export const email = "piyushjaguri13@gmail.com";
export const githubUrl = "https://github.com/piyushxlabs";
export const linkedinUrl = "https://www.linkedin.com/in/piyush-jaguri-a9169338b/";
export const twitterUrl = "https://x.com/piyushxlabs";
export const instagramUrl = "https://www.instagram.com/lost.in.piyush?igsh=MXN4NWY5YW80YTc1Mw==";
