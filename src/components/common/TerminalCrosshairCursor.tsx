import React, { useEffect, useState } from 'react';

export const TerminalCrosshairCursor: React.FC = () => {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [label, setLabel] = useState<string>('SYS.READY');
  const [visible, setVisible] = useState<boolean>(false);
  const [isTouch, setIsTouch] = useState<boolean>(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);

      // Check hovered element for contextual tags
      const target = e.target as HTMLElement | null;
      if (target) {
        if (target.closest('button') || target.closest('a')) {
          setLabel('EXECUTE');
        } else if (target.closest('input') || target.closest('textarea')) {
          setLabel('INPUT');
        } else if (target.closest('.interactive-chart') || target.closest('canvas')) {
          setLabel('TELEMETRY');
        } else if (target.closest('.project-card')) {
          setLabel('INSPECT');
        } else {
          setLabel('READ');
        }
      }
    };

    const handleMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [visible]);

  if (isTouch || !visible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[100] transition-opacity duration-150"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Reticle Circle & Crosshair Lines */}
      <div className="relative w-8 h-8 flex items-center justify-center">
        {/* Subtle center ring */}
        <div className="w-4 h-4 rounded-full border border-[#339671]/40" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#AFD2C9]" />

        {/* Crosshair marks */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-2 bg-[#339671]/60" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-2 bg-[#339671]/60" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-2 bg-[#339671]/60" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-px w-2 bg-[#339671]/60" />

        {/* Coordinate & Context Tag */}
        <div className="absolute top-5 left-5 font-mono text-[9px] text-[#AFD2C9] bg-[#020403]/85 px-1.5 py-0.5 border border-[#27332E] rounded whitespace-nowrap backdrop-blur-xs flex items-center gap-1.5">
          <span className="text-[#339671]">{label}</span>
          <span className="text-[#58635E]">
            {pos.x}:{pos.y}
          </span>
        </div>
      </div>
    </div>
  );
};
