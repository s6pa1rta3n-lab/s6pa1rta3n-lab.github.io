import React, { useEffect, useState } from 'react';
import { X, Clock, Share2, Check, ArrowLeft, BookOpen, CheckCircle2, Copy } from 'lucide-react';
import { BlogArticle } from '../../data/blogArticles';

interface ArticleModalProps {
  article: BlogArticle | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeHeading, setActiveHeading] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (article) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

  const copyUrl = () => {
    const url = `${window.location.origin}${window.location.pathname}#/blog?article=${article.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToSection = (id: string) => {
    setActiveHeading(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Simple, safe Markdown renderer for headers, code blocks, lists, and bolding
  const renderMarkdownContent = (markdown: string) => {
    const lines = markdown.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBlockLanguage = '';
    let codeBlockBuffer: string[] = [];

    lines.forEach((line, index) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <div key={`code-${index}`} className="my-4 rounded-xl bg-obsidian-950 border border-slate-800 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-1.5 bg-obsidian-900 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                <span>{codeBlockLanguage || 'code'}</span>
                <span className="text-[10px] text-cyber-cyan">UTF-8 Verified</span>
              </div>
              <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                <code>{codeBlockBuffer.join('\n')}</code>
              </pre>
            </div>
          );
          codeBlockBuffer = [];
          inCodeBlock = false;
          codeBlockLanguage = '';
        } else {
          inCodeBlock = true;
          codeBlockLanguage = line.slice(3).trim();
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockBuffer.push(line);
        return;
      }

      if (line.startsWith('## ')) {
        const headingText = line.replace('## ', '').trim();
        const headingId = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        elements.push(
          <h2
            key={`h2-${index}`}
            id={headingId}
            className="text-xl sm:text-2xl font-bold font-mono text-slate-100 mt-8 mb-4 scroll-mt-24 pb-2 border-b border-slate-800/80 flex items-center gap-2"
          >
            <span className="text-cyber-cyan font-mono text-base">#</span>
            <span>{headingText}</span>
          </h2>
        );
      } else if (line.startsWith('### ')) {
        const headingText = line.replace('### ', '').trim();
        const headingId = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        elements.push(
          <h3
            key={`h3-${index}`}
            id={headingId}
            className="text-lg font-bold font-mono text-slate-200 mt-6 mb-3 scroll-mt-24"
          >
            {headingText}
          </h3>
        );
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        const bulletText = line.slice(2).trim();
        elements.push(
          <li key={`li-${index}`} className="flex items-start gap-2 text-sm text-slate-300 font-sans my-1">
            <span className="text-cyber-volt mt-1 font-bold shrink-0">•</span>
            <span>{bulletText}</span>
          </li>
        );
      } else if (line.match(/^\d+\.\s/)) {
        const itemText = line.replace(/^\d+\.\s/, '').trim();
        elements.push(
          <li key={`ol-${index}`} className="flex items-start gap-2 text-sm text-slate-300 font-sans my-1">
            <span className="text-cyber-cyan font-mono text-xs mt-1 shrink-0">›</span>
            <span>{itemText}</span>
          </li>
        );
      } else if (line.trim() === '') {
        // empty line spacing
      } else {
        elements.push(
          <p key={`p-${index}`} className="text-sm text-slate-300 font-sans leading-relaxed my-3">
            {line}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
      onClick={onClose}
    >
      <div
        className="glass-panel-glow max-w-4xl w-full max-h-[92vh] flex flex-col rounded-2xl border border-cyber-cyan/30 bg-obsidian-950 overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-obsidian-900/90 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-obsidian-950 border border-slate-800 text-slate-400 hover:text-slate-100 hover:border-slate-700 transition-colors flex items-center gap-1 text-xs font-mono"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Hub</span>
            </button>
            <span className="cyber-badge cyber-badge-cyan text-xs hidden sm:inline-flex">
              <BookOpen className="w-3 h-3" />
              <span>{article.category}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyUrl}
              className="px-3 py-1.5 rounded-lg bg-obsidian-950 border border-slate-800 hover:border-cyber-cyan text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-cyber-emerald" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-obsidian-950 border border-slate-800 text-slate-400 hover:text-slate-100 hover:border-slate-700 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto px-6 sm:px-10 py-8 space-y-8 scrollbar-thin">
          {/* Header */}
          <div className="space-y-4 border-b border-slate-800 pb-6">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="text-xs font-mono text-cyber-cyan bg-cyber-cyan/10 px-2.5 py-0.5 rounded-full border border-cyber-cyan/20">
                  #{tag}
                </span>
              ))}
            </div>

            <h1 id="article-modal-title" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono text-slate-100 tracking-tight leading-tight">
              {article.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-400 font-sans leading-relaxed">
              {article.subtitle}
            </p>

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatarUrl}
                  alt={article.author.name}
                  className="w-8 h-8 rounded-full border border-cyber-cyan/40 bg-obsidian-900"
                  onError={(e) => {
                    // Fallback if image doesn't load
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div>
                  <div className="text-slate-200 font-bold">{article.author.name}</div>
                  <div className="text-[11px] text-slate-500">{article.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-cyber-cyan" />
                  <span>{article.readingTime}</span>
                </span>
                <span>•</span>
                <span>{article.date}</span>
              </div>
            </div>
          </div>

          {/* Key Takeaways Callout */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="p-6 rounded-2xl bg-obsidian-900 border border-cyber-volt/30 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-cyber-volt font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Key Executive Takeaways</span>
              </div>
              <ul className="space-y-2">
                {article.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-sans">
                    <span className="text-cyber-volt font-bold mt-0.5">›</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Table of Contents (TOC) */}
          {article.toc && article.toc.length > 0 && (
            <div className="p-4 sm:p-5 rounded-xl bg-obsidian-900/60 border border-slate-800 space-y-2.5">
              <div className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-cyber-cyan" />
                <span>Table of Contents</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {article.toc.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left transition-colors flex items-center gap-1.5 p-1 rounded ${
                      activeHeading === item.id
                        ? 'text-cyber-cyan bg-obsidian-950 font-bold'
                        : 'text-slate-400 hover:text-cyber-cyan hover:bg-obsidian-950/50'
                    }`}
                  >
                    <span className="text-cyber-cyan">#</span>
                    <span className="truncate">{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Rendered Markdown Body */}
          <div className="prose prose-invert max-w-none text-slate-300 font-sans leading-relaxed">
            {renderMarkdownContent(article.contentMarkdown)}
          </div>

          {/* Author Footer Card */}
          <div className="p-6 rounded-2xl bg-obsidian-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-obsidian-950 border border-slate-800 text-cyber-cyan font-bold font-mono">
                {article.author.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="text-sm font-bold font-mono text-slate-200">{article.author.name}</div>
                <div className="text-xs text-slate-400">{article.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={article.author.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-obsidian-950 border border-slate-800 hover:border-cyber-cyan text-xs font-mono text-slate-300 hover:text-cyber-cyan transition-colors"
              >
                GitHub Profile
              </a>
              <button
                onClick={copyUrl}
                className="px-4 py-2 rounded-lg bg-cyber-cyan text-obsidian-950 text-xs font-mono font-bold hover:bg-cyber-cyan/90 transition-colors flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Article</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
