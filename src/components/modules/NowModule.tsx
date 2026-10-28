import React from 'react';
import { NOW_TELEMETRY } from '../../data/portfolioData';
import {
  RadioIcon,
  ActivityIcon,
  CpuIcon,
  SlidersIcon,
  TrendingUpIcon
} from '../icons/TerminalIcons';

export const NowModule: React.FC = () => {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'LEARNING':
        return 'text-[#339671] border-[#339671]/40 bg-[#339671]/15';
      case 'EXPERIMENTING':
        return 'text-[#D4AC65] border-[#D4AC65]/40 bg-[#D4AC65]/15';
      case 'IN DEVELOPMENT':
        return 'text-[#AFD2C9] border-[#AFD2C9]/40 bg-[#AFD2C9]/15';
      case 'EXPLORING':
        return 'text-[#D96868] border-[#D96868]/40 bg-[#D96868]/15';
      default:
        return 'text-[#339671] border-[#339671]/40 bg-[#339671]/15';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="terminal-panel p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#27332E] gap-4 mb-2">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#080D0B] border border-[#27332E] text-xs font-mono text-[#AFD2C9] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#339671] animate-pulse-dot" />
              <span>MODULE_09 // LIVE TELEMETRY & ACTIVE FOCUS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F0F1F1]">
              Now — What I'm Actively Learning & Building
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#339671]">
            <RadioIcon size={16} className="animate-spin" />
            <span>LIVE DESK TELEMETRY</span>
          </div>
        </div>
      </div>

      {/* Real-time Focus Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {NOW_TELEMETRY.map((item, idx) => (
          <div
            key={idx}
            className="terminal-panel p-6 flex flex-col justify-between hover:border-[#339671]/60 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`text-[10px] font-mono px-2.5 py-1 rounded border font-bold ${getCategoryColor(
                    item.category
                  )}`}
                >
                  {item.category}
                </span>
                <span className="text-xs font-mono text-[#58635E]">
                  TAG: {item.tag}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#F0F1F1] mb-2">
                {item.headline}
              </h3>

              <p className="text-xs sm:text-sm text-[#9EA1A1] leading-relaxed mb-6 font-sans">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#27332E] flex items-center justify-between text-xs font-mono text-[#58635E]">
              <span>STATUS:</span>
              <span className="text-[#AFD2C9] font-medium">{item.progress}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
