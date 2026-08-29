import React from 'react';
import { CheckCircle2, Clock, Calendar, Check, Sparkles } from 'lucide-react';
import { GrantTranche } from '../../data/grantsData';

interface MilestonesTranchesProps {
  tranches: GrantTranche[];
}

export const MilestonesTranches: React.FC<MilestonesTranchesProps> = ({ tranches }) => {
  const getStatusBadge = (status: GrantTranche['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="cyber-badge cyber-badge-emerald flex items-center gap-1">
            <Check className="w-3 h-3" />
            <span>Completed</span>
          </span>
        );
      case 'in-progress':
        return (
          <span className="cyber-badge cyber-badge-cyan flex items-center gap-1 animate-pulse">
            <Clock className="w-3 h-3" />
            <span>In Progress</span>
          </span>
        );
      case 'upcoming':
        return (
          <span className="cyber-badge cyber-badge-violet flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>Upcoming</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyber-volt" />
          <span>Milestone Tranches & Deliverables ({tranches.length} Phases)</span>
        </h4>
      </div>

      <div className="space-y-3">
        {tranches.map((tranche) => (
          <div
            key={tranche.number}
            className={`p-4 rounded-xl border transition-all ${
              tranche.status === 'completed'
                ? 'bg-obsidian-950/80 border-cyber-emerald/30'
                : tranche.status === 'in-progress'
                ? 'bg-obsidian-900 border-cyber-cyan/40 shadow-lg shadow-cyber-cyan/5'
                : 'bg-obsidian-950/40 border-slate-800/80'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyber-cyan bg-obsidian-900 px-2 py-0.5 rounded border border-slate-800">
                  Phase {tranche.number}
                </span>
                <span className="text-sm font-bold font-mono text-slate-100">{tranche.title}</span>
              </div>

              <div className="flex items-center gap-3 self-start sm:self-auto">
                <span className="text-xs font-mono text-cyber-volt font-bold">{tranche.amount}</span>
                <span className="text-xs font-mono text-slate-400">({tranche.timeline})</span>
                {getStatusBadge(tranche.status)}
              </div>
            </div>

            {/* Deliverables Checklist */}
            <div className="pt-3 space-y-2">
              <div className="text-[11px] font-mono text-slate-400 font-semibold">Key Deliverables:</div>
              <ul className="space-y-1.5">
                {tranche.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-sans">
                    <CheckCircle2
                      className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                        tranche.status === 'completed'
                          ? 'text-cyber-emerald'
                          : tranche.status === 'in-progress'
                          ? 'text-cyber-cyan'
                          : 'text-slate-600'
                      }`}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Validation Criteria */}
              {tranche.validationCriteria && (
                <div className="mt-2.5 pt-2 border-t border-slate-800/40 flex items-start gap-2 text-[11px] font-mono text-slate-400">
                  <span className="text-cyber-volt font-bold shrink-0">Validation:</span>
                  <span className="italic">{tranche.validationCriteria}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
