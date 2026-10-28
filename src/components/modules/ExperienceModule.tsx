import React, { useState } from 'react';
import { EXPERIENCES } from '../../data/portfolioData';
import { terminalAudio } from '../../utils/audioSystem';
import {
  LayersIcon,
  ShieldCheckIcon,
  CheckIcon,
  CpuIcon,
  AwardIcon
} from '../icons/TerminalIcons';

export const ExperienceModule: React.FC = () => {
  const [activeExpId, setActiveExpId] = useState<string>(EXPERIENCES[0].id);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="terminal-panel p-6">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#080D0B] border border-[#27332E] text-xs font-mono text-[#AFD2C9] mb-2">
          <span className="w-2 h-2 rounded-full bg-[#339671] animate-pulse-dot" />
          <span>MODULE_06 // EXPERIENCE & LEADERSHIP</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#F0F1F1] mb-2">
          Practical Execution, Hackathon Leads & Operations
        </h2>
        <p className="text-sm text-[#9EA1A1] max-w-2xl font-sans">
          Ground-level technical integration, commercial operations analysis, and student leadership—focused on verifiable contributions and zero embellished titles.
        </p>
      </div>

      {/* Experience Timeline Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Role Navigation Buttons (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          {EXPERIENCES.map((exp) => {
            const isSelected = activeExpId === exp.id;
            return (
              <button
                key={exp.id}
                onClick={() => {
                  terminalAudio.playExecute();
                  setActiveExpId(exp.id);
                }}
                className={`w-full p-4 rounded border text-left font-mono transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0C1310] border-[#339671] shadow-[0_0_15px_rgba(51,150,113,0.18)]'
                    : 'bg-[#080D0B] border-[#27332E] hover:border-[#339671]/40'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className={`font-bold ${isSelected ? 'text-[#339671]' : 'text-[#58635E]'}`}>
                    {exp.period}
                  </span>
                  <span className="text-[10px] text-[#AFD2C9] bg-[#020403] px-2 py-0.5 rounded border border-[#27332E]">
                    {exp.type.split(' ')[0]}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#F0F1F1] line-clamp-1">
                  {exp.role}
                </h4>
                <p className="text-xs text-[#9EA1A1] line-clamp-1 mt-0.5">
                  {exp.organization}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right: Detailed Experience Dossier (8 cols) */}
        <div className="lg:col-span-8">
          {(() => {
            const exp = EXPERIENCES.find((e) => e.id === activeExpId) || EXPERIENCES[0];
            return (
              <div className="terminal-panel p-6 sm:p-8 border-[#339671]/60 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#27332E] gap-2 mb-6">
                  <div>
                    <span className="text-xs font-mono text-[#339671] block mb-1">
                      {exp.period} // {exp.type}
                    </span>
                    <h3 className="text-2xl font-bold text-[#F0F1F1]">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-[#AFD2C9] font-mono mt-0.5">
                      {exp.organization}
                    </p>
                  </div>

                  <div className="self-start sm:self-auto px-3 py-1 bg-[#339671]/15 border border-[#339671]/40 text-[#AFD2C9] text-xs font-mono rounded">
                    VERIFIED ENGAGEMENT
                  </div>
                </div>

                <p className="text-sm text-[#9EA1A1] leading-relaxed mb-6 font-sans">
                  {exp.description}
                </p>

                {/* Key Responsibilities */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono text-[#F0F1F1] font-bold mb-3 flex items-center gap-2">
                    <CheckIcon size={14} className="text-[#339671]" />
                    <span>CORE RESPONSIBILITIES & DELIVERABLES:</span>
                  </h4>
                  <div className="space-y-2.5">
                    {exp.responsibilities.map((resp, i) => (
                      <div
                        key={i}
                        className="bg-[#080D0B] p-3 rounded border border-[#27332E] flex items-start gap-3"
                      >
                        <span className="text-[#339671] font-mono text-xs mt-0.5">
                          0{i + 1}.
                        </span>
                        <span className="text-xs sm:text-sm text-[#9EA1A1] leading-relaxed font-sans">
                          {resp}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highlight banner */}
                <div className="bg-[#0C1310] p-4 rounded border border-[#339671]/30 mb-6">
                  <span className="text-[10px] font-mono text-[#339671] block mb-1">
                    KEY OUTCOME / IMPACT:
                  </span>
                  <p className="text-xs sm:text-sm text-[#AFD2C9] font-medium font-sans">
                    {exp.highlight}
                  </p>
                </div>

                {/* Skills Chips */}
                <div className="pt-4 border-t border-[#27332E] flex flex-wrap gap-2">
                  {exp.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 text-xs font-mono bg-[#080D0B] border border-[#27332E] text-[#AFD2C9] rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};
