import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../../data/portfolioData';
import { ProjectItem } from '../../types';
import { terminalAudio } from '../../utils/audioSystem';
import {
  CpuIcon,
  ActivityIcon,
  GitBranchIcon,
  ExternalLinkIcon,
  XIcon,
  CheckIcon,
  ChevronRightIcon
} from '../icons/TerminalIcons';

interface ProjectsModuleProps {
  selectedProjectId?: string | null;
  onSelectProject?: (projId: string) => void;
}

export const ProjectsModule: React.FC<ProjectsModuleProps> = ({
  selectedProjectId,
  onSelectProject,
}) => {
  const [activeProject, setActiveProject] = useState<ProjectItem>(
    PROJECTS.find((p) => p.id === selectedProjectId) || PROJECTS[0]
  );
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  useEffect(() => {
    setIsScanning(true);
    const timer = setTimeout(() => {
      setIsScanning(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedProjectId) {
      const found = PROJECTS.find((p) => p.id === selectedProjectId);
      if (found) setActiveProject(found);
    }
  }, [selectedProjectId]);

  const categories = ['ALL', 'AI / DSP', 'Web Engineering', 'Quant Research', 'Business Systems', 'Embedded / Robotics'];

  const filteredProjects = PROJECTS.filter((p) => {
    if (filterCategory === 'ALL') return true;
    return p.category === filterCategory;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header with Scanning Animation */}
      <div className="terminal-panel p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#27332E] gap-4 mb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#080D0B] border border-[#27332E] text-xs font-mono text-[#AFD2C9] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#339671] animate-pulse-dot" />
              <span>MODULE_03 // PROJECT UNIVERSE & PIPELINES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F0F1F1]">
              Technical Implementations & System Architectures
            </h2>
          </div>

          {/* Scanning status banner */}
          <div className="flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded bg-[#020403] border border-[#27332E] text-[#9EA1A1]">
            <span className="w-2 h-2 rounded-full bg-[#339671] animate-ping" />
            <span>
              {isScanning ? 'SCANNING PROJECT UNIVERSE...' : 'REPOSITORIES SYNCHRONIZED [5/5]'}
            </span>
          </div>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                terminalAudio.playKey();
                setFilterCategory(cat);
              }}
              className={`px-3 py-1.5 rounded border transition-all cursor-pointer ${
                filterCategory === cat
                  ? 'bg-[#339671]/20 border-[#339671] text-[#AFD2C9] font-semibold'
                  : 'bg-[#080D0B] border-[#27332E] text-[#9EA1A1] hover:text-[#F0F1F1]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((project) => {
          const isSelected = activeProject.id === project.id;
          return (
            <div
              key={project.id}
              onClick={() => {
                terminalAudio.playSlide();
                setActiveProject(project);
                if (onSelectProject) onSelectProject(project.id);
              }}
              className={`terminal-panel p-5 flex flex-col justify-between cursor-pointer project-card transition-all ${
                isSelected
                  ? 'border-[#339671] shadow-[0_0_20px_rgba(51,150,113,0.18)] bg-[#0C1310]'
                  : 'hover:border-[#339671]/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <span className="text-[#339671]">{project.category}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] ${
                    project.status === 'Production'
                      ? 'bg-[#339671]/20 text-[#AFD2C9] border border-[#339671]/40'
                      : project.status === 'In Development'
                      ? 'bg-[#D4AC65]/20 text-[#D4AC65] border border-[#D4AC65]/40'
                      : 'bg-[#080D0B] text-[#58635E] border border-[#27332E]'
                  }`}>
                    {project.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#F0F1F1] mb-1 group-hover:text-[#AFD2C9]">
                  {project.title}
                </h3>
                <p className="text-xs text-[#9EA1A1] font-mono mb-3">
                  {project.subtitle}
                </p>

                <p className="text-xs text-[#9EA1A1] leading-relaxed mb-4 line-clamp-3">
                  {project.problem}
                </p>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] font-mono bg-[#020403] border border-[#27332E] text-[#AFD2C9] rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono text-[#58635E]">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-[#27332E] flex items-center justify-between text-xs font-mono text-[#58635E]">
                <span>INSPECT SYSTEM</span>
                <span className="text-[#339671]">OPEN DETAILS →</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded Project Inspector Modal / Drawer */}
      {activeProject && (
        <div className="terminal-panel p-6 sm:p-8 border-[#339671]/60 relative animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#27332E] gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#339671] mb-1">
                <span>{activeProject.category}</span>
                <span>//</span>
                <span>STATUS: {activeProject.status}</span>
              </div>
              <h3 className="text-2xl font-bold text-[#F0F1F1]">
                {activeProject.title}
              </h3>
              <p className="text-sm text-[#AFD2C9] font-mono">
                {activeProject.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {activeProject.githubUrl && (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded bg-[#080D0B] border border-[#27332E] hover:border-[#339671] text-xs font-mono text-[#F0F1F1] flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <GitBranchIcon size={14} className="text-[#339671]" />
                  <span>REPOSITORY</span>
                </a>
              )}
            </div>
          </div>

          {/* Deep dive sections: Problem vs Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#080D0B] p-4 rounded border border-[#27332E]">
              <h4 className="text-xs font-mono text-[#D96868] font-bold mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D96868]" />
                THE PROBLEM
              </h4>
              <p className="text-xs sm:text-sm text-[#9EA1A1] leading-relaxed">
                {activeProject.problem}
              </p>
            </div>

            <div className="bg-[#080D0B] p-4 rounded border border-[#27332E]">
              <h4 className="text-xs font-mono text-[#339671] font-bold mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#339671]" />
                THE ARCHITECTURE & SOLUTION
              </h4>
              <p className="text-xs sm:text-sm text-[#9EA1A1] leading-relaxed">
                {activeProject.solution}
              </p>
            </div>
          </div>

          {/* If the project has an AI/DSP Pipeline (like QuantumEdge), render the signature pipeline visualizer */}
          {activeProject.pipelineSteps && (
            <div className="bg-[#020403] p-5 rounded border border-[#339671]/40 mb-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#27332E] mb-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F0F1F1]">
                  <ActivityIcon size={15} className="text-[#339671]" />
                  <span>COORDINATED AI AUDIO DEFENSE PIPELINE</span>
                </div>
                <span className="text-[10px] font-mono text-[#339671] bg-[#339671]/15 px-2 py-0.5 rounded border border-[#339671]/30">
                  FFMPEG + ACOUSTIC DSP + INFERENCE
                </span>
              </div>

              {/* Step Flow Nodes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {activeProject.pipelineSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded bg-[#080D0B] border border-[#27332E] font-mono relative group hover:border-[#339671] transition-colors"
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#339671] mb-1">
                      <span>{step.step}</span>
                      {step.latency && (
                        <span className="text-[9px] text-[#58635E]">~{step.latency}</span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#9EA1A1] leading-normal font-sans">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gaurav's Specific Engineering Contribution */}
          <div className="bg-[#0C1310] p-5 rounded border border-[#27332E] mb-6">
            <h4 className="text-xs font-mono text-[#AFD2C9] font-bold mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#339671]" />
              ENGINEERING CONTRIBUTION & SYSTEM INTERFACES
            </h4>
            <p className="text-xs sm:text-sm text-[#9EA1A1] leading-relaxed">
              {activeProject.detailedAnalysis}
            </p>
          </div>

          {/* Metrics & Tech Stack */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-[#27332E] gap-4">
            <div className="flex flex-wrap gap-2">
              {activeProject.technologies.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-xs font-mono bg-[#080D0B] border border-[#27332E] text-[#AFD2C9] rounded"
                >
                  {t}
                </span>
              ))}
            </div>

            {activeProject.metrics && (
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                {activeProject.metrics.map((m, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="text-[#58635E]">{m.label}:</span>
                    <span className="text-[#F0F1F1] font-semibold">{m.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
