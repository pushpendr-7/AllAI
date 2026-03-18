import { useState, useMemo } from "react";
import { movieSites, MovieSite } from "@/data/movie-sites";
import { ExternalLink, Star, Check, X } from "lucide-react";

const LANG_FILTERS = ['All', 'English', 'Hindi', 'Hindi Dubbed'] as const;
const TYPE_FILTERS = ['All', 'OTT Paid', 'Free Legal', 'Live TV'] as const;

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

function LangBadge({ lang }: { lang: MovieSite['languages'][0] }) {
  const config: Record<string, string> = {
    'English': 'bg-blue-50 text-blue-700 border-blue-200',
    'Hindi': 'bg-orange-50 text-orange-700 border-orange-200',
    'Hindi Dubbed': 'bg-purple-50 text-purple-700 border-purple-200',
    'Multi-Language': 'bg-green-50 text-green-700 border-green-200',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${config[lang] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
      {lang}
    </span>
  );
}

export default function MoviesPage() {
  const [langFilter, setLangFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return movieSites.filter(site => {
      const matchLang = langFilter === 'All' || site.languages.includes(langFilter as any);
      const matchType = typeFilter === 'All' || site.type === typeFilter;
      const q = search.toLowerCase();
      const matchSearch = !q || site.name.toLowerCase().includes(q) || site.description.toLowerCase().includes(q) || site.bestFor.toLowerCase().includes(q);
      return matchLang && matchType && matchSearch;
    }).sort((a, b) => b.rating - a.rating);
  }, [langFilter, typeFilter, search]);

  const freeCount = movieSites.filter(s => !s.isPaid).length;
  const hindiDubbedCount = movieSites.filter(s => s.languages.includes('Hindi Dubbed')).length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">🎬 Movies & Streaming Directory</h2>
        <p className="text-gray-500">Kahan dekhein English, Hindi aur Dubbed movies — sab ek jagah mein</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{movieSites.length}</div>
          <div className="text-xs text-gray-500 mt-1">Total Platforms</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{freeCount}</div>
          <div className="text-xs text-gray-500 mt-1">Free Platforms</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{hindiDubbedCount}</div>
          <div className="text-xs text-gray-500 mt-1">Hindi Dubbed Available</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{movieSites.filter(s => s.isPaid).length}</div>
          <div className="text-xs text-gray-500 mt-1">Paid Platforms</div>
        </div>
      </div>

      {/* Quick Guide */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="text-lg mb-1">🇬🇧 English Movies dekhne ke liye</div>
          <div className="text-sm text-blue-800 font-medium">Netflix, Apple TV+, Amazon Prime, Plex (free)</div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <div className="text-lg mb-1">🇮🇳 Hindi Movies dekhne ke liye</div>
          <div className="text-sm text-orange-800 font-medium">JioCinema (free), YouTube (free), Hotstar, ZEE5</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
          <div className="text-lg mb-1">🎙️ English → Hindi Dubbed</div>
          <div className="text-sm text-purple-800 font-medium">Amazon Prime, Netflix, JioCinema, MX Player (free)</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 flex-wrap">
        <input
          type="text"
          placeholder="Search platform..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-2 text-sm flex-1 max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-500 self-center">Language:</span>
          {LANG_FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setLangFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                langFilter === f
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-500 self-center">Type:</span>
          {TYPE_FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setTypeFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                typeFilter === f
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(site => (
          <div key={site.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
            {/* Header */}
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{site.logo}</span>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{site.name}</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      {site.isPaid ? (
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">Paid</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">Free</span>
                      )}
                      <span className="text-xs text-gray-500">{site.monthlyPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
              <StarRating rating={site.rating} />
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{site.description}</p>
            </div>

            {/* Content */}
            <div className="p-5 flex-1">
              {/* Languages */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Supported Languages</p>
                <div className="flex flex-wrap gap-1.5">
                  {site.languages.map(lang => <LangBadge key={lang} lang={lang} />)}
                </div>
              </div>

              {/* Best For */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 mb-4">
                <p className="text-xs font-semibold text-blue-600 mb-0.5">Best For</p>
                <p className="text-sm text-blue-900">{site.bestFor}</p>
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-xs font-semibold text-green-700 mb-1.5">✓ Kya achha hai</p>
                  <ul className="space-y-1">
                    {site.pros.slice(0, 3).map((p, i) => (
                      <li key={i} className="text-xs text-gray-600 flex gap-1.5 items-start">
                        <Check className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />{p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-red-600 mb-1.5">✗ Kya bura hai</p>
                  <ul className="space-y-1">
                    {site.cons.slice(0, 3).map((c, i) => (
                      <li key={i} className="text-xs text-gray-600 flex gap-1.5 items-start">
                        <X className="w-3 h-3 text-red-400 mt-0.5 shrink-0" />{c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Content Types */}
              <div className="flex flex-wrap gap-1.5">
                {site.contentTypes.map(ct => (
                  <span key={ct} className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600 border border-gray-200">{ct}</span>
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
                {site.url.replace('https://', '')} <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
