'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { navItems } from '@/data/profile';
import { soundManager } from '@/lib/sound';

export function SideIndex() {
  const [activeSection, setActiveSection] = useState<string>('about');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -40% 0px' }
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    soundManager.play('nav');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hidden lg:flex fixed right-6 xl:right-10 top-1/2 -translate-y-1/2 flex-col space-y-4 z-40 pointer-events-auto">
      <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 mb-1 font-mono text-right pr-1">
        INDEX
      </div>
      
      <div className="flex flex-col space-y-2.5">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              className="flex items-center justify-end space-x-3 cursor-pointer group text-right bg-transparent border-0 p-0"
              onClick={() => scrollToSection(item.id)}
            >
              <span 
                className={`text-[11px] font-mono transition-colors duration-300 ${
                  isActive ? 'text-[var(--fg)] font-semibold' : 'text-zinc-600 group-hover:text-zinc-400'
                }`}
              >
                {item.number}
              </span>
              
              <span 
                className={`text-[11px] tracking-wider transition-colors duration-300 uppercase font-mono ${
                  isActive ? 'text-[var(--fg)] font-medium' : 'text-zinc-600 group-hover:text-zinc-400'
                }`}
              >
                {item.label}
              </span>

              <motion.div
                initial={false}
                animate={{ 
                  width: isActive ? 18 : 0,
                  opacity: isActive ? 1 : 0
                }}
                className="h-[1px] bg-[var(--fg)] origin-right"
                transition={{ duration: 0.25 }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
