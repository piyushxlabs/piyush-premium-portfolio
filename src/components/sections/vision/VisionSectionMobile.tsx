"use client";

import { motion } from "framer-motion";
import { Rocket, Target, Sparkles } from "lucide-react";
import { useState } from "react";

const visionPoints = [
  {
    icon: Rocket,
    title: "AI Startups",
    description: "Building AI-driven products that combine technical innovation with social impact",
    color: "from-cyan-400 to-blue-500",
    particleColor: "#22d3ee",
    backContent: "Launching ventures that solve real problems with intelligent automation"
  },
  {
    icon: Target,
    title: "Ethical Innovation",
    description: "Leading teams that innovate responsibly, blending automation, data, and design",
    color: "from-purple-400 to-violet-500",
    particleColor: "#a78bfa",
    backContent: "Building technology that respects privacy, humanity, and sustainable growth"
  },
  {
    icon: Sparkles,
    title: "Human Potential",
    description: "Creating tools that don't just automate work — but amplify human creativity",
    color: "from-pink-400 to-rose-500",
    particleColor: "#ec4899",
    backContent: "Empowering people to achieve more through intelligent augmentation"
  },
];

function VisionPillarCardMobile({ point, index }: { point: typeof visionPoints[0]; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = point.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 + index * 0.15, duration: 0.8, type: "spring", stiffness: 100 }}
      onClick={() => setIsFlipped(!isFlipped)}
      className="group relative h-[420px] cursor-pointer"
      style={{ perspective: "1500px" }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <motion.div
          className="absolute inset-0 rounded-3xl backdrop-blur-2xl border-2 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            background: "rgba(15, 23, 42, 0.75)",
            borderColor: "rgba(255, 255, 255, 0.15)",
            clipPath: "polygon(8% 0%, 100% 0%, 100% 92%, 92% 100%, 0% 100%, 0% 8%)",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5), 0 0 80px rgba(34, 211, 238, 0.1)",
          }}
        >
          <motion.div 
            className={`absolute inset-0 bg-gradient-to-br ${point.color} opacity-0`}
            whileHover={{ opacity: 0.2 }}
            transition={{ duration: 0.4 }}
          />
          
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${point.particleColor}70, transparent)`,
            }}
            animate={{
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: point.particleColor,
                  boxShadow: `0 0 20px ${point.particleColor}, 0 0 40px ${point.particleColor}40`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, 15, 0],
                  opacity: [0.4, 0.8, 0.4],
                  scale: [1, 1.4, 1],
                }}
                transition={{
                  duration: 8,
                  delay: i * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          
          <motion.div 
            className="absolute inset-0 rounded-3xl opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              boxShadow: `inset 0 0 60px ${point.particleColor}50, 0 0 40px ${point.particleColor}40`,
            }}
          />
          
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: [
                `linear-gradient(to bottom, transparent 0%, ${point.particleColor}20 50%, transparent 100%)`,
                `linear-gradient(to bottom, transparent 0%, ${point.particleColor}20 50%, transparent 100%)`,
              ],
              y: ["-100%", "200%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
              delay: index * 1.5,
            }}
          />
          
          <div className="relative z-10 p-10 h-full flex flex-col items-center justify-center text-center">
            <motion.div
              className={`w-24 h-24 rounded-full bg-gradient-to-br ${point.color} p-6 mb-6 relative`}
              animate={{
                rotate: 360,
                scale: [1, 1.08, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
              }}
              style={{
                boxShadow: `0 0 50px ${point.particleColor}80, 0 0 100px ${point.particleColor}50, 0 0 150px ${point.particleColor}30`,
              }}
            >
              <Icon className="w-full h-full text-slate-900" strokeWidth={2.5} />
              
              <motion.div
                className="absolute inset-0 rounded-full border-2"
                style={{ borderColor: point.particleColor }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 0, 0.7],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
              
              <motion.div
                className="absolute inset-0 rounded-full border-2"
                style={{ borderColor: point.particleColor }}
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.4,
                }}
              />
              
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    `inset 0 0 20px ${point.particleColor}40`,
                    `inset 0 0 40px ${point.particleColor}80`,
                    `inset 0 0 20px ${point.particleColor}40`,
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-5 text-slate-100">
              {point.title}
            </h3>
            
            <p className="text-slate-300 leading-relaxed text-base">
              {point.description}
            </p>

            <motion.div
              className="mt-8 text-xs text-slate-500 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: point.particleColor }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              Tap to reveal vision
            </motion.div>
          </div>
        </motion.div>

        {/* Back */}
        <motion.div
          className="absolute inset-0 rounded-3xl backdrop-blur-2xl border-2 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            background: "rgba(15, 23, 42, 0.9)",
            borderColor: "rgba(255, 255, 255, 0.2)",
            rotateY: 180,
            clipPath: "polygon(8% 0%, 100% 0%, 100% 92%, 92% 100%, 0% 100%, 0% 8%)",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${point.color} opacity-30`} />
          
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: point.particleColor,
                  boxShadow: `0 0 20px ${point.particleColor}`,
                }}
                animate={{
                  y: [0, -25, 0],
                  opacity: [0.4, 0.7, 0.4],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 6,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          
          <div className="relative z-10 p-10 h-full flex flex-col items-center justify-center text-center">
            <motion.div 
              className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center mb-8"
              animate={{
                boxShadow: [
                  `0 0 30px ${point.particleColor}50`,
                  `0 0 60px ${point.particleColor}70`,
                  `0 0 30px ${point.particleColor}50`,
                ],
                rotate: [0, 360],
              }}
              transition={{
                boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              }}
            >
              <Icon className="w-12 h-12 text-cyan-400" />
            </motion.div>
            
            <h4 className="text-3xl font-heading font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              The Vision
            </h4>
            
            <p className="text-slate-200 leading-relaxed text-lg font-medium">
              {point.backContent}
            </p>

            <div className="mt-8 flex gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ background: point.particleColor }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function QuoteCardMobile() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 1, type: "spring", stiffness: 100 }}
      className="max-w-4xl mx-auto mb-32"
    >
      <div
        className="relative rounded-[2rem] backdrop-blur-3xl border-2 overflow-hidden p-10 md:p-16"
        style={{
          background: "rgba(15, 23, 42, 0.75)",
          borderColor: "rgba(34, 211, 238, 0.3)",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4), inset 0 0 80px rgba(34, 211, 238, 0.15)",
        }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/10"
          animate={{
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <div className="absolute inset-0 opacity-25">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circuit-mobile" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <circle cx="25" cy="25" r="2.5" fill="#22d3ee" opacity="0.8">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="25" cy="25" r="1" fill="#a78bfa" opacity="0.7" />
                <line x1="25" y1="0" x2="25" y2="50" stroke="#22d3ee" strokeWidth="1" opacity="0.6" />
                <line x1="0" y1="25" x2="50" y2="25" stroke="#22d3ee" strokeWidth="1" opacity="0.6" />
                <circle cx="0" cy="0" r="1" fill="#ec4899" opacity="0.5" />
                <circle cx="50" cy="0" r="1" fill="#ec4899" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit-mobile)" />
          </svg>
        </div>
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: i % 3 === 0 ? "#22d3ee" : i % 3 === 1 ? "#a78bfa" : "#ec4899",
                boxShadow: `0 0 20px ${i % 3 === 0 ? "#22d3ee" : i % 3 === 1 ? "#a78bfa" : "#ec4899"}`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 8,
                delay: i * 0.25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        <motion.div
          className="absolute inset-0 rounded-[2rem]"
          animate={{
            boxShadow: [
              "inset 0 0 40px rgba(34, 211, 238, 0.1)",
              "inset 0 0 60px rgba(34, 211, 238, 0.2)",
              "inset 0 0 40px rgba(34, 211, 238, 0.1)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <blockquote className="relative z-10 text-xl md:text-2xl lg:text-3xl font-heading font-medium leading-relaxed text-center">
          {[
            "\"I want to be known as the founder who makes AI human,",
            "— blending logic with empathy,",
            "and intelligence with purpose.\""
          ].map((phrase, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.2, duration: 0.8 }}
              className="block mb-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              {phrase}
            </motion.span>
          ))}
        </blockquote>

        <div className="flex justify-center gap-1 mt-8">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-gradient-to-t from-cyan-400 to-purple-400 rounded-full"
              animate={{
                height: [16, 28, 16],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function PhilosophySectionMobile() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 1 }}
      className="text-center relative py-20"
    >
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border-4 border-cyan-500/30"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: 360,
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          boxShadow: "0 0 60px rgba(34, 211, 238, 0.3)",
        }}
      />
      
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border-4 border-purple-500/30"
        animate={{
          scale: [1.15, 1, 1.15],
          opacity: [0.4, 0.6, 0.4],
          rotate: -360,
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          boxShadow: "0 0 60px rgba(167, 139, 250, 0.3)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.p 
          className="text-xl md:text-2xl text-slate-300 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {[
            { text: "In the future, I see myself as a founder who bridges human creativity ", delay: 0 },
            { text: "with artificial intelligence, shaping tools that not only automate work — but ", delay: 0.15 },
          ].map((part, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: part.delay, duration: 0.8 }}
              className="inline"
            >
              {part.text}
            </motion.span>
          ))}
          
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 1, type: "spring" }}
            className="inline-block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-bold relative px-2"
          >
            amplify human potential
            <motion.span
              className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-xl blur-2xl pointer-events-none"
              animate={{
                opacity: [0.4, 0.7, 0.4],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.span>
          
          <span>.</span>
        </motion.p>
      </div>
    </motion.div>
  );
}

export function VisionSectionMobile() {
  return (
    <section 
      className="relative min-h-screen py-24 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.03), transparent)",
      }}
    >
      {/* Enhanced Background Grid */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 211, 238, 0.15) 2px, transparent 2px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.15) 2px, transparent 2px)
            `,
            backgroundSize: "40px 40px",
            boxShadow: "0 0 100px rgba(34, 211, 238, 0.1)",
          }}
        />
      </div>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? "#22d3ee" : i % 3 === 1 ? "#a78bfa" : "#ec4899",
              boxShadow: `0 0 20px ${i % 3 === 0 ? "#22d3ee" : i % 3 === 1 ? "#a78bfa" : "#ec4899"}`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 10,
              delay: i * 0.12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Enhanced Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-0 w-[250px] h-[250px] bg-cyan-500/15 rounded-full blur-[80px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-0 w-[250px] h-[250px] bg-purple-500/15 rounded-full blur-[80px]"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px]"
          animate={{
            scale: [1.2, 1.5, 1.2],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-6xl">
        {/* Badge + Title */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-8 py-3 rounded-full backdrop-blur-2xl border-2 text-xs font-medium mb-8 relative overflow-hidden"
            style={{
              background: "rgba(15, 23, 42, 0.75)",
              borderColor: "rgba(34, 211, 238, 0.5)",
              boxShadow: "0 0 30px rgba(34, 211, 238, 0.2), 0 0 60px rgba(167, 139, 250, 0.1)",
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
              style={{
                border: "2px solid #22d3ee",
                boxShadow: "0 0 20px #22d3ee",
              }}
            />
            <span className="relative z-10 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-bold tracking-wider">
              Future Vision
            </span>
          </motion.span>

          <motion.h2 
            className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="text-slate-100">Building the </span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Future
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            My long-term vision is to build AI startups that combine technical
            innovation with social impact — creating intelligent products that
            empower learners, creators, and organizations
          </motion.p>
        </div>

        {/* Quote Card */}
        <QuoteCardMobile />

        {/* Vision Pillars */}
        <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto mb-20">
          {visionPoints.map((point, index) => (
            <VisionPillarCardMobile key={point.title} point={point} index={index} />
          ))}
        </div>

        {/* Philosophy */}
        <PhilosophySectionMobile />
      </div>
    </section>
  );
}
