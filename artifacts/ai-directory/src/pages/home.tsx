import { useState, useMemo } from "react";
import { aiTools, Category, AITool, AI_CATEGORIES } from "@/data/ai-tools";
import { Search, Star, ExternalLink, X, ChevronDown, Sparkles } from "lucide-react";
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header with gradient banner */}
        <div className={`h-24 w-full bg-gradient-to-r ${tool.gradient} rounded-t-2xl relative`}>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 pb-6">
          {/* Tool info - overlapping header */}
          <div className="flex items-end gap-4 -mt-8 mb-4">
            <div className={`p-3 rounded-2xl bg-gradient-to-br ${tool.gradient} shadow-lg border-4 border-white shrink-0`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div className="pb-1">
              <h2 className="text-xl font-bold text-gray-900">{tool.name}</h2>
              <p className="text-sm text-gray-500">{tool.company}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap mb-4">
            <StarRating rating={tool.rating} />
            <PricingBadge pricing={tool.pricing} />
          </div>

          <p className="text-gray-700 leading-relaxed mb-5">{tool.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Platforms</p>
              <div className="flex flex-wrap gap-1.5">
                {tool.platforms.map(p => (
                  <span key={p} className="px-2.5 py-1 rounded-lg text-xs bg-gray-100 text-gray-700 border border-gray-200 font-medium">{p}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Categories</p>
              <div className="flex flex-wrap gap-1.5">
                {tool.categories.map(c => (
                  <span key={c} className="px-2.5 py-1 rounded-lg text-xs bg-purple-50 text-purple-700 border border-purple-100">{c}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Use Cases</p>
            <div className="flex flex-wrap gap-1.5">
              {tool.useCases.map(u => (
                <span key={u} className="px-2.5 py-1 rounded-lg text-xs bg-blue-50 text-blue-700 border border-blue-100">{u}</span>
              ))}
            </div>
          </div>

          <a
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r ${tool.gradient} text-white font-semibold rounded-xl transition-opacity hover:opacity-90 shadow-md`}
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
      className="group bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col h-full hover:border-gray-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${tool.gradient} shrink-0 shadow-md`}>
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
        <div className="flex gap-1">
          {tool.categories.slice(0, 1).map(c => (
            <span key={c} className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600 border border-gray-200">{c}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

const CATEGORY_ICONS: Record<string, string> = {
  'All': '✨',
  'Text & Chat': '💬',
  'Image Generation': '🎨',
  'Video': '🎬',
  'Audio': '🎵',
  'Code': '💻',
  'Research': '🔬',
  'Productivity': '⚡',
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [sortBy, setSortBy] = useState("Rating");
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);

  const freeCount = aiTools.filter(t => t.pricing === 'Free').length;
  const freemiumCount = aiTools.filter(t => t.pricing === 'Freemium').length;

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-blue-200" />
            <span className="text-blue-200 text-sm font-medium">World's Best AI Tools Directory</span>
          </div>
          <h1 className="text-4xl font-bold mb-3">🤖 World AI Directory</h1>
          <p className="text-blue-100 text-lg max-w-xl">
            Duniya ki sabhi popular AI tools ki puri jaankari — kya karte hain, platform, price aur rating.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold">{aiTools.length}</div>
              <div className="text-blue-200 text-xs mt-1">Total AI Tools</div>
            </div>
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-300">{freeCount}</div>
              <div className="text-blue-200 text-xs mt-1">Free Tools</div>
            </div>
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-yellow-300">{freemiumCount}</div>
              <div className="text-blue-200 text-xs mt-1">Freemium Tools</div>
            </div>
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-purple-300">{AI_CATEGORIES.length}</div>
              <div className="text-blue-200 text-xs mt-1">Categories</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search & Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="AI tool, company ya use case search karein..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
            />
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-gray-500 whitespace-nowrap">Sort:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm appearance-none pr-8 cursor-pointer"
              >
                <option value="Rating">⭐ Rating se</option>
                <option value="Name">🔤 Naam (A-Z)</option>
                <option value="Pricing">💰 Price Model</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          <button
            onClick={() => setSelectedCategory('All')}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all whitespace-nowrap shrink-0",
              selectedCategory === 'All'
                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200'
                : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
            )}
          >
            <span>{CATEGORY_ICONS['All']}</span> All
          </button>
          {AI_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all whitespace-nowrap shrink-0",
                selectedCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
              )}
            >
              <span>{CATEGORY_ICONS[cat]}</span> {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-5">
          <span className="font-semibold text-gray-800">{filteredData.length}</span> tools mile
          {selectedCategory !== 'All' && <span className="text-blue-600"> • {selectedCategory}</span>}
          {search && <span className="text-blue-600"> • "{search}"</span>}
        </p>

        {/* Grid */}
        {filteredData.length === 0 ? (
          <div className="py-20 text-center bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg font-semibold text-gray-700">Koi tool nahi mila</p>
            <p className="text-sm text-gray-400 mt-1">Search ya filter change karein</p>
            <button
              onClick={() => { setSearch(''); setSelectedCategory('All'); }}
              className="mt-4 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
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
      </div>

      {/* Detail Modal */}
      <AIDetailModal tool={selectedTool} onClose={() => setSelectedTool(null)} />
    </div>
  );
}
