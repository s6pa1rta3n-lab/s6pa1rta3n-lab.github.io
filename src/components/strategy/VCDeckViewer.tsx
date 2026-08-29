import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Sparkles, 
  CheckCircle2, 
  BarChart3, 
  MessageSquare,
  PieChart
} from 'lucide-react';
import { PITCH_DECK_SLIDES, PitchDeckSlide } from '../../data/strategyDocs';

export const VCDeckViewer: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(true);

  const totalSlides = PITCH_DECK_SLIDES.length;
  const currentSlide: PitchDeckSlide = PITCH_DECK_SLIDES[currentSlideIndex] || PITCH_DECK_SLIDES[0];

  // Auto-play timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (autoPlay) {
      interval = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
      }, 6000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoPlay, totalSlides]);

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleSlideSelect = (index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlideIndex(index);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Hook':
      case 'The Ask':
        return 'cyber-badge-volt';
      case 'Problem':
        return 'cyber-badge-amber';
      case 'Solution':
      case 'Vision':
        return 'cyber-badge-cyan';
      case 'Moat':
        return 'cyber-badge-crimson';
      case 'Business Model':
        return 'cyber-badge-emerald';
      case 'Traction':
        return 'cyber-badge-violet';
      default:
        return 'cyber-badge-cyan';
    }
  };

  return (
    <div className="space-y-6">
      {/* Deck Controls & Top Bar */}
      <div className="glass-panel p-4 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="cyber-badge cyber-badge-volt">INVESTOR DOSSIER</span>
              <span className="text-xs font-mono text-slate-400">Ask: Seed Round to scale computing infrastructure and sales pipeline</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-mono text-slate-100 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyber-volt" />
              VC Pitch Deck Master Summary & Navigator
            </h2>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <button
              type="button"
              onClick={() => setAutoPlay(!autoPlay)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                autoPlay
                  ? 'bg-cyber-volt text-obsidian-950 font-bold border-cyber-volt shadow-glow-volt/30'
                  : 'bg-obsidian-900 text-slate-300 border-slate-800 hover:text-white'
              }`}
            >
              {autoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{autoPlay ? 'Autoplay On' : 'Autoplay'}</span>
            </button>

            <div className="flex items-center gap-1 bg-obsidian-950 border border-slate-800 rounded-lg p-1">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Slide"
                className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 text-xs font-mono font-bold text-cyber-cyan">
                {currentSlideIndex + 1} / {totalSlides}
              </span>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Slide"
                className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-obsidian-950 h-1.5 rounded-full overflow-hidden border border-slate-800/80">
          <div
            className="bg-cyber-volt h-full transition-all duration-300 rounded-full shadow-glow-volt/50"
            style={{ width: `${((currentSlideIndex + 1) / totalSlides) * 100}%` }}
          />
        </div>

        {/* Slide Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1">
          {PITCH_DECK_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => handleSlideSelect(idx)}
              className={`p-2 rounded-xl text-left font-mono transition-all border ${
                currentSlideIndex === idx
                  ? 'bg-slate-800/90 border-cyber-volt text-slate-100 shadow-md ring-1 ring-cyber-volt/40'
                  : 'bg-obsidian-900/80 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <div className="text-[10px] font-bold text-cyber-cyan flex items-center justify-between">
                <span>SLIDE {slide.slideNumber}</span>
                {currentSlideIndex === idx && <span className="w-1.5 h-1.5 rounded-full bg-cyber-volt animate-ping" />}
              </div>
              <div className="text-xs font-semibold truncate mt-0.5">{slide.category}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Slide Canvas */}
      <div className="glass-panel p-6 sm:p-10 rounded-2xl border border-slate-800/80 bg-gradient-to-b from-obsidian-900/90 to-obsidian-950/90 shadow-2xl relative overflow-hidden space-y-8 min-h-[480px]">
        {/* Slide Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`cyber-badge ${getCategoryColor(currentSlide.category)}`}>
                {currentSlide.category.toUpperCase()}
              </span>
              <span className="text-xs font-mono text-slate-500">
                Slide {currentSlide.slideNumber} of {totalSlides}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-100 tracking-tight">
              {currentSlide.title}
            </h1>
            <p className="text-sm text-cyber-cyan font-mono font-medium">
              {currentSlide.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                showSpeakerNotes
                  ? 'bg-slate-800 text-cyber-volt border-cyber-volt/40'
                  : 'bg-obsidian-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Notes {showSpeakerNotes ? 'Shown' : 'Hidden'}</span>
            </button>
          </div>
        </div>

        {/* Slide Body: Headline & Bullets */}
        <div className="space-y-6">
          <div className="inline-block px-3 py-1 rounded-md bg-obsidian-950 border border-slate-800 font-mono text-xs text-cyber-volt font-bold">
            &gt; {currentSlide.headline}
          </div>

          {/* Key Metrics Ribbon for this Slide */}
          {currentSlide.metrics && currentSlide.metrics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {currentSlide.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-obsidian-950/80 border border-slate-800 hover:border-slate-700 transition-all font-mono"
                >
                  <div className="text-xs text-slate-400 font-medium">{metric.label}</div>
                  <div className="text-2xl sm:text-3xl font-black text-cyber-volt mt-1">
                    {metric.value}
                  </div>
                  {metric.detail && (
                    <div className="text-[11px] text-slate-500 mt-1">{metric.detail}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Bullet Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentSlide.bullets.map((bullet, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-obsidian-900/60 border border-slate-800/80 hover:border-cyber-cyan/30 transition-all"
              >
                <CheckCircle2 className="w-4 h-4 text-cyber-cyan flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                  {bullet}
                </span>
              </div>
            ))}
          </div>

          {/* Slide Visual / Custom Presentation Card */}
          {currentSlide.slideNumber === 3 && (
            <div className="p-4 rounded-xl bg-obsidian-950 border border-slate-800 space-y-3 font-mono">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-cyber-volt font-bold">
                  <PieChart className="w-4 h-4" /> Market Opportunity Breakdown (TAM)
                </span>
                <span>Labor Arbitrage Vector</span>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-bold">Global Software Developer Labor (Swarm Target)</span>
                    <span className="text-cyber-volt font-black">$500B+</span>
                  </div>
                  <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden">
                    <div className="bg-cyber-volt h-full rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Developer Tool & IDE Plugin SaaS Spend (Copilots)</span>
                    <span className="text-slate-300 font-bold">$125B</span>
                  </div>
                  <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden">
                    <div className="bg-slate-700 h-full rounded-full" style={{ width: '25%' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentSlide.slideNumber === 6 && (
            <div className="p-4 rounded-xl bg-obsidian-950 border border-slate-800 space-y-3 font-mono">
              <div className="text-xs text-slate-400 flex items-center gap-1.5 font-bold text-cyber-volt">
                <BarChart3 className="w-4 h-4" /> Seed Capital Allocation & Milestones
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-obsidian-900 border border-cyber-volt/40">
                  <div className="text-cyber-volt font-bold text-base">60% Allocation</div>
                  <div className="text-slate-200 font-medium">Cloud Runner Infrastructure</div>
                  <div className="text-[11px] text-slate-400 mt-1">Scale container sandboxes & compute</div>
                </div>
                <div className="p-3 rounded-lg bg-obsidian-900 border border-cyber-cyan/40">
                  <div className="text-cyber-cyan font-bold text-base">30% Allocation</div>
                  <div className="text-slate-200 font-medium">Core AI Ops & Engineering</div>
                  <div className="text-[11px] text-slate-400 mt-1">Multi-agent models & Victory Audit</div>
                </div>
                <div className="p-3 rounded-lg bg-obsidian-900 border border-cyber-violet/40">
                  <div className="text-cyber-violet font-bold text-base">10% Allocation</div>
                  <div className="text-slate-200 font-medium">Sales Pipeline & GTM</div>
                  <div className="text-[11px] text-slate-400 mt-1">Onboard 50+ startup marketplace customers</div>
                </div>
              </div>
            </div>
          )}

          {/* Key Takeaway Callout */}
          <div className="p-4 rounded-xl bg-cyber-cyan/10 border-l-4 border-cyber-cyan flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-cyber-cyan flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-mono font-bold text-cyber-cyan uppercase tracking-wider">
                Key Investor Takeaway
              </div>
              <div className="text-xs sm:text-sm text-slate-200 font-sans mt-0.5">
                {currentSlide.takeaway}
              </div>
            </div>
          </div>

          {/* Speaker Notes Drawer */}
          {showSpeakerNotes && (
            <div className="p-4 rounded-xl bg-obsidian-950 border border-slate-800 font-mono text-xs space-y-1.5">
              <div className="text-cyber-volt font-bold flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Presenter Talking Points & Speaker Notes:</span>
              </div>
              <p className="text-slate-400 font-sans leading-relaxed">
                "{currentSlide.speakerNotes}"
              </p>
            </div>
          )}
        </div>

        {/* Slide Footer Navigation */}
        <div className="flex items-center justify-between border-t border-slate-800/80 pt-4 text-xs font-mono">
          <button
            type="button"
            onClick={handlePrev}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Slide</span>
          </button>
          <span className="text-slate-500 font-semibold">
            Universal Bounty Swarm &bull; Confidential VC Pitch Deck
          </span>
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-1.5 text-cyber-cyan hover:text-cyber-volt transition-colors font-bold"
          >
            <span>Next Slide</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
