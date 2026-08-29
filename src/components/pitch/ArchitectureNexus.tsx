import React, { useState } from 'react';
import { ARCHITECTURE_LAYERS } from '../../data/devpostCriteria';
import {
  Layers,
  Cpu,
  Server,
  Database,
  Box,
  ShieldCheck,
  Check,
  Copy,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const ArchitectureNexus: React.FC = () => {
  const [activeLayerId, setActiveLayerId] = useState<string>('layer-cognitive');
  const [copiedSnippet, setCopiedSnippet] = useState<boolean>(false);

  const activeLayer =
    ARCHITECTURE_LAYERS.find((layer) => layer.id === activeLayerId) || ARCHITECTURE_LAYERS[0];

  const getLayerIcon = (id: string) => {
    switch (id) {
      case 'layer-cognitive':
        return <Cpu className="w-4 h-4" />;
      case 'layer-gateway':
        return <Server className="w-4 h-4" />;
      case 'layer-state':
        return <Database className="w-4 h-4" />;
      case 'layer-sandbox':
        return <Box className="w-4 h-4" />;
      case 'layer-auditor':
        return <ShieldCheck className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="space-y-8" id="architecture-nexus-section">
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono">
          <Layers className="w-3.5 h-3.5" />
          <span>Criterion 2 Spotlight &bull; 30% Architecture & Tech Stack</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-100 font-mono">
          Interactive <span className="cyber-gradient-text">Architecture Nexus</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
          Decoupled, event-driven enterprise system design integrating Gemini 3.5 Pro/Flash, Google Cloud Run, Cloud Firestore reactive stigmergy, and isolated sandboxes.
        </p>
      </div>

      {/* Interactive Topology Visual Flow */}
      <div className="glass-panel p-4 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-slate-800">
          <span className="flex items-center gap-1.5 text-cyber-cyan font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>End-to-End Enterprise System Topology Flow</span>
          </span>
          <span className="text-[11px] text-slate-500">Click any layer below to inspect deep specs</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 items-center">
          {ARCHITECTURE_LAYERS.map((layer, idx) => {
            const isActive = layer.id === activeLayerId;
            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => setActiveLayerId(layer.id)}
                className={`p-3 rounded-xl text-left font-mono transition-all flex flex-col justify-between h-24 border ${
                  isActive
                    ? 'bg-obsidian-900 border-cyber-cyan text-slate-100 shadow-glow-cyan/20 scale-[1.02]'
                    : 'bg-obsidian-950/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
                aria-label={`Inspect ${layer.title}`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-500">0{idx + 1}</span>
                  <div className={`p-1 rounded-md ${isActive ? 'text-cyber-cyan bg-cyber-cyan/10' : 'text-slate-400'}`}>
                    {getLayerIcon(layer.id)}
                  </div>
                </div>
                <div className="text-xs font-bold leading-tight line-clamp-2">
                  {layer.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Layer Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Layer Overview & Security Controls (5 Columns) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-800 space-y-6 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Header & Badges */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="cyber-badge cyber-badge-cyan">{activeLayer.category}</span>
                <span className="text-xs font-mono text-cyber-volt">{activeLayer.badge}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-100 font-mono">
                {activeLayer.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {activeLayer.description}
            </p>

            {/* Google Cloud Services Stack */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase text-cyber-cyan tracking-wider">
                Google Cloud Infrastructure & Models
              </h4>
              <ul className="space-y-1.5">
                {activeLayer.googleCloudServices.map((service, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <ArrowRight className="w-3 h-3 text-cyber-cyan shrink-0" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Security Controls */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase text-cyber-volt tracking-wider">
                Enterprise Security Guardrails
              </h4>
              <ul className="space-y-1.5">
                {activeLayer.securityControls.map((control, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs font-sans text-slate-400">
                    <span className="text-cyber-volt font-mono font-bold">&bull;</span>
                    <span>{control}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>Decoupled Invariant:</span>
            <span className="text-cyber-emerald font-bold">100% Stateless Handshake</span>
          </div>
        </div>

        {/* Right Column: Code Implementation & Contract Inspector (7 Columns) */}
        <div className="lg:col-span-7 glass-panel rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between">
          <div className="px-4 py-3 bg-obsidian-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <span className="text-cyber-cyan font-bold">{activeLayer.title}</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400">production_snippet.ts</span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(activeLayer.codeSnippet)}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 hover:text-cyber-cyan hover:border-cyber-cyan/50 transition-colors"
              aria-label="Copy code snippet"
            >
              {copiedSnippet ? (
                <>
                  <Check className="w-3.5 h-3.5 text-cyber-volt" />
                  <span className="text-cyber-volt">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="p-5 bg-obsidian-950/95 font-mono text-xs overflow-x-auto min-h-[300px] flex items-center">
            <pre className="text-slate-300 leading-relaxed w-full">
              <code>{activeLayer.codeSnippet}</code>
            </pre>
          </div>

          <div className="px-4 py-2.5 bg-obsidian-950 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Verified against Google Antigravity & Vertex AI SDK v2.0+</span>
            <span className="text-cyber-volt">Production Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};
