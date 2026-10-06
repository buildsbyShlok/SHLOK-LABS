'use client';

import { Mail } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/ui/Icons';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 mt-24 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        <div className="flex flex-col items-center md:items-start space-y-2">
          <h2 className="text-xl font-mono font-bold tracking-tighter text-[var(--fg)]">
            SHLOK RAJPUT
          </h2>
          <p className="text-sm max-w-xs text-center md:text-left text-[var(--fg-muted)]">
            Building software, systems & things that move.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end space-y-4">
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/shlokrajput"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
            >
              <GitHubIcon className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/shlokrajput"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
            >
              <LinkedInIcon className="w-5 h-5" />
            </a>
            <a
              href="mailto:mainlyshlok@gmail.com"
              className="text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>

          <div className="text-xs font-mono flex flex-col items-center md:items-end space-y-1 text-[var(--fg-subtle)]">
            <span>&copy; {currentYear} Shlok Rajput</span>
            <span className="opacity-50">Made with precision</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
