import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Download, 
  Search, 
  Code, 
  Eye, 
  Sparkles, 
  FileCode,
  Layers,
  ArrowRight
} from 'lucide-react';
import { STRATEGY_DOCUMENTS, StrategyDocument } from '../../data/strategyDocs';

interface MarkdownDocViewerProps {
  initialDocId?: 'b2b' | 'pitch' | 'roadmap' | 'scf' | 'plan';
  showDocSelector?: boolean;
  onDocChange?: (docId: 'b2b' | 'pitch' | 'roadmap' | 'scf' | 'plan') => void;
}

export const MarkdownDocViewer: React.FC<MarkdownDocViewerProps> = ({
  initialDocId = 'b2b',
  showDocSelector = true,
  onDocChange
}) => {
  const [selectedDocId, setSelectedDocId] = useState<'b2b' | 'pitch' | 'roadmap' | 'scf' | 'plan'>(initialDocId);
  const [viewMode, setViewMode] = useState<'rendered' | 'raw'>('rendered');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  const currentDoc: StrategyDocument = useMemo(() => {
    return STRATEGY_DOCUMENTS.find((d) => d.id === selectedDocId) || STRATEGY_DOCUMENTS[0];
  }, [selectedDocId]);

  const handleDocSelect = (id: 'b2b' | 'pitch' | 'roadmap' | 'scf' | 'plan') => {
    setSelectedDocId(id);
    if (onDocChange) onDocChange(id);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentDoc.rawContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([currentDoc.rawContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = currentDoc.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const docStats = useMemo(() => {
    const lines = currentDoc.rawContent.split('\n').length;
    const words = currentDoc.rawContent.trim().split(/\s+/).length;
    const bytes = new Blob([currentDoc.rawContent]).size;
    return { lines, words, bytes };
  }, [currentDoc]);

  // Robust lightweight markdown line-by-line renderer
  const renderFormattedMarkdown = (content: string, query: string) => {
    const lines = content.split('\n');
    let inCodeBlock = false;
    let codeBlockLanguage = '';
    let codeBuffer: string[] = [];
    const elements: React.ReactNode[] = [];

    const highlightText = (text: string) => {
      if (!query.trim()) return text;
      const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      const parts = text.split(regex);
      return parts.map((part, i) => 
        regex.test(part) ? (
          <mark key={i} className="bg-cyber-volt/30 text-cyber-volt px-1 rounded font-bold">
            {part}
          </mark>
        ) : (
          part
        )
      );
    };

    const formatInline = (text: string): React.ReactNode => {
      // Match bold **text** or code `text` or links [text](url)
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts: React.ReactNode[] = [];
      let lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = boldRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          parts.push(highlightText(text.substring(lastIndex, match.index)));
        }
        parts.push(
          <strong key={`bold-${match.index}`} className="text-slate-100 font-semibold">
            {highlightText(match[1])}
          </strong>
        );
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < text.length) {
        parts.push(highlightText(text.substring(lastIndex)));
      }
      return parts;
    };

    lines.forEach((line, index) => {
      // Code block delimiters
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <div key={`codeblock-${index}`} className="my-4 rounded-xl bg-obsidian-950 border border-slate-800 p-4 font-mono text-xs overflow-x-auto text-cyber-cyan">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-bold">{codeBlockLanguage || 'CODE'}</div>
              <pre className="text-slate-300">{codeBuffer.join('\n')}</pre>
            </div>
          );
          codeBuffer = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
          codeBlockLanguage = line.trim().replace('```', '');
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      // Headings
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={`h1-${index}`} className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono tracking-tight mt-8 mb-4 pb-2 border-b border-slate-800 flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-cyber-cyan flex-shrink-0" />
            <span>{highlightText(line.replace('# ', ''))}</span>
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={`h2-${index}`} className="text-xl sm:text-2xl font-bold text-slate-100 font-mono mt-6 mb-3 flex items-center gap-2">
            <span className="text-cyber-volt font-mono text-sm">##</span>
            <span>{highlightText(line.replace('## ', ''))}</span>
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={`h3-${index}`} className="text-lg font-semibold text-cyber-cyan font-mono mt-4 mb-2">
            {highlightText(line.replace('### ', ''))}
          </h3>
        );
      } else if (line.startsWith('> [!NOTE]')) {
        elements.push(
          <div key={`note-${index}`} className="my-4 p-4 rounded-xl bg-cyber-cyan/10 border-l-4 border-cyber-cyan text-xs text-cyber-cyan font-mono">
            <strong>NOTE:</strong> Real-time strategic intelligence extracted from autonomous research swarm.
          </div>
        );
      } else if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={`quote-${index}`} className="my-3 pl-4 border-l-2 border-slate-700 italic text-slate-400 text-sm">
            {highlightText(line.replace('> ', ''))}
          </blockquote>
        );
      } else if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const itemText = line.trim().substring(2);
        elements.push(
          <li key={`li-${index}`} className="ml-4 list-disc text-sm text-slate-300 my-1 marker:text-cyber-volt">
            {formatInline(itemText)}
          </li>
        );
      } else if (/^\d+\.\s/.test(line.trim())) {
        const itemText = line.trim().replace(/^\d+\.\s/, '');
        elements.push(
          <li key={`ol-${index}`} className="ml-4 list-decimal text-sm text-slate-300 my-1 marker:text-cyber-cyan font-sans">
            {formatInline(itemText)}
          </li>
        );
      } else if (line.trim().startsWith('|')) {
        // Simple table row detection
        elements.push(
          <div key={`table-${index}`} className="font-mono text-xs text-slate-300 py-1 px-2 bg-obsidian-950/60 border-x border-slate-800/80 overflow-x-auto">
            {line}
          </div>
        );
      } else if (line.trim() === '---') {
        elements.push(<hr key={`hr-${index}`} className="my-6 border-slate-800" />);
      } else if (line.trim() === '') {
        elements.push(<div key={`empty-${index}`} className="h-2" />);
      } else {
        elements.push(
          <p key={`p-${index}`} className="text-sm text-slate-300 leading-relaxed my-2 font-sans">
            {formatInline(line)}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls Bar */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="cyber-badge cyber-badge-cyan">{currentDoc.category}</span>
              <span className="text-xs font-mono text-slate-400">Filename: {currentDoc.filename}</span>
            </div>
            <h3 className="text-xl font-bold font-mono text-slate-100 flex items-center gap-2">
              <FileCode className="w-5 h-5 text-cyber-volt" />
              {currentDoc.title}
            </h3>
            <p className="text-xs text-slate-400 font-sans mt-1 max-w-2xl">
              {currentDoc.summary}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode Switch */}
            <div className="flex items-center rounded-lg bg-obsidian-900 border border-slate-800 p-1">
              <button
                type="button"
                onClick={() => setViewMode('rendered')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                  viewMode === 'rendered'
                    ? 'bg-cyber-cyan text-obsidian-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Rendered</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('raw')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                  viewMode === 'raw'
                    ? 'bg-cyber-cyan text-obsidian-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Raw Markdown</span>
              </button>
            </div>

            {/* Copy Button */}
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-obsidian-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-mono transition-all"
              title="Copy markdown to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-cyber-volt" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            {/* Download Button */}
            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyber-volt/10 hover:bg-cyber-volt/20 text-cyber-volt border border-cyber-volt/30 text-xs font-mono font-semibold transition-all"
              title="Download markdown file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .md</span>
            </button>
          </div>
        </div>

        {/* Search and Doc Selector Pills */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
          {showDocSelector && (
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              <span className="text-[11px] font-mono text-slate-500 mr-1 flex items-center gap-1">
                <Layers className="w-3 h-3" /> Document:
              </span>
              {STRATEGY_DOCUMENTS.map((doc) => (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => handleDocSelect(doc.id)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                    selectedDocId === doc.id
                      ? 'bg-slate-800 text-cyber-cyan border border-cyber-cyan/40 font-bold'
                      : 'bg-obsidian-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {doc.id.toUpperCase()}
                </button>
              ))}
            </div>
          )}

          {/* Search Filter */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search document..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-obsidian-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyber-cyan font-mono"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Telemetry Stats Bar */}
        <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-400 pt-2">
          <div>Lines: <span className="text-slate-200 font-bold">{docStats.lines}</span></div>
          <div>Words: <span className="text-slate-200 font-bold">{docStats.words}</span></div>
          <div>Size: <span className="text-slate-200 font-bold">{docStats.bytes} B</span></div>
          <div>Last Updated: <span className="text-cyber-cyan font-bold">{currentDoc.lastUpdated}</span></div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800/80 bg-obsidian-900/60 shadow-xl overflow-hidden">
        {viewMode === 'rendered' ? (
          <div className="prose prose-invert max-w-none text-slate-200">
            {renderFormattedMarkdown(currentDoc.rawContent, searchQuery)}
          </div>
        ) : (
          <div className="space-y-2 font-mono">
            <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-cyber-cyan" />
                Raw Source: {currentDoc.filename}
              </span>
              <span>UTF-8 Markdown</span>
            </div>
            <pre className="p-4 rounded-xl bg-obsidian-950 border border-slate-800 text-xs text-slate-300 font-mono overflow-x-auto whitespace-pre leading-relaxed select-all">
              {currentDoc.rawContent}
            </pre>
          </div>
        )}
      </div>

      {/* Footer Quick Switcher */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {currentDoc.keyStats.map((stat, idx) => (
          <div key={idx} className="p-3.5 rounded-xl bg-obsidian-900 border border-slate-800 font-mono">
            <div className="text-[11px] text-slate-400 uppercase tracking-wider">{stat.label}</div>
            <div className="text-sm font-bold text-cyber-volt mt-0.5 flex items-center justify-between">
              <span>{stat.value}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
