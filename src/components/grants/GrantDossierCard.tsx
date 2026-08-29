import React, { useState } from 'react';
import { Coins, ExternalLink, ChevronDown, ChevronUp, Layers, GitPullRequest, FolderGit2, TestTube2 } from 'lucide-react';
import { GrantDossier } from '../../data/grantsData';
import { MilestonesTranches } from './MilestonesTranches';
import { TeaConstitutionViewer } from './TeaConstitutionViewer';

interface GrantDossierCardProps {
  grant: GrantDossier;
}

export const GrantDossierCard: React.FC<GrantDossierCardProps> = ({ grant }) => {
  const [expanded, setExpanded] = useState(true);
  const [showTeaYaml, setShowTeaYaml] = useState(false);

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800/90 space-y-6 flex flex-col justify-between transition-all hover:border-slate-700">
      <div className="space-y-4">
        {/* Header Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className={`cyber-badge ${grant.badgeColor}`}>{grant.ecosystem}</span>
            <span className="text-xs font-mono text-slate-400 bg-obsidian-900 px-2 py-0.5 rounded border border-slate-800">
              {grant.organization}
            </span>
          </div>
          <span className="text-xs font-mono text-cyber-cyan bg-cyber-cyan/10 px-2.5 py-0.5 rounded-full border border-cyber-cyan/20 font-bold">
            {grant.status}
          </span>
        </div>

        {/* Title & Award */}
        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-bold font-mono text-slate-100">{grant.name}</h3>
          <div className="text-sm font-mono text-cyber-volt font-semibold flex items-center gap-2">
            <Coins className="w-4 h-4" />
            <span>{grant.award}</span>
            <span className="text-xs text-slate-500">({grant.requestedAmount})</span>
          </div>
        </div>

        {/* Summary Description */}
        <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
          {grant.description}
        </p>

        {/* Public Goods Impact Metric Ribbon */}
        {grant.publicGoodMetrics && (
          <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-obsidian-900/80 border border-slate-800 text-xs font-mono">
            <div className="flex items-center gap-2">
              <GitPullRequest className="w-3.5 h-3.5 text-cyber-cyan" />
              <div>
                <div className="text-slate-200 font-bold">{grant.publicGoodMetrics.prsMerged}+</div>
                <div className="text-[10px] text-slate-500">PRs Merged</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-3.5 h-3.5 text-cyber-volt" />
              <div>
                <div className="text-slate-200 font-bold">{grant.publicGoodMetrics.reposMaintained}</div>
                <div className="text-[10px] text-slate-500">Repos Maintained</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TestTube2 className="w-3.5 h-3.5 text-cyber-emerald" />
              <div>
                <div className="text-slate-200 font-bold">{grant.publicGoodMetrics.testsPassing}</div>
                <div className="text-[10px] text-slate-500">Passing Tests</div>
              </div>
            </div>
          </div>
        )}

        {/* Toggle Milestones / Details */}
        <div className="pt-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full py-2 px-3 rounded-lg bg-obsidian-900 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-300 flex items-center justify-between transition-colors"
          >
            <span className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-cyber-cyan" />
              <span>{expanded ? 'Hide Milestone Tranches' : 'View Milestone Tranches'} ({grant.tranches.length} Phases)</span>
            </span>
            {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>
        </div>

        {/* Milestone Tranches Component */}
        {expanded && (
          <div className="pt-2 animate-in fade-in duration-150">
            <MilestonesTranches tranches={grant.tranches} />
          </div>
        )}

        {/* Optional TEA Constitution YAML Viewer */}
        {grant.teaConstitutionYaml && (
          <div className="pt-2 space-y-2">
            <button
              onClick={() => setShowTeaYaml(!showTeaYaml)}
              className="text-xs font-mono text-cyber-volt hover:underline flex items-center gap-1.5"
            >
              <span>{showTeaYaml ? 'Hide tea.yaml Constitution' : 'Inspect Verified tea.yaml Constitution'}</span>
              {showTeaYaml ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            {showTeaYaml && (
              <TeaConstitutionViewer yamlContent={grant.teaConstitutionYaml} />
            )}
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="text-slate-400 truncate max-w-xs">
          <span className="text-slate-500">Payout: </span>
          <span className="text-slate-300 font-mono">{grant.payoutAddress.slice(0, 10)}...{grant.payoutAddress.slice(-8)}</span>
        </div>

        {grant.proofUrl && (
          <a
            href={grant.proofUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyber-cyan hover:underline flex items-center gap-1 font-bold"
          >
            <span>View Grant Application</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
};
