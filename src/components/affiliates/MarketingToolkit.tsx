import React, { useState } from 'react';
import { Sparkles, Copy, Check, Link } from 'lucide-react';
import { marketingAssets } from '../../data/affiliatesData';

export const MarketingToolkit: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [customTag, setCustomTag] = useState<string>('YOUR_TAG');
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const generatedReferralLink = `https://swarm.dev/r/${customTag || 'YOUR_TAG'}`;

  const copyText = (text: string, id: string) => {
    // Replace YOUR_TAG with custom tag if set
    const processedText = text.replace(/YOUR_TAG/g, customTag || 'YOUR_TAG');
    navigator.clipboard.writeText(processedText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(generatedReferralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const categories = ['All', 'Social Copy', 'Email Pitch', 'Badges & Markdown', 'Pitch Script'];

  const filteredAssets = activeCategory === 'All'
    ? marketingAssets
    : marketingAssets.filter((a) => a.category === activeCategory);

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-8 border border-slate-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold font-mono text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyber-cyan" />
            <span>Creator Marketing Toolkit</span>
          </h3>
          <p className="text-xs text-slate-400 font-sans">
            Ready-to-use pitch templates, social media copy, and embeddable README badges highlighting 90% cost savings
          </p>
        </div>

        {/* Quick Pitch Copy Button (For backward-compatibility with existing tests) */}
        <button
          onClick={() => copyText(marketingAssets[0].content, 'main-pitch')}
          className="px-3.5 py-1.5 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono hover:bg-cyber-cyan/20 transition-colors flex items-center gap-1.5 self-start sm:self-auto font-bold"
        >
          {copiedId === 'main-pitch' ? <Check className="w-3.5 h-3.5 text-cyber-emerald" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedId === 'main-pitch' ? 'Copied!' : 'Copy Pitch'}</span>
        </button>
      </div>

      {/* Instant Referral Link Generator */}
      <div className="p-5 rounded-xl bg-obsidian-900 border border-cyber-cyan/30 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-cyber-cyan font-bold">
          <Link className="w-4 h-4" />
          <span>Instant Custom Referral Link Generator</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="flex items-center bg-obsidian-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-400 sm:w-64">
            <span className="text-slate-500 mr-1">tag:</span>
            <input
              type="text"
              placeholder="e.g. dev_partner"
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))}
              className="bg-transparent text-cyber-volt font-bold focus:outline-none w-full"
            />
          </div>

          <div className="flex-1 flex items-center justify-between p-2 rounded-lg bg-obsidian-950 border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto">
            <span className="truncate mr-2 text-slate-300 select-all">{generatedReferralLink}</span>
            <button
              onClick={copyReferralLink}
              className="px-3 py-1 rounded bg-cyber-cyan text-obsidian-950 font-bold text-[11px] hover:bg-cyber-cyan/90 transition-colors shrink-0 flex items-center gap-1"
            >
              {copiedLink ? <Check className="w-3 h-3 text-obsidian-950" /> : <Copy className="w-3 h-3" />}
              <span>{copiedLink ? 'Copied' : 'Copy Link'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
              activeCategory === cat
                ? 'bg-cyber-volt text-obsidian-950 font-bold'
                : 'bg-obsidian-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Marketing Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAssets.map((asset) => {
          const isCopied = copiedId === asset.id;
          const displayContent = asset.content.replace(/YOUR_TAG/g, customTag || 'YOUR_TAG');

          return (
            <div
              key={asset.id}
              className="p-5 rounded-xl bg-obsidian-900/90 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-cyber-cyan font-semibold">
                    {asset.category}
                  </span>
                  <button
                    onClick={() => copyText(asset.content, asset.id)}
                    className="text-slate-400 hover:text-cyber-cyan flex items-center gap-1 text-xs font-mono transition-colors"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-cyber-emerald" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                <h4 className="text-sm font-bold font-mono text-slate-100">{asset.title}</h4>
                <p className="text-xs text-slate-400 font-sans">{asset.description}</p>

                <div className="p-3 rounded-lg bg-obsidian-950 border border-slate-800 text-xs font-mono text-slate-300 max-h-36 overflow-y-auto leading-relaxed select-all whitespace-pre-wrap">
                  {displayContent}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
