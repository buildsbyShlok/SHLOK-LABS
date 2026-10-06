'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Generates dummy data for the heatmap
const generateDummyData = () => {
  const weeks = 52;
  const days = 7;
  const grid = [];
  for (let w = 0; w < weeks; w++) {
    const week = [];
    for (let d = 0; d < days; d++) {
      // Random level 0-4, heavily weighted towards 0
      const rand = Math.random();
      let level = 0;
      if (rand > 0.95) level = 4;
      else if (rand > 0.85) level = 3;
      else if (rand > 0.7) level = 2;
      else if (rand > 0.5) level = 1;
      week.push({ level, date: `Week ${w + 1}, Day ${d + 1}` });
    }
    grid.push(week);
  }
  return grid;
};

const levelColors = {
  0: 'bg-zinc-800/50',
  1: 'bg-zinc-600',
  2: 'bg-zinc-500',
  3: 'bg-zinc-300',
  4: 'bg-zinc-100',
};

export function GitHubSection() {
  const [grid, setGrid] = useState<Array<Array<{level: number, date: string}>>>([]);

  useEffect(() => {
    setGrid(generateDummyData());
  }, []);

  return (
    <section id="github" className="py-24 border-b border-white/10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-16">
          <p className="text-sm font-mono tracking-widest text-zinc-500 uppercase">
            06 — GITHUB
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-8"
        >
          <div className="overflow-x-auto pb-4">
            <div className="min-w-max flex gap-1">
              {grid.map((week, wIndex) => (
                <div key={wIndex} className="flex flex-col gap-1">
                  {week.map((day, dIndex) => (
                    <div
                      key={dIndex}
                      title={`${day.date} - ${day.level} contributions`}
                      className={`w-3 h-3 rounded-[2px] ${levelColors[day.level as keyof typeof levelColors]}`}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between items-center text-xs font-mono text-zinc-500">
              <div className="flex gap-4 sm:gap-8">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-[2px] bg-zinc-800/50" />
                  <div className="w-3 h-3 rounded-[2px] bg-zinc-600" />
                  <div className="w-3 h-3 rounded-[2px] bg-zinc-500" />
                  <div className="w-3 h-3 rounded-[2px] bg-zinc-300" />
                  <div className="w-3 h-3 rounded-[2px] bg-zinc-100" />
                </div>
                <span>More</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-white/5 pt-8">
            <div className="flex gap-8">
              <div className="flex flex-col">
                <span className="text-xs font-mono text-zinc-500 mb-1">Repositories</span>
                <span className="font-mono text-zinc-200">--</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-mono text-zinc-500 mb-1">Contributions</span>
                <span className="font-mono text-zinc-200">--</span>
              </div>
            </div>
            <a
              href="https://github.com/shlokrajput"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-white/10 hover:border-white/30 text-sm font-mono text-zinc-300 hover:text-white transition-colors flex items-center gap-2 rounded-sm bg-white/[0.02] hover:bg-white/[0.05]"
            >
              View GitHub Profile
            </a>
          </div>
          <p className="text-xs text-zinc-600 font-mono">
            * Connect your GitHub for live data
          </p>
        </motion.div>
      </div>
    </section>
  );
}
