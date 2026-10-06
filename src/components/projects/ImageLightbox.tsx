'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { ProjectMedia } from '@/data/projects';
import { soundManager } from '@/lib/sound';

interface ImageLightboxProps {
  media: ProjectMedia | null;
  onClose: () => void;
}

export function ImageLightbox({ media, onClose }: ImageLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundManager.play('close');
        onClose();
      }
    };
    if (media) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [media, onClose]);

  if (!media) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/92 backdrop-blur-lg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            soundManager.play('close');
            onClose();
          }}
          className="absolute inset-0 cursor-zoom-out"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 max-w-5xl w-full rounded-sm border border-[var(--border)] bg-[#0c0c0f] p-4 sm:p-6 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-blue-400">
                {media.figNum || 'FIGURE'}
              </span>
              <span className="text-zinc-600 font-mono text-xs">//</span>
              <span className="text-xs font-mono text-white font-semibold">
                {media.title}
              </span>
            </div>

            <button
              onClick={() => {
                soundManager.play('close');
                onClose();
              }}
              className="p-1.5 text-zinc-400 hover:text-white rounded-sm hover:bg-white/10 transition-colors"
              aria-label="Close lightbox"
            >
              <X size={18} />
            </button>
          </div>

          {/* Real High-Resolution Image Container */}
          <div className="relative flex-1 min-h-[350px] max-h-[68vh] w-full rounded-sm border border-white/5 bg-[#050507] flex items-center justify-center overflow-hidden p-2 sm:p-4">
            {media.image ? (
              <img
                src={media.image}
                alt={media.title}
                className="max-h-[64vh] max-w-full w-auto h-auto object-contain rounded-sm select-none shadow-2xl"
              />
            ) : (
              <div className="aspect-[16/9] w-full flex flex-col items-center justify-center p-8 relative">
                <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
                <span className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-2 block">
                  {media.figNum || 'FIGURE'} // {media.type.toUpperCase()}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-mono">
                  {media.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-zinc-400 max-w-md mx-auto text-center">
                  {media.caption}
                </p>
              </div>
            )}
          </div>

          {/* Technical Caption Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono pt-3 mt-1 text-zinc-400">
            <p className="text-zinc-300 font-light max-w-2xl">
              {media.caption}
            </p>
            <span className="text-[11px] uppercase tracking-wider text-zinc-500 shrink-0">
              ASSET // {media.type}
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
