import React, { useState } from 'react';
import { ACHIEVEMENTS } from '../../data/portfolioData';
import { AchievementItem } from '../../types';
import { terminalAudio } from '../../utils/audioSystem';
import {
  AwardIcon,
  ShieldCheckIcon,
  GraduationCapIcon,
  ExternalLinkIcon,
  CheckIcon
} from '../icons/TerminalIcons';

export const AchievementsModule: React.FC = () => {
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementItem>(
    ACHIEVEMENTS[0]
  );
  const [filter, setFilter] = useState<string>('ALL');

  const categories = ['ALL', 'Award', 'Olympiad', 'Academic', 'Certification'];

  const filtered = ACHIEVEMENTS.filter((item) => {
    if (filter === 'ALL') return true;
    return item.category === filter;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="terminal-panel p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#27332E] gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#080D0B] border border-[#27332E] text-xs font-mono text-[#AFD2C9] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#339671] animate-pulse-dot" />
              <span>MODULE_07 // HONORS & CREDENTIAL VERIFICATION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F0F1F1]">
              Verified Academic Awards, Olympiads & Credentials
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#AFD2C9] bg-[#339671]/15 px-3 py-1.5 rounded border border-[#339671]/40">
            <ShieldCheckIcon size={15} className="text-[#339671]" />
            <span>8 VERIFIED HONORS RECORDED</span>
          </div>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => {
                terminalAudio.playKey();
                setFilter(c);
              }}
              className={`px-3 py-1.5 rounded border transition-all cursor-pointer ${
                filter === c
                  ? 'bg-[#339671]/20 border-[#339671] text-[#AFD2C9] font-bold'
                  : 'bg-[#080D0B] border-[#27332E] text-[#9EA1A1] hover:text-[#F0F1F1]'
              }`}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((item) => {
          const isSelected = selectedAchievement.id === item.id;
          return (
            <div
              key={item.id}
              onClick={() => {
                terminalAudio.playExecute();
                setSelectedAchievement(item);
              }}
              className={`terminal-panel p-5 flex flex-col justify-between cursor-pointer transition-all ${
                isSelected
                  ? 'border-[#339671] bg-[#0C1310] shadow-[0_0_15px_rgba(51,150,113,0.2)]'
                  : 'hover:border-[#339671]/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <span className="text-[#339671]">{item.year}</span>
                  <span className="text-[10px] text-[#D4AC65] bg-[#D4AC65]/10 border border-[#D4AC65]/30 px-1.5 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#F0F1F1] mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#AFD2C9] font-mono mb-2">
                  {item.issuer}
                </p>

                {item.rankOrScore && (
                  <div className="inline-block px-2 py-0.5 bg-[#339671]/15 border border-[#339671]/40 rounded text-xs font-mono text-[#339671] font-bold mb-3">
                    {item.rankOrScore}
                  </div>
                )}

                <p className="text-xs text-[#9EA1A1] line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#27332E] flex items-center justify-between text-[11px] font-mono text-[#58635E] mt-4">
                <span>VERIFIED</span>
                <span className="text-[#339671]">INSPECT →</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Credential Dossier */}
      {selectedAchievement && (
        <div className="terminal-panel p-6 sm:p-8 border-[#339671]/60 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#27332E] gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded bg-[#0C1310] border border-[#339671] text-[#339671]">
                <AwardIcon size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#F0F1F1]">
                  {selectedAchievement.title}
                </h3>
                <p className="text-xs font-mono text-[#339671]">
                  ISSUER: {selectedAchievement.issuer} // YEAR: {selectedAchievement.year}
                </p>
              </div>
            </div>

            {selectedAchievement.rankOrScore && (
              <span className="px-3 py-1 bg-[#339671] text-[#020403] font-mono font-bold text-xs rounded self-start sm:self-auto">
                {selectedAchievement.rankOrScore}
              </span>
            )}
          </div>

          <p className="text-sm text-[#9EA1A1] leading-relaxed mb-4 font-sans">
            {selectedAchievement.description}
          </p>

          <div className="pt-3 border-t border-[#27332E] flex items-center justify-between text-xs font-mono text-[#58635E]">
            <span>CATEGORY: {selectedAchievement.category.toUpperCase()}</span>
            <span className="text-[#339671]">STATUS: 100% AUTHENTIC RECORD</span>
          </div>
        </div>
      )}
    </div>
  );
};
