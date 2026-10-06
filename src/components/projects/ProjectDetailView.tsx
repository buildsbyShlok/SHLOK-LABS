'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project, ProjectMedia, getAdjacentProjects } from '@/data/projects';
import { ProjectHeader } from '@/components/layout/ProjectHeader';
import { ProjectHeroVisual } from '@/components/projects/ProjectHeroVisual';
import { ImageLightbox } from '@/components/projects/ImageLightbox';
import { GitHubIcon } from '@/components/ui/Icons';
import { soundManager } from '@/lib/sound';
import { 
  ArrowLeft, 
  ArrowRight, 
  ExternalLink, 
  Cpu, 
  Code2, 
  Layers, 
  Award, 
  Maximize2,
  FileText
} from 'lucide-react';

interface ProjectDetailViewProps {
  project: Project;
}

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const [selectedMedia, setSelectedMedia] = useState<ProjectMedia | null>(null);
  const { prev, next } = getAdjacentProjects(project.slug || project.id);

  const getStatusBadge = (status: string) => {
    if (status === 'live') return { color: 'bg-emerald-400', label: 'Live' };
    if (status === 'building') return { color: 'bg-amber-400', label: 'In Development' };
    return { color: 'bg-zinc-400', label: 'Completed' };
  };

  const statusInfo = getStatusBadge(project.status);

  return (
    <div className="min-h-screen bg-[#070708] text-[var(--fg)] selection:bg-blue-500/30">
      <ProjectHeader />
      <ImageLightbox media={selectedMedia} onClose={() => setSelectedMedia(null)} />

      <main className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 sm:pt-28 pb-20">
        {/* ========================================================= */}
        {/* 1. COMPACT TOP METADATA & BREADCRUMB                      */}
        {/* ========================================================= */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3">
            <Link
              href="/#projects"
              onClick={() => soundManager.play('nav')}
              className="hover:text-zinc-300 transition-colors flex items-center gap-1"
            >
              <ArrowLeft size={11} />
              <span>ALL WORK</span>
            </Link>
            <span>/</span>
            <span>PROJECT {project.projectNumber}</span>
            <span>/</span>
            <span className="text-zinc-400">{project.category}</span>
          </div>

          <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
            PROJECT {project.projectNumber} / {project.domain} / {project.year}
          </div>

          {/* Large Project Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-2.5 font-sans">
            {project.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg font-mono text-zinc-400 font-light mb-4">
            {project.subtitle}
          </p>

          {/* Short Description */}
          <p className="text-sm sm:text-base leading-relaxed text-zinc-300 font-light max-w-3xl mb-6">
            {project.description}
          </p>

          {/* Metadata Links Row with Hairline */}
          <div className="pt-3 pb-4 border-y border-[var(--border)] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex flex-wrap items-center gap-4 text-zinc-400">
              {project.links && project.links.length > 0 ? (
                project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1.5 uppercase text-blue-400 font-semibold"
                  >
                    {link.type === 'github' && <GitHubIcon className="w-3.5 h-3.5" />}
                    {link.type === 'live' && <ExternalLink size={13} />}
                    {link.type === 'docs' && <FileText size={13} />}
                    <span>{link.label} &rarr;</span>
                  </a>
                ))
              ) : (
                <span className="text-zinc-500 uppercase tracking-wider">
                  SOURCE REPOSITORY &amp; DEPLOYMENT AVAILABLE ON REQUEST
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider text-zinc-500">STATUS:</span>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.02]">
                <div className={`w-1.5 h-1.5 rounded-full ${statusInfo.color}`} />
                <span className="text-[11px] font-mono text-zinc-300">{statusInfo.label}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. LARGE HERO VISUAL (3D ROBOT OR CINEMATIC ARCHITECTURE) */}
        {/* ========================================================= */}
        <div className="mb-14">
          <ProjectHeroVisual project={project} />
        </div>

        {/* ========================================================= */}
        {/* 3. TWO-COLUMN EDITORIAL SECTION (MAIN CONTENT + SIDEBAR)  */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* ------------------------------------------------------- */}
          {/* LEFT: MAIN EDITORIAL CONTENT (8 COLUMNS)                */}
          {/* ------------------------------------------------------- */}
          <div className="lg:col-span-8 space-y-10">
            {/* 01 // OVERVIEW */}
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-2 font-bold">
                01 // OVERVIEW
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-zinc-200 font-light">
                {project.overview}
              </p>
            </div>

            {/* 02 // THE PROBLEM */}
            {project.problem && (
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-2 font-bold">
                  02 // THE PROBLEM
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-zinc-300 font-light">
                  {project.problem}
                </p>
              </div>
            )}

            {/* 03 // THE PROPOSED SOLUTION */}
            {project.solution && (
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-2 font-bold">
                  03 // THE PROPOSED SOLUTION
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-zinc-300 font-light">
                  {project.solution}
                </p>
              </div>
            )}

            {/* 04 // SYSTEM / SOFTWARE ARCHITECTURE */}
            {project.architecture && (
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-2 font-bold">
                  04 // SYSTEM ARCHITECTURE
                </div>
                <div className="p-4 sm:p-5 rounded-sm border border-[var(--border)] bg-[#0c0c0e]/90 text-xs sm:text-sm font-mono text-zinc-300 leading-relaxed">
                  {project.architecture}
                </div>
              </div>
            )}

            {/* PIPELINE BREAKDOWN (If present) */}
            {project.pipeline && project.pipeline.length > 0 && (
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-3 font-bold">
                  EXECUTION PIPELINE &amp; SIGNAL FLOW
                </div>
                <div className="space-y-2">
                  {project.pipeline.map((step, idx) => (
                    <div
                      key={step.name}
                      className="p-3 rounded-sm border border-[var(--border)] bg-[#0b0b0d] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs text-blue-400 font-bold">
                          0{idx + 1}
                        </span>
                        <span className="text-xs sm:text-sm font-mono font-semibold text-white">
                          {step.name}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-zinc-400">
                        {step.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 05 // KEY CAPABILITIES & IMPLEMENTATION (Compact Feature Blocks) */}
            {project.features && project.features.length > 0 && (
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-3 font-bold">
                  05 // KEY CAPABILITIES &amp; IMPLEMENTATION
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feat, idx) => {
                    const isObj = typeof feat !== 'string';
                    const title = isObj ? feat.title : `Feature 0${idx + 1}`;
                    const desc = isObj ? feat.desc : feat;

                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-sm border border-[var(--border)] bg-[#0a0a0c] hover:border-blue-500/30 transition-colors flex flex-col justify-between"
                      >
                        <div className="flex items-start gap-2 mb-1.5">
                          <span className="text-emerald-400 text-xs mt-0.5">▪</span>
                          <h4 className="text-xs sm:text-sm font-mono font-bold text-white tracking-tight">
                            {title}
                          </h4>
                        </div>
                        <p className="text-xs text-zinc-400 font-light leading-relaxed pl-3.5">
                          {desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 06 // IMPLEMENTATION & CHALLENGES */}
            {(project.implementation || project.challenges) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {project.implementation && (
                  <div className="p-4 rounded-sm border border-[var(--border)] bg-[#09090b]">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold mb-2">
                      MY ROLE &amp; CONTRIBUTIONS
                    </div>
                    <p className="text-xs leading-relaxed text-zinc-300 font-light">
                      {project.implementation}
                    </p>
                  </div>
                )}
                {project.challenges && (
                  <div className="p-4 rounded-sm border border-[var(--border)] bg-[#09090b]">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold mb-2">
                      ENGINEERING CHALLENGES
                    </div>
                    <p className="text-xs leading-relaxed text-zinc-300 font-light">
                      {project.challenges}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 07 // MEASURABLE OUTCOME */}
            {project.outcome && (
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2 font-bold">
                  07 // MEASURABLE OUTCOME
                </div>
                <div className="p-4 rounded-sm border border-emerald-500/20 bg-emerald-500/[0.02] text-xs sm:text-sm leading-relaxed text-zinc-200 font-light">
                  {project.outcome}
                </div>
              </div>
            )}

            {/* 08 // SCHEMATICS & GALLERY */}
            {project.gallery && project.gallery.length > 0 && (
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-3 font-bold">
                  08 // SCHEMATICS &amp; TECHNICAL GALLERY
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.gallery.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        soundManager.play('open');
                        setSelectedMedia(item);
                      }}
                      className="group cursor-pointer rounded-sm border border-[var(--border)] hover:border-blue-500/40 bg-[#09090b] p-3.5 sm:p-4 transition-all"
                    >
                      <div className="aspect-[16/10] rounded-sm border border-white/5 bg-[#050507] mb-3 flex items-center justify-center relative overflow-hidden group-hover:border-blue-500/30 transition-all">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-contain p-2 select-none transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center p-4 text-center">
                            <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:12px_12px] opacity-10" />
                            <Maximize2 size={16} className="text-zinc-500 group-hover:text-blue-400 transition-colors mb-1.5" />
                            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                              {item.title}
                            </span>
                          </div>
                        )}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-sm bg-black/70 text-zinc-300">
                          <Maximize2 size={12} />
                        </div>
                      </div>
                      <div className="text-xs font-mono text-zinc-200 font-semibold mb-1">
                        <span className="text-blue-400 mr-1.5">{item.figNum || `FIG. 0${idx + 1}`}</span>
                        <span>{item.title}</span>
                      </div>
                      <p className="text-[11px] font-mono text-zinc-400 line-clamp-2 leading-relaxed">
                        {item.caption}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ------------------------------------------------------- */}
          {/* RIGHT: COMPACT TECHNICAL SIDEBAR (4 COLUMNS)             */}
          {/* ------------------------------------------------------- */}
          <div className="lg:col-span-4 space-y-6">
            {/* TECHNICAL STACK */}
            <div className="p-4 sm:p-5 rounded-sm border border-[var(--border)] bg-[#09090b]">
              <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold mb-3 flex items-center gap-1.5">
                <Code2 size={14} className="text-blue-400" />
                <span>TECHNICAL STACK</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-sm border border-white/10 bg-white/[0.03] text-[11px] font-mono text-zinc-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* HARDWARE SPECIFICATIONS */}
            {project.hardwareSpecs && project.hardwareSpecs.length > 0 && (
              <div className="p-4 sm:p-5 rounded-sm border border-[var(--border)] bg-[#09090b]">
                <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold mb-3 flex items-center gap-1.5">
                  <Cpu size={14} className="text-emerald-400" />
                  <span>HARDWARE SPECS</span>
                </div>
                <div className="space-y-2">
                  {project.hardwareSpecs.map((spec) => (
                    <div key={spec.name} className="text-xs font-mono">
                      <div className="flex items-start gap-1.5 text-zinc-200 font-semibold">
                        <span className="text-emerald-400">▪</span>
                        <span>{spec.name}</span>
                      </div>
                      <div className="text-zinc-500 pl-3.5 text-[11px] font-light">
                        {spec.spec}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SOFTWARE LAYERS */}
            {project.softwareStack && project.softwareStack.length > 0 && (
              <div className="p-4 sm:p-5 rounded-sm border border-[var(--border)] bg-[#09090b]">
                <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold mb-3 flex items-center gap-1.5">
                  <Layers size={14} className="text-purple-400" />
                  <span>SOFTWARE LAYERS</span>
                </div>
                <div className="space-y-1.5">
                  {project.softwareStack.map((layer) => (
                    <div key={layer} className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                      <span className="text-purple-400">▪</span>
                      <span>{layer}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EVENT / COMPETITION (If applicable) */}
            {project.event && (
              <div className="p-4 rounded-sm border border-[var(--border)] bg-[#09090b]">
                <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold mb-1.5 flex items-center gap-1.5">
                  <Award size={13} className="text-amber-400" />
                  <span>EVENT / COMPETITION</span>
                </div>
                <div className="text-xs font-mono text-white font-semibold">
                  {project.event}
                </div>
              </div>
            )}

            {/* ROLE & YEAR */}
            <div className="p-4 rounded-sm border border-[var(--border)] bg-[#09090b] space-y-2 text-xs font-mono">
              <div>
                <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">ROLE</span>
                <span className="text-zinc-200 font-medium">{project.role}</span>
              </div>
              <div className="border-t border-white/5 pt-2">
                <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">TIMELINE</span>
                <span className="text-zinc-200">{project.year}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4. PREVIOUS / NEXT PROJECT NAVIGATION FOOTER              */}
        {/* ========================================================= */}
        <div className="mt-16 pt-8 border-t border-[var(--border)] grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Previous Project */}
          <Link
            href={`/projects/${prev.slug || prev.id}`}
            onClick={() => soundManager.play('nav')}
            className="group p-5 rounded-sm border border-[var(--border)] hover:border-blue-500/40 bg-[#09090b] transition-all flex flex-col justify-between"
          >
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">
              <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
              <span>PREVIOUS BUILD</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
              {prev.title}
            </h3>
            <p className="text-xs font-mono text-zinc-500 font-light mt-1">
              {prev.domain}
            </p>
          </Link>

          {/* Next Project */}
          <Link
            href={`/projects/${next.slug || next.id}`}
            onClick={() => soundManager.play('nav')}
            className="group p-5 rounded-sm border border-[var(--border)] hover:border-blue-500/40 bg-[#09090b] transition-all flex flex-col justify-between sm:text-right"
          >
            <div className="flex items-center sm:justify-end gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">
              <span>NEXT BUILD</span>
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
              {next.title}
            </h3>
            <p className="text-xs font-mono text-zinc-500 font-light mt-1">
              {next.domain}
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
