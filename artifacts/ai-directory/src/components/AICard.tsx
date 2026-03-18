import { AITool } from "@/data/ai-tools";
import { Star, ExternalLink, ArrowRight } from "lucide-react";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";

interface AICardProps {
  tool: AITool;
  onClick: () => void;
}

export function AICard({ tool, onClick }: AICardProps) {
  const Icon = tool.icon;
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="group relative cursor-pointer flex flex-col h-full rounded-2xl bg-card border border-white/5 hover:border-white/10 transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-primary/5 overflow-hidden"
    >
      {/* Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
      
      <div className="p-6 flex flex-col flex-1 relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${tool.gradient} border border-white/10 shadow-inner`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg text-foreground leading-none mb-1">
                {tool.name}
              </h3>
              <p className="text-xs text-muted-foreground">{tool.company}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-md border border-white/5">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-medium text-foreground">{tool.rating}</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-6 flex-1 leading-relaxed">
          {tool.description}
        </p>
        
        <div className="mt-auto space-y-4">
          <div className="flex flex-wrap gap-2">
            {tool.categories.slice(0, 2).map(cat => (
              <Badge key={cat} variant="secondary" className="bg-secondary/50 font-medium text-[10px]">
                {cat}
              </Badge>
            ))}
            {tool.categories.length > 2 && (
              <Badge variant="secondary" className="bg-secondary/50 font-medium text-[10px]">
                +{tool.categories.length - 2}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <Badge 
              variant={
                tool.pricing === 'Free' ? 'success' : 
                tool.pricing === 'Freemium' ? 'info' : 'warning'
              }
              className="px-2.5 py-0.5"
            >
              {tool.pricing}
            </Badge>
            
            <div className="flex items-center text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
              Details <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
