'use client';

import { motion } from 'framer-motion';
import { skillGroups, SkillGroup } from '@/data/skills';

export function SkillsSection() {
  return (
    <div>
      <div className="mb-8">
        <p className="section-number uppercase mb-1">
          05 // TECHNICAL SKILLS &amp; HARDWARE
        </p>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--fg)]">
          Engineering Capabilities
        </h2>
      </div>

      <div className="flex flex-col border border-[var(--border)] rounded-sm bg-[#0c0c0e]/80 overflow-hidden divide-y divide-[var(--border)]">
        {(skillGroups as SkillGroup[] || []).map((group, index: number) => (
          <motion.div
            key={group.id || index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start"
          >
            <div className="md:col-span-1 flex items-center md:items-start font-mono text-xs text-blue-400 font-bold">
              {group.number || String(index + 1).padStart(2, '0')}
            </div>
            
            <div className="md:col-span-3 flex items-center md:items-start">
              <h3 className="text-xs md:text-sm font-mono tracking-wider uppercase text-zinc-300 font-semibold">
                {group.title}
              </h3>
            </div>

            <div className="md:col-span-8 flex flex-wrap gap-1.5 w-full">
              {group.skills?.map((skill: string) => (
                <span
                  key={skill}
                  className="grow text-center px-3 py-1 rounded-sm border border-[var(--border)] bg-white/[0.01] text-zinc-400 font-mono text-xs hover:border-[var(--border-hover)] hover:text-white hover:bg-white/[0.04] transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
