'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Navigation, ExternalLink, Volume2, FileText, Mail, Box } from 'lucide-react';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { soundManager } from '@/lib/sound';

type Command = {
  id: string;
  category: 'NAVIGATION' | 'CASE STUDIES' | 'ACTIONS';
  title: string;
  icon: React.ReactNode;
  action: () => void;
};

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/#${id}`);
    }
  };

  const projectCommands: Command[] = projects.map((p) => ({
    id: `project-${p.id}`,
    category: 'CASE STUDIES',
    title: p.title,
    icon: <Box className="w-4 h-4 text-blue-400" />,
    action: () => {
      setIsOpen(false);
      soundManager.play('nav');
      router.push(`/projects/${p.slug || p.id}`);
    },
  }));

  const commands: Command[] = [
    { id: 'nav-about', category: 'NAVIGATION', title: 'Go to About', icon: <Navigation className="w-4 h-4" />, action: () => scrollTo('about') },
    { id: 'nav-experience', category: 'NAVIGATION', title: 'Go to Experience', icon: <Navigation className="w-4 h-4" />, action: () => scrollTo('experience') },
    { id: 'nav-projects', category: 'NAVIGATION', title: 'Go to Projects', icon: <Navigation className="w-4 h-4" />, action: () => scrollTo('projects') },
    { id: 'nav-achievements', category: 'NAVIGATION', title: 'Go to Achievements', icon: <Navigation className="w-4 h-4" />, action: () => scrollTo('achievements') },
    { id: 'nav-skills', category: 'NAVIGATION', title: 'Go to Skills', icon: <Navigation className="w-4 h-4" />, action: () => scrollTo('skills') },
    { id: 'nav-contact', category: 'NAVIGATION', title: 'Go to Contact', icon: <Navigation className="w-4 h-4" />, action: () => scrollTo('contact') },

    ...projectCommands,
    
    { id: 'act-github', category: 'ACTIONS', title: 'Open GitHub Profile', icon: <ExternalLink className="w-4 h-4" />, action: () => { setIsOpen(false); window.open(profile.github, '_blank'); } },
    { id: 'act-linkedin', category: 'ACTIONS', title: 'Open LinkedIn Profile', icon: <ExternalLink className="w-4 h-4" />, action: () => { setIsOpen(false); window.open(profile.linkedin, '_blank'); } },
    { id: 'act-resume', category: 'ACTIONS', title: 'Download Resume', icon: <FileText className="w-4 h-4" />, action: () => { setIsOpen(false); window.open(profile.resume, '_blank'); } },
    { id: 'act-email', category: 'ACTIONS', title: 'Send Email', icon: <Mail className="w-4 h-4" />, action: () => { setIsOpen(false); window.location.href = `mailto:${profile.email}`; } },
    { id: 'act-sound', category: 'ACTIONS', title: 'Toggle UI Sound', icon: <Volume2 className="w-4 h-4" />, action: () => { setIsOpen(false); soundManager.toggleSound(); } },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    }
    if (e.key === 'Enter' && filteredCommands.length > 0) {
      e.preventDefault();
      filteredCommands[selectedIndex].action();
    }
  };

  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, Command[]>);

  let flatIndex = 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-lg shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center px-4 py-4 border-b border-white/10">
              <Search className="w-5 h-5 text-zinc-500 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search case studies, navigation, or actions..."
                className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm placeholder:text-zinc-600"
              />
              <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-500 bg-zinc-800 px-2 py-1 rounded">
                <span>ESC</span>
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto py-2">
              {Object.entries(groupedCommands).map(([category, cmds]) => (
                <div key={category} className="mb-4 last:mb-0">
                  <div className="px-4 py-2 text-xs font-mono text-zinc-500 tracking-widest uppercase">
                    {category}
                  </div>
                  {cmds.map((cmd) => {
                    const currentIndex = flatIndex++;
                    const isSelected = currentIndex === selectedIndex;
                    return (
                      <div
                        key={cmd.id}
                        onClick={cmd.action}
                        onMouseEnter={() => setSelectedIndex(currentIndex)}
                        className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-md cursor-pointer transition-colors ${
                          isSelected ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <div className={`p-1.5 rounded-sm ${isSelected ? 'bg-white/10' : 'bg-white/5'}`}>
                          {cmd.icon}
                        </div>
                        <span className="font-mono text-sm">{cmd.title}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
              {filteredCommands.length === 0 && (
                <div className="px-4 py-8 text-center text-zinc-500 font-mono text-sm">
                  No results found.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
