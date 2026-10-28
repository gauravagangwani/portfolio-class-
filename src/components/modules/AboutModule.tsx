import React, { useState, useEffect, useRef } from 'react';
import { PERSONAL_INFO, TIMELINE_MILESTONES } from '../../data/portfolioData';
import { TimelineMilestone } from '../../types';
import { terminalAudio } from '../../utils/audioSystem';
import {
  TerminalIcon,
  CrosshairIcon,
  GraduationCapIcon,
  AwardIcon,
  ShieldCheckIcon,
  CpuIcon,
  LayersIcon
} from '../icons/TerminalIcons';

export const AboutModule: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<TimelineMilestone>(
    TIMELINE_MILESTONES[0]
  );
  const [crosshairPos, setCrosshairPos] = useState<number>(0);
  const [isCrosshairSweeping, setIsCrosshairSweeping] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sweep animation on mount
  useEffect(() => {
    setIsCrosshairSweeping(true);
    let start: number | null = null;
    const duration = 1200;

    const animateSweep = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCrosshairPos(progress * 100);

      if (progress < 1) {
        requestAnimationFrame(animateSweep);
      } else {
        setIsCrosshairSweeping(false);
      }
    };

    requestAnimationFrame(animateSweep);
  }, []);

  // Canvas drawing the glowing timeline curve
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    const height = (canvas.height = 140);

    let offset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Fine grid
      ctx.strokeStyle = 'rgba(39, 51, 46, 0.35)';
      ctx.lineWidth = 0.8;
      for (let x = 0; x < width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw timeline horizontal illuminated axis
      const centerY = height / 2;
      ctx.beginPath();
      ctx.moveTo(0, centerY);

      // Draw smooth sine curve transforming to timeline axis
      for (let x = 0; x <= width; x += 10) {
        const wave = Math.sin((x + offset) * 0.02) * 14 * (isCrosshairSweeping ? 1 : 0.25);
        ctx.lineTo(x, centerY + wave);
      }
      ctx.strokeStyle = '#339671';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Glow overlay
      ctx.strokeStyle = 'rgba(175, 210, 201, 0.25)';
      ctx.lineWidth = 6;
      ctx.stroke();

      offset += 0.5;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [isCrosshairSweeping]);

  const getMilestoneIcon = (category: TimelineMilestone['category']) => {
    switch (category) {
      case 'education':
        return <GraduationCapIcon size={16} />;
      case 'hackathon':
        return <CpuIcon size={16} />;
      case 'achievement':
        return <AwardIcon size={16} />;
      case 'certification':
        return <ShieldCheckIcon size={16} />;
      case 'leadership':
        return <LayersIcon size={16} />;
      default:
        return <TerminalIcon size={16} />;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header section */}
      <div className="terminal-panel p-6 sm:p-8 relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#080D0B] border border-[#27332E] text-xs font-mono text-[#AFD2C9] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#339671] animate-pulse-dot" />
            <span>MODULE_02 // TRAJECTORY & RESEARCH IDENTITY</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#F0F1F1] mb-4">
            Engineering Intelligence at the Intersection of Technology & Markets
          </h2>

          <div className="text-sm text-[#9EA1A1] leading-relaxed space-y-4 font-sans">
            <p>
              Hello! I'm <strong className="text-[#F0F1F1]">Gaurav Gangwani</strong>, an aspiring software engineer, machine learning enthusiast, and quantitative explorer currently pursuing my B.Tech in Computer Science & Artificial Intelligence at the <strong className="text-[#339671]">Newton School of Technology (2026–2030)</strong>.
            </p>
            <p>
              My journey began with hands-on hardware tinkering in robotics and competitive mathematics olympiads, which naturally evolved into algorithmic reasoning, data science pipelines, and audio processing. I believe the most exciting challenges live at the intersection of complex computational logic and real-world friction—whether that means detecting deepfake voice clones in real-time or modeling financial time-series market regimes.
            </p>
            <p className="text-xs font-mono text-[#AFD2C9]">
              CORE FOCUS: Artificial Intelligence · Audio DSP Pipelines · Algorithmic Trading Concepts · B2B Systems Architecture · Entrepreneurship
            </p>
          </div>
        </div>
      </div>

      {/* Signature Chart-to-Timeline Transformation Section */}
      <div className="terminal-panel p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#27332E] gap-2 mb-4">
          <div className="flex items-center gap-2.5">
            <CrosshairIcon size={16} className="text-[#339671]" />
            <h3 className="font-mono text-sm font-bold text-[#F0F1F1]">
              TIMELINE_AXIS // ILLUMINATED MILESTONES (2022 — 2030)
            </h3>
          </div>
          <span className="font-mono text-xs text-[#58635E]">
            CLICK ANY NODE TO INSPECT TELEMETRY
          </span>
        </div>

        {/* Animated canvas line representing transformed market curve */}
        <div className="relative w-full h-24 bg-[#020403] rounded border border-[#27332E] overflow-hidden mb-6">
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Sweeping crosshair vertical line */}
          {isCrosshairSweeping && (
            <div
              className="absolute top-0 bottom-0 w-px bg-[#AFD2C9] shadow-[0_0_12px_#AFD2C9] pointer-events-none transition-all duration-75"
              style={{ left: `${crosshairPos}%` }}
            >
              <div className="absolute top-1 left-2 font-mono text-[9px] text-[#AFD2C9] bg-[#020403] px-1 rounded border border-[#339671]">
                SCAN_SWEEP: {Math.round(crosshairPos)}%
              </div>
            </div>
          )}
        </div>

        {/* Interactive Milestones Horizontal Scroller / Node Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {TIMELINE_MILESTONES.map((item) => {
            const isSelected = selectedMilestone.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  terminalAudio.playExecute();
                  setSelectedMilestone(item);
                }}
                onMouseEnter={() => terminalAudio.playBlip(1100, 0.02, 0.01)}
                className={`p-3 rounded border text-left font-mono transition-all cursor-pointer relative group ${
                  isSelected
                    ? 'bg-[#0C1310] border-[#339671] text-[#F0F1F1] shadow-[0_0_15px_rgba(51,150,113,0.2)]'
                    : 'bg-[#080D0B] border-[#27332E] text-[#9EA1A1] hover:border-[#339671]/40 hover:text-[#F0F1F1]'
                }`}
              >
                {/* Node indicator */}
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] font-bold ${isSelected ? 'text-[#339671]' : 'text-[#58635E]'}`}>
                    {item.year}
                  </span>
                  <span className={isSelected ? 'text-[#339671]' : 'text-[#58635E] group-hover:text-[#AFD2C9]'}>
                    {getMilestoneIcon(item.category)}
                  </span>
                </div>
                <div className="text-xs font-semibold line-clamp-1 group-hover:text-[#AFD2C9]">
                  {item.title}
                </div>
                <div className="text-[10px] text-[#58635E] line-clamp-1 mt-1">
                  {item.institutionOrContext}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Milestone Inspection Panel */}
        <div className="bg-[#080D0B] border border-[#339671]/50 rounded-lg p-5 animate-fadeIn relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#27332E] gap-2 mb-4">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded bg-[#0C1310] border border-[#339671] text-[#339671]">
                {getMilestoneIcon(selectedMilestone.category)}
              </span>
              <div>
                <h4 className="text-base font-bold text-[#F0F1F1]">
                  {selectedMilestone.title}
                </h4>
                <p className="text-xs font-mono text-[#339671]">
                  {selectedMilestone.institutionOrContext} // {selectedMilestone.year}
                </p>
              </div>
            </div>

            {selectedMilestone.badge && (
              <span className="px-2.5 py-1 rounded bg-[#339671]/15 border border-[#339671]/40 text-[#AFD2C9] text-xs font-mono self-start sm:self-auto">
                {selectedMilestone.badge}
              </span>
            )}
          </div>

          <p className="text-sm text-[#9EA1A1] leading-relaxed mb-4">
            {selectedMilestone.description}
          </p>

          <div className="pt-3 border-t border-[#27332E]/60 flex items-center justify-between text-xs font-mono text-[#58635E]">
            <span>CATEGORY: {selectedMilestone.category.toUpperCase()}</span>
            <span className="text-[#339671]">STATUS: VERIFIED RECORD</span>
          </div>
        </div>
      </div>
    </div>
  );
};
