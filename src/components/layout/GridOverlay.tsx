export function GridOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--fg) 1px, transparent 1px),
            linear-gradient(to bottom, var(--fg) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Vertical Dashed Lines */}
      <div className="hidden lg:block absolute top-0 bottom-0 left-[15%] w-[1px] opacity-20 border-l border-dashed border-[var(--fg)]" />
      <div className="hidden lg:block absolute top-0 bottom-0 left-[85%] w-[1px] opacity-20 border-l border-dashed border-[var(--fg)]" />
      
      {/* Crosshairs */}
      <div className="hidden lg:block absolute top-1/4 left-[15%] w-2 h-2 -ml-1 -mt-1 rounded-full bg-[var(--fg)] opacity-40" />
      <div className="hidden lg:block absolute top-3/4 left-[15%] w-2 h-2 -ml-1 -mt-1 rounded-full bg-[var(--fg)] opacity-40" />
      <div className="hidden lg:block absolute top-1/4 left-[85%] w-2 h-2 -ml-1 -mt-1 rounded-full bg-[var(--fg)] opacity-40" />
      <div className="hidden lg:block absolute top-3/4 left-[85%] w-2 h-2 -ml-1 -mt-1 rounded-full bg-[var(--fg)] opacity-40" />
    </div>
  );
}
