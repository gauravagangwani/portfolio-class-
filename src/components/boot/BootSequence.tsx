import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { terminalAudio } from '../../utils/audioSystem';
import { ActivityIcon, TerminalIcon, ArrowRightIcon } from '../icons/TerminalIcons';

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(0);
  const [lineWidth, setLineWidth] = useState<number>(0);

  const bootMessages = [
    'INITIALIZING QUANT.OS PERSONAL TERMINAL...',
    'CONNECTING WORKSPACE ENVIRONMENT // GAURAV GANGWANI...',
    'MOUNTING PORTFOLIO MODULES... [PROJECTS, SKILLS, TIMELINE]',
    'SYNCHRONIZING NEWTON SCHOOL OF TECHNOLOGY NODES...',
    'SYSTEM ONLINE // ALL CHANNELS NOMINAL',
  ];

  useEffect(() => {
    terminalAudio.playBlip(520, 0.05, 0.02);

    // Fast progress line
    const lineTimer = setInterval(() => {
      setLineWidth((prev) => {
        if (prev >= 100) {
          clearInterval(lineTimer);
          return 100;
        }
        return prev + 5;
      });
    }, 30);

    // Staggered log lines
    const stepInterval = setInterval(() => {
      setStep((prev) => {
        if (prev < bootMessages.length) {
          terminalAudio.playKey();
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          return prev;
        }
      });
    }, 200);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') {
        handleEnter();
      }
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      clearInterval(lineTimer);
      clearInterval(stepInterval);
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  const handleEnter = () => {
    terminalAudio.playExecute();
    sessionStorage.setItem('quant_os_booted', 'true');
    onComplete();
  };

  return (
    <div
      onClick={handleEnter}
      className="fixed inset-0 z-[200] bg-[#020403]/95 backdrop-blur-xl text-[#F0F1F1] flex flex-col items-center justify-center p-4 sm:p-6 select-none font-mono cursor-pointer"
    >
      {/* Top fine progress bar */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-[#0C1310]">
        <div
          className="h-full bg-[#339671] transition-all duration-75 shadow-[0_0_12px_#339671]"
          style={{ width: `${lineWidth}%` }}
        />
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-[#080D0B] border border-[#27332E] rounded-lg p-6 sm:p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-[#27332E] pb-3 mb-5 text-xs text-[#58635E]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#339671] animate-pulse-dot" />
            <span className="text-[#AFD2C9] font-semibold">{PERSONAL_INFO.systemName}</span>
            <span>// PERSONAL PROFILE INITIALIZATION</span>
          </div>
          <button
            onClick={handleEnter}
            className="text-[11px] text-[#9EA1A1] hover:text-[#AFD2C9] hover:underline cursor-pointer px-2 py-0.5 rounded bg-[#020403] border border-[#27332E]"
          >
            SKIP ESC
          </button>
        </div>

        {/* Wordmark & Persona */}
        <div className="mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-[#0C1310] border border-[#339671] flex items-center justify-center text-[#339671] shadow-[0_0_15px_rgba(51,150,113,0.3)]">
            <ActivityIcon size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider text-[#F0F1F1]">
              QUANT<span className="text-[#339671]">.OS</span>
            </h1>
            <p className="text-xs text-[#9EA1A1] font-sans">
              Personal Portfolio & Terminal // <strong className="text-[#AFD2C9]">{PERSONAL_INFO.name}</strong>
            </p>
          </div>
        </div>

        {/* Boot Terminal Log */}
        <div className="bg-[#020403] border border-[#27332E]/80 rounded p-4 mb-6 font-mono text-xs space-y-2 min-h-[140px]">
          {bootMessages.slice(0, step).map((msg, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-[#339671] font-bold">{'>'}</span>
              <span className={i === step - 1 ? 'text-[#AFD2C9]' : 'text-[#9EA1A1]'}>
                {msg}
              </span>
            </div>
          ))}
          {step < bootMessages.length && (
            <div className="flex items-center gap-2">
              <span className="text-[#339671] animate-pulse">_</span>
            </div>
          )}
        </div>

        {/* Enter Action */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-[11px] text-[#58635E] hidden sm:inline">
            PRESS [ENTER] OR CLICK ANYWHERE
          </span>
          <button
            onClick={handleEnter}
            className="w-full sm:w-auto px-6 py-2.5 rounded bg-[#339671] hover:bg-[#3db085] text-[#020403] font-bold text-xs tracking-wider transition-all duration-150 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(51,150,113,0.4)] cursor-pointer hover:scale-[1.02]"
          >
            <TerminalIcon size={14} />
            <span>ENTER TERMINAL</span>
            <ArrowRightIcon size={14} />
          </button>
        </div>
      </div>

      <div className="mt-5 text-center text-[10px] text-[#58635E]">
        CREATIVE INTERACTION METAPHOR // GAURAV GANGWANI PERSONAL PORTFOLIO
      </div>
    </div>
  );
};
