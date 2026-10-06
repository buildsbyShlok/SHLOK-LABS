'use client';

import { motion } from 'framer-motion';
import { FileText, Mail } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/ui/Icons';
import { profile } from '@/data/profile';
import { staggerContainer, fadeInUp } from '@/lib/animations';

export function HeroProfile() {
  const words = profile.name.split(' ');

  return (
    <section className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-12 relative z-10">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Name */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 flex gap-3 overflow-hidden text-[var(--fg)]">
          {words.map((word, i) => (
            <motion.span key={i} variants={fadeInUp} className="inline-block">
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitles */}
        <motion.p
          variants={fadeInUp}
          className="font-mono text-sm md:text-base mb-2 uppercase tracking-wider text-[var(--fg-muted)]"
        >
          {profile.subtitles.join(' · ')}
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={fadeInUp}
          className="text-xl md:text-2xl italic mb-8 font-light text-[var(--fg-muted)]"
        >
          &ldquo;{profile.tagline}&rdquo;
        </motion.p>

        {/* Bio */}
        <motion.p
          variants={fadeInUp}
          className="leading-relaxed mb-10 max-w-2xl text-[var(--fg-muted)]"
        >
          {profile.shortBio}
        </motion.p>

        {/* Info Grid */}
        <motion.div
          variants={fadeInUp}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 text-sm font-mono p-6 rounded-sm border border-[var(--border)] bg-white/[0.02] text-[var(--fg-subtle)]"
        >
          <div>
            <span className="text-[var(--fg-muted)]">Based in:</span> {profile.location}
          </div>
          <div>
            <span className="text-[var(--fg-muted)]">Currently:</span> {profile.availability}
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm font-mono border border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--border-hover)] hover:text-[var(--fg)] transition-all hover:-translate-y-0.5 rounded-sm bg-white/[0.01]"
          >
            <GitHubIcon className="w-4 h-4" />
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm font-mono border border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--border-hover)] hover:text-[var(--fg)] transition-all hover:-translate-y-0.5 rounded-sm bg-white/[0.01]"
          >
            <LinkedInIcon className="w-4 h-4" />
            LinkedIn
          </a>
          
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-2 px-4 py-2 text-sm font-mono border border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--border-hover)] hover:text-[var(--fg)] transition-all hover:-translate-y-0.5 rounded-sm bg-white/[0.01]"
          >
            <Mail className="w-4 h-4" />
            Email
          </a>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm font-mono border border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--border-hover)] hover:text-[var(--fg)] transition-all hover:-translate-y-0.5 rounded-sm bg-white/[0.01]"
          >
            <FileText className="w-4 h-4" />
            RESUME
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
