import React, { useState, useEffect } from 'react';
import { ModuleId } from '../../types';
import { MODULES, PERSONAL_INFO, TELEMETRY_TICKERS } from '../../data/portfolioData';
import { terminalAudio } from '../../utils/audioSystem';
import {
  ActivityIcon,
  Volume2Icon,
  VolumeXIcon,
  TerminalIcon,
  RadioIcon,
  SlidersIcon
} from '../icons/TerminalIcons';

interface TopStatusBarProps {
  activeModule: ModuleId;
  setActiveModule: (id: ModuleId) => void;
  isContinuousMode: boolean;
  setIsContinuousMode: (val: boolean) => void;
  openCommandPalette: () => void;
}

export const TopStatusBar: React.FC<TopStatusBarProps> = ({
  activeModule,
  setActiveModule,
  isContinuousMode,
  setIsContinuousMode,
  openCommandPalette,
}) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [utcStr, setUtcStr] = useState<string>('');
  const [isMuted, setIsMuted] = useState<boolean>(terminalAudio.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' IST'
      );
      setUtcStr(
        now.toISOString().substring(11, 19) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAudioToggle = () => {
    const nextState = terminalAudio.toggleMute();
    setIsMuted(nextState);
  };

  const currentMod = MODULES.find((m) => m.id === activeModule) || MODULES[0];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#27332E] bg-[#020403]/95 backdrop-blur-md">
      {/* Top Telemetry Tape Bar */}
      <div className="w-full bg-[#080D0B] border-b border-[#27332E]/60 text-[11px] font-mono text-[#9EA1A1] overflow-hidden py-1 px-3 flex items-center select-none">
        <div className="flex items-center gap-2 pr-3 border-r border-[#27332E] text-[#AFD2C9] shrink-0 font-semibold">
          <span className="inline-block w-2 h-2 rounded-full bg-[#339671] animate-pulse-dot" />
          <span>STATUS: ONLINE</span>
        </div>

        <div className="flex-1 overflow-hidden relative ml-3">
          <div className="animate-ticker-marquee flex items-center gap-8">
            {TELEMETRY_TICKERS.concat(TELEMETRY_TICKERS).map((ticker, idx) => (
              <div key={idx} className="flex items-center gap-2 whitespace-nowrap">
                <span className="text-[#F0F1F1] font-medium">{ticker.symbol}</span>
                <span className="text-[#AFD2C9]">{ticker.value}</span>
                <span className={ticker.isPositive ? 'text-[#339671]' : 'text-[#D96868]'}>
                  {ticker.change}
                </span>
                <span className="text-[#58635E] text-[9px] uppercase px-1 border border-[#27332E] rounded">
                  verified
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-3 pl-3 border-l border-[#27332E] shrink-0 text-[#9EA1A1]">
          <span>{utcStr}</span>
          <span className="text-[#339671] font-semibold">{timeStr}</span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="px-4 py-2.5 flex items-center justify-between gap-4 max-w-[1600px] mx-auto">
        {/* Left: Brand & Identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              terminalAudio.playExecute();
              setActiveModule('overview');
            }}
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
            title="QUANT.OS Personal Profile"
          >
            <div className="w-8 h-8 rounded bg-[#0C1310] border border-[#339671]/40 flex items-center justify-center text-[#339671] group-hover:border-[#339671] group-hover:shadow-[0_0_12px_rgba(51,150,113,0.3)] transition-all">
              <ActivityIcon size={16} />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold tracking-wider text-sm text-[#F0F1F1] group-hover:text-[#AFD2C9] transition-colors">
                  QUANT<span className="text-[#339671]">.OS</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.2 text-[9px] font-mono text-[#339671] bg-[#339671]/10 border border-[#339671]/30 rounded">
                  {PERSONAL_INFO.version}
                </span>
              </div>
              <div className="text-[10px] text-[#9EA1A1] font-mono tracking-tight flex items-center gap-1.5">
                <span>{PERSONAL_INFO.name.toUpperCase()}</span>
                <span className="text-[#339671]">/</span>
                <span className="text-[#339671] hidden md:inline">PERSONAL PORTFOLIO</span>
              </div>
            </div>
          </button>
        </div>

        {/* Center: Active Module Badge & Telemetry */}
        <div className="hidden md:flex items-center gap-3 bg-[#0C1310] border border-[#27332E] px-3.5 py-1.5 rounded-md">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-[#58635E]">ACTIVE_MODULE:</span>
            <span className="text-[#339671] font-bold tracking-wider">{currentMod.code}</span>
            <span className="text-[#F0F1F1] font-semibold">// {currentMod.name}</span>
          </div>
          <span className="w-px h-3.5 bg-[#27332E]" />
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#9EA1A1]">
            <span>{currentMod.metric}:</span>
            <span className="text-[#AFD2C9]">{currentMod.delta}</span>
          </div>
        </div>

        {/* Right: Actions, Audio, View Mode & Command Line */}
        <div className="flex items-center gap-2.5">
          {/* Continuous Scroll vs Modular Slide Toggle */}
          <button
            onClick={() => {
              terminalAudio.playExecute();
              setIsContinuousMode(!isContinuousMode);
            }}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded border text-xs font-mono transition-all cursor-pointer ${
              isContinuousMode
                ? 'bg-[#339671]/15 border-[#339671] text-[#AFD2C9]'
                : 'bg-[#0C1310] border-[#27332E] text-[#9EA1A1] hover:text-[#F0F1F1] hover:border-[#339671]/40'
            }`}
            title="Toggle between Modular Slide View and Continuous Scroll Stream"
          >
            <SlidersIcon size={13} />
            <span className="text-[11px]">{isContinuousMode ? 'STREAM MODE' : 'SLIDE DECK'}</span>
          </button>

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`p-1.5 rounded border text-xs transition-all cursor-pointer ${
              !isMuted
                ? 'bg-[#339671]/15 border-[#339671] text-[#AFD2C9]'
                : 'bg-[#0C1310] border-[#27332E] text-[#58635E] hover:text-[#9EA1A1]'
            }`}
            title={isMuted ? 'Unmute Terminal SFX' : 'Mute Terminal SFX'}
          >
            {!isMuted ? <Volume2Icon size={15} /> : <VolumeXIcon size={15} />}
          </button>

          {/* Command Palette Trigger */}
          <button
            onClick={() => {
              terminalAudio.playKey();
              openCommandPalette();
            }}
            className="flex items-center gap-1.5 bg-[#0C1310] hover:bg-[#141F1A] border border-[#27332E] hover:border-[#339671]/50 px-2.5 py-1.5 rounded text-xs font-mono text-[#F0F1F1] transition-all cursor-pointer"
            title="Open Terminal Command Palette (Press / or ⌘K)"
          >
            <TerminalIcon size={13} className="text-[#339671]" />
            <span className="hidden lg:inline text-[11px] text-[#9EA1A1]">CLI</span>
            <kbd className="hidden sm:inline-block px-1 py-0.2 bg-[#020403] border border-[#27332E] text-[10px] text-[#AFD2C9] rounded">
              /
            </kbd>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded bg-[#0C1310] border border-[#27332E] text-[#F0F1F1] text-xs font-mono"
            aria-label="Toggle navigation menu"
          >
            <RadioIcon size={16} className={mobileMenuOpen ? 'text-[#339671]' : 'text-[#9EA1A1]'} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#27332E] bg-[#0C1310] p-3 grid grid-cols-2 gap-2 text-xs font-mono animate-fadeIn">
          {MODULES.map((mod) => (
            <button
              key={mod.id}
              onClick={() => {
                terminalAudio.playSlide();
                setActiveModule(mod.id);
                setMobileMenuOpen(false);
              }}
              className={`p-2 rounded text-left border flex items-center justify-between ${
                activeModule === mod.id
                  ? 'bg-[#339671]/20 border-[#339671] text-[#AFD2C9]'
                  : 'bg-[#080D0B] border-[#27332E] text-[#9EA1A1] hover:text-[#F0F1F1]'
              }`}
            >
              <span>{mod.name}</span>
              <span className="text-[10px] text-[#58635E]">{mod.code}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
