import React, { useState } from 'react';
import { CORE_JUDGING_CRITERIA } from '../../data/devpostCriteria';
import { CheckCircle2, ChevronDown, ChevronUp, Sparkles, ShieldCheck, Video, Cpu, ArrowUpRight } from 'lucide-react';

export const JudgingCriteriaGrid: React.FC = () => {
  const [expandedCriteria, setExpandedCriteria] = useState<Record<string, boolean>>({
    'criterion-1-innovation': true,
    'criterion-2-architecture': true,
    'criterion-3-demo-readiness': true,
  });

  const toggleExpand = (id: string) => {
    setExpandedCriteria((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'criterion-1-innovation':
        return <Sparkles className="w-5 h-5 text-cyber-volt" />;
      case 'criterion-2-architecture':
        return <Cpu className="w-5 h-5 text-cyber-cyan" />;
      case 'criterion-3-demo-readiness':
        return <Video className="w-5 h-5 text-cyber-violet" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-cyber-cyan" />;
    }
  };

  const getBorderColor = (id: string) => {
    switch (id) {
      case 'criterion-1-innovation':
        return 'border-cyber-volt/30 hover:border-cyber-volt/60 hover:shadow-glow-volt/20';
      case 'criterion-2-architecture':
        return 'border-cyber-cyan/30 hover:border-cyber-cyan/60 hover:shadow-glow-cyan/20';
      case 'criterion-3-demo-readiness':
        return 'border-cyber-violet/30 hover:border-cyber-violet/60 hover:shadow-glow-violet/20';
      default:
        return 'border-slate-800';
    }
  };

  const getBadgeClass = (id: string) => {
    switch (id) {
      case 'criterion-1-innovation':
        return 'cyber-badge-volt';
      case 'criterion-2-architecture':
        return 'cyber-badge-cyan';
      case 'criterion-3-demo-readiness':
        return 'cyber-badge-violet';
      default:
        return 'cyber-badge-cyan';
    }
  };

  return (
    <div className="space-y-8" id="judging-criteria-section">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Stage 2 Devpost Rubric Alignment &bull; 100% Score Coverage</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-100 font-mono">
          Core Judging Criteria <span className="cyber-gradient-text">(40 / 30 / 30 Alignment)</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
          Comprehensive, evidence-backed evaluation mapping every capability of the Universal Bounty Swarm directly to Google Cloud Hackathon requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {CORE_JUDGING_CRITERIA.map((criterion) => {
          const isExpanded = !!expandedCriteria[criterion.id];
          return (
            <div
              key={criterion.id}
              className={`glass-panel rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between border ${getBorderColor(
                criterion.id
              )}`}
              data-testid={`criterion-card-${criterion.id}`}
            >
              <div className="space-y-5">
                {/* Header Badge Row */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`cyber-badge ${getBadgeClass(criterion.id)}`}>
                    {criterion.weight}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1">
                    <span>Target:</span>
                    <span className="text-cyber-volt">{criterion.scoreTarget}</span>
                  </span>
                </div>

                {/* Title & Icon */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-obsidian-900/80 border border-slate-800 shrink-0">
                    {getIcon(criterion.id)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-100 font-mono leading-snug">
                      {criterion.name}
                    </h3>
                    <p className="text-xs text-cyber-cyan font-mono mt-0.5">
                      {criterion.evaluatorFocus}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {criterion.description}
                </p>

                {/* BYOF Callout */}
                <div className="p-3.5 rounded-xl bg-obsidian-950/80 border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyber-volt">
                    <Sparkles className="w-3 h-3" />
                    <span>Bring Your Own Friction (BYOF) Proof</span>
                  </div>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    {criterion.byofHighlight}
                  </p>
                </div>

                {/* Key Deliverables */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">
                    Key Deliverables & Specifications
                  </h4>
                  <ul className="space-y-2">
                    {criterion.keyDeliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyber-volt shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Expandable Technical Deep-Dive */}
                {isExpanded && (
                  <div className="pt-4 border-t border-slate-800/80 space-y-4 animate-fadeIn">
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono font-bold uppercase text-cyber-cyan tracking-wider">
                        Verifiable Evidence & Production Proofs
                      </h4>
                      <ul className="space-y-1.5">
                        {criterion.evidence.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-400 font-sans">
                            <span className="text-cyber-cyan font-mono font-bold">&bull;</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs font-mono font-bold uppercase text-cyber-violet tracking-wider">
                        Architectural Moat & Defense
                      </h4>
                      <ul className="space-y-1.5">
                        {criterion.technicalMoat.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-400 font-mono">
                            <ArrowUpRight className="w-3 h-3 text-cyber-violet shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Accordion Toggle */}
              <button
                type="button"
                onClick={() => toggleExpand(criterion.id)}
                className="mt-5 pt-3 border-t border-slate-800/60 w-full flex items-center justify-between text-xs font-mono text-slate-400 hover:text-cyber-cyan transition-colors"
                aria-expanded={isExpanded}
                aria-label={`Toggle deep-dive for ${criterion.name}`}
              >
                <span>{isExpanded ? 'Collapse Deep-Dive' : 'Expand Deep-Dive & Evidence'}</span>
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
