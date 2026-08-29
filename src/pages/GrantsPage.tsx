import React, { useState, useMemo } from 'react';
import { Coins, Filter, Sparkles } from 'lucide-react';
import { grantDossiers } from '../data/grantsData';
import { PayoutVerifier } from '../components/grants/PayoutVerifier';
import { GrantDossierCard } from '../components/grants/GrantDossierCard';
import { TeaConstitutionViewer } from '../components/grants/TeaConstitutionViewer';

export const GrantsPage: React.FC = () => {
  const [selectedEcosystem, setSelectedEcosystem] = useState<string>('All');

  const ecosystems = useMemo(() => {
    const list = ['All', 'Stellar', 'Base', 'Octant', 'Gitcoin'];
    return list;
  }, []);

  const filteredGrants = useMemo(() => {
    if (selectedEcosystem === 'All') return grantDossiers;
    return grantDossiers.filter((g) => g.ecosystem.toLowerCase() === selectedEcosystem.toLowerCase());
  }, [selectedEcosystem]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-emerald/10 border border-cyber-emerald/30 text-cyber-emerald text-xs font-mono">
          <Coins className="w-3.5 h-3.5" />
          <span>Multi-Chain Public Goods & Grant Funding</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight">
          Grants & <span className="cyber-gradient-text">Settlement Proofs</span>
        </h1>
        <p className="text-sm text-slate-400 font-sans leading-relaxed">
          Universal Bounty Swarm qualifies for and executes grant milestones across leading Web3 public goods ecosystems with zero manual overhead and guaranteed cryptographic payout verification.
        </p>
      </div>

      {/* Cryptographic Payout Verification Card */}
      <PayoutVerifier />

      {/* Ecosystem Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-4 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
          <Filter className="w-3.5 h-3.5 text-cyber-cyan" />
          <span>Filter Ecosystem:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {ecosystems.map((eco) => {
            const isSelected = selectedEcosystem === eco;
            return (
              <button
                key={eco}
                onClick={() => setSelectedEcosystem(eco)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-volt ${
                  isSelected
                    ? 'bg-cyber-cyan text-obsidian-950 font-bold shadow-glow-cyan/20'
                    : 'bg-obsidian-900 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {eco === 'All' && <Sparkles className="w-3 h-3 inline mr-1" />}
                <span>{eco}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grant Dossiers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredGrants.map((grant) => (
          <GrantDossierCard key={grant.id} grant={grant} />
        ))}
      </div>

      {/* Global TEA Constitution Showcase */}
      <div className="space-y-4 pt-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold font-mono text-slate-100">TEA Protocol Master Registration</h2>
          <p className="text-xs text-slate-400 font-sans">
            Cryptographically bound governance constitution powering automatic staking yield distribution on Base L2
          </p>
        </div>
        <TeaConstitutionViewer />
      </div>
    </div>
  );
};
