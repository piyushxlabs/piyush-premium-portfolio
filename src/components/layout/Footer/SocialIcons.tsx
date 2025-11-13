// SocialIcons — Animated social media icons for footer
"use client";

import { motion } from "framer-motion";
import { socialLinks } from "@/config/social-links";

export function SocialIcons() {
  return (
    <div className="flex gap-4">
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
          className="p-2 rounded-lg bg-overlay-light hover:bg-accent-cyan/20 hover:text-accent-cyan transition-all"
          aria-label={social.label}
        >
          <social.icon size={20} />
        </motion.a>
      ))}
    </div>
  );
}
