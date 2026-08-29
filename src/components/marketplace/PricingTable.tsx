import React from 'react';
import { Check, Sparkles, Rocket } from 'lucide-react';
import { marketplacePlans, PricingPlan } from '../../data/marketplaceData';

interface PricingTableProps {
  billingCycle: 'monthly' | 'annual';
  onToggleBilling: (cycle: 'monthly' | 'annual') => void;
  onSelectPlan?: (plan: PricingPlan) => void;
}

export const PricingTable: React.FC<PricingTableProps> = ({
  billingCycle,
  onToggleBilling,
  onSelectPlan,
}) => {
  return (
    <div className="space-y-10">
      {/* Header & Switcher */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-100">
          Tiered <span className="cyber-gradient-text">Pricing Matrix</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-sans">
          Simple, predictable pricing for teams of all sizes. Scale autonomous engineering capacity and slash maintenance costs by up to 90% with zero hidden compute surcharges.
        </p>

        {/* Switcher */}
        <div className="flex items-center justify-center pt-2">
          <div className="p-1 rounded-xl bg-obsidian-900 border border-slate-800 flex items-center gap-2 font-mono text-xs shadow-inner">
            <button
              onClick={() => onToggleBilling('monthly')}
              className={`px-4 py-2 rounded-lg transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-cyber-cyan text-obsidian-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => onToggleBilling('annual')}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-cyber-volt text-obsidian-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-obsidian-950/80 text-cyber-volt font-mono font-bold">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {marketplacePlans.map((plan) => {
          const price = billingCycle === 'annual' ? plan.priceAnnualMonthly : plan.priceMonthly;
          return (
            <div
              key={plan.id}
              className={`glass-panel p-8 rounded-2xl border flex flex-col justify-between space-y-8 relative transition-all ${
                plan.popular
                  ? 'border-cyber-volt bg-obsidian-900/90 shadow-2xl shadow-cyber-volt/10 ring-1 ring-cyber-volt/50 lg:-translate-y-2'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-cyber-volt text-obsidian-950 text-xs font-mono font-bold tracking-wider uppercase shadow-lg flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Most Popular for DAOs</span>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-mono text-slate-100">{plan.name}</h3>
                  <div className="text-xs text-slate-400 font-sans mt-1">{plan.target}</div>
                </div>

                {/* Price Display */}
                <div className="p-4 rounded-xl bg-obsidian-950 border border-slate-800/80 font-mono space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-100">${price}</span>
                    <span className="text-xs text-slate-400"> / month</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {billingCycle === 'annual' ? 'Billed annually ($' + (price * 12).toLocaleString() + '/yr)' : 'Billed monthly'}
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {plan.description}
                </p>

                {/* Feature Checklist */}
                <div className="space-y-2.5 pt-4 border-t border-slate-800/80">
                  <div className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider">
                    Included Capabilities:
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300 font-sans">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-cyber-cyan shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectPlan?.(plan)}
                className={`w-full py-3 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  plan.popular
                    ? 'bg-cyber-volt text-obsidian-950 hover:bg-cyber-volt/90 shadow-lg shadow-cyber-volt/20'
                    : 'bg-obsidian-900 border border-slate-700 hover:border-cyber-cyan text-slate-200 hover:text-cyber-cyan'
                }`}
              >
                <Rocket className="w-3.5 h-3.5" />
                <span>{plan.cta}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
