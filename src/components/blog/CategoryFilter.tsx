import React from 'react';
import { Tag, Sparkles, Filter } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  tags: string[];
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  categoryCounts?: Record<string, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  tags,
  selectedTag,
  onSelectTag,
  categoryCounts = {},
}) => {
  return (
    <div className="space-y-4">
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5 shrink-0 mr-2">
          <Filter className="w-3.5 h-3.5 text-cyber-cyan" />
          <span>Category:</span>
        </div>

        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          const count = categoryCounts[category];
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all shrink-0 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan ${
                isSelected
                  ? 'bg-cyber-cyan text-obsidian-950 font-bold shadow-glow-cyan/20'
                  : 'bg-obsidian-900 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-slate-100'
              }`}
            >
              {category === 'All' && <Sparkles className="w-3 h-3" />}
              <span>{category}</span>
              {typeof count === 'number' && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-obsidian-950/40 text-obsidian-950 font-bold' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tag Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5 shrink-0 mr-2">
          <Tag className="w-3.5 h-3.5 text-cyber-volt" />
          <span>Tags:</span>
        </div>

        {selectedTag && (
          <button
            onClick={() => onSelectTag(null)}
            className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-rose-500/20 border border-rose-500/40 text-rose-400 hover:bg-rose-500/30 transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
          >
            Clear tag: #{selectedTag} &times;
          </button>
        )}

        {tags.map((tag) => {
          const isSelected = selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() => onSelectTag(isSelected ? null : tag)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-volt ${
                isSelected
                  ? 'bg-cyber-volt text-obsidian-950 font-bold shadow-glow-volt/20'
                  : 'bg-obsidian-900 text-slate-400 border border-slate-800/80 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              #{tag}
            </button>
          );
        })}
      </div>
    </div>
  );
};
