import React, { useState, useEffect } from 'react';
import { ModuleId } from '../../types';
import { MODULES, PERSONAL_INFO, PROJECTS } from '../../data/portfolioData';
import { terminalAudio } from '../../utils/audioSystem';
import {
  SearchIcon,
  XIcon,
  TerminalIcon,
  ChevronRightIcon,
  ArrowRightIcon
} from '../icons/TerminalIcons';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveModule: (id: ModuleId) => void;
  onSelectProject?: (projId: string) => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  setActiveModule,
  onSelectProject,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter commands and projects based on search query
  const moduleCommands = MODULES.map((m) => ({
    id: `mod-${m.id}`,
    title: `Go to ${m.name}`,
    category: 'MODULE',
    detail: m.tagline,
    action: () => {
      setActiveModule(m.id);
      onClose();
    },
  }));

  const projectCommands = PROJECTS.map((p) => ({
    id: `proj-${p.id}`,
    title: p.title,
    category: 'PROJECT',
    detail: `${p.category} // ${p.status}`,
    action: () => {
      setActiveModule('projects');
      if (onSelectProject) onSelectProject(p.id);
      onClose();
    },
  }));

  const quickActions = [
    {
      id: 'act-linkedin',
      title: 'Open LinkedIn Profile',
      category: 'EXTERNAL',
      detail: PERSONAL_INFO.links.linkedin,
      action: () => {
        window.open(PERSONAL_INFO.links.linkedin, '_blank');
        onClose();
      },
    },
    {
      id: 'act-github',
      title: 'Open GitHub Repository',
      category: 'EXTERNAL',
      detail: PERSONAL_INFO.links.github,
      action: () => {
        window.open(PERSONAL_INFO.links.github, '_blank');
        onClose();
      },
    },
    {
      id: 'act-contact',
      title: 'Initiate Direct Connection Ticket',
      category: 'CONTACT',
      detail: 'Open trading ticket connection modal',
      action: () => {
        setActiveModule('contact');
        onClose();
      },
    },
  ];

  const allItems = [...moduleCommands, ...projectCommands, ...quickActions].filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.detail.toLowerCase().includes(q)
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      terminalAudio.playKey();
      setSelectedIndex((prev) => (prev + 1) % allItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      terminalAudio.playKey();
      setSelectedIndex((prev) => (prev - 1 + allItems.length) % allItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (allItems[selectedIndex]) {
        terminalAudio.playExecute();
        allItems[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[150] bg-[#020403]/80 backdrop-blur-md flex items-start justify-center pt-20 p-4 animate-fadeIn">
      <div className="w-full max-w-xl bg-[#080D0B] border border-[#27332E] rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden font-mono text-xs">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#27332E] bg-[#0C1310]">
          <SearchIcon size={16} className="text-[#339671]" />
          <input
            autoFocus
            type="text"
            placeholder="Type a module (e.g. 'research', 'projects', 'contact') or command..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-[#F0F1F1] placeholder-[#58635E] focus:outline-none text-xs"
          />
          <button
            onClick={onClose}
            className="text-[#9EA1A1] hover:text-[#AFD2C9] p-1 cursor-pointer"
          >
            <XIcon size={15} />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-[#27332E]/30">
          {allItems.length === 0 ? (
            <div className="py-8 text-center text-[#58635E]">
              NO MATCHING COMMANDS FOUND IN REGISTRY
            </div>
          ) : (
            allItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    terminalAudio.playExecute();
                    item.action();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left px-3 py-2.5 rounded flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0C1310] border border-[#339671]/70 text-[#F0F1F1]'
                      : 'text-[#9EA1A1] hover:text-[#F0F1F1] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                        item.category === 'MODULE'
                          ? 'bg-[#339671]/20 text-[#AFD2C9] border border-[#339671]/40'
                          : item.category === 'PROJECT'
                          ? 'bg-[#D4AC65]/20 text-[#D4AC65] border border-[#D4AC65]/40'
                          : 'bg-[#020403] text-[#58635E] border border-[#27332E]'
                      }`}
                    >
                      {item.category}
                    </span>
                    <div>
                      <div className="font-semibold">{item.title}</div>
                      <div className="text-[10px] text-[#58635E]">{item.detail}</div>
                    </div>
                  </div>
                  {isSelected && <ChevronRightIcon size={14} className="text-[#339671]" />}
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-[#27332E] bg-[#020403] text-[10px] text-[#58635E] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>[↑↓] SELECT</span>
            <span>[ENTER] EXECUTE</span>
            <span>[ESC] CLOSE</span>
          </div>
          <span className="text-[#339671]">QUANT.OS CLI ENGINE</span>
        </div>
      </div>
    </div>
  );
};
