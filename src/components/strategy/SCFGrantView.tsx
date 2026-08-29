import React, { useState } from 'react';
import { 
  Award, 
  ShieldCheck, 
  Coins, 
  CheckCircle2, 
  Sparkles, 
  Copy, 
  Check
} from 'lucide-react';
import { STELLAR_SCF_GRANT_DATA, SCFTranche } from '../../data/strategyDocs';

export const SCFGrantView: React.FC = () => {
  const [selectedTrancheIndex, setSelectedTrancheIndex] = useState<number>(0);
  const [copiedAddress, setCopiedAddress] = useState<boolean>(false);

  const grant = STELLAR_SCF_GRANT_DATA;
  const currentTranche: SCFTranche = grant.tranches[selectedTrancheIndex] || grant.tranches[0];

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(grant.payoutAddress);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    } catch {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header & Award Summary */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="cyber-badge cyber-badge-emerald">STELLAR COMMUNITY FUND</span>
              <span className="text-xs font-mono text-slate-400">Award Type: Build Award (RFP Track)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-100 flex items-center gap-2">
              <Award className="w-6 h-6 text-cyber-emerald" />
              Soroban Sentinel: Stellar Community Fund ($150,000 Award) Grant Application
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-sans mt-1 max-w-3xl">
              {grant.summary}
            </p>
          </div>

          {/* Award Total Pill */}
          <div className="p-4 rounded-xl bg-obsidian-950 border border-cyber-emerald/40 text-right font-mono flex-shrink-0">
            <div className="text-xs text-slate-400">Requested Build Award</div>
            <div className="text-2xl sm:text-3xl font-black text-cyber-emerald mt-0.5">
              {grant.requestedAward}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">3 Tranches &bull; 6-Month Horizon</div>
          </div>
        </div>

        {/* Cryptographic Address & Network Routing */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-obsidian-950 border border-slate-800 font-mono text-xs">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-cyber-emerald flex-shrink-0" />
            <span className="text-slate-400">Verified Stellar Payout Account:</span>
            <span className="text-cyber-emerald font-bold truncate max-w-xs sm:max-w-md">
              {grant.payoutAddress}
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopyAddress}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-obsidian-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all font-mono text-xs self-start sm:self-auto"
          >
            {copiedAddress ? <Check className="w-3.5 h-3.5 text-cyber-volt" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedAddress ? 'Address Copied!' : 'Copy Stellar Address'}</span>
          </button>
        </div>

        {/* Tranches Progress Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {grant.tranches.map((tranche, idx) => {
            const isSelected = selectedTrancheIndex === idx;
            return (
              <button
                key={tranche.number}
                type="button"
                onClick={() => setSelectedTrancheIndex(idx)}
                className={`p-4 rounded-xl text-left font-mono transition-all border relative ${
                  isSelected
                    ? 'bg-slate-800/90 border-cyber-emerald text-slate-100 shadow-glow-emerald/20 ring-1 ring-cyber-emerald/50'
                    : 'bg-obsidian-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-cyber-emerald">TRANCHE {tranche.number}</span>
                  <span className="text-xs font-bold text-slate-200">{tranche.amountUsd}</span>
                </div>
                <div className="text-xs font-bold text-slate-200 truncate mt-1">{tranche.title}</div>
                <div className="text-[11px] text-slate-500 font-sans mt-0.5">{tranche.timeline}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Tranche Detail Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800/80 bg-obsidian-900/60 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-cyber-emerald">
                TRANCHE {currentTranche.number} OF 3 &bull; {currentTranche.timeline}
              </span>
              <span className="cyber-badge cyber-badge-emerald">
                {currentTranche.amountUsd}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-mono text-slate-100">
              {currentTranche.title}
            </h3>
          </div>
          <div className="text-xs font-mono text-slate-400 bg-obsidian-950 px-3 py-1.5 rounded-lg border border-slate-800">
            Tranche Allocation: <span className="text-cyber-emerald font-bold">{currentTranche.amountXlm.toLocaleString()} XLM</span>
          </div>
        </div>

        {/* Deliverables */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold font-mono text-slate-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyber-emerald" />
            <span>Key Milestone Deliverables:</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentTranche.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-obsidian-950/80 border border-slate-800 hover:border-slate-700 transition-all font-sans text-xs text-slate-300 leading-relaxed"
              >
                <div className="text-[10px] font-mono text-cyber-emerald font-bold mb-1.5 uppercase">
                  Deliverable #{idx + 1}
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Validation Criteria Box */}
        <div className="p-4 rounded-xl bg-cyber-emerald/10 border-l-4 border-cyber-emerald space-y-1">
          <div className="text-xs font-mono font-bold text-cyber-emerald uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Independent Validation Criteria (Milestone Settlement Gate):</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
            {currentTranche.validationCriteria}
          </p>
        </div>
      </div>

      {/* 3 Core Technical Pillars of Soroban Sentinel */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold font-mono text-slate-100 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-cyber-emerald" />
          <span>Soroban Technical Integrity Pillars</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {grant.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-obsidian-900/80 border border-slate-800 hover:border-cyber-emerald/40 transition-all space-y-2 font-mono"
            >
              <div className="text-xs text-cyber-emerald font-bold flex items-center justify-between">
                <span>Pillar 0{idx + 1}</span>
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div className="text-sm font-bold text-slate-100 font-mono">{pillar.title}</div>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
