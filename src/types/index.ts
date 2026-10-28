export type ModuleId =
  | 'overview'
  | 'about'
  | 'projects'
  | 'skills'
  | 'experience'
  | 'education'
  | 'achievements'
  | 'now'
  | 'contact';

export interface ModuleConfig {
  id: ModuleId;
  name: string;
  tagline: string;
  code: string;
  hotkey: string;
  metric: string;
  delta: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI / DSP' | 'Web Engineering' | 'Quant Research' | 'Business Systems' | 'Embedded / Robotics';
  status: 'In Development' | 'Prototype' | 'Active Exploration' | 'Production';
  problem: string;
  solution: string;
  pipelineSteps?: { step: string; desc: string; latency?: string }[];
  technologies: string[];
  metrics?: { label: string; value: string }[];
  githubUrl?: string;
  liveUrl?: string;
  detailedAnalysis: string;
}

export interface SkillNode {
  id: string;
  name: string;
  category: 'development' | 'ai_data' | 'quant' | 'product_leadership';
  status: 'demonstrated' | 'actively_learning';
  description: string;
  linkedProject?: string;
  weight: number;
  connections: string[];
}

export interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  institutionOrContext: string;
  description: string;
  category: 'education' | 'hackathon' | 'achievement' | 'leadership' | 'certification';
  badge?: string;
  verified: boolean;
  link?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  rankOrScore?: string;
  category: 'Award' | 'Olympiad' | 'Academic' | 'Certification';
  verified: boolean;
  description: string;
  credentialUrl?: string;
}

export interface MarketTickerItem {
  symbol: string;
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  isSimulated: boolean;
}
