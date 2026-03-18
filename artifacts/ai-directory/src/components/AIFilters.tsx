import { Search, SlidersHorizontal } from "lucide-react";
import { Category, AI_CATEGORIES } from "@/data/ai-tools";
import { cn } from "@/lib/utils";

interface AIFiltersProps {
  search: string;
  setSearch: (val: string) => void;
  selectedCategory: Category | 'All';
  setSelectedCategory: (val: Category | 'All') => void;
  sortBy: string;
  setSortBy: (val: string) => void;
}

export function AIFilters({
  search, setSearch, selectedCategory, setSelectedCategory, sortBy, setSortBy
}: AIFiltersProps) {
  return (
    <div className="space-y-6 w-full max-w-6xl mx-auto z-10 relative">
      {/* Search Bar */}
      <div className="relative group max-w-2xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-50" />
        <div className="relative flex items-center bg-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <Search className="w-6 h-6 text-muted-foreground ml-4" />
          <input 
            type="text"
            placeholder="Search for an AI tool, company, or use case..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-none text-foreground px-4 py-4 focus:outline-none placeholder:text-muted-foreground/70"
          />
          <div className="pr-4 hidden sm:block">
            <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-white/10 bg-black/30 px-2 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>
      </div>

      {/* Categories and Sort */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
        <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide no-scrollbar hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <button
            onClick={() => setSelectedCategory('All')}
            className={cn(
              "whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
              selectedCategory === 'All' 
                ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(59,130,246,0.3)]" 
                : "bg-card text-muted-foreground border-white/5 hover:border-white/20 hover:text-foreground"
            )}
          >
            All Tools
          </button>
          {AI_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                selectedCategory === cat 
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(59,130,246,0.3)]" 
                  : "bg-card text-muted-foreground border-white/5 hover:border-white/20 hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto self-start md:self-auto shrink-0">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Sort by:</span>
          </div>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-card border border-white/10 text-foreground text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer appearance-none outline-none"
          >
            <option value="Rating">Highest Rated</option>
            <option value="Name">A-Z Name</option>
            <option value="Pricing">Pricing Model</option>
          </select>
        </div>
      </div>
    </div>
  );
}
