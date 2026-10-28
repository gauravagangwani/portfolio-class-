import React from 'react';
import { ModuleId } from '../../types';
import { MODULES } from '../../data/portfolioData';
import { terminalAudio } from '../../utils/audioSystem';
import {
  ActivityIcon,
  TerminalIcon,
  CpuIcon,
  NetworkIcon,
  LayersIcon,
  GraduationCapIcon,
  AwardIcon,
  RadioIcon,
  MailIcon,
  ChevronRightIcon
} from '../icons/TerminalIcons';

interface NavigationPanelProps {
  activeModule: ModuleId;
  setActiveModule: (id: ModuleId) => void;
  direction: 'left' | 'right';
  setDirection: (dir: 'left' | 'right') => void;
}

export const NavigationPanel: React.FC<NavigationPanelProps> = ({
  activeModule,
  setActiveModule,
  setDirection,
}) => {
  const getIcon = (id: ModuleId) => {
    switch (id) {
      case 'overview':
        return <ActivityIcon size={15} />;
      case 'about':
        return <TerminalIcon size={15} />;
      case 'projects':
        return <CpuIcon size={15} />;
      case 'skills':
        return <NetworkIcon size={15} />;
      case 'experience':
        return <LayersIcon size={15} />;
      case 'education':
        return <GraduationCapIcon size={15} />;
      case 'achievements':
        return <AwardIcon size={15} />;
      case 'now':
        return <RadioIcon size={15} />;
      case 'contact':
        return <MailIcon size={15} />;
      default:
        return <ActivityIcon size={15} />;
    }
  };

  const handleNavClick = (targetId: ModuleId) => {
    if (targetId === activeModule) return;
    const currentIndex = MODULES.findIndex((m) => m.id === activeModule);
    const targetIndex = MODULES.findIndex((m) => m.id === targetId);

    setDirection(targetIndex > currentIndex ? 'right' : 'left');
    terminalAudio.playSlide();
    setActiveModule(targetId);
  };

  return (
    <aside className="hidden lg:flex flex-col justify-between w-64 border-r border-[#27332E] bg-[#080D0B]/80 backdrop-blur-md p-3 select-none shrink-0 h-[calc(100vh-69px)] sticky top-[69px]">
      {/* Top section: Module list */}
      <div className="flex flex-col gap-1 overflow-y-auto pr-1">
        <div className="px-2 py-1.5 mb-1 flex items-center justify-between text-[10px] font-mono tracking-wider text-[#58635E] border-b border-[#27332E]/70">
          <span>PORTFOLIO_MODULES</span>
          <span>KEY</span>
        </div>

        {MODULES.map((mod) => {
          const isActive = activeModule === mod.id;
          return (
            <button
              key={mod.id}
              onClick={() => handleNavClick(mod.id)}
              onMouseEnter={() => terminalAudio.playBlip(920, 0.02, 0.008)}
              className={`group relative flex items-center justify-between px-3 py-2.5 rounded text-xs font-mono transition-all text-left cursor-pointer border ${
                isActive
                  ? 'bg-[#0C1310] border-[#339671] text-[#F0F1F1] shadow-[0_0_15px_rgba(51,150,113,0.15)]'
                  : 'bg-transparent border-transparent text-[#9EA1A1] hover:text-[#F0F1F1] hover:bg-[#0C1310]/60 hover:border-[#27332E]'
              }`}
            >
              {/* Active left indicator glow bar */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#339671] rounded-r shadow-[0_0_8px_#339671]" />
              )}

              <div className="flex items-center gap-2.5">
                <span className={`${isActive ? 'text-[#339671]' : 'text-[#58635E] group-hover:text-[#AFD2C9]'}`}>
                  {getIcon(mod.id)}
                </span>
                <span className={`tracking-wide font-medium ${isActive ? 'text-[#AFD2C9] font-semibold' : ''}`}>
                  {mod.name}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <kbd className={`px-1 py-0.5 text-[9px] rounded font-mono ${
                  isActive
                    ? 'bg-[#339671]/20 text-[#AFD2C9] border border-[#339671]/40'
                    : 'bg-[#020403] text-[#58635E] border border-[#27332E]'
                }`}>
                  {mod.hotkey}
                </kbd>
                {isActive && <ChevronRightIcon size={12} className="text-[#339671]" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom section: System diagnostics & status */}
      <div className="mt-4 pt-3 border-t border-[#27332E] font-mono text-[11px] text-[#58635E] space-y-1.5 px-2">
        <div className="flex items-center justify-between">
          <span>PORTFOLIO_STATE:</span>
          <span className="text-[#AFD2C9] font-medium">ONLINE</span>
        </div>
        <div className="flex items-center justify-between">
          <span>INSTITUTION:</span>
          <span className="text-[#339671] font-medium">NEWTON SCHOOL</span>
        </div>
        <div className="flex items-center justify-between">
          <span>REPOSITORIES:</span>
          <span className="text-[#339671] font-medium">5 VERIFIED</span>
        </div>
        <div className="pt-2 text-[9px] text-[#58635E] flex items-center justify-between">
          <span>KEYS: [1-9] NAVIGATE</span>
          <span>[/] CLI</span>
        </div>
      </div>
    </aside>
  );
};
