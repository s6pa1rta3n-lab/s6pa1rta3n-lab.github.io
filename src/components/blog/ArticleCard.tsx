import React from 'react';
import { Clock, User, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { BlogArticle } from '../../data/blogArticles';

interface ArticleCardProps {
  article: BlogArticle;
  onSelect: (article: BlogArticle) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onSelect }) => {
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Security & Verification':
        return 'cyber-badge-emerald';
      case 'Smart Contracts':
        return 'cyber-badge-volt';
      case 'DeFi Keepers':
        return 'cyber-badge-violet';
      default:
        return 'cyber-badge-cyan';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Security & Verification':
        return <ShieldCheck className="w-3 h-3" />;
      case 'Smart Contracts':
      case 'DeFi Keepers':
        return <Zap className="w-3 h-3" />;
      default:
        return <Sparkles className="w-3 h-3" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(article)}
      className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 hover:border-cyber-cyan/40 transition-all flex flex-col justify-between group space-y-5 cursor-pointer relative overflow-hidden"
      role="article"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(article);
        }
      }}
    >
      {/* Glow highlight on hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-cyan/5 rounded-full blur-2xl group-hover:bg-cyber-cyan/10 transition-all pointer-events-none" />

      <div className="space-y-4">
        {/* Category & Tags Header */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className={`cyber-badge ${getCategoryBadgeClass(article.category)} flex items-center gap-1.5`}>
            {getCategoryIcon(article.category)}
            <span>{article.category}</span>
          </span>

          <div className="flex flex-wrap gap-1.5">
            {article.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[11px] font-mono text-slate-400 bg-obsidian-900 px-2 py-0.5 rounded border border-slate-800/80">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1.5">
          <h2 className="text-lg sm:text-xl font-bold text-slate-100 font-mono group-hover:text-cyber-cyan transition-colors leading-snug">
            {article.title}
          </h2>
          <p className="text-xs text-slate-400 font-mono italic leading-relaxed">
            {article.subtitle}
          </p>
        </div>

        {/* Excerpt */}
        <p className="text-xs text-slate-300 font-sans leading-relaxed">
          {article.excerpt}
        </p>

        {/* Key Takeaway snippet pill */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className="p-2.5 rounded-lg bg-obsidian-900 border border-slate-800/80 text-[11px] text-slate-400 font-sans flex items-start gap-2">
            <span className="text-cyber-volt font-bold shrink-0">Key:</span>
            <span className="line-clamp-2">{article.keyTakeaways[0]}</span>
          </div>
        )}
      </div>

      {/* Footer / Meta */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-slate-400">
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span>{article.author.name}</span>
          </span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{article.readingTime}</span>
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(article);
          }}
          className="text-cyber-cyan flex items-center gap-1.5 group-hover:translate-x-1 transition-transform font-bold"
        >
          <span>Read Article</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
