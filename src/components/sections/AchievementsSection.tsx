'use client';

import { motion } from 'framer-motion';
import { achievements, Achievement } from '@/data/achievements';

export function AchievementsSection() {
  const allAchievements: Achievement[] = achievements || [];

  return (
    <div>
      <div className="mb-8">
        <p className="section-number uppercase mb-1">
          04 // ACHIEVEMENTS &amp; COMPETITIONS
        </p>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--fg)]">
          Competitive Track Record
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {allAchievements.map((achievement, idx) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            className="group p-5 border border-[var(--border)] bg-[#0c0c0e]/80 hover:bg-[#121215] hover:border-[var(--border-hover)] transition-all duration-200 hover:-translate-y-0.5 rounded-sm flex flex-col justify-between"
          >
            <div className="flex items-center justify-between font-mono text-[11px] text-zinc-500 mb-4 border-b border-white/5 pb-2">
              <span>{achievement.year}</span>
              <span className="text-[10px] text-zinc-600 uppercase tracking-widest">RECORD</span>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1.5 leading-tight tracking-tight">
                {achievement.title}
              </h3>
              <p className="text-xs md:text-sm font-mono text-zinc-400 mb-2">
                {achievement.event}
              </p>
              <p className="text-xs text-zinc-500 leading-relaxed font-light">
                {achievement.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
