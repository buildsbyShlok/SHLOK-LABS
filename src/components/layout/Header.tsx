'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { soundManager } from '@/lib/sound';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedSound = localStorage.getItem('shlok-sound-enabled');
    if (savedSound === 'true') {
      setSoundEnabled(true);
      soundManager.init();
    }
  }, []);

  const toggleSound = () => {
    const newVal = soundManager.toggleSound();
    setSoundEnabled(newVal);
    if (newVal) {
      soundManager.play('toggle');
    }
  };

  const triggerCommandPalette = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }));
    soundManager.play('open');
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    soundManager.play('nav');
    setMobileMenuOpen(false);
    if (href === '#top' || href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'py-3 backdrop-blur-md bg-black/80 border-[var(--border)]'
          : 'py-4.5 bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        <a
          href="#top"
          onClick={(e) => scrollToSection(e, '#top')}
          className="text-lg font-mono font-bold tracking-tighter text-[var(--fg)] hover:opacity-80 transition-opacity"
        >
          SHLOK
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-xs font-mono tracking-wider uppercase text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors relative group py-1"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[var(--fg)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={toggleSound}
            className="p-2 text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-white/[0.04] transition-colors rounded-sm"
            aria-label="Toggle sound"
            title={soundEnabled ? 'Sound ON (Click to mute)' : 'Sound OFF (Click to unmute)'}
          >
            {soundEnabled ? <Volume2 size={16} className="text-blue-400" /> : <VolumeX size={16} />}
          </button>

          <button
            onClick={triggerCommandPalette}
            className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-sm text-[11px] font-mono border border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--border-hover)] transition-colors bg-white/[0.01]"
            title="Open command palette (Ctrl+K / Cmd+K)"
          >
            <span>Ctrl</span>
            <span>K</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              soundManager.play('click');
            }}
            className="p-2 md:hidden text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden px-6 py-4 flex flex-col space-y-3 bg-[#0a0a0a] border-t border-[var(--border)]"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-xs font-mono uppercase tracking-wider py-1.5 text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </motion.nav>
      )}
    </motion.header>
  );
}
