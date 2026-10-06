'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

export function AboutSection() {
  const whatIBuild = [
    'Autonomous robotics & real-time perception systems',
    'Embedded systems & microcontroller firmware (ESP32, STM32, Arduino)',
    'Computer vision & edge AI / machine learning',
    'IoT systems, telemetry & connected hardware',
    'Robotic control, sensor integration & intelligent automation',
  ];

  return (
    <div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 }
          }
        }}
      >
        <motion.div variants={fadeInUp} className="mb-4">
          <p className="section-number uppercase">
             ABOUT
          </p>
        </motion.div>

        <motion.div 
          variants={fadeInUp}
          className="border border-[var(--border)] rounded-sm p-6 md:p-8 bg-[#0c0c0e]/80"
        >
          <p className="text-lg md:text-xl text-zinc-100 mb-6 leading-relaxed font-light">
            I'm Shlok Rajput — an engineer focused on building intelligent physical systems across robotics, embedded electronics, AI, and IoT. I work at the intersection of hardware and software, turning sensors, microcontrollers, and algorithms into systems that can perceive, decide, and act.
          </p>

          <div className="space-y-3">
            <h3 className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-3">
              Core Engineering Focus
            </h3>
            <ul className="space-y-2 font-mono text-zinc-300 text-xs md:text-sm">
              {whatIBuild.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-blue-400 font-bold shrink-0">&rarr;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <p className="font-mono text-[11px] text-zinc-500">
              India &middot; Robotics & Embedded Systems &middot; Open to Opportunities
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
