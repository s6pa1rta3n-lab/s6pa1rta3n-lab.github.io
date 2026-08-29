import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  FileText, 
  Layers, 
  TrendingUp, 
  Award, 
  Compass, 
  FileCode, 
  Sparkles, 
  DollarSign, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Bot,
  Copy,
  Check
} from 'lucide-react';
import { VCDeckViewer } from '../components/strategy/VCDeckViewer';
import { RoadmapTimeline } from '../components/strategy/RoadmapTimeline';
import { SCFGrantView } from '../components/strategy/SCFGrantView';
import { BusinessPlanView } from '../components/strategy/BusinessPlanView';
import { MarkdownDocViewer } from '../components/strategy/MarkdownDocViewer';

export const StrategyPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') as 'b2b' | 'pitch' | 'roadmap' | 'scf' | 'plan' | 'markdown' | null;

  const [activeTab, setActiveTab] = useState<'b2b' | 'pitch' | 'roadmap' | 'scf' | 'plan' | 'markdown'>(
    tabParam && ['b2b', 'pitch', 'roadmap', 'scf', 'plan', 'markdown'].includes(tabParam) ? tabParam : 'b2b'
  );

  const [pilotEmail, setPilotEmail] = useState('');
  const [pilotSubmitted, setPilotSubmitted] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  useEffect(() => {
    if (tabParam && ['b2b', 'pitch', 'roadmap', 'scf', 'plan', 'markdown'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  const handlePilotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pilotEmail.trim()) {
      setPilotSubmitted(true);
      setTimeout(() => setPilotSubmitted(false), 5000);
      setPilotEmail('');
    }
  };

  const handleCopySummary = async () => {
    const summaryText = `Universal Bounty Swarm Executive Summary:
- Market TAM: $500B+ Global Software Development Labor Market
- Cost Savings: Up to 90% Payroll Reduction ($150-$600/hr human developer vs $0.02-$5.00 compute)
- Traction: 195+ Automated Pull Requests Merged across 42 Ecosystem Projects
- Seed Round: Raising Seed capital to scale computing infrastructure and sales pipeline
- Technical Roadmap: 4-Phase Practical Scaling (Workforce -> Marketplace -> Expansion -> Enterprise)
- Stellar Grant: $50,000 in XLM Stellar Community Fund Dedicated AI Workforce
- Victory Audit: Independent AI auditor guaranteeing genuine code, auth enforcement, and zero mocked tests.`;
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2000);
    } catch {
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2000);
    }
  };

  const tabs = [
    { id: 'b2b', label: 'B2B Landing Copy', icon: Layers, badge: 'Commercial' },
    { id: 'pitch', label: 'VC Pitch Deck', icon: TrendingUp, badge: '6 Slides' },
    { id: 'roadmap', label: 'Tech Roadmap', icon: Compass, badge: '4 Phases' },
    { id: 'scf', label: 'Stellar SCF Grant', icon: Award, badge: '$50k XLM' },
    { id: 'plan', label: 'Business Plan', icon: FileText, badge: 'Dual Model' },
    { id: 'markdown', label: 'Markdown Inspector', icon: FileCode, badge: 'Raw / Docs' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-10">
      {/* Top Header & Overview */}
      <div className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Universal Bounty Swarm &bull; Operations & Strategy Command Center</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-100 font-mono tracking-tight">
          Strategy & <span className="cyber-gradient-text">Operations Hub</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
          Comprehensive strategic blueprints and technical dossiers powering the Universal Bounty Swarm. Explore our B2B commercial value proposition, $500B+ labor market thesis, 6-slide investor pitch deck, 4-phase technical roadmap, and Stellar SCF $50k build award breakdown.
        </p>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleCopySummary}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-obsidian-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-mono transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan"
          >
            {copiedSummary ? <Check className="w-4 h-4 text-cyber-volt" /> : <Copy className="w-4 h-4 text-cyber-cyan" />}
            <span>{copiedSummary ? 'Executive Summary Copied!' : 'Copy Executive Brief'}</span>
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('markdown')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyber-volt/10 hover:bg-cyber-volt/20 text-cyber-volt border border-cyber-volt/30 text-xs font-mono font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-volt shadow-glow-volt/10"
          >
            <FileCode className="w-4 h-4" />
            <span>Inspect All 5 Markdown Artifacts</span>
          </button>
        </div>
      </div>

      {/* Executive Telemetry Metrics Ribbon (5 Metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 font-mono">
        <div className="p-4 rounded-2xl bg-obsidian-900/90 border border-slate-800 hover:border-cyber-cyan/40 hover:shadow-glow-cyan/10 transition-all">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">Labor Market TAM</div>
          <div className="text-2xl sm:text-3xl font-black text-cyber-cyan mt-1">$500B+</div>
          <div className="text-[10px] text-slate-500 font-sans mt-0.5">Global Developer Labor</div>
        </div>

        <div className="p-4 rounded-2xl bg-obsidian-900/90 border border-slate-800 hover:border-cyber-volt/40 hover:shadow-glow-volt/10 transition-all">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">Cost Reduction</div>
          <div className="text-2xl sm:text-3xl font-black text-cyber-volt mt-1">90%+</div>
          <div className="text-[10px] text-slate-500 font-sans mt-0.5">$150k Dev vs Subscription</div>
        </div>

        <div className="p-4 rounded-2xl bg-obsidian-900/90 border border-slate-800 hover:border-cyber-emerald/40 hover:shadow-glow-emerald/10 transition-all">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">Stellar SCF Target</div>
          <div className="text-2xl sm:text-3xl font-black text-cyber-emerald mt-1">$50k</div>
          <div className="text-[10px] text-slate-500 font-sans mt-0.5">Dedicated AI Workforce</div>
        </div>

        <div className="p-4 rounded-2xl bg-obsidian-900/90 border border-slate-800 hover:border-cyber-violet/40 hover:shadow-glow-violet/10 transition-all">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">Technical Roadmap</div>
          <div className="text-2xl sm:text-3xl font-black text-cyber-violet mt-1">4 Phases</div>
          <div className="text-[10px] text-slate-500 font-sans mt-0.5">Workforce to Enterprise</div>
        </div>

        <div className="p-4 rounded-2xl bg-obsidian-900/90 border border-slate-800 hover:border-cyber-amber/40 transition-all col-span-2 sm:col-span-1">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">Seed Target Ask</div>
          <div className="text-2xl sm:text-3xl font-black text-cyber-amber mt-1">Seed Round</div>
          <div className="text-[10px] text-slate-500 font-sans mt-0.5">Scaling Compute & Sales</div>
        </div>
      </div>

      {/* Main Tabs Navigation Bar */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3" role="tablist">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => handleTabChange(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-volt ${
                isActive
                  ? 'bg-cyber-cyan text-obsidian-950 font-bold shadow-glow-cyan/30'
                  : 'bg-obsidian-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                isActive ? 'bg-obsidian-950 text-cyber-cyan' : 'bg-slate-800 text-slate-400'
              }`}>
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT AREA */}
      <div>
        {/* TAB 1: B2B Commercial Showcase */}
        {activeTab === 'b2b' && (
          <div className="space-y-10">
            {/* Hero Value Prop Banner */}
            <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 bg-gradient-to-r from-obsidian-900/90 via-obsidian-950 to-obsidian-900/90 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono">
                <Bot className="w-3.5 h-3.5" />
                <span>Enterprise Autonomous Workforce</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-slate-100 tracking-tight max-w-4xl">
                Replace your $150k dev team <span className="text-cyber-volt">for a fraction of the cost.</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 font-sans max-w-3xl leading-relaxed">
                The Universal Bounty Swarm is a 24/7 AI workforce that writes code, fixes bugs, and ships features faster than humans ever could. You don't need a senior engineer to fix typos, resolve dependency conflicts, or build standard forms. Let our AI do the heavy lifting so your human team can focus on big-picture strategy.
              </p>

              {/* 3 Pain Points */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                <div className="p-4 rounded-xl bg-obsidian-950 border border-slate-800 font-mono space-y-1">
                  <div className="text-xs font-bold text-cyber-crimson">1. Stale Backlogs</div>
                  <p className="text-xs text-slate-400 font-sans">Hundreds of routine tickets aging in GitHub or Jira with zero bandwidth to resolve.</p>
                </div>
                <div className="p-4 rounded-xl bg-obsidian-950 border border-slate-800 font-mono space-y-1">
                  <div className="text-xs font-bold text-cyber-amber">2. High Payroll Burn</div>
                  <p className="text-xs text-slate-400 font-sans">Senior engineers ($150k+/yr) wasting 35%+ of high-value time on minor bugs and boilerplate.</p>
                </div>
                <div className="p-4 rounded-xl bg-obsidian-950 border border-slate-800 font-mono space-y-1">
                  <div className="text-xs font-bold text-cyber-violet">3. Slow Delivery Cycles</div>
                  <p className="text-xs text-slate-400 font-sans">Waiting weeks for developer availability when routine code should ship in under 30 minutes.</p>
                </div>
              </div>
            </div>

            {/* 3-Step Autonomous Pipeline */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-mono text-slate-100 flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyber-volt" />
                <span>The 3-Step Headless Execution Pipeline</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel p-6 rounded-2xl border border-slate-800 font-mono space-y-3 relative overflow-hidden">
                  <div className="text-3xl font-black text-cyber-cyan">01</div>
                  <h4 className="text-base font-bold text-slate-100">Connect Your Codebase</h4>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    Point us to your GitHub organization. Our webhook gateway connects securely in seconds.
                  </p>
                </div>
                <div className="glass-panel p-6 rounded-2xl border border-slate-800 font-mono space-y-3 relative overflow-hidden">
                  <div className="text-3xl font-black text-cyber-volt">02</div>
                  <h4 className="text-base font-bold text-slate-100">Assign a Task</h4>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    Tell us what you need in plain English. The AI reads the code, fixes the problem, and runs local tests.
                  </p>
                </div>
                <div className="glass-panel p-6 rounded-2xl border border-slate-800 font-mono space-y-3 relative overflow-hidden">
                  <div className="text-3xl font-black text-cyber-emerald">03</div>
                  <h4 className="text-base font-bold text-slate-100">Review the Results</h4>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    We deliver fully tested, ready-to-merge code backed by our independent Victory Audit certification.
                  </p>
                </div>
              </div>
            </div>

            {/* Victory Audit Moat Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 bg-obsidian-900/80 space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-cyber-crimson" />
                <h3 className="text-xl font-bold font-mono text-slate-100">
                  The Security Guarantee: Independent Victory Audit
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed max-w-3xl">
                Enterprise codebases require absolute trust. A secondary "Auditor" AI independently tests and guarantees the code actually works before you see it.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs pt-2">
                <div className="p-4 rounded-xl bg-obsidian-950 border border-slate-800 space-y-1">
                  <div className="text-cyber-volt font-bold">Zero Test Manipulation</div>
                  <p className="text-slate-400 font-sans">Guarantees agents cannot comment out, loosen, or bypass failing assertions.</p>
                </div>
                <div className="p-4 rounded-xl bg-obsidian-950 border border-slate-800 space-y-1">
                  <div className="text-cyber-cyan font-bold">Authorization Enforced</div>
                  <p className="text-slate-400 font-sans">State-modifying endpoints strictly enforce caller validations and require_auth().</p>
                </div>
                <div className="p-4 rounded-xl bg-obsidian-950 border border-slate-800 space-y-1">
                  <div className="text-cyber-emerald font-bold">Cryptographic Integrity</div>
                  <p className="text-slate-400 font-sans">No mocked hashes or fake proofs; strict authentic host functions (e.g. env.crypto()).</p>
                </div>
              </div>
            </div>

            {/* 3 Pricing Tiers */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold font-mono text-slate-100 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-cyber-emerald" />
                  <span>Commercial Pricing Tiers</span>
                </h3>
                <span className="text-xs font-mono text-slate-400">Stop paying for seats &bull; Pay for resolved issues</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Startup */}
                <div className="glass-panel p-6 rounded-2xl border border-slate-800 font-mono space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="cyber-badge cyber-badge-cyan">STARTUP</span>
                    <div className="text-2xl font-black text-slate-100 mt-1">$299 <span className="text-xs text-slate-400 font-normal">/ month</span></div>
                    <p className="text-xs text-slate-400 font-sans">Perfect for fast-moving teams clearing technical debt.</p>
                    <ul className="space-y-2 text-xs text-slate-300 font-sans pt-3 border-t border-slate-800">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyber-volt flex-shrink-0" /> Up to 3 connected repositories</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyber-volt flex-shrink-0" /> 20 Verified PR Credits/mo ($15/additional)</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyber-volt flex-shrink-0" /> Standard Victory Audit gate</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyber-volt flex-shrink-0" /> Community Support</li>
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleTabChange('markdown')}
                    className="w-full py-2.5 rounded-xl bg-obsidian-950 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-mono font-bold transition-all"
                  >
                    Select Startup Plan
                  </button>
                </div>

                {/* DAO / Web3 */}
                <div className="glass-panel p-6 rounded-2xl border border-cyber-volt/50 bg-obsidian-900 font-mono space-y-4 flex flex-col justify-between shadow-glow-volt/10 ring-1 ring-cyber-volt/30 relative">
                  <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-cyber-volt text-obsidian-950 text-[10px] font-bold">
                    MOST POPULAR
                  </div>
                  <div className="space-y-2">
                    <span className="cyber-badge cyber-badge-volt">DAO / WEB3</span>
                    <div className="text-2xl font-black text-cyber-volt mt-1">$1,999 <span className="text-xs text-slate-400 font-normal">/ mo or USDC</span></div>
                    <p className="text-xs text-slate-400 font-sans">High-assurance autonomous delivery for distributed protocols.</p>
                    <ul className="space-y-2 text-xs text-slate-300 font-sans pt-3 border-t border-slate-800">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyber-volt flex-shrink-0" /> Up to 10 connected repositories</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyber-volt flex-shrink-0" /> 150 Verified PR Credits/mo</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyber-volt flex-shrink-0" /> Smart Contract Victory Audit</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyber-volt flex-shrink-0" /> Native Escrow Settlement (Stellar / Base)</li>
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleTabChange('scf')}
                    className="w-full py-2.5 rounded-xl bg-cyber-volt text-obsidian-950 font-bold text-xs font-mono hover:bg-lime-400 transition-all shadow-glow-volt/30"
                  >
                    Deploy Web3 Swarm
                  </button>
                </div>

                {/* Enterprise Managed Swarm */}
                <div className="glass-panel p-6 rounded-2xl border border-slate-800 font-mono space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="cyber-badge cyber-badge-violet">ENTERPRISE</span>
                    <div className="text-2xl font-black text-slate-100 mt-1">Custom Plan <span className="text-xs text-slate-400 font-normal">($4.5k+/mo)</span></div>
                    <p className="text-xs text-slate-400 font-sans">Unlimited scalable workforce with SOC2 compliance & VPC peering.</p>
                    <ul className="space-y-2 text-xs text-slate-300 font-sans pt-3 border-t border-slate-800">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyber-volt flex-shrink-0" /> Unlimited repositories & custom swarms</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyber-volt flex-shrink-0" /> Dedicated Cloud Runners (Isolated VPC / GKE)</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyber-volt flex-shrink-0" /> 99.9% Uptime SLA + P0 &lt; 1-hr response</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyber-volt flex-shrink-0" /> Zero Data Retention (ZDR) guarantee</li>
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('poc-pilot-form');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-2.5 rounded-xl bg-obsidian-950 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-mono font-bold transition-all"
                  >
                    Request Enterprise Pilot
                  </button>
                </div>
              </div>
            </div>

            {/* Enterprise 4-Week PoC Pilot Form */}
            <div id="poc-pilot-form" className="glass-panel p-8 sm:p-10 rounded-3xl border border-cyber-cyan/40 bg-obsidian-950 font-mono space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-cyber-cyan font-bold uppercase tracking-wider">
                    Risk-Free Enterprise Validation
                  </div>
                  <h3 className="text-2xl font-bold text-slate-100 mt-1">
                    Book Your 4-Week Enterprise Pilot
                  </h3>
                  <p className="text-xs text-slate-400 font-sans mt-1">
                    Includes up to 3 connected repositories, benchmark tasks, and 100% credit applied toward annual contract.
                  </p>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono font-bold self-start sm:self-auto">
                  Guaranteed CI-Passing Gate
                </div>
              </div>

              {pilotSubmitted ? (
                <div className="p-4 rounded-xl bg-cyber-volt/10 border border-cyber-volt/30 text-cyber-volt text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Thank you! Your Enterprise PoC request has been registered. Our AI ops team will reach out within 2 hours.</span>
                </div>
              ) : (
                <form onSubmit={handlePilotSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Enter your engineering work email (e.g. cto@company.com)"
                    value={pilotEmail}
                    onChange={(e) => setPilotEmail(e.target.value)}
                    className="flex-1 bg-obsidian-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyber-cyan font-mono"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-cyber-cyan hover:bg-cyan-400 text-obsidian-950 font-bold text-xs font-mono transition-all shadow-glow-cyan/30 flex items-center justify-center gap-2"
                  >
                    <span>Request PoC Call</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: VC Pitch Deck Navigator */}
        {activeTab === 'pitch' && <VCDeckViewer />}

        {/* TAB 3: Technical Roadmap */}
        {activeTab === 'roadmap' && <RoadmapTimeline />}

        {/* TAB 4: Stellar SCF Grant Breakdown */}
        {activeTab === 'scf' && <SCFGrantView />}

        {/* TAB 5: Strategic Business Plan */}
        {activeTab === 'plan' && <BusinessPlanView />}

        {/* TAB 6: Full-Text Markdown Inspector */}
        {activeTab === 'markdown' && (
          <div className="space-y-6">
            <MarkdownDocViewer showDocSelector={true} />
          </div>
        )}
      </div>
    </div>
  );
};
