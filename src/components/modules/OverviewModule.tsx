import React, { useState, useEffect, useRef } from 'react';
import { ModuleId } from '../../types';
import { PERSONAL_INFO, PROJECTS, ACHIEVEMENTS, EDUCATION_DATA } from '../../data/portfolioData';
import { terminalAudio } from '../../utils/audioSystem';
import {
  ActivityIcon,
  ArrowRightIcon,
  CpuIcon,
  AwardIcon,
  GraduationCapIcon,
  TerminalIcon,
  TrendingUpIcon,
  CheckIcon
} from '../icons/TerminalIcons';

interface OverviewModuleProps {
  setActiveModule: (id: ModuleId) => void;
  onSelectProject: (projId: string) => void;
}

export const OverviewModule: React.FC<OverviewModuleProps> = ({
  setActiveModule,
  onSelectProject,
}) => {
  const chartCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<{
    year: string;
    label: string;
    category: string;
    velocity: string;
    details: string;
  } | null>(null);

  // Milestones for the Personal Journey & Velocity chart
  const journeyMilestones = [
    { year: '2022 Q1', label: 'Robotics & Hardware', category: 'Embedded C++', velocity: '320h', details: 'Arduino skilling at Shri Shankarayya & ATL Innovation Lab Coordinator' },
    { year: '2022 Q3', label: 'Class 10 Distinction', category: 'Academics', velocity: '93%', details: 'Central Board secondary distinction with top marks in Math & Computer Applications' },
    { year: '2023 Q1', label: 'National Cyber Olympiad', category: 'Logic & Systems', velocity: 'Rank 20', details: 'SOF Zonal Rank 20 in computing logic and algorithm analysis' },
    { year: '2023 Q2', label: 'Math Olympiad (IMO)', category: 'Analytics', velocity: 'Medal', details: 'Awarded the Medal of Excellence for discrete math and problem solving' },
    { year: '2023 Q4', label: 'Eureka Juniors (IIT Bombay)', category: 'Entrepreneurship', velocity: 'Semifinalist', details: 'E-Cell IIT Bombay youth innovation model semifinalist' },
    { year: '2024 Q2', label: 'IIT Madras AI & Data Science', category: 'Data & Probability', velocity: 'Certified', details: 'Rigorous coursework in statistical hypothesis testing and ML pipelines' },
    { year: '2024 Q3', label: 'Anthropic AI Fluency', category: 'Generative AI', velocity: 'Certified', details: 'Foundational framework for AI system capabilities and prompt hierarchies' },
    { year: '2024 Q4', label: 'Shri Krishna Sales Systems', category: 'Business Logic', velocity: 'Architecture', details: 'Commercial wholesale stock velocity and billing workflow modeling' },
    { year: '2025 Q1', label: 'QuantumEdge AI Hackathon', category: 'Audio DSP / ML', velocity: 'Lead QA', details: 'Integration & Testing lead for Deepfake Voice Scam Defector pipeline' },
    { year: '2026–30', label: 'Newton School of Technology', category: 'B.Tech CS & AI', velocity: 'Active', details: 'Foundational algorithms, ML optimization, and production software engineering' },
  ];

  // Draw Personal Journey & Development Velocity Canvas
  useEffect(() => {
    const canvas = chartCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    const height = (canvas.height = 240);

    const padding = { top: 35, right: 30, bottom: 40, left: 35 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    let pulse = 0;

    // Calculate node coordinates
    const nodes = journeyMilestones.map((m, idx) => {
      const x = padding.left + (chartW / (journeyMilestones.length - 1)) * idx;
      // Exponential / stepped upward trajectory representing learning progression
      const yNorm = Math.pow(idx / (journeyMilestones.length - 1), 0.85);
      const y = padding.top + chartH - yNorm * chartH;
      return { ...m, x, y };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      pulse += 0.03;

      // Fine grid
      ctx.strokeStyle = 'rgba(39, 51, 46, 0.35)';
      ctx.lineWidth = 0.8;
      for (let y = padding.top; y <= padding.top + chartH; y += chartH / 4) {
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();
      }

      // Vertical milestone lines
      nodes.forEach((n) => {
        ctx.strokeStyle = 'rgba(39, 51, 46, 0.2)';
        ctx.beginPath();
        ctx.moveTo(n.x, padding.top);
        ctx.lineTo(n.x, padding.top + chartH);
        ctx.stroke();
      });

      // Shaded area under learning trajectory
      ctx.beginPath();
      ctx.moveTo(nodes[0].x, padding.top + chartH);
      nodes.forEach((n, i) => {
        if (i === 0) ctx.lineTo(n.x, n.y);
        else {
          const prev = nodes[i - 1];
          const cx = (prev.x + n.x) / 2;
          const cy = (prev.y + n.y) / 2;
          ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);
        }
      });
      ctx.lineTo(nodes[nodes.length - 1].x, nodes[nodes.length - 1].y);
      ctx.lineTo(nodes[nodes.length - 1].x, padding.top + chartH);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH);
      grad.addColorStop(0, 'rgba(51, 150, 113, 0.25)');
      grad.addColorStop(1, 'rgba(51, 150, 113, 0.01)');
      ctx.fillStyle = grad;
      ctx.fill();

      // Main glowing trajectory curve
      ctx.beginPath();
      ctx.moveTo(nodes[0].x, nodes[0].y);
      for (let i = 1; i < nodes.length; i++) {
        const prev = nodes[i - 1];
        const next = nodes[i];
        const xc = (prev.x + next.x) / 2;
        const yc = (prev.y + next.y) / 2;
        ctx.quadraticCurveTo(prev.x, prev.y, xc, yc);
      }
      ctx.lineTo(nodes[nodes.length - 1].x, nodes[nodes.length - 1].y);
      ctx.strokeStyle = '#339671';
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // Draw interactive nodes
      nodes.forEach((n) => {
        const isHovered = hoveredNode?.year === n.year;

        if (isHovered) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 10 + Math.sin(pulse) * 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(175, 210, 201, 0.4)';
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, isHovered ? 5.5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? '#AFD2C9' : '#339671';
        ctx.fill();

        // X-axis Year
        ctx.fillStyle = isHovered ? '#AFD2C9' : '#58635E';
        ctx.font = '9px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(n.year, n.x, height - 12);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    // Mousemove tracking for inspecting nodes
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let found = false;
      nodes.forEach((n) => {
        const dist = Math.hypot(n.x - mouseX, n.y - mouseY);
        if (dist < 18) {
          found = true;
          setHoveredNode({
            year: n.year,
            label: n.label,
            category: n.category,
            velocity: n.velocity,
            details: n.details,
          });
        }
      });
      if (!found && Math.abs(mouseX) > width) setHoveredNode(null);
    };

    const handleMouseLeave = () => setHoveredNode(null);

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [hoveredNode]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Personal Identity & Core Positioning (7 cols) */}
        <div className="lg:col-span-7 terminal-panel p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle accent corner glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#339671]/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            {/* Top-left system identifier & status indicator */}
            <div className="flex flex-wrap items-center gap-3 mb-5 text-xs font-mono">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#080D0B] border border-[#27332E] text-[#AFD2C9]">
                <span className="w-2 h-2 rounded-full bg-[#339671] animate-pulse-dot" />
                <span>QUANT.OS / PERSONAL PROFILE</span>
              </div>
              <div className="px-2.5 py-1 rounded bg-[#339671]/10 border border-[#339671]/30 text-[#339671] font-semibold">
                SYSTEM ONLINE // AVAILABLE FOR OPPORTUNITIES
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F0F1F1] mb-2 font-sans">
              Gaurav Gangwani
            </h1>

            {/* Sub-label */}
            <p className="text-xs sm:text-sm font-mono text-[#339671] mb-5 font-semibold tracking-wider uppercase">
              Developer · Technology Enthusiast · Aspiring Builder
            </p>

            {/* Main Positioning Statement */}
            <h2 className="text-lg sm:text-xl font-medium text-[#AFD2C9] leading-relaxed mb-4 font-sans">
              "Building at the intersection of technology, AI, and entrepreneurship."
            </h2>

            {/* Supporting Description */}
            <p className="text-sm text-[#9EA1A1] leading-relaxed mb-8 max-w-2xl font-sans">
              Developer, technology enthusiast, and aspiring entrepreneur exploring ideas, building projects, and turning curiosity into practical solutions. Currently studying Computer Science & Artificial Intelligence at Newton School of Technology (2026–2030).
            </p>
          </div>

          {/* Primary Calls to Action */}
          <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-[#27332E]/80">
            <button
              onClick={() => {
                terminalAudio.playExecute();
                setActiveModule('projects');
              }}
              className="px-6 py-2.5 rounded bg-[#339671] hover:bg-[#3cb88a] text-[#020403] font-bold text-xs font-mono tracking-wider transition-all duration-150 flex items-center gap-2 shadow-[0_0_20px_rgba(51,150,113,0.35)] cursor-pointer hover:translate-x-0.5"
            >
              <span>EXPLORE MY WORK</span>
              <ArrowRightIcon size={14} />
            </button>

            <button
              onClick={() => {
                terminalAudio.playSlide();
                setActiveModule('about');
              }}
              className="px-5 py-2.5 rounded bg-[#0C1310] hover:bg-[#141F1A] border border-[#27332E] hover:border-[#339671]/70 text-[#F0F1F1] font-mono text-xs tracking-wider transition-all cursor-pointer flex items-center gap-2"
            >
              <TerminalIcon size={14} className="text-[#339671]" />
              <span>INITIALIZE PROFILE</span>
            </button>

            <button
              onClick={() => {
                terminalAudio.playExecute();
                setActiveModule('contact');
              }}
              className="px-4 py-2.5 rounded bg-transparent hover:bg-[#0C1310] text-[#9EA1A1] hover:text-[#AFD2C9] font-mono text-xs transition-colors cursor-pointer"
            >
              GET IN TOUCH ↗
            </button>
          </div>
        </div>

        {/* Right Column: Personal Journey & Learning Velocity Visualization (5 cols) */}
        <div className="lg:col-span-5 terminal-panel p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#27332E] mb-3">
              <div className="flex items-center gap-2">
                <TrendingUpIcon size={15} className="text-[#339671]" />
                <span className="font-mono text-xs font-bold text-[#F0F1F1]">
                  TRAJECTORY // LEARNING & PROJECT MILESTONES
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#339671] bg-[#339671]/15 border border-[#339671]/30 px-2 py-0.5 rounded">
                2022 — 2030
              </span>
            </div>

            {/* Live Node Telemetry Readout */}
            <div className="bg-[#080D0B] p-3 rounded border border-[#27332E]/60 mb-3 min-h-[58px] flex items-center justify-between font-mono text-xs">
              {hoveredNode ? (
                <div>
                  <div className="flex items-center gap-2 text-[#AFD2C9] font-bold">
                    <span>{hoveredNode.year}:</span>
                    <span>{hoveredNode.label}</span>
                  </div>
                  <div className="text-[11px] text-[#9EA1A1] font-sans mt-0.5">
                    {hoveredNode.details}
                  </div>
                </div>
              ) : (
                <div className="text-[#58635E] text-xs font-mono">
                  HOVER OVER ANY MILESTONE NODE TO INSPECT JOURNEY TELEMETRY
                </div>
              )}
            </div>

            {/* Interactive Canvas */}
            <div className="relative w-full h-52 bg-[#020403] rounded border border-[#27332E] overflow-hidden interactive-chart">
              <canvas ref={chartCanvasRef} className="w-full h-full block cursor-crosshair" />
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-[#27332E] flex items-center justify-between text-[10px] font-mono text-[#58635E]">
            <span>SYSTEM: QUANT.OS PERSONAL JOURNEY GRAPH</span>
            <span className="text-[#339671]">10 VERIFIED MILESTONES</span>
          </div>
        </div>
      </div>

      {/* Grid of 4 Key Portfolio Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Education */}
        <div
          onClick={() => {
            terminalAudio.playSlide();
            setActiveModule('education');
          }}
          className="terminal-panel p-5 group cursor-pointer hover:border-[#339671]/70 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3 text-[#58635E]">
              <span className="text-[10px] font-mono tracking-wider">EDUCATION</span>
              <GraduationCapIcon size={16} className="text-[#339671] group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="font-semibold text-[#F0F1F1] text-base group-hover:text-[#AFD2C9] transition-colors mb-1 font-sans">
              {EDUCATION_DATA.institution}
            </h3>
            <p className="text-xs text-[#339671] font-mono mb-2">
              {EDUCATION_DATA.degree} // {EDUCATION_DATA.field}
            </p>
            <p className="text-xs text-[#9EA1A1] leading-relaxed line-clamp-2 font-sans">
              Focusing on foundational computing, data structures, AI/ML systems, and practical software engineering.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#27332E] flex items-center justify-between text-[10px] font-mono text-[#58635E] group-hover:text-[#AFD2C9]">
            <span>{EDUCATION_DATA.duration}</span>
            <span>LEARNING PATH →</span>
          </div>
        </div>

        {/* Card 2: Flagship Project: QuantumEdge */}
        <div
          onClick={() => {
            terminalAudio.playSlide();
            setActiveModule('projects');
            onSelectProject('quantumedge-voice-defector');
          }}
          className="terminal-panel p-5 group cursor-pointer hover:border-[#339671]/70 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3 text-[#58635E]">
              <span className="text-[10px] font-mono tracking-wider">FEATURED PROJECT</span>
              <CpuIcon size={16} className="text-[#339671] group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="font-semibold text-[#F0F1F1] text-base group-hover:text-[#AFD2C9] transition-colors mb-1 font-sans">
              QuantumEdge Defector
            </h3>
            <p className="text-xs text-[#D4AC65] font-mono mb-2">
              Deepfake Voice Scam Detection Pipeline
            </p>
            <p className="text-xs text-[#9EA1A1] leading-relaxed line-clamp-2 font-sans">
              Served as Integration and Testing Lead, configuring FFmpeg audio preprocessing, MFCC features, and ML tensor interfaces.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#27332E] flex items-center justify-between text-[10px] font-mono text-[#58635E] group-hover:text-[#AFD2C9]">
            <span>STATUS: IN DEV</span>
            <span>INSPECT PIPELINE →</span>
          </div>
        </div>

        {/* Card 3: Experience & Leadership */}
        <div
          onClick={() => {
            terminalAudio.playSlide();
            setActiveModule('experience');
          }}
          className="terminal-panel p-5 group cursor-pointer hover:border-[#339671]/70 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3 text-[#58635E]">
              <span className="text-[10px] font-mono tracking-wider">EXPERIENCE</span>
              <TerminalIcon size={16} className="text-[#339671] group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="font-semibold text-[#F0F1F1] text-base group-hover:text-[#AFD2C9] transition-colors mb-1 font-sans">
              Leadership & Ops
            </h3>
            <p className="text-xs text-[#339671] font-mono mb-2">
              Hackathons & Business Workflows
            </p>
            <p className="text-xs text-[#9EA1A1] leading-relaxed line-clamp-2 font-sans">
              Integration QA for QuantumEdge, wholesale inventory logic for Shri Krishna Sales, and Business Club Vice President.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#27332E] flex items-center justify-between text-[10px] font-mono text-[#58635E] group-hover:text-[#AFD2C9]">
            <span>VERIFIED ROLES</span>
            <span>VIEW DOSSIER →</span>
          </div>
        </div>

        {/* Card 4: Recognitions & Awards */}
        <div
          onClick={() => {
            terminalAudio.playSlide();
            setActiveModule('achievements');
          }}
          className="terminal-panel p-5 group cursor-pointer hover:border-[#339671]/70 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3 text-[#58635E]">
              <span className="text-[10px] font-mono tracking-wider">HONORS</span>
              <AwardIcon size={16} className="text-[#D4AC65] group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="font-semibold text-[#F0F1F1] text-base group-hover:text-[#AFD2C9] transition-colors mb-1 font-sans">
              Awards & Olympiads
            </h3>
            <p className="text-xs text-[#AFD2C9] font-mono mb-2">
              IIT Bombay, NCO, IMO, IITM
            </p>
            <p className="text-xs text-[#9EA1A1] leading-relaxed line-clamp-2 font-sans">
              Eureka Juniors Semifinalist, NCO Zonal Rank 20, IMO Medal of Excellence, and Class 10 Distinction (93%).
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#27332E] flex items-center justify-between text-[10px] font-mono text-[#58635E] group-hover:text-[#AFD2C9]">
            <span>8 VERIFIED HONORS</span>
            <span>VIEW BADGES →</span>
          </div>
        </div>
      </div>
    </div>
  );
};
