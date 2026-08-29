import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Terminal, 
  Cpu, 
  ExternalLink, 
  Check, 
  Copy, 
  Lock,
  ArrowUp,
  Coins,
  Layers
} from 'lucide-react';
import { NAV_ITEMS } from './Navbar';

export const Footer: React.FC = () => {
  const [copiedEVM, setCopiedEVM] = useState(false);
  const [copiedStellar, setCopiedStellar] = useState(false);

  const evmAddress = "0xF46C9F6d70C50BF81ef3588AB523a90a594a2F89";
  const stellarAddress = "GCL6OXAMLD75BMTINA6EMRUDWK5THQUSHMYNLSNBCJAPZJHNYJTUNIBC";

  const copyToClipboard = (text: string, type: 'evm' | 'stellar') => {
    navigator.clipboard.writeText(text);
    if (type === 'evm') {
      setCopiedEVM(true);
      setTimeout(() => setCopiedEVM(false), 2000);
    } else {
      setCopiedStellar(true);
      setTimeout(() => setCopiedStellar(false), 2000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-obsidian-950 border-t border-slate-800/80 text-slate-400 font-sans relative overflow-hidden">
      {/* Subtle top glowing line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Column 1: Fleet Branding & Mission (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-obsidian-900 to-obsidian-800 border border-cyber-cyan/40 flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-sm bg-cyber-cyan rotate-45"></div>
              </div>
              <span className="font-mono font-bold text-base text-slate-100 tracking-wider">
                UNIVERSAL BOUNTY SWARM
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              An autonomous, stack-agnostic multi-agent fleet executing outcome-based labor arbitrage across Web3 and Web2 bounty markets, protocol keeper registries, and open-source grant programs.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="cyber-badge cyber-badge-cyan">
                <Cpu className="w-3 h-3" /> Antigravity SDK
              </span>
              <span className="cyber-badge cyber-badge-volt">
                <Terminal className="w-3 h-3" /> Firebase Stigmergy
              </span>
              <span className="cyber-badge cyber-badge-violet">
                <Layers className="w-3 h-3" /> OrbStack Sandboxes
              </span>
            </div>
          </div>

          {/* Column 2: Swarm Navigation */}
          <div>
            <h3 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan"></span>
              Platform Hub
            </h3>
            <ul className="space-y-2 text-xs font-mono">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path}
                    className="text-slate-400 hover:text-cyber-cyan transition-colors flex items-center gap-1.5 py-0.5"
                  >
                    <span>&rsaquo;</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Ecosystems & Integrations */}
          <div>
            <h3 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-volt"></span>
              Ecosystems
            </h3>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a href="https://stellar.org" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyber-volt transition-colors flex items-center gap-1">
                  Stellar / Soroban <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://base.org" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyber-volt transition-colors flex items-center gap-1">
                  Base L2 <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://octant.app" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyber-volt transition-colors flex items-center gap-1">
                  Octant Atlas v2 <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://tea.xyz" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyber-volt transition-colors flex items-center gap-1">
                  TEA Protocol <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://gitcoin.co" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyber-volt transition-colors flex items-center gap-1">
                  Gitcoin Grants <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Verified Payout Proof */}
          <div>
            <h3 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyber-emerald" />
              Verified Settlement
            </h3>
            <div className="space-y-2 text-xs font-mono">
              {/* EVM Address */}
              <div className="p-2 rounded bg-obsidian-900 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="text-cyber-cyan font-semibold">EVM Base/Arb/ETH</span>
                  <button 
                    onClick={() => copyToClipboard(evmAddress, 'evm')}
                    className="p-1 rounded text-slate-400 hover:text-cyber-cyan transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan"
                    title="Copy EVM Address"
                    aria-label="Copy EVM Settlement Address"
                  >
                    {copiedEVM ? <Check className="w-3 h-3 text-cyber-emerald" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <div className="text-[10px] text-slate-300 truncate font-mono select-all">
                  {evmAddress.slice(0, 10)}...{evmAddress.slice(-8)}
                </div>
              </div>

              {/* Stellar Address */}
              <div className="p-2.5 rounded-lg bg-obsidian-900 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="text-cyber-volt font-semibold">Stellar / Soroban</span>
                  <button 
                    onClick={() => copyToClipboard(stellarAddress, 'stellar')}
                    className="p-1 rounded text-slate-400 hover:text-cyber-volt transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-volt"
                    title="Copy Stellar Address"
                    aria-label="Copy Stellar Settlement Address"
                  >
                    {copiedStellar ? <Check className="w-3 h-3 text-cyber-emerald" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <div className="text-[10px] text-slate-300 truncate font-mono select-all">
                  {stellarAddress.slice(0, 10)}...{stellarAddress.slice(-8)}
                </div>
              </div>

              <Link 
                to="/grants" 
                className="inline-flex items-center gap-1 text-[11px] text-cyber-cyan hover:underline pt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan rounded"
              >
                <Coins className="w-3 h-3" /> Inspect Cryptographic Proofs &rarr;
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Disclaimer, Integrity & Back to top */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="text-slate-500 text-center md:text-left flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-cyber-emerald inline shrink-0" />
            <span>
              Outcome-Based Labor Arbitrage &bull; Zero-Mock Forensic Victory Audits &bull; 100% Cryptographic Verification.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-500">&copy; 2026 Universal Bounty Swarm. All Rights Reserved.</span>
            <button
              onClick={scrollToTop}
              className="p-2.5 min-h-[44px] min-w-[44px] rounded-lg bg-obsidian-900 border border-slate-800 text-slate-400 hover:text-cyber-cyan hover:border-cyber-cyan/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-volt"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
