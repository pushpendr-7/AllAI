import { AITool } from "@/data/ai-tools";
import { Database, Zap, Layers } from "lucide-react";

interface StatsBarProps {
  tools: AITool[];
}

export function StatsBar({ tools }: StatsBarProps) {
  const total = tools.length;
  const freeTools = tools.filter(t => t.pricing === 'Free' || t.pricing === 'Freemium').length;
  const categories = new Set(tools.flatMap(t => t.categories)).size;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mt-16 mb-12">
      <div className="glass-panel rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-blue-500/20 transition-all duration-500" />
        <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <Database className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <div className="text-2xl font-bold text-foreground font-display">{total}</div>
          <div className="text-sm text-muted-foreground font-medium">AI Models Logged</div>
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-emerald-500/20 transition-all duration-500" />
        <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
          <Zap className="w-6 h-6 text-emerald-400" />
        </div>
        <div>
          <div className="text-2xl font-bold text-foreground font-display">{freeTools}</div>
          <div className="text-sm text-muted-foreground font-medium">Free / Freemium Tools</div>
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-purple-500/20 transition-all duration-500" />
        <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
          <Layers className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <div className="text-2xl font-bold text-foreground font-display">{categories}</div>
          <div className="text-sm text-muted-foreground font-medium">Unique Categories</div>
        </div>
      </div>
    </div>
  );
}
