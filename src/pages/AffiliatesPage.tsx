import React, { useState } from 'react';
import { Share2, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { affiliateFaqs, AffiliateTier } from '../data/affiliatesData';
import { TierMatrix } from '../components/affiliates/TierMatrix';
import { EarningsCalculator } from '../components/affiliates/EarningsCalculator';
import { MarketingToolkit } from '../components/affiliates/MarketingToolkit';

export const AffiliatesPage: React.FC = () => {
  const [activeTier, setActiveTier] = useState<AffiliateTier | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-violet/10 border border-cyber-violet/30 text-cyber-violet text-xs font-mono">
          <Share2 className="w-3.5 h-3.5" />
          <span>Creator & Partner Revenue-Share Program</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight">
          Affiliate & <span className="cyber-gradient-text">Creator Program</span>
        </h1>
        <p className="text-sm text-slate-400 font-sans leading-relaxed">
          Earn up to 25% recurring monthly revenue by introducing developer teams, DAOs, and protocols to Universal Bounty Swarm. Instant crypto or fiat payouts on every subscription and bounty settlement.
        </p>
      </div>

      {/* Interactive Earnings Calculator */}
      <EarningsCalculator onTierChange={setActiveTier} />

      {/* 4-Tier Matrix Grid */}
      <TierMatrix currentTierId={activeTier?.id} />

      {/* Creator Marketing Toolkit */}
      <MarketingToolkit />

      {/* Affiliate FAQ Accordion */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6 border border-slate-800">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
          <HelpCircle className="w-5 h-5 text-cyber-volt" />
          <h3 className="text-xl font-bold font-mono text-slate-100">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {affiliateFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-obsidian-900 border border-slate-800/80 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-mono text-slate-200 hover:text-cyber-cyan transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-volt"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold">{faq.question}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs sm:text-sm text-slate-400 font-sans leading-relaxed border-t border-slate-800/40 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
