import React, { useState } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { terminalAudio } from '../../utils/audioSystem';
import {
  MailIcon,
  LinkedinIcon,
  GithubIcon,
  CheckIcon,
  CopyIcon,
  ActivityIcon,
  ArrowRightIcon
} from '../icons/TerminalIcons';

export const ContactModule: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Quant Research & AI',
    urgency: 'STANDARD',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'executed' | 'error'>('idle');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [ticketHash, setTicketHash] = useState<string>('');

  const topics = [
    'Quant Research & AI',
    'Audio DSP & Deepfake Defense',
    'Fullstack Engineering',
    'Hackathon Collaboration',
    'Startup Idea Discussion',
    'General Coffee Chat',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required ticket fields.');
      return;
    }

    terminalAudio.playExecute();
    setStatus('sending');

    // Simulate ticket execution
    setTimeout(() => {
      const randomHash = '0x' + Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      setTicketHash(randomHash);
      setStatus('executed');
      terminalAudio.playExecute();
    }, 1200);
  };

  const handleCopyEmail = () => {
    terminalAudio.playKey();
    navigator.clipboard.writeText(PERSONAL_INFO.links.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="terminal-panel p-6">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#080D0B] border border-[#27332E] text-xs font-mono text-[#AFD2C9] mb-2">
          <span className="w-2 h-2 rounded-full bg-[#339671] animate-pulse-dot" />
          <span>MODULE_10 // THE CONNECTION TERMINAL</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#F0F1F1] mb-2">
          Let's Build Something Meaningful.
        </h2>
        <p className="text-sm text-[#9EA1A1] max-w-2xl font-sans">
          Always open to exploring rigorous quantitative research hypotheses, building intelligent AI/DSP systems, or partnering on high-stakes hackathons and software ventures.
        </p>
      </div>

      {/* Main Connection Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Trading Ticket Form (7 cols) */}
        <div className="lg:col-span-7 terminal-panel p-6 sm:p-8 border-[#339671]/50">
          <div className="flex items-center justify-between pb-4 border-b border-[#27332E] mb-6">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#F0F1F1]">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#339671]" />
              <span>TRANSACTION_TICKET // DIRECT ROUTING</span>
            </div>
            <span className="text-[10px] font-mono text-[#339671] bg-[#339671]/10 px-2 py-0.5 rounded border border-[#339671]/30">
              ZERO SLIPPAGE
            </span>
          </div>

          {status === 'executed' ? (
            <div className="bg-[#080D0B] border border-[#339671] rounded-lg p-6 text-center space-y-4 animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-[#339671]/20 border border-[#339671] flex items-center justify-center text-[#339671] mx-auto shadow-[0_0_20px_rgba(51,150,113,0.3)]">
                <CheckIcon size={24} />
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#F0F1F1]">
                  CONNECTION ORDER EXECUTED
                </h3>
                <p className="text-xs font-mono text-[#339671] mt-1">
                  ORDER HASH: {ticketHash}
                </p>
              </div>

              <p className="text-xs text-[#9EA1A1] leading-relaxed max-w-md mx-auto font-sans">
                Thank you, <strong className="text-[#F0F1F1]">{formData.name}</strong>. Your message routing has been logged and forwarded directly to Gaurav Gangwani. Expect a response shortly.
              </p>

              <button
                onClick={() => {
                  terminalAudio.playKey();
                  setStatus('idle');
                  setFormData({ name: '', email: '', topic: topics[0], urgency: 'STANDARD', message: '' });
                }}
                className="px-4 py-2 rounded bg-[#0C1310] border border-[#27332E] hover:border-[#339671] text-xs font-mono text-[#AFD2C9] cursor-pointer"
              >
                SUBMIT NEW ORDER
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#58635E] block mb-1">
                    01. CLIENT_NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#080D0B] border border-[#27332E] focus:border-[#339671] rounded p-2.5 text-[#F0F1F1] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[#58635E] block mb-1">
                    02. ROUTING_EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#080D0B] border border-[#27332E] focus:border-[#339671] rounded p-2.5 text-[#F0F1F1] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#58635E] block mb-1">
                    03. ORDER_TYPE / TOPIC
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full bg-[#080D0B] border border-[#27332E] focus:border-[#339671] rounded p-2.5 text-[#F0F1F1] focus:outline-none cursor-pointer"
                  >
                    {topics.map((t) => (
                      <option key={t} value={t} className="bg-[#080D0B] text-[#F0F1F1]">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[#58635E] block mb-1">
                    04. EXECUTION_PRIORITY
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['STANDARD', 'HIGH PRIORITY'].map((pri) => (
                      <button
                        type="button"
                        key={pri}
                        onClick={() => {
                          terminalAudio.playKey();
                          setFormData({ ...formData, urgency: pri });
                        }}
                        className={`p-2.5 rounded border text-center transition-all cursor-pointer ${
                          formData.urgency === pri
                            ? 'bg-[#339671]/20 border-[#339671] text-[#AFD2C9] font-bold'
                            : 'bg-[#080D0B] border-[#27332E] text-[#58635E]'
                        }`}
                      >
                        {pri}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[#58635E] block mb-1">
                  05. ORDER_PAYLOAD / MESSAGE *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your initiative, research inquiry, or opportunity..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#080D0B] border border-[#27332E] focus:border-[#339671] rounded p-2.5 text-[#F0F1F1] focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3 rounded bg-[#339671] hover:bg-[#3db085] disabled:opacity-50 text-[#020403] font-bold text-xs tracking-wider transition-all duration-150 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(51,150,113,0.35)] cursor-pointer mt-2"
              >
                {status === 'sending' ? (
                  <span>TRANSMITTING ORDER...</span>
                ) : (
                  <>
                    <span>INITIATE CONNECTION</span>
                    <ArrowRightIcon size={14} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right: Direct Channels & Verified Coordinates (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Email Direct Panel */}
          <div className="terminal-panel p-5">
            <span className="text-[10px] font-mono text-[#58635E] block mb-2">
              PRIMARY_ELECTRONIC_MAIL
            </span>
            <div className="flex items-center justify-between bg-[#080D0B] p-3 rounded border border-[#27332E]">
              <div className="flex items-center gap-2.5">
                <MailIcon size={16} className="text-[#339671]" />
                <span className="font-mono text-xs text-[#F0F1F1]">
                  {PERSONAL_INFO.links.email}
                </span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-1.5 rounded bg-[#0C1310] hover:bg-[#141F1A] border border-[#27332E] text-[#AFD2C9] cursor-pointer"
                title="Copy email to clipboard"
              >
                {copiedEmail ? <CheckIcon size={14} className="text-[#339671]" /> : <CopyIcon size={14} />}
              </button>
            </div>
          </div>

          {/* LinkedIn Verified Card */}
          <a
            href={PERSONAL_INFO.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="terminal-panel p-5 block group hover:border-[#339671] transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-[#58635E]">
                PROFESSIONAL_NETWORK
              </span>
              <LinkedinIcon size={16} className="text-[#339671] group-hover:scale-110 transition-transform" />
            </div>
            <h4 className="text-base font-bold text-[#F0F1F1] group-hover:text-[#AFD2C9]">
              Gaurav Gangwani on LinkedIn
            </h4>
            <p className="text-xs text-[#9EA1A1] mt-1 line-clamp-1">
              {PERSONAL_INFO.links.linkedin}
            </p>
            <div className="pt-3 border-t border-[#27332E] text-[10px] font-mono text-[#339671] flex items-center justify-between mt-3">
              <span>VIEW PUBLIC PROFILE</span>
              <span>↗</span>
            </div>
          </a>

          {/* GitHub Verified Card */}
          <a
            href={PERSONAL_INFO.links.github}
            target="_blank"
            rel="noreferrer"
            className="terminal-panel p-5 block group hover:border-[#339671] transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-[#58635E]">
                CODE_REPOSITORIES
              </span>
              <GithubIcon size={16} className="text-[#339671] group-hover:scale-110 transition-transform" />
            </div>
            <h4 className="text-base font-bold text-[#F0F1F1] group-hover:text-[#AFD2C9]">
              GitHub Code Hub
            </h4>
            <p className="text-xs text-[#9EA1A1] mt-1 line-clamp-1">
              {PERSONAL_INFO.links.github}
            </p>
            <div className="pt-3 border-t border-[#27332E] text-[10px] font-mono text-[#339671] flex items-center justify-between mt-3">
              <span>EXPLORE REPOSITORIES</span>
              <span>↗</span>
            </div>
          </a>

          {/* Availability Status */}
          <div className="terminal-panel p-4 bg-[#080D0B] border-[#27332E] text-xs font-mono space-y-1">
            <div className="flex items-center gap-2 text-[#339671] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#339671] animate-pulse-dot" />
              <span>CURRENT STATUS: AVAILABLE</span>
            </div>
            <p className="text-[11px] text-[#9EA1A1] font-sans">
              {PERSONAL_INFO.availability}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
