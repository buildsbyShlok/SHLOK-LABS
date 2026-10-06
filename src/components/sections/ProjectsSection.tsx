'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { projects, Project } from '@/data/projects';
import { Box, ArrowUpRight } from 'lucide-react';
import { soundManager } from '@/lib/sound';

const getEditorialTag = (project: Project): string => {
  if (project.id === 'delivery-robot' || project.slug === 'autonomous-indoor-delivery-robot') return 'ROBOTICS';
  if (project.id === 'third-eye' || project.slug === 'third-eye-for-blind') return 'AI';
  if (project.id === 'ecobin') return 'IoT + AI';
  if (project.id === 'smartfarm') return 'IoT · EMBEDDED';
  if (project.id === 'line-follower' || project.slug === 'precision-line-follower') return 'EMBEDDED';
  if (project.id === 'avara') return 'SOFTWARE';
  if (project.id === 'isa-jssaten') return 'SOFTWARE · WEB';
  return project.category.toUpperCase();
};

export function ProjectsSection() {
  const allProjects: Project[] = projects || [];

  return (
    <div>
      {/* Section Header (Curated, No Filters) */}
      <div className="mb-8 md:mb-10">
        <p className="section-number uppercase mb-1.5">
          03 // SELECTED WORK
        </p>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--fg)]">
          Engineering &amp; Hardware Projects
        </h2>
      </div>

      {/* Curated Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allProjects.map((project, idx) => {
          const projectUrl = `/projects/${project.slug || project.id}`;
          const isFirstFeatured = project.featured && idx === 0;
          const editorialTag = getEditorialTag(project);

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className={isFirstFeatured ? 'md:col-span-2' : ''}
            >
              <Link
                href={projectUrl}
                onClick={() => soundManager.play('open')}
                className={`group block h-full p-6 sm:p-8 rounded-sm border border-[var(--border)] hover:border-blue-500/40 bg-[#09090b]/90 hover:bg-[#0c0c10] transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                  isFirstFeatured ? 'min-h-[220px] md:min-h-[250px]' : 'min-h-[220px]'
                }`}
              >
                {/* Subtle Ambient Hover Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/[0.03] to-transparent pointer-events-none group-hover:from-blue-500/[0.08] transition-all duration-500" />

                {/* Card Top Content */}
                <div>
                  {/* Single Minimal Editorial Tag Line: 01 // ROBOTICS */}
                  <div className="flex items-center gap-2 mb-3.5">
                    <span className="font-mono text-xs font-bold text-zinc-500 group-hover:text-zinc-400 transition-colors tracking-wider">
                      {project.projectNumber}
                    </span>
                    <span className="text-zinc-600 font-mono text-xs">//</span>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-blue-400/90 group-hover:text-blue-400 transition-colors">
                      {editorialTag}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className={`font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors font-sans mb-1.5 ${
                    isFirstFeatured ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
                  }`}>
                    {project.title}
                  </h3>

                  {/* Short Subtitle */}
                  <p className="text-xs sm:text-sm font-mono text-zinc-400 font-light mb-4">
                    {project.subtitle}
                  </p>

                  {/* Short One-Line Teaser Description */}
                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-300 font-light line-clamp-2 mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Single Primary Action: VIEW CASE STUDY */}
                <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
                  <span className="font-mono text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
                    {project.year}
                  </span>

                  <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                    {project.hasInteractive3D ? (
                      <>
                        <Box size={14} className="animate-pulse" />
                        <span>EXPLORE 3D CASE STUDY &rarr;</span>
                      </>
                    ) : (
                      <>
                        <span>VIEW CASE STUDY</span>
                        <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
