import React, { useState } from 'react';
import { FileCode, Copy, Check, ShieldCheck } from 'lucide-react';
import { sampleTeaConstitutionYaml } from '../../data/grantsData';

interface TeaConstitutionViewerProps {
  yamlContent?: string;
}

export const TeaConstitutionViewer: React.FC<TeaConstitutionViewerProps> = ({
  yamlContent = sampleTeaConstitutionYaml,
}) => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(yamlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <FileCode className="w-5 h-5 text-cyber-volt" />
          <div>
            <h3 className="text-sm sm:text-base font-bold font-mono text-slate-100">
              TEA Protocol Governance Constitution (tea.yaml)
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              Base L2 Proof of Contribution & Automated Maintainer Quorum Spec
            </p>
          </div>
        </div>

        <button
          onClick={copy}
          className="px-3 py-1.5 rounded-lg bg-obsidian-900 border border-slate-800 hover:border-cyber-volt text-xs font-mono text-slate-300 hover:text-cyber-volt transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-cyber-emerald" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'YAML Copied!' : 'Copy tea.yaml'}</span>
        </button>
      </div>

      {/* Badges / Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-2.5 rounded-lg bg-obsidian-950 border border-slate-800 space-y-0.5">
          <div className="text-[10px] text-slate-500">Quorum Threshold</div>
          <div className="text-cyber-volt font-bold">67% (2/3)</div>
        </div>
        <div className="p-2.5 rounded-lg bg-obsidian-950 border border-slate-800 space-y-0.5">
          <div className="text-[10px] text-slate-500">Target Network</div>
          <div className="text-cyber-cyan font-bold">Base L2</div>
        </div>
        <div className="p-2.5 rounded-lg bg-obsidian-950 border border-slate-800 space-y-0.5">
          <div className="text-[10px] text-slate-500">Staking Split</div>
          <div className="text-slate-200 font-bold">80% Maintainers</div>
        </div>
        <div className="p-2.5 rounded-lg bg-obsidian-950 border border-slate-800 space-y-0.5">
          <div className="text-[10px] text-slate-500">Victory Audit</div>
          <div className="text-cyber-emerald font-bold">Enforced</div>
        </div>
      </div>

      {/* Code Viewer */}
      <div className="rounded-xl bg-obsidian-950 border border-slate-800 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-obsidian-900/90 border-b border-slate-800 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyber-volt" />
            <span>tea.yaml (Validated Schema v1.0.0)</span>
          </span>
          <span className="text-cyber-emerald flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            <span>Cryptographically Bound</span>
          </span>
        </div>
        <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
          <code>{yamlContent}</code>
        </pre>
      </div>
    </div>
  );
};
