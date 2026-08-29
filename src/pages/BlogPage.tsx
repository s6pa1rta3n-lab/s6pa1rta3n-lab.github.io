import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, Search, AlertCircle } from 'lucide-react';
import { blogArticles, BlogArticle } from '../data/blogArticles';
import { ArticleCard } from '../components/blog/ArticleCard';
import { ArticleModal } from '../components/blog/ArticleModal';
import { CategoryFilter } from '../components/blog/CategoryFilter';

export const BlogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  // Check URL query param for deep-linking: ?article=slug
  useEffect(() => {
    const articleSlug = searchParams.get('article');
    if (articleSlug) {
      const found = blogArticles.find((a) => a.slug === articleSlug);
      if (found) {
        setSelectedArticle(found);
      }
    }
  }, [searchParams]);

  const handleOpenArticle = (article: BlogArticle) => {
    setSelectedArticle(article);
    setSearchParams({ article: article.slug });
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
    setSearchParams({});
  };

  const categories = useMemo(() => {
    const set = new Set<string>();
    set.add('All');
    blogArticles.forEach((a) => set.add(a.category));
    return Array.from(set);
  }, []);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    blogArticles.forEach((a) => a.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: blogArticles.length };
    blogArticles.forEach((a) => {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredArticles = useMemo(() => {
    return blogArticles.filter((art) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'All' || art.category === selectedCategory;

      const matchesTag = selectedTag ? art.tags.includes(selectedTag) : true;

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchQuery, selectedCategory, selectedTag]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-12">
      {/* Header Banner */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Research & Engineering Dispatches</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight">
          Swarm <span className="cyber-gradient-text">Research Blog</span>
        </h1>
        <p className="text-sm text-slate-400 font-sans leading-relaxed">
          Deep-dives into multi-agent systems, formal verification, zero-mock testing architectures, smart contract settlements, and outcome-based labor markets.
        </p>
      </div>

      {/* Search & Tag Filter Bar */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search engineering dispatches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-12 py-2.5 bg-obsidian-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan transition-colors"
              aria-label="Search engineering dispatches"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs font-mono p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan"
                aria-label="Clear search query"
              >
                Clear
              </button>
            )}
          </div>

          <div className="text-xs font-mono text-slate-400">
            Showing <span className="text-cyber-cyan font-bold">{filteredArticles.length}</span> of {blogArticles.length} dispatches
          </div>
        </div>

        {/* Category & Tag Filter Component */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          tags={allTags}
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
          categoryCounts={categoryCounts}
        />
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onSelect={handleOpenArticle}
            />
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 text-center rounded-2xl border border-slate-800 space-y-4">
          <AlertCircle className="w-8 h-8 text-cyber-amber mx-auto" />
          <h3 className="text-lg font-bold font-mono text-slate-200">No matching dispatches found</h3>
          <p className="text-xs text-slate-400 font-sans max-w-md mx-auto">
            Try adjusting your search query or removing category/tag filters to see all available engineering dispatches.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedTag(null);
            }}
            className="px-4 py-2 rounded-lg bg-cyber-cyan text-obsidian-950 font-mono font-bold text-xs hover:bg-cyber-cyan/90 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Modal Article Reader with TOC */}
      <ArticleModal
        article={selectedArticle}
        onClose={handleCloseArticle}
      />
    </div>
  );
};
