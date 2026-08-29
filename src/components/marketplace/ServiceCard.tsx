import React from 'react';
import { ShieldCheck, Wrench, Zap, Cpu, Terminal, Store, Code, Rocket } from 'lucide-react';
import { MarketplaceService } from '../../data/marketplaceData';

interface ServiceCardProps {
  service: MarketplaceService;
  billingCycle: 'monthly' | 'annual';
  onInspect: (service: MarketplaceService) => void;
  onDeploy: (service: MarketplaceService) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  billingCycle,
  onInspect,
  onDeploy,
}) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'victory-auditor':
        return <ShieldCheck className="w-5 h-5" />;
      case 'ci-fixer':
        return <Wrench className="w-5 h-5" />;
      case 'protocol-keeper':
        return <Zap className="w-5 h-5" />;
      case 'bounty-hunter':
        return <Cpu className="w-5 h-5" />;
      case 'spec-miner':
        return <Terminal className="w-5 h-5" />;
      default:
        return <Store className="w-5 h-5" />;
    }
  };

  const price = billingCycle === 'annual' ? service.annualPrice : service.monthlyPrice;

  return (
    <div
      className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-cyber-cyan/40 transition-all flex flex-col justify-between space-y-6 group relative overflow-hidden"
      role="region"
      aria-label={service.name}
    >
      <div className="space-y-4">
        {/* Card Header */}
        <div className="flex items-center justify-between">
          <div className="p-2.5 rounded-xl bg-obsidian-900 border border-slate-800 text-cyber-cyan group-hover:border-cyber-cyan transition-colors">
            {getIcon(service.id)}
          </div>
          <span className={`cyber-badge ${service.badgeColor}`}>{service.badge}</span>
        </div>

        {/* Name & Tagline */}
        <div>
          <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">{service.category}</div>
          <h3 className="text-lg font-bold font-mono text-slate-100 mt-1 group-hover:text-cyber-cyan transition-colors">
            {service.name}
          </h3>
          <p className="text-xs text-slate-400 font-sans mt-1 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Benchmark Ribbon */}
        {service.benchmark && (
          <div className="p-2.5 rounded-lg bg-obsidian-950 border border-slate-800/80 text-[11px] font-mono flex items-center justify-between">
            <span className="text-slate-400">{service.benchmark.metric}:</span>
            <span className="text-cyber-volt font-bold">{service.benchmark.value}</span>
          </div>
        )}

        {/* Capabilities Checklist */}
        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <div className="text-xs font-mono text-slate-300 font-semibold">Capabilities:</div>
          <ul className="space-y-1.5 text-xs text-slate-400 font-mono">
            {service.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-cyber-cyan font-bold">&rsaquo;</span>
                <span className="font-sans text-[11px] text-slate-300">{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pricing & CTAs */}
      <div className="pt-4 border-t border-slate-800 space-y-4">
        <div className="flex items-baseline justify-between">
          <div className="font-mono">
            <span className="text-2xl font-extrabold text-slate-100">${price}</span>
            <span className="text-xs text-slate-500"> / month</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            {billingCycle === 'annual' ? 'Billed annually' : 'Billed monthly'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 font-mono text-xs">
          <button
            onClick={() => onInspect(service)}
            className="py-2.5 px-3 rounded-lg bg-obsidian-900 border border-slate-700 hover:border-cyber-cyan hover:bg-cyber-cyan/10 hover:text-cyber-cyan text-slate-200 font-medium transition-all flex items-center justify-center gap-1.5"
          >
            <Code className="w-3.5 h-3.5" />
            <span>Inspect API Schema</span>
          </button>

          <button
            onClick={() => onDeploy(service)}
            className="py-2.5 px-3 rounded-lg bg-cyber-cyan text-obsidian-950 font-bold hover:bg-cyber-cyan/90 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-cyber-cyan/10"
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Deploy</span>
          </button>
        </div>
      </div>
    </div>
  );
};
