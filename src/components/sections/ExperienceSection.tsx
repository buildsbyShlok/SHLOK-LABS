'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { experiences, Experience } from '@/data/experience';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { soundManager } from '@/lib/sound';

export function ExperienceSection() {
  const [expandedId, setExpandedId] = useState<string | null>(
    experiences && experiences.length > 0 ? experiences[0].id : null
  );

  const toggleExpand = (id: string) => {
    soundManager.play('click');
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div>
      <div className="mb-8">
        <p className="section-number uppercase mb-1">
           EXPERIENCE &amp; TRACK RECORD
        </p>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--fg)]">
          Engineering Experience & Initiatives
        </h2>
      </div>

      <div className="flex flex-col border border-[var(--border)] rounded-sm bg-[#0c0c0e]/80 overflow-hidden">
        {(experiences || []).map((exp) => {
          const isExpanded = expandedId === exp.id;

          return (
            <div
              key={exp.id}
              className="border-b border-[var(--border)] last:border-b-0"
            >
              <button
                onClick={() => toggleExpand(exp.id)}
                className="w-full py-5 px-5 md:px-6 flex flex-col md:flex-row md:items-center justify-between text-left transition-colors duration-200 hover:bg-white/[0.02]"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-1.5 md:gap-4 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base md:text-lg font-bold text-white">
                      {exp.company}
                    </h3>
                    {exp.link && (
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-white transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                  <span className="text-xs md:text-sm font-mono text-zinc-400">
                    // {exp.role}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-mono bg-white/[0.03] text-zinc-400 border border-white/5 w-fit">
                    {exp.location}
                  </span>
                </div>

                <div className="flex items-center justify-between md:justify-end mt-2 md:mt-0 gap-4 w-full md:w-auto">
                  <span className="font-mono text-xs text-zinc-500">
                    {exp.duration}
                  </span>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-zinc-500"
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </div>
              </button>

              <div
                className="grid transition-all duration-300 ease-out overflow-hidden px-5 md:px-6"
                style={{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }}
              >
                <div className="min-h-0">
                  <div className="pb-6 pt-1">
                    <p className="text-xs md:text-sm text-zinc-300 mb-4 leading-relaxed font-light">
                      {exp.description}
                    </p>
                    
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className="space-y-1.5 mb-5 font-mono text-xs text-zinc-400">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-blue-400 font-bold">&rarr;</span>
                            <span className="leading-relaxed">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--border)]">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 text-[11px] font-mono text-zinc-400 bg-white/[0.02] border border-[var(--border)] rounded-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
