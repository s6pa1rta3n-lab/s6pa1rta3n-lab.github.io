import React, { useState } from 'react';
import { 
  FileText, 
  Layers, 
  TrendingUp, 
  DollarSign, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  Users, 
  Building2, 
  Award, 
  Heart,
  PieChart
} from 'lucide-react';
import { 
  MONETIZATION_MODELS, 
  AUDIENCE_ASKS, 
  MonetizationModel, 
  AudienceAsk 
} from '../../data/strategyDocs';

export const BusinessPlanView: React.FC = () => {
  const [selectedModelId, setSelectedModelId] = useState<'hybrid' | 'syndicate' | 'opencore'>('hybrid');
  const [selectedAudienceId, setSelectedAudienceId] = useState<'vc' | 'grants' | 'enterprise' | 'sponsors'>('vc');

  const selectedModel: MonetizationModel = MONETIZATION_MODELS.find(
    (m) => m.id === selectedModelId
  ) || MONETIZATION_MODELS[0];

  const selectedAsk: AudienceAsk = AUDIENCE_ASKS.find(
    (a) => a.id === selectedAudienceId
  ) || AUDIENCE_ASKS[0];

  return (
    <div className="space-y-10">
      {/* Executive Summary & Arbitrage Metric Ribbon */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="cyber-badge cyber-badge-amber">BUSINESS PLAN MASTER</span>
              <span className="text-xs font-mono text-slate-400">Market Arbitrage: 90%+ Gross Margin</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-100 flex items-center gap-2">
              <FileText className="w-6 h-6 text-cyber-amber" />
              Strategic Business Plan & Dual Monetization Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-sans mt-1 max-w-3xl">
              The Universal Bounty Swarm replaces a $150k developer team with a low-cost subscription, combining B2B SaaS revenue for startups with 24/7 autonomous open-source bounty hunting.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-obsidian-950 border border-cyber-amber/40 text-right font-mono flex-shrink-0">
            <div className="text-xs text-slate-400">Payroll Cost Reduction</div>
            <div className="text-2xl sm:text-3xl font-black text-cyber-amber mt-0.5">
              90%+ Savings
            </div>
            <div className="text-[11px] text-slate-500 mt-1">$0.02 Compute vs $300 Labor</div>
          </div>
        </div>

        {/* 4 Key Value Prop Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-obsidian-950 border border-slate-800 font-mono space-y-1">
            <div className="text-xs font-bold text-cyber-volt flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> 24/7 Autonomy
            </div>
            <div className="text-xs text-slate-300 font-sans">Headless execution from issue ingest to merged PR.</div>
          </div>
          <div className="p-3.5 rounded-xl bg-obsidian-950 border border-slate-800 font-mono space-y-1">
            <div className="text-xs font-bold text-cyber-crimson flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Victory Audit
            </div>
            <div className="text-xs text-slate-300 font-sans">Zero mock validation & auth boundary enforcement.</div>
          </div>
          <div className="p-3.5 rounded-xl bg-obsidian-950 border border-slate-800 font-mono space-y-1">
            <div className="text-xs font-bold text-cyber-cyan flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5" /> Negative CAC
            </div>
            <div className="text-xs text-slate-300 font-sans">Web3 bounties self-fund customer acquisition.</div>
          </div>
          <div className="p-3.5 rounded-xl bg-obsidian-950 border border-slate-800 font-mono space-y-1">
            <div className="text-xs font-bold text-cyber-violet flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" /> Stack Agnostic
            </div>
            <div className="text-xs text-slate-300 font-sans">Soroban, EVM, React, Python, Rust & Node.js.</div>
          </div>
        </div>
      </div>

      {/* SECTION 1: 3 Monetization Models */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-xl font-bold font-mono text-slate-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyber-cyan" />
              <span>Three Strategic Monetization Models</span>
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              Evaluate our 3 modeled commercialization vectors: Hybrid Engine, Proprietary Syndicate, and Open Core.
            </p>
          </div>
        </div>

        {/* Model Switcher Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MONETIZATION_MODELS.map((model) => {
            const isSelected = selectedModelId === model.id;
            return (
              <button
                key={model.id}
                type="button"
                onClick={() => setSelectedModelId(model.id)}
                className={`p-5 rounded-2xl text-left font-mono transition-all border relative space-y-3 ${
                  isSelected
                    ? 'bg-slate-800/90 border-cyber-volt text-slate-100 shadow-glow-volt/20 ring-1 ring-cyber-volt/50'
                    : 'bg-obsidian-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyber-cyan">
                    {model.badge.toUpperCase()}
                  </span>
                  {model.isRecommended && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyber-volt text-obsidian-950">
                      RECOMMENDED
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-100">{model.name}</h4>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">{model.tagline}</p>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between text-xs">
                  <span className="text-slate-500">Margin Target:</span>
                  <span className="text-cyber-volt font-bold">{model.targetMargin}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Model Deep Dive */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800/80 bg-obsidian-900/60 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="cyber-badge cyber-badge-cyan">{selectedModel.badge}</span>
                <span className="text-xs font-mono text-cyber-volt font-bold">{selectedModel.targetMargin}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-mono text-slate-100">
                {selectedModel.name}
              </h3>
            </div>
            <div className="text-xs font-mono text-slate-400 bg-obsidian-950 px-3 py-1.5 rounded-lg border border-slate-800">
              CAC Profile: <span className="text-cyber-cyan font-bold">{selectedModel.cacProfile}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Core Strategy & Why It Works */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-obsidian-950 border border-slate-800 space-y-2">
                <div className="text-xs font-mono font-bold text-cyber-volt uppercase tracking-wider">
                  Operational Strategy
                </div>
                <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                  {selectedModel.strategy}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-cyber-cyan/10 border-l-4 border-cyber-cyan space-y-1">
                <div className="text-xs font-mono font-bold text-cyber-cyan uppercase tracking-wider">
                  Why This Model Succeeds
                </div>
                <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                  {selectedModel.whyItWorks}
                </p>
              </div>
            </div>

            {/* Revenue Mechanics & Streams */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-obsidian-950 border border-slate-800 space-y-3 font-mono">
                <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-cyber-volt" />
                  <span>Execution Mechanics:</span>
                </div>
                <ul className="space-y-2 text-xs">
                  {selectedModel.mechanics.map((mech, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-300 font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyber-volt flex-shrink-0 mt-0.5" />
                      <span>{mech}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-obsidian-950 border border-slate-800 space-y-2 font-mono">
                <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-cyber-emerald" />
                  <span>Primary Revenue Streams:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedModel.revenueStreams.map((stream, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700/80 text-xs text-cyber-emerald font-mono"
                    >
                      {stream}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: 4 Audience-Specific Asks */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-xl font-bold font-mono text-slate-100 flex items-center gap-2">
              <Users className="w-5 h-5 text-cyber-violet" />
              <span>Audience Proposals & "The Ask"</span>
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              Tailored value narratives and exact capital requests for VCs, Web3 Grants, Enterprise, and Open Source Sponsors.
            </p>
          </div>
        </div>

        {/* Audience Selector Tabs */}
        <div className="flex flex-wrap gap-2" role="tablist">
          {AUDIENCE_ASKS.map((ask) => {
            const isSelected = selectedAudienceId === ask.id;
            return (
              <button
                key={ask.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedAudienceId(ask.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  isSelected
                    ? 'bg-cyber-violet text-white font-bold shadow-glow-violet/30'
                    : 'bg-obsidian-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800'
                }`}
              >
                {ask.id === 'vc' && <TrendingUp className="w-3.5 h-3.5" />}
                {ask.id === 'grants' && <Award className="w-3.5 h-3.5" />}
                {ask.id === 'enterprise' && <Building2 className="w-3.5 h-3.5" />}
                {ask.id === 'sponsors' && <Heart className="w-3.5 h-3.5" />}
                <span>{ask.audience}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Audience Detail Panel */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800/80 bg-obsidian-900/60 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="cyber-badge cyber-badge-violet">{selectedAsk.audience}</span>
                <span className="text-xs font-mono text-slate-400">Target Proposal</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-mono text-slate-100">
                {selectedAsk.headline}
              </h3>
            </div>
            <div className="p-3.5 rounded-xl bg-obsidian-950 border border-cyber-violet/40 text-right font-mono flex-shrink-0">
              <div className="text-[11px] text-slate-400">Total Ask / Commitment</div>
              <div className="text-xl sm:text-2xl font-black text-cyber-violet mt-0.5">
                {selectedAsk.askAmount}
              </div>
            </div>
          </div>

          {/* Narrative */}
          <div className="p-4 rounded-xl bg-obsidian-950 border border-slate-800 space-y-1">
            <div className="text-xs font-mono font-bold text-cyber-cyan uppercase tracking-wider">
              Strategic Narrative
            </div>
            <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
              {selectedAsk.narrative}
            </p>
          </div>

          {/* Ask Details */}
          <div className="space-y-3 font-mono">
            <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyber-volt" />
              <span>Key Terms & Structural Highlights:</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {selectedAsk.askDetails.map((detail, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-obsidian-950/80 border border-slate-800 font-sans text-xs text-slate-300 leading-relaxed"
                >
                  <div className="text-[10px] font-mono text-cyber-volt font-bold mb-1 uppercase">
                    Term #{idx + 1}
                  </div>
                  {detail}
                </div>
              ))}
            </div>
          </div>

          {/* VC Use of Funds Display */}
          {selectedAsk.useOfFunds && (
            <div className="space-y-3 font-mono pt-2">
              <div className="text-xs font-bold text-cyber-volt flex items-center gap-1.5">
                <PieChart className="w-4 h-4" />
                <span>Use of Seed Funds ($3,500,000 Allocation):</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedAsk.useOfFunds.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-obsidian-950 border border-slate-800 space-y-1.5">
                    <div className="text-lg font-black text-cyber-volt">{item.percentage}%</div>
                    <div className="text-xs font-bold text-slate-200">{item.category}</div>
                    <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pricing Tiers for Enterprise / Sponsors */}
          {selectedAsk.pricingTiers && (
            <div className="space-y-3 font-mono pt-2">
              <div className="text-xs font-bold text-cyber-cyan flex items-center gap-1.5">
                <DollarSign className="w-4 h-4" />
                <span>Available Commercial Tiers:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {selectedAsk.pricingTiers.map((tier, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-obsidian-950 border border-slate-800 space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xs text-cyber-cyan font-bold uppercase">{tier.tier}</div>
                      <div className="text-xl font-bold text-slate-100 mt-1">{tier.price}</div>
                      <p className="text-[11px] text-slate-400 font-sans mt-1">{tier.description}</p>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300 font-sans pt-2 border-t border-slate-800/80">
                      {tier.features.map((f, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyber-volt flex-shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Market Comps */}
          {selectedAsk.marketComps && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800 text-xs font-mono">
              <span className="text-slate-500">Market Comps:</span>
              {selectedAsk.marketComps.map((comp, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-slate-300"
                >
                  {comp}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
