import React, { useState, useEffect } from 'react';
import { X, Copy, Check, ShieldCheck } from 'lucide-react';
import { MarketplaceService } from '../../data/marketplaceData';

interface ServiceDetailModalProps {
  service: MarketplaceService | null;
  onClose: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, onClose }) => {
  const [activeTab, setActiveTab] = useState<'json' | 'curl' | 'ts' | 'python'>('json');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (service) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  const getActiveCode = () => {
    switch (activeTab) {
      case 'curl':
        return service.curlSnippet;
      case 'ts':
        return service.tsSdkSnippet;
      case 'python':
        return service.pythonSdkSnippet;
      default:
        return JSON.stringify(service.sampleRequest, null, 2);
    }
  };

  const copySnippet = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
      onClick={onClose}
    >
      <div
        className="glass-panel-glow max-w-3xl w-full p-6 sm:p-8 rounded-2xl space-y-6 relative border border-cyber-cyan/30 bg-obsidian-950 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <span className="cyber-badge cyber-badge-cyan text-xs">
              REST / Webhook API Schema
            </span>
            <h3 id="service-modal-title" className="text-xl sm:text-2xl font-bold font-mono text-slate-100">
              {service.name}
            </h3>
            <p className="text-xs text-slate-400 font-sans">{service.tagline}</p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-obsidian-900 border border-slate-800 text-slate-400 hover:text-slate-100 hover:border-slate-700 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Endpoint Box */}
        <div className="space-y-1.5 font-mono text-xs">
          <span className="text-slate-400 font-semibold">API Endpoint:</span>
          <div className="p-3 rounded-xl bg-obsidian-900 border border-slate-800 text-cyber-volt flex items-center justify-between overflow-x-auto">
            <span>{service.apiEndpoint}</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider ml-2">JSON Body</span>
          </div>
        </div>

        {/* Tabs for SDKs & Formats */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
            <div className="flex items-center gap-2 font-mono text-xs">
              <button
                onClick={() => setActiveTab('json')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'json'
                    ? 'bg-cyber-cyan text-obsidian-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200 bg-obsidian-900'
                }`}
              >
                Request Body (JSON)
              </button>
              <button
                onClick={() => setActiveTab('curl')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'curl'
                    ? 'bg-cyber-cyan text-obsidian-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200 bg-obsidian-900'
                }`}
              >
                cURL
              </button>
              <button
                onClick={() => setActiveTab('ts')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'ts'
                    ? 'bg-cyber-cyan text-obsidian-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200 bg-obsidian-900'
                }`}
              >
                TypeScript SDK
              </button>
              <button
                onClick={() => setActiveTab('python')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'python'
                    ? 'bg-cyber-cyan text-obsidian-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200 bg-obsidian-900'
                }`}
              >
                Python SDK
              </button>
            </div>

            <button
              onClick={copySnippet}
              className="text-xs font-mono text-slate-400 hover:text-cyber-cyan flex items-center gap-1.5 transition-colors px-2.5 py-1 rounded bg-obsidian-900 border border-slate-800"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-cyber-emerald" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Code Viewer */}
          <div className="rounded-xl bg-obsidian-950 border border-slate-800 overflow-hidden">
            <pre className="p-4 rounded text-xs font-mono text-slate-200 overflow-x-auto max-h-64 leading-relaxed select-all">
              <code>{getActiveCode()}</code>
            </pre>
          </div>
        </div>

        {/* Sample Response Box */}
        {activeTab === 'json' && service.sampleResponse && (
          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-semibold">Expected Response (200 OK):</span>
              <span className="text-[11px] text-cyber-emerald flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified Schema</span>
              </span>
            </div>
            <pre className="p-4 rounded-xl bg-obsidian-950 border border-slate-800 text-slate-300 overflow-x-auto max-h-48 text-[11px] leading-relaxed">
              <code>{JSON.stringify(service.sampleResponse, null, 2)}</code>
            </pre>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <div className="text-xs font-mono text-slate-500">
            SLA: <span className="text-slate-300">{service.sla}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-cyber-cyan text-obsidian-950 font-mono font-bold text-xs hover:bg-cyber-cyan/90 transition-colors"
            >
              Close Inspector
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
