import { useState, useMemo } from "react";
import { shoppingSites, ShoppingSite } from "@/data/shopping-sites";
import { ExternalLink, ThumbsUp, ThumbsDown, Star, Truck, RotateCcw, ShieldCheck } from "lucide-react";

const CATEGORIES = ['All', 'Fashion', 'Electronics', 'Grocery', 'Books', 'Furniture', 'General'] as const;

function VerdictBadge({ verdict }: { verdict: ShoppingSite['overallVerdict'] }) {
  const config = {
    Excellent: 'bg-green-100 text-green-800 border-green-200',
    Good: 'bg-blue-100 text-blue-800 border-blue-200',
    Average: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Poor: 'bg-red-100 text-red-800 border-red-200',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config[verdict]}`}>
      {verdict}
    </span>
  );
}

function PriceBadge({ price }: { price: ShoppingSite['priceRange'] }) {
  const config = {
    Budget: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Mid-Range': 'bg-sky-50 text-sky-700 border-sky-200',
    Premium: 'bg-purple-50 text-purple-700 border-purple-200',
    Mixed: 'bg-orange-50 text-orange-700 border-orange-200',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${config[price]}`}>
      {price}
    </span>
  );
}

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

function TrustBar({ score }: { score: number }) {
  const color = score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs font-medium text-gray-600 w-8">{score}%</span>
    </div>
  );
}

export default function ShoppingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('rating');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return shoppingSites.filter(site => {
      const matchCat = selectedCategory === 'All' || site.categories.includes(selectedCategory as any);
      const q = search.toLowerCase();
      const matchSearch = !q || site.name.toLowerCase().includes(q) || site.description.toLowerCase().includes(q);
      return matchCat && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'trust') return b.trustScore - a.trustScore;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [selectedCategory, sortBy, search]);

  const excellentCount = shoppingSites.filter(s => s.overallVerdict === 'Excellent').length;
  const poorCount = shoppingSites.filter(s => s.overallVerdict === 'Poor').length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">🛒 Online Shopping Directory</h2>
        <p className="text-gray-500">India ki sabhi popular shopping websites ki complete jankari — kaunsi achhi hai, kaunsi bekar hai.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{shoppingSites.length}</div>
          <div className="text-xs text-gray-500 mt-1">Total Websites</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{excellentCount}</div>
          <div className="text-xs text-gray-500 mt-1">Excellent Sites</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-500">{poorCount}</div>
          <div className="text-xs text-gray-500 mt-1">Poor Sites (Avoid)</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{shoppingSites.filter(s => s.overallVerdict === 'Good').length}</div>
          <div className="text-xs text-gray-500 mt-1">Good Sites</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search website..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-2 text-sm flex-1 max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                selectedCategory === cat
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
              }`}
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
          <option value="rating">Rating se</option>
          <option value="trust">Trust Score se</option>
          <option value="name">Naam se (A-Z)</option>
        </select>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(site => (
          <div key={site.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
            {/* Card Header */}
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{site.logo}</span>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight">{site.name}</h3>
                    <p className="text-xs text-gray-400">{site.country}</p>
                  </div>
                </div>
                <VerdictBadge verdict={site.overallVerdict} />
              </div>
              <StarRating rating={site.rating} />
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">{site.description}</p>
            </div>

            {/* Pros & Cons */}
            <div className="p-5 flex-1">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    <ThumbsUp className="w-3.5 h-3.5 text-green-600" />
                    <span className="text-xs font-semibold text-green-700">Kya achha hai</span>
                  </div>
                  <ul className="space-y-1">
                    {site.pros.slice(0, 3).map((p, i) => (
                      <li key={i} className="text-xs text-gray-600 flex gap-1.5">
                        <span className="text-green-500 mt-0.5">✓</span>{p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    <ThumbsDown className="w-3.5 h-3.5 text-red-500" />
                    <span className="text-xs font-semibold text-red-600">Kya bura hai</span>
                  </div>
                  <ul className="space-y-1">
                    {site.cons.slice(0, 3).map((c, i) => (
                      <li key={i} className="text-xs text-gray-600 flex gap-1.5">
                        <span className="text-red-400 mt-0.5">✗</span>{c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Info Row */}
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Delivery: <strong className="text-gray-700">{site.deliveryDays}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Return: <strong className="text-gray-700">{site.returnPolicy}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Trust Score:</span>
                  <TrustBar score={site.trustScore} />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <PriceBadge price={site.priceRange} />
                {site.categories.slice(0, 2).map(c => (
                  <span key={c} className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600 border border-gray-200">{c}</span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 pb-5">
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium rounded-xl transition-colors"
              >
                Website Visit Karo <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
