import React, { useState, useEffect, useRef } from 'react';
import { ModuleId } from './types';
import { MODULES } from './data/portfolioData';
import { TopStatusBar } from './components/common/TopStatusBar';
import { NavigationPanel } from './components/common/NavigationPanel';
import { FlowingDataLine } from './components/common/FlowingDataLine';
import { TerminalCrosshairCursor } from './components/common/TerminalCrosshairCursor';
import { CommandPaletteModal } from './components/common/CommandPaletteModal';
import { BootSequence } from './components/boot/BootSequence';

import { OverviewModule } from './components/modules/OverviewModule';
import { AboutModule } from './components/modules/AboutModule';
import { ProjectsModule } from './components/modules/ProjectsModule';
import { SkillsModule } from './components/modules/SkillsModule';
import { ExperienceModule } from './components/modules/ExperienceModule';
import { EducationModule } from './components/modules/EducationModule';
import { AchievementsModule } from './components/modules/AchievementsModule';
import { NowModule } from './components/modules/NowModule';
import { ContactModule } from './components/modules/ContactModule';

export const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleId>('overview');
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isBooted, setIsBooted] = useState<boolean>(() => {
    return sessionStorage.getItem('quant_os_booted') === 'true';
  });
  const [isContinuousMode, setIsContinuousMode] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const wheelLockRef = useRef<boolean>(false);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input or textarea
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key === 'k')) {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
        return;
      }

      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        return;
      }

      // Hotkeys 1-9
      const moduleByIndex: Record<string, ModuleId> = {
        '1': 'overview',
        '2': 'about',
        '3': 'projects',
        '4': 'skills',
        '5': 'experience',
        '6': 'education',
        '7': 'achievements',
        '8': 'now',
        '9': 'contact',
      };

      if (moduleByIndex[e.key]) {
        changeModule(moduleByIndex[e.key]);
      } else if (!isContinuousMode) {
        // Arrow navigation in modular slide mode
        if (e.key === 'ArrowRight' || e.key === 'PageDown') {
          navigateNext();
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
          navigatePrev();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModule, isContinuousMode]);

  const changeModule = (targetId: ModuleId) => {
    if (targetId === activeModule) return;
    const currIdx = MODULES.findIndex((m) => m.id === activeModule);
    const nextIdx = MODULES.findIndex((m) => m.id === targetId);
    setDirection(nextIdx > currIdx ? 'right' : 'left');
    setActiveModule(targetId);
  };

  const navigateNext = () => {
    const currIdx = MODULES.findIndex((m) => m.id === activeModule);
    if (currIdx < MODULES.length - 1) {
      changeModule(MODULES[currIdx + 1].id);
    }
  };

  const navigatePrev = () => {
    const currIdx = MODULES.findIndex((m) => m.id === activeModule);
    if (currIdx > 0) {
      changeModule(MODULES[currIdx - 1].id);
    }
  };

  // Wheel handler for smooth slide transitions in Deck Mode
  const handleWheel = (e: React.WheelEvent) => {
    if (isContinuousMode) return;
    const el = containerRef.current;
    if (!el) return;

    const isAtBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 10;
    const isAtTop = el.scrollTop <= 5;

    if (wheelLockRef.current) return;

    if (e.deltaY > 60 && isAtBottom) {
      wheelLockRef.current = true;
      navigateNext();
      setTimeout(() => {
        wheelLockRef.current = false;
      }, 700);
    } else if (e.deltaY < -60 && isAtTop) {
      wheelLockRef.current = true;
      navigatePrev();
      setTimeout(() => {
        wheelLockRef.current = false;
      }, 700);
    }
  };

  // Render specific module
  const renderModuleContent = (modId: ModuleId) => {
    switch (modId) {
      case 'overview':
        return (
          <OverviewModule
            setActiveModule={changeModule}
            onSelectProject={(projId) => {
              setSelectedProjectId(projId);
              changeModule('projects');
            }}
          />
        );
      case 'about':
        return <AboutModule />;
      case 'projects':
        return (
          <ProjectsModule
            selectedProjectId={selectedProjectId}
            onSelectProject={(projId) => setSelectedProjectId(projId)}
          />
        );
      case 'skills':
        return <SkillsModule />;
      case 'experience':
        return <ExperienceModule />;
      case 'education':
        return <EducationModule />;
      case 'achievements':
        return <AchievementsModule />;
      case 'now':
        return <NowModule />;
      case 'contact':
        return <ContactModule />;
      default:
        return <OverviewModule setActiveModule={changeModule} onSelectProject={setSelectedProjectId} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#020403] text-[#F0F1F1] relative selection:bg-[#339671]/30 selection:text-[#AFD2C9]">
      {/* Optional Boot Sequence */}
      {!isBooted && (
        <BootSequence onComplete={() => setIsBooted(true)} />
      )}

      {/* Background flowing financial spline */}
      <FlowingDataLine activeModule={activeModule} />

      {/* Desktop crosshair cursor */}
      <TerminalCrosshairCursor />

      {/* Top Status Bar with simulated tickers and clock */}
      <TopStatusBar
        activeModule={activeModule}
        setActiveModule={changeModule}
        isContinuousMode={isContinuousMode}
        setIsContinuousMode={setIsContinuousMode}
        openCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Terminal Shell Layout */}
      <div className="flex w-full max-w-[1600px] mx-auto relative z-10">
        {/* Left Navigation Sidebar */}
        <NavigationPanel
          activeModule={activeModule}
          setActiveModule={changeModule}
          direction={direction}
          setDirection={setDirection}
        />

        {/* Central Content Deck Area */}
        <main
          ref={containerRef}
          onWheel={handleWheel}
          className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto h-[calc(100vh-69px)]"
        >
          {isContinuousMode ? (
            /* Continuous Stream Mode: all modules stacked with smooth scroll */
            <div className="space-y-16 pb-20">
              {MODULES.map((m) => (
                <section key={m.id} id={m.id} className="scroll-mt-20">
                  <div className="pb-3 mb-6 border-b border-[#27332E]/80 flex items-center justify-between font-mono text-xs text-[#58635E]">
                    <span className="text-[#339671] font-bold">
                      // {m.code} : {m.name}
                    </span>
                    <span>{m.tagline}</span>
                  </div>
                  {renderModuleContent(m.id)}
                </section>
              ))}
            </div>
          ) : (
            /* Modular Slide Deck Mode: signature directional sliding transitions */
            <div
              key={activeModule}
              className={`pb-12 ${
                direction === 'right' ? 'slide-enter-right' : 'slide-enter-left'
              }`}
            >
              {renderModuleContent(activeModule)}
            </div>
          )}

          {/* Bottom terminal bar */}
          <footer className="mt-12 pt-6 border-t border-[#27332E]/80 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#58635E] gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#339671]" />
              <span>QUANT.OS // PERSONAL PORTFOLIO FOR GAURAV GANGWANI</span>
            </div>
            <div className="flex items-center gap-4">
              <span>NEWTON SCHOOL OF TECHNOLOGY (2026–2030)</span>
              <span>•</span>
              <span className="text-[#AFD2C9]">ALL DATA AUTHENTIC</span>
            </div>
          </footer>
        </main>
      </div>

      {/* CLI Command Palette Modal */}
      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        setActiveModule={changeModule}
        onSelectProject={(projId) => {
          setSelectedProjectId(projId);
          changeModule('projects');
        }}
      />
    </div>
  );
};

export default App;
