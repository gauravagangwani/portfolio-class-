import React from 'react';
import { EDUCATION_DATA } from '../../data/portfolioData';
import {
  GraduationCapIcon,
  ShieldCheckIcon,
  CheckIcon,
  ActivityIcon
} from '../icons/TerminalIcons';

export const EducationModule: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="terminal-panel p-6">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#080D0B] border border-[#27332E] text-xs font-mono text-[#AFD2C9] mb-2">
          <span className="w-2 h-2 rounded-full bg-[#339671] animate-pulse-dot" />
          <span>MODULE_08 // ACADEMIC INSTITUTION & RESEARCH</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#F0F1F1] mb-2">
          Higher Education & Formal Computing Curriculum
        </h2>
        <p className="text-sm text-[#9EA1A1] max-w-2xl font-sans">
          Rigorous undergraduate study at the intersection of theoretical computing, artificial intelligence, and applied software engineering.
        </p>
      </div>

      {/* Main Education Showcase Card */}
      <div className="terminal-panel p-6 sm:p-8 border-[#339671]/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#27332E] gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-[#080D0B] border border-[#339671] flex items-center justify-center text-[#339671] shadow-[0_0_20px_rgba(51,150,113,0.25)]">
              <GraduationCapIcon size={28} />
            </div>
            <div>
              <span className="text-xs font-mono text-[#339671] block mb-0.5">
                UNDERGRADUATE STUDIES // {EDUCATION_DATA.duration}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#F0F1F1]">
                {EDUCATION_DATA.institution}
              </h3>
              <p className="text-sm text-[#AFD2C9] font-mono mt-1 font-semibold">
                {EDUCATION_DATA.degree} in {EDUCATION_DATA.field}
              </p>
            </div>
          </div>

          <div className="self-start sm:self-auto px-3 py-1.5 bg-[#339671]/15 border border-[#339671]/40 text-[#AFD2C9] text-xs font-mono rounded">
            {EDUCATION_DATA.status}
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#080D0B] p-5 rounded border border-[#27332E]">
            <h4 className="text-xs font-mono text-[#339671] font-bold mb-3 flex items-center gap-2">
              <ActivityIcon size={14} className="text-[#339671]" />
              <span>CORE FOCUS AREAS:</span>
            </h4>
            <div className="space-y-2">
              {EDUCATION_DATA.focusAreas.map((focus, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#9EA1A1]">
                  <span className="text-[#339671] font-mono">▸</span>
                  <span>{focus}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#080D0B] p-5 rounded border border-[#27332E]">
            <h4 className="text-xs font-mono text-[#AFD2C9] font-bold mb-3 flex items-center gap-2">
              <CheckIcon size={14} className="text-[#AFD2C9]" />
              <span>CURRICULUM METHODOLOGY:</span>
            </h4>
            <div className="space-y-2">
              {EDUCATION_DATA.curriculumHighlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#9EA1A1]">
                  <span className="text-[#AFD2C9] font-mono">▸</span>
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#27332E] flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-[#58635E] gap-2">
          <span>INSTITUTION: NEWTON SCHOOL OF TECHNOLOGY</span>
          <span className="text-[#339671]">VERIFIED UNDERGRADUATE CANDIDATE</span>
        </div>
      </div>
    </div>
  );
};
