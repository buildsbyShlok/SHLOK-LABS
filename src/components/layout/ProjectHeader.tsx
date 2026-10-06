'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Volume2, VolumeX, ArrowLeft } from 'lucide-react';
import { soundManager } from '@/lib/sound';

export function ProjectHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'py-3 backdrop-blur-md bg-black/85 border-[var(--border)]'
          : 'py-4.5 bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Left: Brand + Back Link */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            onClick={() => soundManager.play('nav')}
            className="text-base sm:text-lg font-mono font-bold tracking-tighter text-white hover:opacity-80 transition-opacity"
          >
            SHLOK
          </Link>

          <Link
            href="/#projects"
            onClick={() => soundManager.play('nav')}
            className="flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-zinc-400 hover:text-white transition-colors py-1 group"
          >
            <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" />
            <span>ALL WORK</span>
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleSound}
            className="p-2 text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors rounded-sm"
            aria-label="Toggle sound"
            title={soundEnabled ? 'Sound ON' : 'Sound OFF'}
          >
            {soundEnabled ? <Volume2 size={16} className="text-blue-400" /> : <VolumeX size={16} />}
          </button>

          <button
            onClick={triggerCommandPalette}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[11px] font-mono border border-[var(--border)] text-zinc-400 hover:text-white hover:border-[var(--border-hover)] transition-colors bg-white/[0.01]"
            title="Open command palette (Ctrl+K)"
          >
            <span>Ctrl</span>
            <span>K</span>
          </button>
        </div>
      </div>
    </header>
  );
}
