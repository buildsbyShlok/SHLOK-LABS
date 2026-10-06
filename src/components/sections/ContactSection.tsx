'use client';

import { motion } from 'framer-motion';
import { Mail, FileText } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/ui/Icons';
import { profile } from '@/data/profile';

export function ContactSection() {
  return (
    <div>
      <div className="mb-6">
        <p className="section-number uppercase mb-1">
          06 // CONTACT &amp; COLLABORATION
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--fg)]">
            LET&apos;S BUILD SOMETHING REAL.
          </h2>
          <p className="max-w-2xl text-sm md:text-base font-mono text-[var(--fg-muted)]">
            Open to robotics engineering roles, embedded systems hardware projects, internships, collaborations, and intelligent software builds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="group flex items-center gap-3 p-4 border border-[var(--border-hover)] hover:border-blue-500/50 transition-all transform hover:-translate-y-0.5 rounded-sm bg-[#0c0c0e]/80"
          >
            <Mail className="w-4 h-4 text-[var(--fg-muted)] group-hover:text-blue-400 transition-colors" />
            <span className="font-mono text-xs text-[var(--fg-muted)] group-hover:text-white transition-colors">
              Email Me
            </span>
          </a>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 p-4 border border-[var(--border)] hover:border-[var(--border-hover)] transition-all transform hover:-translate-y-0.5 rounded-sm bg-[#0c0c0e]/80"
          >
            <GitHubIcon className="w-4 h-4 text-[var(--fg-muted)] group-hover:text-white transition-colors" />
            <span className="font-mono text-xs text-[var(--fg-muted)] group-hover:text-white transition-colors">
              GitHub Profile
            </span>
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 p-4 border border-[var(--border)] hover:border-[var(--border-hover)] transition-all transform hover:-translate-y-0.5 rounded-sm bg-[#0c0c0e]/80"
          >
            <LinkedInIcon className="w-4 h-4 text-[var(--fg-muted)] group-hover:text-white transition-colors" />
            <span className="font-mono text-xs text-[var(--fg-muted)] group-hover:text-white transition-colors">
              LinkedIn Profile
            </span>
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 p-4 border border-[var(--border)] hover:border-[var(--border-hover)] transition-all transform hover:-translate-y-0.5 rounded-sm bg-[#0c0c0e]/80"
          >
            <FileText className="w-4 h-4 text-[var(--fg-muted)] group-hover:text-white transition-colors" />
            <span className="font-mono text-xs text-[var(--fg-muted)] group-hover:text-white transition-colors">
              Download Resume
            </span>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
