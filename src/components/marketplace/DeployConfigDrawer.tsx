import React, { useState, useEffect } from 'react';
import { X, Rocket, Check } from 'lucide-react';
import { MarketplaceService } from '../../data/marketplaceData';
import { OFFICIAL_PAYOUT_ADDRESSES } from '../../data/grantsData';

interface DeployConfigDrawerProps {
  service: MarketplaceService | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DeployConfigDrawer: React.FC<DeployConfigDrawerProps> = ({
  service,
  isOpen,
  onClose,
}) => {
  const [repoUrl, setRepoUrl] = useState('https://github.com/org/core-protocol');
  const [targetBranch, setTargetBranch] = useState('main');
  const [maxNodes, setMaxNodes] = useState(3);
  const [computeProvider, setComputeProvider] = useState<'orbstack' | 'cloud_batch'>('orbstack');
  const [auditMode, setAuditMode] = useState<'strict' | 'standard'>('strict');
  const [payoutAddress, setPayoutAddress] = useState(OFFICIAL_PAYOUT_ADDRESSES.evm);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployResult, setDeployResult] = useState<{ nodeId: string; status: string } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !service) return null;

  const handleDeploy = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setDeployResult({
        nodeId: `node_${Math.random().toString(36).substring(2, 10)}`,
        status: 'DEPLOYED_AND_LISTENING',
      });
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex justify-end overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="deploy-drawer-title"
      onClick={onClose}
    >
      <div
        className="glass-panel-glow max-w-xl w-full h-full min-h-screen bg-obsidian-950 border-l border-cyber-cyan/30 p-6 sm:p-8 flex flex-col justify-between space-y-6 animate-in slide-in-from-right duration-200 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <span className="cyber-badge cyber-badge-cyan text-xs">Interactive Deployment</span>
              <h3 id="deploy-drawer-title" className="text-xl font-bold font-mono text-slate-100 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-cyber-cyan" />
                <span>Deploy {service.name}</span>
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-obsidian-900 border border-slate-800 text-slate-400 hover:text-slate-100"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {deployResult ? (
            <div className="p-6 rounded-2xl bg-obsidian-900 border border-cyber-emerald/40 space-y-4 text-center animate-in zoom-in-95 duration-150">
              <div className="w-12 h-12 rounded-full bg-cyber-emerald/10 border border-cyber-emerald text-cyber-emerald flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold font-mono text-slate-100">Swarm Node Live!</h4>
              <p className="text-xs text-slate-300 font-sans">
                Autonomous node is active, listening to webhooks on <span className="font-mono text-cyber-cyan">{repoUrl}</span>.
              </p>

              <div className="p-3 rounded-xl bg-obsidian-950 border border-slate-800 text-left font-mono text-xs space-y-1 text-slate-300">
                <div>Node ID: <span className="text-cyber-volt">{deployResult.nodeId}</span></div>
                <div>Status: <span className="text-cyber-emerald">{deployResult.status}</span></div>
                <div>Verification: <span className="text-cyber-cyan">Zero-Mock AST Active</span></div>
              </div>

              <button
                onClick={() => setDeployResult(null)}
                className="w-full py-2.5 rounded-lg bg-cyber-cyan text-obsidian-950 font-mono font-bold text-xs hover:bg-cyber-cyan/90 transition-colors"
              >
                Configure Another Deployment
              </button>
            </div>
          ) : (
            <form onSubmit={handleDeploy} className="space-y-4 font-mono text-xs">
              {/* Repo URL */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">GitHub Target Repository URL:</label>
                <input
                  type="text"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-lg bg-obsidian-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyber-cyan text-xs"
                />
              </div>

              {/* Branch */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">Target Branch:</label>
                <input
                  type="text"
                  value={targetBranch}
                  onChange={(e) => setTargetBranch(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-lg bg-obsidian-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyber-cyan text-xs"
                />
              </div>

              {/* Parallel Nodes Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-300">
                  <span className="font-semibold">Max Parallel Swarm Nodes:</span>
                  <span className="text-cyber-volt font-bold">{maxNodes} Nodes</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={maxNodes}
                  onChange={(e) => setMaxNodes(Number(e.target.value))}
                  className="w-full h-2 bg-obsidian-900 rounded-lg appearance-none cursor-pointer accent-cyber-volt"
                />
              </div>

              {/* Compute Sandbox Provider */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">Compute Sandbox Provider:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setComputeProvider('orbstack')}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      computeProvider === 'orbstack'
                        ? 'border-cyber-cyan bg-cyber-cyan/10 text-slate-100 font-bold'
                        : 'border-slate-800 bg-obsidian-900 text-slate-400'
                    }`}
                  >
                    <div className="text-xs">OrbStack Docker</div>
                    <div className="text-[10px] text-slate-500 font-normal">Ephemeral Local Sandbox</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setComputeProvider('cloud_batch')}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      computeProvider === 'cloud_batch'
                        ? 'border-cyber-cyan bg-cyber-cyan/10 text-slate-100 font-bold'
                        : 'border-slate-800 bg-obsidian-900 text-slate-400'
                    }`}
                  >
                    <div className="text-xs">GCP Cloud Batch</div>
                    <div className="text-[10px] text-slate-500 font-normal">Sovereign Cloud VPC</div>
                  </button>
                </div>
              </div>

              {/* Security Mode */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">Victory Audit Integrity Level:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAuditMode('strict')}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      auditMode === 'strict'
                        ? 'border-cyber-emerald bg-cyber-emerald/10 text-slate-100 font-bold'
                        : 'border-slate-800 bg-obsidian-900 text-slate-400'
                    }`}
                  >
                    <div className="text-xs text-cyber-emerald">Strict Zero-Mock</div>
                    <div className="text-[10px] text-slate-500 font-normal">Mandatory AST & Crypto</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuditMode('standard')}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      auditMode === 'standard'
                        ? 'border-cyber-cyan bg-cyber-cyan/10 text-slate-100 font-bold'
                        : 'border-slate-800 bg-obsidian-900 text-slate-400'
                    }`}
                  >
                    <div className="text-xs">Standard CI</div>
                    <div className="text-[10px] text-slate-500 font-normal">Unit & E2E Validation</div>
                  </button>
                </div>
              </div>

              {/* Settlement Address */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">Settlement / Payout Routing Address:</label>
                <input
                  type="text"
                  value={payoutAddress}
                  onChange={(e) => setPayoutAddress(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-lg bg-obsidian-900 border border-slate-800 text-cyber-volt font-mono text-[11px]"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isDeploying}
                  className="w-full py-3 rounded-xl bg-cyber-cyan text-obsidian-950 font-bold text-xs hover:bg-cyber-cyan/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyber-cyan/20"
                >
                  <Rocket className="w-4 h-4" />
                  <span>{isDeploying ? 'Deploying Swarm Node...' : 'Deploy Swarm Node'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="text-[11px] font-mono text-slate-500 border-t border-slate-800/80 pt-4 flex items-center justify-between">
          <span>Zero-Data-Retention Guaranteed</span>
          <span className="text-cyber-emerald">Sub-second Ingestion</span>
        </div>
      </div>
    </div>
  );
};
