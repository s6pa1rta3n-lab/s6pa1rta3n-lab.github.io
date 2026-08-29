import React, { useState } from 'react';
import { 
  Compass, 
  Clock, 
  ShieldCheck, 
  Cpu, 
  Lock, 
  ArrowRight,
  FileCheck
} from 'lucide-react';
import { ROADMAP_PHASES, RoadmapPhase } from '../../data/strategyDocs';

export const RoadmapTimeline: React.FC = () => {
  const [selectedPhaseNumber, setSelectedPhaseNumber] = useState<number>(1);

  const selectedPhase: RoadmapPhase = ROADMAP_PHASES.find(
    (p) => p.phase === selectedPhaseNumber
  ) || ROADMAP_PHASES[0];

  const getStatusBadge = (status: RoadmapPhase['status']) => {
    switch (status) {
      case 'Completed':
        return <span className="cyber-badge cyber-badge-volt">COMPLETED</span>;
      case 'Active':
        return <span className="cyber-badge cyber-badge-cyan animate-pulse">CURRENT ACTIVE</span>;
      case 'Next':
        return <span className="cyber-badge cyber-badge-violet">UPCOMING</span>;
      case 'Planned':
        return <span className="cyber-badge cyber-badge-amber">PLANNED</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header & Architectural Overview */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="cyber-badge cyber-badge-violet">ENGINEERING BLUEPRINT</span>
              <span className="text-xs font-mono text-slate-400">Horizon: 4 Practical Scaling Phases</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-mono text-slate-100 flex items-center gap-2">
              <Compass className="w-5 h-5 text-cyber-violet" />
              Technical Roadmap: Autonomous Swarm Scaling
            </h2>
          </div>
          <div className="text-xs font-mono text-slate-400 bg-obsidian-950 p-2.5 rounded-xl border border-slate-800">
            Current Architecture: <span className="text-cyber-volt font-bold">Google Cloud Run + Firestore</span>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed max-w-4xl">
          Scaling the Universal Bounty Swarm from proven autonomous execution (195+ PRs across 42 projects) into a self-serve marketplace, autonomous self-funding bounty engine, and full enterprise IT automation fleet.
        </p>

        {/* 4-Phase Progress Step Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-slate-800/80">
          {ROADMAP_PHASES.map((phase) => {
            const isSelected = selectedPhaseNumber === phase.phase;
            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => setSelectedPhaseNumber(phase.phase)}
                className={`p-4 rounded-xl text-left font-mono transition-all border relative overflow-hidden ${
                  isSelected
                    ? 'bg-slate-800/90 border-cyber-cyan text-slate-100 shadow-glow-cyan/20 ring-1 ring-cyber-cyan/50'
                    : 'bg-obsidian-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-cyber-cyan">PHASE 0{phase.phase}</span>
                  {getStatusBadge(phase.status)}
                </div>
                <div className="text-xs font-bold text-slate-200 truncate mt-1">{phase.name}</div>
                <div className="text-[11px] text-slate-500 font-sans mt-0.5">{phase.timeline}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Phase Detailed Workspace */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800/80 bg-obsidian-900/60 shadow-xl space-y-6">
        {/* Phase Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-cyber-cyan">
                PHASE 0{selectedPhase.phase} &bull; {selectedPhase.timeline}
              </span>
              {getStatusBadge(selectedPhase.status)}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-mono text-slate-100">
              {selectedPhase.name}
            </h3>
          </div>
          <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-cyber-volt" />
            <span>Target Execution Window: {selectedPhase.timeline}</span>
          </div>
        </div>

        {/* Phase Objective */}
        <div className="p-4 rounded-xl bg-obsidian-950 border border-slate-800 space-y-1">
          <div className="text-xs font-mono font-bold text-cyber-cyan uppercase tracking-wider">
            Primary Architectural Objective
          </div>
          <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
            {selectedPhase.objective}
          </p>
        </div>

        {/* Deliverables Checklist */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold font-mono text-slate-200 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-cyber-volt" />
            <span>Key Deliverables & Milestones:</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedPhase.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-obsidian-950/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold font-mono text-slate-200">
                      {item.title}
                    </span>
                    {item.done ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyber-volt/20 text-cyber-volt border border-cyber-volt/30 font-bold flex-shrink-0">
                        DONE
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-400 border border-slate-700 flex-shrink-0">
                        PENDING
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Guarantees & Tech Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          {/* Security Guarantees */}
          <div className="p-4 rounded-xl bg-obsidian-950 border border-slate-800 space-y-3 font-mono">
            <div className="text-xs font-bold text-cyber-crimson flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Security & Compliance Guarantees:</span>
            </div>
            <ul className="space-y-2 text-xs">
              {selectedPhase.securityGuarantees.map((sec, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-300 font-sans">
                  <Lock className="w-3.5 h-3.5 text-cyber-crimson flex-shrink-0 mt-0.5" />
                  <span>{sec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Modules */}
          <div className="p-4 rounded-xl bg-obsidian-950 border border-slate-800 space-y-3 font-mono">
            <div className="text-xs font-bold text-cyber-cyan flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              <span>Target Technologies & Protocols:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedPhase.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700/80 text-slate-200 text-xs font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 font-sans pt-1">
              All infrastructure components adhere to zero-data-retention (ZDR) and strict tenant boundary isolation.
            </p>
          </div>
        </div>
      </div>

      {/* 4-Phase Side-by-Side Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ROADMAP_PHASES.map((phase) => (
          <div
            key={phase.id}
            onClick={() => setSelectedPhaseNumber(phase.phase)}
            className="cursor-pointer p-4 rounded-xl bg-obsidian-900 border border-slate-800 hover:border-cyber-cyan/40 transition-all font-mono space-y-2 group"
          >
            <div className="text-xs font-bold text-cyber-cyan flex items-center justify-between">
              <span>Phase {phase.phase}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyber-cyan group-hover:translate-x-0.5 transition-all" />
            </div>
            <div className="text-xs font-bold text-slate-100">{phase.name}</div>
            <p className="text-[11px] text-slate-400 font-sans line-clamp-2">
              {phase.objective}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
