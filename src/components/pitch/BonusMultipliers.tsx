import React, { useState } from 'react';
import { BONUS_MULTIPLIERS_DATA } from '../../data/devpostCriteria';
import {
  Sparkles,
  BookOpen,
  Share2,
  Cpu,
  Video,
  Music,
  ExternalLink,
  Plus,
  CheckCircle2,
  Trophy,
} from 'lucide-react';

export const BonusMultipliers: React.FC = () => {
  const [activeBonuses, setActiveBonuses] = useState<Record<string, boolean>>({
    'bonus-devto-article': true,
    'bonus-social-promotion': true,
    'bonus-gemma-auditor': true,
    'bonus-veo-walkthrough': true,
    'bonus-lyria-sonification': false,
  });

  const toggleBonus = (id: string) => {
    setActiveBonuses((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'book-open':
        return <BookOpen className="w-4 h-4" />;
      case 'share-2':
        return <Share2 className="w-4 h-4" />;
      case 'cpu':
        return <Cpu className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'music':
        return <Music className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const getBadgeClass = (color: string) => {
    switch (color) {
      case 'volt':
        return 'cyber-badge-volt';
      case 'cyan':
        return 'cyber-badge-cyan';
      case 'violet':
        return 'cyber-badge-violet';
      case 'emerald':
        return 'cyber-badge-emerald';
      default:
        return 'cyber-badge-cyan';
    }
  };

  // Compute total active bonus points, capped at +1.0 as per Devpost Stage 3 Rules
  const rawBonusPoints = BONUS_MULTIPLIERS_DATA.reduce((acc, item) => {
    return activeBonuses[item.id] ? acc + item.points : acc;
  }, 0);

  const cappedBonusPoints = Math.min(1.0, rawBonusPoints);
  const baseScore = 5.0;
  const finalProjectedScore = (baseScore + cappedBonusPoints).toFixed(1);

  return (
    <div className="space-y-8" id="bonus-multipliers-section">
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-violet/10 border border-cyber-violet/30 text-cyber-violet text-xs font-mono">
          <Trophy className="w-3.5 h-3.5" />
          <span>Stage 3 Bonus Engine &bull; Multi-Model AI & Public Amplification</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-100 font-mono">
          Stage 3 <span className="violet-gradient-text">Bonus Points Multipliers</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
          Interactive calculator and multi-model showcase maximizing the Devpost rubric with published technical content, social proof, and multi-model Google AI integration.
        </p>
      </div>

      {/* Interactive Score Calculator Banner */}
      <div className="glass-panel-violet p-6 rounded-2xl border border-cyber-violet/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-cyber-violet font-mono text-xs font-bold uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Devpost Final Score Projector</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-100 font-mono">
            Projected Evaluation Score: <span className="text-cyber-volt">{finalProjectedScore}</span> / 6.0 Max
          </h3>
          <p className="text-xs text-slate-400 font-sans max-w-xl">
            Base Rubric Score (5.0/5.0) + Active Stage 3 Bonus Multipliers (+{cappedBonusPoints.toFixed(1)} / +1.0 max). Toggle items below to adjust calculation.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2 shrink-0">
          <div className="px-5 py-3 rounded-xl bg-obsidian-950/90 border border-cyber-violet/40 font-mono text-center shadow-glow-violet/30">
            <span className="text-[10px] text-slate-400 block uppercase">Projected Total</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-cyber-volt">
              {finalProjectedScore} <span className="text-xs text-slate-400 font-normal">/ 6.0</span>
            </span>
          </div>
          <span className="text-[11px] font-mono text-cyber-cyan">
            {cappedBonusPoints >= 1.0 ? '✓ Maximum Stage 3 Bonus Achieved (+1.0)' : `+${(1.0 - cappedBonusPoints).toFixed(1)} bonus potential remaining`}
          </span>
        </div>
      </div>

      {/* Bonus Multiplier Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BONUS_MULTIPLIERS_DATA.map((item) => {
          const isActive = !!activeBonuses[item.id];
          return (
            <div
              key={item.id}
              className={`glass-panel p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between border ${
                isActive
                  ? 'border-cyber-violet/40 shadow-glow-violet/20 bg-obsidian-900/90'
                  : 'border-slate-800/80 opacity-70 hover:opacity-100 hover:border-slate-700'
              }`}
              data-testid={`bonus-card-${item.id}`}
            >
              <div className="space-y-4">
                {/* Header & Points */}
                <div className="flex items-center justify-between">
                  <span className={`cyber-badge ${getBadgeClass(item.badgeColor)}`}>
                    {item.tag}
                  </span>
                  <span className="text-xs font-mono font-bold text-cyber-volt flex items-center gap-1">
                    <Plus className="w-3 h-3" />
                    <span>{item.points.toFixed(1)} Pts</span>
                  </span>
                </div>

                {/* Title & Icon */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-obsidian-950 border border-slate-800 text-cyber-violet shrink-0">
                    {getIcon(item.iconName)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-100 font-mono leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-cyber-cyan font-mono mt-0.5">
                      {item.modelOrType}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Action & Toggle Controls */}
              <div className="pt-5 mt-5 border-t border-slate-800 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => toggleBonus(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    isActive
                      ? 'bg-cyber-violet text-obsidian-950 hover:bg-cyber-violet/90'
                      : 'bg-obsidian-950 border border-slate-700 text-slate-300 hover:text-white'
                  }`}
                  aria-pressed={isActive}
                  aria-label={`Toggle ${item.title}`}
                >
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isActive ? 'text-obsidian-950' : 'text-slate-500'}`} />
                  <span>{isActive ? 'Included (+0.2)' : 'Excluded (+0.0)'}</span>
                </button>

                {item.proofUrl && (
                  <a
                    href={item.proofUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-slate-400 hover:text-cyber-cyan transition-colors flex items-center gap-1"
                  >
                    <span>{item.actionLabel}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
