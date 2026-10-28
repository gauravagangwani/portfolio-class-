import React, { useState, useEffect, useRef } from 'react';
import { SKILL_NODES } from '../../data/portfolioData';
import { SkillNode } from '../../types';
import { terminalAudio } from '../../utils/audioSystem';
import {
  NetworkIcon,
  CpuIcon,
  BarChartIcon,
  LayersIcon,
  CheckIcon,
  ArrowRightIcon
} from '../icons/TerminalIcons';

export const SkillsModule: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<SkillNode>(SKILL_NODES[0]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const categories = [
    { id: 'all', label: 'ALL FACTORS' },
    { id: 'development', label: 'DEV & SYSTEMS' },
    { id: 'ai_data', label: 'AI & AUDIO DSP' },
    { id: 'quant', label: 'QUANTITATIVE' },
    { id: 'product_leadership', label: 'PRODUCT & OPS' },
  ];

  const filteredNodes = SKILL_NODES.filter((n) => {
    if (activeCategory === 'all') return true;
    return n.category === activeCategory;
  });

  // Draw interactive 2D Factor Network Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    const height = (canvas.height = 300);

    // Node layout positions in radial constellation
    const total = filteredNodes.length;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.38;

    const nodePositions = filteredNodes.map((n, i) => {
      const angle = (i / total) * Math.PI * 2;
      return {
        node: n,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
      };
    });

    let pulse = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      pulse += 0.02;

      // Draw connection lines between related nodes
      ctx.strokeStyle = 'rgba(39, 51, 46, 0.45)';
      ctx.lineWidth = 1;
      nodePositions.forEach((p1) => {
        p1.node.connections.forEach((connId) => {
          const target = nodePositions.find((p2) => p2.node.id === connId);
          if (target) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();
          }
        });
      });

      // Draw Center Hub
      ctx.beginPath();
      ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#339671';
      ctx.fill();

      // Draw Nodes
      nodePositions.forEach((pos) => {
        const isSelected = pos.node.id === selectedNode.id;
        const isDemonstrated = pos.node.status === 'demonstrated';

        // Outer glow
        if (isSelected) {
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 16 + Math.sin(pulse) * 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(51, 150, 113, 0.3)';
          ctx.fill();
        }

        // Main node dot
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, isSelected ? 8 : 5, 0, Math.PI * 2);
        ctx.fillStyle = isSelected
          ? '#AFD2C9'
          : isDemonstrated
          ? '#339671'
          : '#D4AC65';
        ctx.fill();

        // Node label
        ctx.font = isSelected
          ? 'bold 11px JetBrains Mono, monospace'
          : '10px JetBrains Mono, monospace';
        ctx.fillStyle = isSelected ? '#F0F1F1' : '#9EA1A1';
        ctx.textAlign = 'center';
        ctx.fillText(pos.node.name, pos.x, pos.y + 18);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    // Click handler for canvas nodes
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      nodePositions.forEach((pos) => {
        const dist = Math.hypot(pos.x - clickX, pos.y - clickY);
        if (dist < 22) {
          terminalAudio.playExecute();
          setSelectedNode(pos.node);
        }
      });
    };

    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      canvas.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animId);
    };
  }, [filteredNodes, selectedNode]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="terminal-panel p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#27332E] gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#080D0B] border border-[#27332E] text-xs font-mono text-[#AFD2C9] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#339671] animate-pulse-dot" />
              <span>MODULE_05 // THE FACTOR MAP</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F0F1F1]">
              Technical Factor Map & Skill Constellation
            </h2>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#339671]" />
              <span className="text-[#AFD2C9]">Demonstrated in Project</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4AC65]" />
              <span className="text-[#D4AC65]">Actively Learning</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                terminalAudio.playKey();
                setActiveCategory(c.id);
              }}
              className={`px-3 py-1.5 rounded border transition-all cursor-pointer ${
                activeCategory === c.id
                  ? 'bg-[#339671]/20 border-[#339671] text-[#AFD2C9] font-bold'
                  : 'bg-[#080D0B] border-[#27332E] text-[#9EA1A1] hover:text-[#F0F1F1]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Factor Map Canvas & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Dynamic Network Canvas (7 cols) */}
        <div className="lg:col-span-7 terminal-panel p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-[#27332E] mb-3">
            <div className="flex items-center gap-2">
              <NetworkIcon size={16} className="text-[#339671]" />
              <span className="font-mono text-xs font-bold text-[#F0F1F1]">
                FACTOR_CONSTELLATION // INTERACTIVE TOPOLOGY
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#58635E]">
              CLICK NODE TO INSPECT
            </span>
          </div>

          <div className="relative w-full h-80 bg-[#020403] rounded border border-[#27332E] overflow-hidden flex items-center justify-center">
            <canvas ref={canvasRef} className="w-full h-full block cursor-pointer" />
          </div>

          <div className="mt-3 pt-2 border-t border-[#27332E] text-[10px] font-mono text-[#58635E] flex items-center justify-between">
            <span>NODES: {filteredNodes.length} ACTIVE</span>
            <span className="text-[#339671]">CANVAS TOPOLOGY</span>
          </div>
        </div>

        {/* Right: Selected Node Inspection Card (5 cols) */}
        <div className="lg:col-span-5 terminal-panel p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#27332E] mb-4">
              <span className="font-mono text-xs text-[#58635E]">FACTOR_TELEMETRY</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                selectedNode.status === 'demonstrated'
                  ? 'bg-[#339671]/20 text-[#AFD2C9] border border-[#339671]/40'
                  : 'bg-[#D4AC65]/20 text-[#D4AC65] border border-[#D4AC65]/40'
              }`}>
                {selectedNode.status === 'demonstrated' ? 'DEMONSTRATED IN PROJECT' : 'ACTIVELY LEARNING'}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-[#F0F1F1] mb-1">
              {selectedNode.name}
            </h3>

            <p className="text-xs font-mono text-[#339671] uppercase tracking-wider mb-4">
              CLUSTER: {selectedNode.category.replace('_', ' ')}
            </p>

            <div className="bg-[#080D0B] p-4 rounded border border-[#27332E] mb-4">
              <h4 className="text-xs font-mono text-[#58635E] mb-1">PRACTICAL APPLICATION:</h4>
              <p className="text-xs sm:text-sm text-[#9EA1A1] leading-relaxed">
                {selectedNode.description}
              </p>
            </div>

            {selectedNode.linkedProject && (
              <div className="bg-[#0C1310] p-3 rounded border border-[#339671]/40 mb-4 flex items-center justify-between text-xs font-mono">
                <span className="text-[#58635E]">VALIDATING PROJECT:</span>
                <span className="text-[#AFD2C9] font-semibold">{selectedNode.linkedProject}</span>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-[#27332E] text-xs font-mono text-[#58635E] flex items-center justify-between">
            <span>FACTOR WEIGHT: {selectedNode.weight}%</span>
            <span className="text-[#339671]">VERIFIED HONEST ATTRIBUTION</span>
          </div>
        </div>
      </div>
    </div>
  );
};
