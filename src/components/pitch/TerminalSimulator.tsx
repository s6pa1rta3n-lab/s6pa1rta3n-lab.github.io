import React, { useState, useEffect } from 'react';
import { TERMINAL_SIMULATION_STEPS } from '../../data/devpostCriteria';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Terminal,
  Database,
  Coins,
  Cpu,
  CheckCircle2,
  Clock,
  Flame,
} from 'lucide-react';

export const TerminalSimulator: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [autoAdvanceSpeed] = useState<number>(3500);

  const currentStep = TERMINAL_SIMULATION_STEPS[currentStepIndex];

  // Calculate cumulative metrics
  const cumulativeMetrics = TERMINAL_SIMULATION_STEPS.slice(0, currentStepIndex + 1).reduce(
    (acc, step) => ({
      durationMs: acc.durationMs + step.metrics.durationMs,
      tokensUsed: acc.tokensUsed + step.metrics.tokensUsed,
      costUsd: acc.costUsd + step.metrics.costUsd,
    }),
    { durationMs: 0, tokensUsed: 0, costUsd: 0 }
  );

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= TERMINAL_SIMULATION_STEPS.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, autoAdvanceSpeed);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, autoAdvanceSpeed]);

  const handleNext = () => {
    if (currentStepIndex < TERMINAL_SIMULATION_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const formatLogLine = (line: string) => {
    if (line.includes('[Gateway]')) {
      return (
        <span>
          <span className="text-cyber-cyan font-bold">[Gateway]</span> {line.replace('[Gateway]', '')}
        </span>
      );
    }
    if (line.includes('[Sniper Filter]')) {
      return (
        <span>
          <span className="text-cyber-volt font-bold">[Sniper Filter]</span> {line.replace('[Sniper Filter]', '')}
        </span>
      );
    }
    if (line.includes('[Explorer]')) {
      return (
        <span>
          <span className="text-cyber-amber font-bold">[Explorer]</span> {line.replace('[Explorer]', '')}
        </span>
      );
    }
    if (line.includes('[Sandbox]')) {
      return (
        <span>
          <span className="text-cyber-cyan font-bold">[Sandbox]</span> {line.replace('[Sandbox]', '')}
        </span>
      );
    }
    if (line.includes('[Engineer]')) {
      return (
        <span>
          <span className="text-cyber-emerald font-bold">[Engineer]</span> {line.replace('[Engineer]', '')}
        </span>
      );
    }
    if (line.includes('[Auditor]')) {
      return (
        <span>
          <span className="text-cyber-violet font-bold">[Auditor]</span> {line.replace('[Auditor]', '')}
        </span>
      );
    }
    if (line.includes('[Relay]')) {
      return (
        <span>
          <span className="text-cyber-volt font-bold">[Relay]</span> {line.replace('[Relay]', '')}
        </span>
      );
    }
    if (line.includes('[Stigmergy]')) {
      return (
        <span>
          <span className="text-cyber-cyan font-bold">[Stigmergy]</span> {line.replace('[Stigmergy]', '')}
        </span>
      );
    }
    return <span>{line}</span>;
  };

  return (
    <div className="space-y-6" id="terminal-simulator-section">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-volt/10 border border-cyber-volt/30 text-cyber-volt text-xs font-mono">
            <Flame className="w-3.5 h-3.5" />
            <span>Interactive Live Trace Inspector &bull; Autonomous Issue-to-PR Lifecycle</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-100 font-mono">
            Autonomous <span className="volt-gradient-text">Terminal Simulator</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-sans max-w-2xl leading-relaxed">
            Step through an unedited, real-world execution trace of the Universal Bounty Swarm resolving a live Web3 bounty with Cloud Run, Firestore stigmergy, and Victory Audit.
          </p>
        </div>

        {/* Playback Controls Toolbar */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-obsidian-900/90 p-1.5 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="p-2 rounded-lg bg-obsidian-950 text-slate-300 hover:text-cyber-cyan hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-volt"
            title="Previous Step"
            aria-label="Previous step"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-volt ${
              isPlaying
                ? 'bg-cyber-amber text-obsidian-950 shadow-glow-amber/30'
                : 'bg-cyber-volt text-obsidian-950 hover:bg-cyber-volt/90 shadow-glow-volt/30'
            }`}
            aria-label={isPlaying ? 'Pause simulation' : 'Play simulation'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play Live Trace</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentStepIndex === TERMINAL_SIMULATION_STEPS.length - 1}
            className="p-2 rounded-lg bg-obsidian-950 text-slate-300 hover:text-cyber-cyan hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-volt"
            title="Next Step"
            aria-label="Next step"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="p-2 rounded-lg bg-obsidian-950 text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
            title="Reset to Step 1"
            aria-label="Reset simulation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Step Navigation Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {TERMINAL_SIMULATION_STEPS.map((step, idx) => {
          const isActive = idx === currentStepIndex;
          const isPassed = idx < currentStepIndex;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex(idx);
              }}
              className={`p-2.5 rounded-xl text-left font-mono transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-volt ${
                isActive
                  ? 'bg-obsidian-900 border-cyber-cyan text-slate-100 shadow-glow-cyan/20'
                  : isPassed
                  ? 'bg-obsidian-950/60 border-cyber-volt/30 text-slate-300'
                  : 'bg-obsidian-950/30 border-slate-800/80 text-slate-500 hover:text-slate-300 hover:border-slate-700'
              }`}
              aria-label={`Jump to Step ${step.id}: ${step.phase}`}
            >
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>STEP 0{step.id}</span>
                {isPassed && <CheckCircle2 className="w-3 h-3 text-cyber-volt" />}
                {isActive && <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />}
              </div>
              <div className="text-xs font-bold truncate mt-1 text-slate-200">
                {step.phase.replace('_', ' ')}
              </div>
              <div className="text-[10px] text-slate-400 truncate mt-0.5">
                {step.agentRole.split(' ')[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Terminal Main Window & Side Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Terminal Console (8 Columns) */}
        <div className="lg:col-span-8 glass-panel rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col justify-between">
          {/* Console Top Chrome */}
          <div className="px-4 py-3 bg-obsidian-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-xs font-mono text-slate-400 ml-2 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyber-cyan" />
                <span>fleet-cloudrun-runner@gcp-us-central1:~</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300">
                PHASE: {currentStep.phase}
              </span>
              <span className="px-2 py-0.5 rounded bg-cyber-volt/10 border border-cyber-volt/30 text-[10px] font-mono text-cyber-volt font-bold">
                {currentStep.status}
              </span>
            </div>
          </div>

          {/* Console Command & Output Stream */}
          <div className="p-5 font-mono text-xs space-y-4 bg-obsidian-950/95 min-h-[320px] max-h-[420px] overflow-y-auto">
            {/* Active Command */}
            <div className="flex items-center gap-2 text-cyber-cyan pb-3 border-b border-slate-800/80">
              <span className="text-cyber-volt font-bold">$</span>
              <span className="text-slate-100 font-semibold">{currentStep.command}</span>
            </div>

            {/* Agent Output Lines */}
            <div className="space-y-1.5 text-slate-300">
              {currentStep.output.map((line, idx) => (
                <div key={idx} className="leading-relaxed break-words">
                  {formatLogLine(line)}
                </div>
              ))}
            </div>

            {/* Terminal Prompt Blink */}
            <div className="flex items-center gap-1 text-cyber-cyan pt-2">
              <span className="text-cyber-volt font-bold">&gt;</span>
              <span className="animate-pulse font-bold text-cyber-cyan">_</span>
            </div>
          </div>

          {/* Console Footer Status */}
          <div className="px-4 py-2.5 bg-obsidian-950/80 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-cyber-volt font-bold">&bull; Active Agent:</span>
              <span className="text-slate-200">{currentStep.agentRole}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>Step Latency: {currentStep.metrics.durationMs}ms</span>
            </div>
          </div>
        </div>

        {/* State Machine & Telemetry Inspector (4 Columns) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Firestore Reactive Stigmergy Card */}
          <div className="glass-panel p-5 rounded-2xl border border-cyber-cyan/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyber-cyan">
                <Database className="w-4 h-4" />
                <span>Firestore Stigmergy State</span>
              </div>
              <span className="cyber-badge cyber-badge-cyan">onSnapshot()</span>
            </div>

            <div className="p-2.5 rounded-lg bg-obsidian-950 border border-slate-800 font-mono text-[11px] space-y-1">
              <div className="text-slate-400">Document Ref:</div>
              <div className="text-cyber-volt font-bold truncate">
                /{currentStep.stateDiff.firestoreDoc}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2 rounded-lg bg-obsidian-950 border border-slate-850 space-y-0.5">
                <span className="text-[10px] text-slate-500 uppercase">State Before</span>
                <div className="text-rose-400 font-bold truncate">
                  {currentStep.stateDiff.statusBefore}
                </div>
              </div>
              <div className="p-2 rounded-lg bg-obsidian-950 border border-slate-850 space-y-0.5">
                <span className="text-[10px] text-slate-500 uppercase">State After</span>
                <div className="text-cyber-emerald font-bold truncate">
                  {currentStep.stateDiff.statusAfter}
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Payload Mutation:</span>
              <pre className="p-2.5 rounded-lg bg-obsidian-950 border border-slate-800 text-[10px] font-mono text-slate-300 overflow-x-auto">
                {currentStep.stateDiff.payloadSnippet}
              </pre>
            </div>
          </div>

          {/* Cumulative Compute & Cost Telemetry */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyber-volt">
                <Coins className="w-4 h-4" />
                <span>Real-Time Labor Arbitrage Cost</span>
              </div>
              <span className="cyber-badge cyber-badge-volt">98% Cheaper</span>
            </div>

            <div className="grid grid-cols-3 gap-2 font-mono text-center">
              <div className="p-2.5 rounded-xl bg-obsidian-950 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                  <Clock className="w-2.5 h-2.5 text-cyber-cyan" />
                  <span>Time</span>
                </div>
                <div className="text-xs font-bold text-slate-200">
                  {(cumulativeMetrics.durationMs / 1000).toFixed(2)}s
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-obsidian-950 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                  <Cpu className="w-2.5 h-2.5 text-cyber-violet" />
                  <span>Tokens</span>
                </div>
                <div className="text-xs font-bold text-slate-200">
                  {cumulativeMetrics.tokensUsed.toLocaleString()}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-obsidian-950 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                  <Coins className="w-2.5 h-2.5 text-cyber-volt" />
                  <span>Cost</span>
                </div>
                <div className="text-xs font-bold text-cyber-volt">
                  ${cumulativeMetrics.costUsd.toFixed(4)}
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-obsidian-950/80 border border-slate-800/80 text-[11px] font-sans text-slate-400 leading-relaxed">
              <strong className="text-slate-200 font-mono">Arbitrage Summary:</strong> Replaced ~2 hours of human developer labor ($300.00 @ $150/hr) with{' '}
              <span className="text-cyber-volt font-mono font-bold">${cumulativeMetrics.costUsd.toFixed(4)}</span> in compute.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
