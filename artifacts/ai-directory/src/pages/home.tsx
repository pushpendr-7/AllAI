import { useState, useMemo } from "react";
import { aiTools, Category, AITool, AI_CATEGORIES } from "@/data/ai-tools";
import { Search, Star, ExternalLink, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} className={`w-3.5 h-3.5 ${i <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300 fill-gray-200'}`} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-sm font-semibold text-gray-700">{rating.toFixed(1)}</span>
    </div>
  );
}

function PricingBadge({ pricing }: { pricing: AITool['pricing'] }) {
  const config = {
    Free: 'bg-green-100 text-green-800 border-green-200',
    Freemium: 'bg-blue-100 text-blue-800 border-blue-200',
    Paid: 'bg-amber-100 text-amber-800 border-amber-200',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config[pricing]}`}>
      {pricing}
    </span>
  );
}

function AIDetailModal({ tool, onClose }: { tool: AITool | null; onClose: () => void }) {
  if (!tool) return null;
  const Icon = tool.icon;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-100 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${tool.gradient}`}>
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{tool.name}</h2>
              <p className="text-sm text-gray-500">{tool.company}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6 space-y-5">
          <p className="text-gray-700 leading-relaxed">{tool.description}</p>
          <div className="flex items-center gap-3 flex-wrap">
            <StarRating rating={tool.rating} />
            <PricingBadge pricing={tool.pricing} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Platforms</p>
            <div className="flex flex-wrap gap-2">
              {tool.platforms.map(p => (
                <span key={p} className="px-2.5 py-1 rounded-lg text-xs bg-gray-100 text-gray-700 border border-gray-200 font-medium">{p}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Use Cases</p>
            <div className="flex flex-wrap gap-2">
              {tool.useCases.map(u => (
                <span key={u} className="px-2.5 py-1 rounded-lg text-xs bg-blue-50 text-blue-700 border border-blue-100">{u}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Categories</p>
            <div className="flex flex-wrap gap-2">
              {tool.categories.map(c => (
                <span key={c} className="px-2.5 py-1 rounded-lg text-xs bg-purple-50 text-purple-700 border border-purple-100">{c}</span>
              ))}
            </div>
          </div>
          <a
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-gray-900 hover:bg-gray-700 text-white font-medium rounded-xl transition-colors"
          >
            Visit {tool.name} <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

function AICard({ tool, onClick }: { tool: AITool; onClick: () => void }) {
  const Icon = tool.icon;
  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-all cursor-pointer hover:border-gray-300 flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${tool.gradient} shrink-0`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-base leading-tight">{tool.name}</h3>
            <p className="text-xs text-gray-400">{tool.company}</p>
          </div>
        </div>
        <PricingBadge pricing={tool.pricing} />
      </div>
      <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed flex-1">{tool.description}</p>
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <StarRating rating={tool.rating} />
        <div className="flex flex-wrap gap-1">
          {tool.categories.slice(0, 1).map(c => (
            <span key={c} className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600 border border-gray-200">{c}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [sortBy, setSortBy] = useState("Rating");
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);

  const filteredData = useMemo(() => {
    return aiTools.filter(tool => {
      const q = search.toLowerCase();
      const matchSearch = !q || tool.name.toLowerCase().includes(q) || tool.company.toLowerCase().includes(q) || tool.description.toLowerCase().includes(q);
      const matchCat = selectedCategory === 'All' || tool.categories.includes(selectedCategory);
      return matchSearch && matchCat;
    }).sort((a, b) => {
      if (sortBy === 'Rating') return b.rating - a.rating;
      if (sortBy === 'Name') return a.name.localeCompare(b.name);
      if (sortBy === 'Pricing') {
        const order: Record<string, number> = { Free: 1, Freemium: 2, Paid: 3 };
        return order[a.pricing] - order[b.pricing];
      }
      return 0;
    });
  }, [search, selectedCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">🤖 World AI Directory</h2>
        <p className="text-gray-500">Duniya ki sabhi popular AI tools ki puri jaankari — kya karte hain, platform, price aur rating.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{aiTools.length}</div>
          <div className="text-xs text-gray-500 mt-1">Total AI Tools</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{aiTools.filter(t => t.pricing === 'Free').length}</div>
          <div className="text-xs text-gray-500 mt-1">Free Tools</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{aiTools.filter(t => t.pricing === 'Freemium').length}</div>
          <div className="text-xs text-gray-500 mt-1">Freemium Tools</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{AI_CATEGORIES.length}</div>
          <div className="text-xs text-gray-500 mt-1">Categories</div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search AI tools..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('All')}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors",
              selectedCategory === 'All'
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
            )}
          >
            All
          </button>
          {AI_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors whitespace-nowrap",
                selectedCategory === cat
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ml-auto"
        >
          <option value="Rating">Rating se</option>
          <option value="Name">Naam (A-Z)</option>
          <option value="Pricing">Price Model</option>
        </select>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">{filteredData.length} tools mila</p>

      {/* Grid */}
      {filteredData.length === 0 ? (
        <div className="py-20 text-center bg-white border border-gray-200 rounded-2xl">
          <p className="text-lg font-medium text-gray-700">Koi tool nahi mila</p>
          <p className="text-sm text-gray-400 mt-1">Search ya filter change karein</p>
          <button
            onClick={() => { setSearch(''); setSelectedCategory('All'); }}
            className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredData.map(tool => (
            <AICard key={tool.id} tool={tool} onClick={() => setSelectedTool(tool)} />
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <AIDetailModal tool={selectedTool} onClose={() => setSelectedTool(null)} />
    </div>
  );
}
