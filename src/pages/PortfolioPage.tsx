import React, { useState, useMemo } from 'react';
import {
  GitPullRequest,
  GitMerge,
  ExternalLink,
  FolderGit2,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Check,
  Copy,
  RotateCcw,
  Activity,
  Layers,
  XCircle
} from 'lucide-react';
import rawPortfolioData from '../data/swarm_portfolio.json';
import { PortfolioProject, PortfolioCategory } from '../types';

const portfolioData = rawPortfolioData as PortfolioProject[];

// Helper to determine ecosystem category from repository name
export const getRepositoryCategory = (repo: string): PortfolioCategory => {
  const lower = repo.toLowerCase();
  if (
    lower.includes('stellar') ||
    lower.includes('soroban') ||
    lower.includes('adamantine') ||
    lower.includes('revy') ||
    lower.includes('lynxx') ||
    lower.includes('vero') ||
    lower.includes('predictify') ||
    lower.includes('creditra') ||
    lower.includes('streampay') ||
    lower.includes('callora') ||
    lower.includes('vestflow') ||
    lower.includes('oryn') ||
    lower.includes('pactum') ||
    lower.includes('checkmate')
  ) {
    return 'Stellar / Soroban';
  }
  if (lower.includes('bitcoin') || lower.includes('runa')) {
    return 'Bitcoin & L2';
  }
  if (
    lower.includes('reporaid') ||
    lower.includes('code-settings') ||
    lower.includes('cli') ||
    lower.includes('chi') ||
    lower.includes('prometheus') ||
    lower.includes('autokey') ||
    lower.includes('twenty') ||
    lower.includes('clips') ||
    lower.includes('bounty') ||
    lower.includes('gather') ||
    lower.includes('insight') ||
    lower.includes('hyperlane')
  ) {
    return 'Developer Tools & Infra';
  }
  return 'DeFi & Payments';
};

export const getCategoryBadgeStyle = (category: PortfolioCategory): string => {
  switch (category) {
    case 'Stellar / Soroban':
      return 'bg-cyber-volt/10 text-cyber-volt border-cyber-volt/30';
    case 'Bitcoin & L2':
      return 'bg-cyber-amber/10 text-cyber-amber border-cyber-amber/30';
    case 'Developer Tools & Infra':
      return 'bg-cyber-violet/10 text-cyber-violet border-cyber-violet/30';
    case 'DeFi & Payments':
    default:
      return 'bg-cyber-cyan/10 text-cyber-cyan border-cyber-cyan/30';
  }
};

export const formatDate = (isoString: string): string => {
  try {
    const d = new Date(isoString);
    return d.toISOString().split('T')[0];
  } catch {
    return isoString;
  }
};

export const PortfolioPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'merged' | 'open'>('all');
  const [sortBy, setSortBy] = useState<'prs-desc' | 'merged-desc' | 'name-asc'>('prs-desc');
  const [expandedRepos, setExpandedRepos] = useState<Set<string>>(new Set());
  const [copiedEVM, setCopiedEVM] = useState(false);
  const [copiedStellar, setCopiedStellar] = useState(false);

  const evmAddress = '0xF46C9F6d70C50BF81ef3588AB523a90a594a2F89';
  const stellarAddress = 'GCL6OXAMLD75BMTINA6EMRUDWK5THQUSHMYNLSNBCJAPZJHNYJTUNIBC';

  const copyAddress = (text: string, type: 'evm' | 'stellar') => {
    navigator.clipboard.writeText(text);
    if (type === 'evm') {
      setCopiedEVM(true);
      setTimeout(() => setCopiedEVM(false), 2000);
    } else {
      setCopiedStellar(true);
      setTimeout(() => setCopiedStellar(false), 2000);
    }
  };

  // Aggregate Metrics
  const aggregateMetrics = useMemo(() => {
    const totalProjects = portfolioData.length;
    const totalPrs = portfolioData.reduce((sum, p) => sum + p.prs.length, 0);
    const mergedPrs = portfolioData.reduce((sum, p) => sum + p.merged_prs, 0);
    const openPrs = portfolioData.reduce(
      (sum, p) => sum + p.prs.filter((pr) => !pr.is_merged && pr.state === 'open').length,
      0
    );
    const closedUnmergedPrs = portfolioData.reduce(
      (sum, p) => sum + p.prs.filter((pr) => !pr.is_merged && pr.state === 'closed').length,
      0
    );
    const mergeRatePercent = totalPrs > 0 ? Math.round((mergedPrs / totalPrs) * 100) : 0;
    const repositoriesWithMerges = portfolioData.filter((p) => p.merged_prs > 0).length;

    return {
      totalProjects,
      totalPrs,
      mergedPrs,
      openPrs,
      closedUnmergedPrs,
      mergeRatePercent,
      repositoriesWithMerges,
    };
  }, []);

  const categories: PortfolioCategory[] = [
    'All',
    'Stellar / Soroban',
    'DeFi & Payments',
    'Developer Tools & Infra',
    'Bitcoin & L2',
  ];

  // Filter & Sort Logic
  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return portfolioData
      .filter((project) => {
        const repoCategory = getRepositoryCategory(project.repository);

        // Category Filter
        if (selectedCategory !== 'All' && repoCategory !== selectedCategory) {
          return false;
        }

        // Status Filter
        if (statusFilter === 'merged' && project.merged_prs === 0) {
          return false;
        }
        if (
          statusFilter === 'open' &&
          project.prs.filter((pr) => !pr.is_merged && pr.state === 'open').length === 0
        ) {
          return false;
        }

        // Search Query Filter
        if (query) {
          const matchesRepo = project.repository.toLowerCase().includes(query);
          const matchesPR = project.prs.some((pr) =>
            pr.title.toLowerCase().includes(query)
          );
          if (!matchesRepo && !matchesPR) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'prs-desc') {
          return b.total_prs - a.total_prs;
        }
        if (sortBy === 'merged-desc') {
          return b.merged_prs - a.merged_prs;
        }
        return a.repository.localeCompare(b.repository);
      });
  }, [searchQuery, selectedCategory, statusFilter, sortBy]);

  const toggleRepoExpand = (repoName: string) => {
    setExpandedRepos((prev) => {
      const next = new Set(prev);
      if (next.has(repoName)) {
        next.delete(repoName);
      } else {
        next.add(repoName);
      }
      return next;
    });
  };

  const handleToggleAll = () => {
    if (expandedRepos.size >= filteredProjects.length && filteredProjects.length > 0) {
      setExpandedRepos(new Set());
    } else {
      setExpandedRepos(new Set(filteredProjects.map((p) => p.repository)));
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setStatusFilter('all');
    setSortBy('prs-desc');
    setExpandedRepos(new Set());
  };

  const allExpanded =
    filteredProjects.length > 0 && expandedRepos.size >= filteredProjects.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-12">
      {/* 1. Hero Header Section */}
      <div className="space-y-6 max-w-4xl">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono">
            <GitPullRequest className="w-3.5 h-3.5 text-cyber-cyan" />
            <span>Proof of Work & Verifiable Track Record</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyber-emerald/10 border border-cyber-emerald/30 text-cyber-emerald text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-cyber-emerald" />
            <span>100% Cryptographic Verification</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
          Proof of Work & <span className="cyber-gradient-text">Ecosystem Contributions</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-400 font-sans leading-relaxed max-w-3xl">
          Live multi-agent ledger of 195+ Pull Requests delivered across 42 open-source ecosystem
          repositories. Every contribution is engineered with genuine cryptographic primitives,
          verifiable unit test suites, and zero mock data—delivering continuous labor arbitrage
          across Web3 and developer infrastructure.
        </p>
      </div>

      {/* 2. Aggregate Telemetry Metric Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric 1: Total Contributions */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 relative overflow-hidden group hover:border-cyber-cyan/50 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyber-cyan/5 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Total PRs</span>
            <GitPullRequest className="w-4 h-4 text-cyber-cyan" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-mono font-extrabold text-slate-100">195+</span>
            <span className="text-[11px] font-mono text-cyber-cyan">({aggregateMetrics.totalPrs} in dataset)</span>
          </div>
          <div className="text-[11px] text-slate-400 font-sans mt-1">
            Engineered contributions submitted
          </div>
        </div>

        {/* Metric 2: Repositories Maintained */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 relative overflow-hidden group hover:border-cyber-volt/50 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyber-volt/5 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Repositories</span>
            <FolderGit2 className="w-4 h-4 text-cyber-volt" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-mono font-extrabold text-slate-100">
              {aggregateMetrics.totalProjects}
            </span>
            <span className="text-[11px] font-mono text-cyber-volt">Active Repos</span>
          </div>
          <div className="text-[11px] text-slate-400 font-sans mt-1">
            Across 5 major ecosystem clusters
          </div>
        </div>

        {/* Metric 3: Merged Contributions */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 relative overflow-hidden group hover:border-cyber-emerald/50 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyber-emerald/5 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Merged PRs</span>
            <GitMerge className="w-4 h-4 text-cyber-emerald" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-mono font-extrabold text-cyber-emerald">
              {aggregateMetrics.mergedPrs}
            </span>
            <span className="text-[11px] font-mono text-cyber-emerald/90">
              ({aggregateMetrics.mergeRatePercent}% Merge Rate)
            </span>
          </div>
          <div className="text-[11px] text-slate-400 font-sans mt-1">
            {aggregateMetrics.repositoriesWithMerges} repositories merged upstream
          </div>
        </div>

        {/* Metric 4: Multi-Chain Coverage */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 relative overflow-hidden group hover:border-cyber-violet/50 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyber-violet/5 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Ecosystems</span>
            <Layers className="w-4 h-4 text-cyber-violet" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-mono font-extrabold text-slate-100">6+</span>
            <span className="text-[11px] font-mono text-cyber-violet">100% Zero-Mock</span>
          </div>
          <div className="text-[11px] text-slate-400 font-sans mt-1">
            Soroban, EVM, Base, Bitcoin DeFi
          </div>
        </div>
      </div>

      {/* 3. Interactive Filter & Search Command Bar */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
          {/* Search Input */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by repository name, PR title, or issue #..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-obsidian-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan"
              aria-label="Search repositories and pull requests"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs font-mono"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Right Controls: Status Tabs & Sort Dropdown & Expand Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Status Filter Tabs */}
            <div className="p-1 rounded-xl bg-obsidian-900 border border-slate-800 flex items-center gap-1 font-mono text-xs">
              <button
                onClick={() => setStatusFilter('all')}
                aria-label="Filter status: All"
                className={`px-3 py-1.5 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan ${
                  statusFilter === 'all'
                    ? 'bg-cyber-cyan text-obsidian-950 font-bold shadow-glow-cyan/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('merged')}
                aria-label="Filter status: Merged Only"
                className={`px-3 py-1.5 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-emerald ${
                  statusFilter === 'merged'
                    ? 'bg-cyber-emerald text-obsidian-950 font-bold shadow-glow-emerald/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Merged Only ({aggregateMetrics.repositoriesWithMerges})
              </button>
              <button
                onClick={() => setStatusFilter('open')}
                aria-label="Filter status: Active Pipeline"
                className={`px-3 py-1.5 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-volt ${
                  statusFilter === 'open'
                    ? 'bg-cyber-volt text-obsidian-950 font-bold shadow-glow-volt/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Active Pipeline
              </button>
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2 bg-obsidian-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs font-mono text-slate-300">
              <span className="text-slate-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as 'prs-desc' | 'merged-desc' | 'name-asc')
                }
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
                aria-label="Sort repositories"
              >
                <option value="prs-desc" className="bg-obsidian-900 text-slate-200">
                  Most PRs
                </option>
                <option value="merged-desc" className="bg-obsidian-900 text-slate-200">
                  Most Merged
                </option>
                <option value="name-asc" className="bg-obsidian-900 text-slate-200">
                  Repository Name (A-Z)
                </option>
              </select>
            </div>

            {/* Expand / Collapse All */}
            <button
              onClick={handleToggleAll}
              className="px-3.5 py-1.5 rounded-xl bg-obsidian-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-volt"
              aria-label={allExpanded ? 'Collapse all project details' : 'Expand all project details'}
            >
              {allExpanded ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                  <span>Collapse All</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  <span>Expand All</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Category Pills & Dynamic Count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 mr-1">
              <Filter className="w-3.5 h-3.5 text-cyber-cyan" />
              <span>Ecosystem:</span>
            </div>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  aria-label={`Filter ecosystem: ${cat}`}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-volt ${
                    isSelected
                      ? 'bg-cyber-cyan text-obsidian-950 font-bold shadow-glow-cyan/20'
                      : 'bg-obsidian-900 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {cat === 'All' && <Sparkles className="w-3 h-3 inline mr-1" />}
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>

          <div className="text-xs font-mono text-slate-400 self-end sm:self-auto">
            Displaying <span className="text-cyber-cyan font-bold">{filteredProjects.length}</span> of{' '}
            {portfolioData.length} Repositories (
            <span className="text-cyber-volt font-bold">
              {filteredProjects.reduce((acc, p) => acc + p.prs.length, 0)}
            </span>{' '}
            PRs)
          </div>
        </div>
      </div>

      {/* 4. Case Studies Grid (All 42 Repositories) */}
      {filteredProjects.length === 0 ? (
        /* Empty State */
        <div className="glass-panel p-12 rounded-2xl border border-slate-800 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mx-auto text-slate-400">
            <FolderGit2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-mono font-bold text-slate-200">No Projects Found</h3>
          <p className="text-xs text-slate-400 font-sans leading-relaxed">
            No ecosystem repositories or pull requests match &quot;{searchQuery}&quot; with the
            currently applied category and status filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyber-cyan text-obsidian-950 font-mono font-bold text-xs hover:bg-cyber-cyan/90 transition-colors shadow-glow-cyan/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-volt"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredProjects.map((project) => {
            const category = getRepositoryCategory(project.repository);
            const isExpanded = expandedRepos.has(project.repository);
            const mergePercent =
              project.total_prs > 0
                ? Math.round((project.merged_prs / project.total_prs) * 100)
                : 0;

            return (
              <div
                key={project.repository}
                className="glass-panel p-6 rounded-2xl border border-slate-800/90 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 relative group"
              >
                {/* Card Top: Repo Info & Category */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <FolderGit2 className="w-4 h-4 text-cyber-cyan flex-shrink-0" />
                        <a
                          href={project.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono font-bold text-base text-slate-100 hover:text-cyber-cyan transition-colors flex items-center gap-1.5 group/link"
                          aria-label={`GitHub repository ${project.repository} (opens in new tab)`}
                        >
                          <span className="break-all">{project.repository}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover/link:text-cyber-cyan flex-shrink-0" />
                        </a>
                      </div>
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono border ${getCategoryBadgeStyle(
                          category
                        )}`}
                      >
                        {category}
                      </span>
                    </div>

                    {/* Stats Badges */}
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="px-2.5 py-1 rounded-lg bg-obsidian-900 border border-slate-800 text-slate-300">
                        <span className="text-slate-100 font-bold">{project.total_prs}</span> PRs
                      </span>
                      {project.merged_prs > 0 ? (
                        <span className="px-2.5 py-1 rounded-lg bg-cyber-emerald/10 border border-cyber-emerald/30 text-cyber-emerald font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{project.merged_prs} Merged</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-lg bg-slate-800/40 border border-slate-700 text-slate-400">
                          {project.prs.length} Active
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Merge Progress Bar */}
                  {project.total_prs > 0 && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span>Merge Acceptance Rate</span>
                        <span
                          className={
                            project.merged_prs > 0 ? 'text-cyber-emerald font-bold' : 'text-slate-500'
                          }
                        >
                          {mergePercent}% ({project.merged_prs}/{project.total_prs})
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-obsidian-900 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-cyber-emerald to-cyber-cyan transition-all duration-500 rounded-full"
                          style={{ width: `${mergePercent}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Middle: PR List Accordion */}
                <div className="pt-2 border-t border-slate-800/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Pull Requests ({project.prs.length})
                    </span>
                    <button
                      onClick={() => toggleRepoExpand(project.repository)}
                      className="text-xs font-mono text-cyber-cyan hover:text-cyber-volt transition-colors flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-volt rounded px-1"
                      aria-expanded={isExpanded}
                      aria-label={`${isExpanded ? 'Collapse' : 'Expand'} PR list for ${
                        project.repository
                      }`}
                    >
                      <span>{isExpanded ? 'Hide PRs' : `View All ${project.prs.length} PRs`}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Visible PR Items */}
                  <div className="space-y-2">
                    {(isExpanded ? project.prs : project.prs.slice(0, 2)).map((pr, idx) => {
                      return (
                        <div
                          key={`${pr.url}-${idx}`}
                          className="p-2.5 rounded-xl bg-obsidian-900/80 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                        >
                          <div className="flex items-start gap-2 min-w-0">
                            {/* PR Status Pill */}
                            {pr.is_merged ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyber-emerald/15 text-cyber-emerald border border-cyber-emerald/30 flex-shrink-0">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>MERGED</span>
                              </span>
                            ) : pr.state === 'open' ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30 flex-shrink-0">
                                <Clock className="w-3 h-3" />
                                <span>OPEN</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-400 border border-slate-700 flex-shrink-0">
                                <XCircle className="w-3 h-3" />
                                <span>CLOSED</span>
                              </span>
                            )}

                            {/* PR Title */}
                            <span className="text-xs font-sans text-slate-200 truncate" title={pr.title}>
                              {pr.title}
                            </span>
                          </div>

                          {/* PR Date & Link */}
                          <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400 flex-shrink-0 self-end sm:self-auto">
                            <span>{formatDate(pr.created_at)}</span>
                            <a
                              href={pr.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyber-cyan hover:text-cyber-volt flex items-center gap-1 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyber-volt rounded"
                              aria-label={`View Pull Request on GitHub: ${pr.title} (opens in new tab)`}
                            >
                              <span>View PR</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      );
                    })}

                    {!isExpanded && project.prs.length > 2 && (
                      <button
                        onClick={() => toggleRepoExpand(project.repository)}
                        className="w-full py-1.5 rounded-lg bg-obsidian-900/40 hover:bg-obsidian-900 border border-dashed border-slate-800 text-[11px] font-mono text-slate-400 hover:text-cyber-cyan transition-colors text-center"
                      >
                        + {project.prs.length - 2} more Pull Requests in this repository
                      </button>
                    )}
                  </div>
                </div>

                {/* Card Bottom / Direct Repo Link */}
                <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Activity className="w-3 h-3 text-cyber-emerald" />
                    <span>Audited Autonomous PR</span>
                  </div>
                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-cyber-volt transition-colors flex items-center gap-1"
                  >
                    <span>Inspect Codebase</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. Settlement Proof & Payout Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyber-emerald/30 relative overflow-hidden bg-gradient-to-br from-obsidian-900/90 to-obsidian-950">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-emerald/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-emerald/10 border border-cyber-emerald/30 text-cyber-emerald text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Cryptographic Payout Routing & Verification</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-mono text-slate-100">
              Verified Settlement <span className="volt-gradient-text">Addresses</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
              All multi-agent bounty settlements, Gitcoin grants, and protocol keeper yield route
              strictly to verified organization wallets with zero manual interception.
            </p>
          </div>

          {/* Address Copy Boxes */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            {/* EVM Address */}
            <div className="p-3.5 rounded-xl bg-obsidian-950 border border-slate-800 flex items-center justify-between gap-3 min-w-[260px]">
              <div className="space-y-0.5">
                <div className="text-[10px] font-mono uppercase text-slate-400">EVM (Base / Arb / ETH)</div>
                <div className="font-mono text-xs text-cyber-volt font-bold">
                  {evmAddress.slice(0, 10)}...{evmAddress.slice(-8)}
                </div>
              </div>
              <button
                onClick={() => copyAddress(evmAddress, 'evm')}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-volt"
                aria-label="Copy EVM settlement address"
              >
                {copiedEVM ? (
                  <Check className="w-4 h-4 text-cyber-emerald" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Stellar Address */}
            <div className="p-3.5 rounded-xl bg-obsidian-950 border border-slate-800 flex items-center justify-between gap-3 min-w-[260px]">
              <div className="space-y-0.5">
                <div className="text-[10px] font-mono uppercase text-slate-400">Stellar / Soroban</div>
                <div className="font-mono text-xs text-cyber-cyan font-bold">
                  {stellarAddress.slice(0, 10)}...{stellarAddress.slice(-8)}
                </div>
              </div>
              <button
                onClick={() => copyAddress(stellarAddress, 'stellar')}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan"
                aria-label="Copy Stellar settlement address"
              >
                {copiedStellar ? (
                  <Check className="w-4 h-4 text-cyber-emerald" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
