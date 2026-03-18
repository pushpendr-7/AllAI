import { useState, useMemo, useEffect } from "react";
import { aiTools, Category, AITool } from "@/data/ai-tools";
import { AIFilters } from "@/components/AIFilters";
import { AICard } from "@/components/AICard";
import { StatsBar } from "@/components/StatsBar";
import { AIDetailModal } from "@/components/AIDetailModal";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [sortBy, setSortBy] = useState("Rating");
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);

  // Handle keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedTool) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedTool]);

  const filteredData = useMemo(() => {
    return aiTools.filter(tool => {
      const searchLower = search.toLowerCase();
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchLower) ||
        tool.company.toLowerCase().includes(searchLower) ||
        tool.description.toLowerCase().includes(searchLower) ||
        tool.useCases.some(uc => uc.toLowerCase().includes(searchLower));
        
      const matchesCategory = selectedCategory === "All" || tool.categories.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === 'Rating') return b.rating - a.rating;
      if (sortBy === 'Name') return a.name.localeCompare(b.name);
      if (sortBy === 'Pricing') {
        const order = { 'Free': 1, 'Freemium': 2, 'Paid': 3 };
        return order[a.pricing] - order[b.pricing];
      }
      return 0;
    });
  }, [search, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/30 selection:text-primary-foreground">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-[url('/images/hero-bg.png')] bg-cover bg-center bg-no-repeat opacity-[0.15] mix-blend-screen pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-transparent via-background/80 to-background pointer-events-none" />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Updated for 2025
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold font-display tracking-tight text-foreground mb-6 leading-tight">
              World <span className="text-gradient">AI Directory</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10">
              Discover, compare, and find the perfect artificial intelligence tools to supercharge your workflow, creativity, and productivity.
            </p>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <AIFilters 
            search={search}
            setSearch={setSearch}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <StatsBar tools={filteredData} />
        </motion.div>

        {/* Results Grid */}
        <div className="mt-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-display font-semibold text-foreground">
              {filteredData.length} {filteredData.length === 1 ? 'Result' : 'Results'} Found
            </h2>
          </div>

          {filteredData.length === 0 ? (
            <div className="py-24 text-center glass-panel rounded-3xl">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No AI tools found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
              <button 
                onClick={() => { setSearch(''); setSelectedCategory('All'); }}
                className="mt-6 px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium hover:bg-primary/20 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {filteredData.map((tool) => (
                  <AICard 
                    key={tool.id} 
                    tool={tool} 
                    onClick={() => setSelectedTool(tool)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>

      {/* Detail Modal */}
      <AIDetailModal tool={selectedTool} onClose={() => setSelectedTool(null)} />
    </div>
  );
}
