// Footer — Multi-column footer with gradient divider
"use client";

import Link from "next/link";
import { socialLinks, githubUrl, linkedinUrl } from "@/config/social-links";

const footerLinks = {
  work: [
    { label: "All Projects", href: "/work" },
    { label: "AI & ML", href: "/work?category=ai" },
    { label: "Data Science", href: "/work?category=data" },
    { label: "Automation", href: "/work?category=automation" },
  ],
  about: [
    { label: "My Story", href: "/about" },
    { label: "Vision", href: "/vision" },
    { label: "Journey", href: "/journey" },
    { label: "Lab", href: "/lab" },
  ],
  connect: [
    { label: "Contact", href: "/connect" },
    { label: "Thoughts", href: "/thoughts" },
    { label: "GitHub", href: githubUrl },
    { label: "LinkedIn", href: linkedinUrl },
  ],
};

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-overlay-medium bg-background-surface">
      {/* Gradient Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan to-transparent" />

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-gradient-heading mb-4">
              Piyush
            </h3>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Building intelligence with empathy — one idea at a time.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-overlay-light hover:bg-accent-cyan/20 hover:text-accent-cyan transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Work</h4>
            <ul className="space-y-2">
              {footerLinks.work.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted text-sm hover:text-accent-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">About</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted text-sm hover:text-accent-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              {footerLinks.connect.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted text-sm hover:text-accent-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-overlay-medium flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted text-sm">
            © {new Date().getFullYear()} Piyush. All rights reserved.
          </p>
          <p className="text-muted text-sm">
            Designed with intelligence & empathy
          </p>
        </div>
      </div>
    </footer>
  );
}
