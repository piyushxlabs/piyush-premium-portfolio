// ContactSection — Contact CTA with ambient background
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, MessageSquare, Calendar } from "lucide-react";
import { FadeIn } from "@/components/animations/core";
import { GlowButton } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/Card";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Me",
    description: "hello@piyush.dev",
    href: "mailto:hello@piyush.dev",
  },
  {
    icon: MessageSquare,
    title: "Let's Chat",
    description: "Quick questions or collaboration ideas",
    href: "/connect",
  },
  {
    icon: Calendar,
    title: "Schedule a Call",
    description: "Book a time that works for you",
    href: "/connect",
  },
];

export function ContactSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-accent-lavender/10 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-glow opacity-40 blur-3xl" />

      <div className="container relative z-10 mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 rounded-full bg-glass border border-overlay-medium text-sm font-medium mb-4"
            >
              Let's Connect
            </motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Build Something <span className="text-gradient-heading">Together</span>
            </h2>
            <p className="text-lg text-muted max-w-3xl mx-auto leading-relaxed mb-12">
              I'm always open to collaborating on meaningful projects, discussing AI
              innovation, or connecting with fellow builders and visionaries
            </p>
          </div>
        </FadeIn>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link href={method.href}>
                <GlassCard className="p-6 text-center h-full hover:scale-105 hover:border-accent-cyan transition-all group">
                  <div className="inline-flex p-3 rounded-xl bg-accent-cyan/10 text-accent-cyan mb-4 group-hover:bg-accent-cyan group-hover:text-background transition-all">
                    <method.icon size={24} />
                  </div>
                  <h3 className="font-heading font-semibold mb-2">{method.title}</h3>
                  <p className="text-sm text-muted">{method.description}</p>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center"
        >
          <Link href="/connect">
            <GlowButton>
              <Mail size={20} />
              Get in Touch
            </GlowButton>
          </Link>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-xl text-muted max-w-3xl mx-auto">
            "Let's build intelligence that empowers people —{" "}
            <span className="text-accent-cyan font-semibold">one idea at a time</span>."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
