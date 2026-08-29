import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';
import { affiliateTiers, AffiliateTier } from '../../data/affiliatesData';

interface EarningsCalculatorProps {
  onTierChange?: (tier: AffiliateTier) => void;
}

export const EarningsCalculator: React.FC<EarningsCalculatorProps> = ({ onTierChange }) => {
  const [teamsReferred, setTeamsReferred] = useState<number>(10);
  const [avgMonthlySpend, setAvgMonthlySpend] = useState<number>(1200);

  // Dynamic Tier calculation based on referred teams
  const getTier = (teams: number): { name: string; percent: number; badge: string; id: string } => {
    if (teams >= 50) return { id: 'diamond-syndicate', name: 'Diamond Syndicate', percent: 25, badge: 'cyber-badge-emerald' };
    if (teams >= 25) return { id: 'gold-commander', name: 'Gold Commander', percent: 20, badge: 'cyber-badge-volt' };
    if (teams >= 10) return { id: 'silver-hunter', name: 'Silver Hunter', percent: 15, badge: 'cyber-badge-cyan' };
    return { id: 'bronze-scout', name: 'Bronze Scout', percent: 10, badge: 'cyber-badge-violet' };
  };

  const currentTier = getTier(teamsReferred);
  const totalVolume = teamsReferred * avgMonthlySpend;
  const monthlyEarnings = totalVolume * (currentTier.percent / 100);
  const annualEarnings = monthlyEarnings * 12;

  useEffect(() => {
    const matched = affiliateTiers.find((t) => t.id === currentTier.id);
    if (matched && onTierChange) {
      onTierChange(matched);
    }
  }, [currentTier.id, onTierChange]);

  return (
    <div className="glass-panel-glow p-6 sm:p-8 rounded-2xl space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold font-mono text-slate-100 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-cyber-volt" />
            <span>Dynamic Earnings Calculator</span>
          </h2>
          <p className="text-xs text-slate-400 font-sans">Simulate your recurring monthly and annual earnings</p>
        </div>
        <span className={`cyber-badge ${currentTier.badge}`}>
          Current Tier: {currentTier.name} ({currentTier.percent}%)
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Sliders */}
        <div className="space-y-6">
          {/* Teams Referred Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300 font-medium">Active Teams Referred:</span>
              <span className="text-cyber-cyan font-bold text-sm">{teamsReferred} Teams</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={teamsReferred}
              onChange={(e) => setTeamsReferred(Number(e.target.value))}
              aria-label="Active Teams Referred"
              className="w-full h-2 bg-obsidian-900 rounded-lg appearance-none cursor-pointer accent-cyber-cyan"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>1 (Bronze)</span>
              <span>10 (Silver)</span>
              <span>25 (Gold)</span>
              <span>50+ (Diamond)</span>
            </div>
          </div>

          {/* Average Spend Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300 font-medium">Avg. Monthly Spend per Team:</span>
              <span className="text-cyber-volt font-bold text-sm">${avgMonthlySpend.toLocaleString()}/mo</span>
            </div>
            <input
              type="range"
              min="300"
              max="5000"
              step="100"
              value={avgMonthlySpend}
              onChange={(e) => setAvgMonthlySpend(Number(e.target.value))}
              aria-label="Average Monthly Spend per Team"
              className="w-full h-2 bg-obsidian-900 rounded-lg appearance-none cursor-pointer accent-cyber-volt"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>$300 (Starter)</span>
              <span>$2,000 (Growth)</span>
              <span>$5,000 (Enterprise)</span>
            </div>
          </div>
        </div>

        {/* Result Highlight Box */}
        <div className="p-6 rounded-2xl bg-obsidian-900 border border-slate-800 space-y-6 text-center lg:text-left shadow-inner">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[11px] font-mono text-slate-400">Monthly Yield</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-cyber-volt font-mono mt-1">
                ${Math.round(monthlyEarnings).toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-mono text-slate-400">Annualized Run-Rate</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-cyber-cyan font-mono mt-1">
                ${Math.round(annualEarnings).toLocaleString()}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-obsidian-950 border border-slate-800/80 text-xs font-mono text-slate-300 flex items-center justify-between">
            <span>Commission Rate:</span>
            <span className="text-cyber-volt font-bold">{currentTier.percent}% Recurring</span>
          </div>

          <div className="text-[11px] font-mono text-slate-500 text-center lg:text-left flex items-center justify-center lg:justify-start gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-cyber-emerald" />
            <span>Based on ${totalVolume.toLocaleString()}/mo total referred subscription volume</span>
          </div>
        </div>
      </div>
    </div>
  );
};
