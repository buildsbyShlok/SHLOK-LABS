'use client';

import { motion } from 'framer-motion';

const interests = [
  "Photography",
  "Videography",
  "Creative Technology",
  "Visual Storytelling"
];

export function BeyondSection() {
  return (
    <section id="beyond-code" className="py-24 border-b border-white/10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-16">
          <p className="text-sm font-mono tracking-widest text-zinc-500 uppercase">
            07 — BEYOND CODE
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          <p className="text-zinc-300 font-mono text-lg">
            When I'm not writing code or building robots...
          </p>
          
          <ul className="flex flex-col gap-2">
            {interests.map((interest, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                className="font-mono text-zinc-400 text-sm flex items-center gap-4"
              >
                <span className="text-zinc-600">-</span>
                {interest}
              </motion.li>
            ))}
          </ul>

          <p className="text-xs font-mono text-zinc-600 mt-8">
            * Creative experiments coming soon.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
