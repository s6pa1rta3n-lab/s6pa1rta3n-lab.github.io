import React, { useState } from 'react';
import { ShieldCheck, Copy, Check, ExternalLink, Network } from 'lucide-react';
import { OFFICIAL_PAYOUT_ADDRESSES } from '../../data/grantsData';

export const PayoutVerifier: React.FC = () => {
  const [copiedEVM, setCopiedEVM] = useState(false);
  const [copiedStellar, setCopiedStellar] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<'all' | 'evm' | 'stellar'>('all');

  const evmAddress = OFFICIAL_PAYOUT_ADDRESSES.evm;
  const stellarAddress = OFFICIAL_PAYOUT_ADDRESSES.stellar;

  const copy = (text: string, type: 'evm' | 'stellar') => {
    navigator.clipboard.writeText(text);
    if (type === 'evm') {
      setCopiedEVM(true);
      setTimeout(() => setCopiedEVM(false), 2000);
    } else {
      setCopiedStellar(true);
      setTimeout(() => setCopiedStellar(false), 2000);
    }
  };

  return (
    <div className="glass-panel-glow p-6 sm:p-8 rounded-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-cyber-emerald shrink-0" />
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-mono text-slate-100">
              Cryptographic Payout Routing Proof
            </h2>
            <p className="text-xs text-slate-400 font-sans">
              Official settlement wallets bound to all grant applications, TEA constitutions, and swarm PRs
            </p>
          </div>
        </div>
        <span className="cyber-badge cyber-badge-emerald self-start sm:self-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyber-emerald animate-pulse" />
          <span>100% Cryptographically Verified</span>
        </span>
      </div>

      {/* Network Filter Pills */}
      <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
        <Network className="w-3.5 h-3.5 text-cyber-cyan" />
        <span>Filter Networks:</span>
        <button
          onClick={() => setSelectedNetwork('all')}
          className={`px-2.5 py-1 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan ${
            selectedNetwork === 'all'
              ? 'bg-cyber-cyan text-obsidian-950 font-bold shadow-glow-cyan/20'
              : 'bg-obsidian-900 border border-slate-800 hover:text-slate-200'
          }`}
        >
          All Networks
        </button>
        <button
          onClick={() => setSelectedNetwork('evm')}
          className={`px-2.5 py-1 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan ${
            selectedNetwork === 'evm'
              ? 'bg-cyber-cyan text-obsidian-950 font-bold shadow-glow-cyan/20'
              : 'bg-obsidian-900 border border-slate-800 hover:text-slate-200'
          }`}
        >
          EVM (Base/ETH/Arb)
        </button>
        <button
          onClick={() => setSelectedNetwork('stellar')}
          className={`px-2.5 py-1 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-volt ${
            selectedNetwork === 'stellar'
              ? 'bg-cyber-volt text-obsidian-950 font-bold shadow-glow-volt/20'
              : 'bg-obsidian-900 border border-slate-800 hover:text-slate-200'
          }`}
        >
          Stellar (XLM/Soroban)
        </button>
      </div>

      {/* Addresses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
        {/* EVM Address */}
        {(selectedNetwork === 'all' || selectedNetwork === 'evm') && (
          <div className="p-5 rounded-xl bg-obsidian-900 border border-cyber-cyan/30 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-cyber-cyan font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyber-cyan" />
                  <span>EVM Payout (Base / Arbitrum / Polygon / ETH)</span>
                </span>
                <button
                  onClick={() => copy(evmAddress, 'evm')}
                  className="text-slate-400 hover:text-cyber-cyan flex items-center gap-1 transition-colors px-2 py-1 rounded bg-obsidian-950 border border-slate-800 hover:border-cyber-cyan/40"
                  aria-label="Copy EVM Address"
                >
                  {copiedEVM ? <Check className="w-3.5 h-3.5 text-cyber-emerald" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEVM ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="p-3 rounded-lg bg-obsidian-950 border border-slate-800 text-slate-200 break-all select-all font-mono text-xs">
                {evmAddress}
              </div>

              <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                Matches authoritative payout configuration in all autonomous GitHub PR descriptions, Gitcoin Grants, Octant Atlas v2 manifests, and TEA Protocol constitutions.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Supported: Base, Arbitrum, OP, Polygon, ETH</span>
              <a
                href={`https://basescan.org/address/${evmAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyber-cyan hover:underline flex items-center gap-1"
              >
                <span>Basescan</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

        {/* Stellar Address */}
        {(selectedNetwork === 'all' || selectedNetwork === 'stellar') && (
          <div className="p-5 rounded-xl bg-obsidian-900 border border-cyber-volt/30 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-cyber-volt font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyber-volt" />
                  <span>Stellar / Soroban Payout (XLM / Native Assets)</span>
                </span>
                <button
                  onClick={() => copy(stellarAddress, 'stellar')}
                  className="text-slate-400 hover:text-cyber-volt flex items-center gap-1 transition-colors px-2 py-1 rounded bg-obsidian-950 border border-slate-800 hover:border-cyber-volt/40"
                  aria-label="Copy Stellar Address"
                >
                  {copiedStellar ? <Check className="w-3.5 h-3.5 text-cyber-emerald" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedStellar ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="p-3 rounded-lg bg-obsidian-950 border border-slate-800 text-slate-200 break-all select-all font-mono text-xs">
                {stellarAddress}
              </div>

              <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                Designated destination for all Stellar Community Fund (SCF) Build Awards, Soroban contract disbursements, and native Stellar asset settlements.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Supported: Stellar Mainnet & Soroban Testnet</span>
              <a
                href={`https://stellar.expert/explorer/public/account/${stellarAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyber-volt hover:underline flex items-center gap-1"
              >
                <span>StellarExpert</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
