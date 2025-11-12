// SocialLinks — Reusable social media links component
"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram, Mail } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/piyushxlabs", label: "GitHub", color: "hover:text-gray-400" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/piyush-jaguri-a9169338b/", label: "LinkedIn", color: "hover:text-blue-500" },
  { icon: Twitter, href: "https://x.com/piyushxlabs", label: "Twitter", color: "hover:text-sky-400" },
  { icon: Instagram, href: "https://www.instagram.com/lost.in.piyush?igsh=MXN4NWY5YW80YTc1Mw==", label: "Instagram", color: "hover:text-pink-500" },
  { icon: Mail, href: "mailto:piyushjaguri13@gmail.com", label: "Email", color: "hover:text-accent-cyan" },
];

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
  showLabels?: boolean;
}

export function SocialLinks({ className = "", iconSize = 20, showLabels = false }: SocialLinksProps) {
  return (
    <div className={`flex gap-4 ${className}`}>
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2 rounded-lg bg-overlay-light hover:bg-accent-cyan/20 transition-all ${social.color}`}
          aria-label={social.label}
        >
          <social.icon size={iconSize} />
          {showLabels && <span className="ml-2 text-sm">{social.label}</span>}
        </motion.a>
      ))}
    </div>
  );
}
