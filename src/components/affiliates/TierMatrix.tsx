import React from 'react';
import { CheckCircle2, Shield, Award, Crown, Diamond, Sparkles } from 'lucide-react';
import { affiliateTiers, AffiliateTier } from '../../data/affiliatesData';

interface TierMatrixProps {
  currentTierId?: string;
  onSelectTier?: (tier: AffiliateTier) => void;
}

export const TierMatrix: React.FC<TierMatrixProps> = ({ currentTierId, onSelectTier }) => {
  const getTierIcon = (id: string) => {
    switch (id) {
      case 'diamond-syndicate':
        return <Diamond className="w-5 h-5 text-cyber-emerald" />;
      case 'gold-commander':
        return <Crown className="w-5 h-5 text-cyber-volt" />;
      case 'silver-hunter':
        return <Award className="w-5 h-5 text-cyber-cyan" />;
      default:
        return <Shield className="w-5 h-5 text-cyber-violet" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-mono text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyber-cyan" />
            <span>4-Tier Commission Matrix</span>
          </h2>
          <p className="text-xs text-slate-400 font-sans">
            Transparent revenue-share tiers with automated escalations based on active referred engineering teams
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {affiliateTiers.map((tier) => {
          const isActive = currentTierId === tier.id || currentTierId === tier.name;
          return (
            <div
              key={tier.id}
              onClick={() => onSelectTier?.(tier)}
              className={`glass-panel p-6 rounded-2xl border flex flex-col justify-between space-y-4 transition-all relative cursor-pointer ${
                isActive
                  ? 'border-cyber-cyan bg-obsidian-900/90 shadow-xl shadow-cyber-cyan/10 ring-1 ring-cyber-cyan/50 scale-[1.02]'
                  : 'border-slate-800/90 hover:border-slate-700'
              }`}
            >
              {isActive && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-cyber-cyan text-obsidian-950 text-[10px] font-mono font-bold tracking-wider uppercase shadow-md">
                  Active Tier
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-obsidian-950 border border-slate-800">
                    {getTierIcon(tier.id)}
                  </div>
                  <span className={`cyber-badge ${tier.badgeColor}`}>
                    {tier.volumeRange}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold font-mono text-slate-100">{tier.name}</h3>
                  <div className="text-xs text-slate-400 font-mono">{tier.description}</div>
                </div>

                {/* Rates */}
                <div className="p-3 rounded-xl bg-obsidian-950 border border-slate-800/80 space-y-1 font-mono">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-slate-400">SaaS Subscriptions:</span>
                    <span className="text-lg font-extrabold text-cyber-volt">{tier.saasCommissionPercent}%</span>
                  </div>
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="text-slate-400">Bounty Resolutions:</span>
                    <span className="text-sm font-bold text-cyber-cyan">{tier.bountyCommissionPercent}%</span>
                  </div>
                </div>

                {/* Perks Checklist */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="text-[11px] font-mono text-slate-300 font-semibold">Tier Perks:</div>
                  <ul className="space-y-1.5 text-xs text-slate-400 font-sans">
                    {tier.perks.map((perk, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyber-cyan shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-tight">{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-500">
                <span>Payout: {tier.payoutFrequency}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
