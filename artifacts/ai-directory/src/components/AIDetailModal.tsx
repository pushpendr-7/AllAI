import { AITool } from "@/data/ai-tools";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, ExternalLink, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Badge } from "./ui/badge";

interface AIDetailModalProps {
  tool: AITool | null;
  onClose: () => void;
}

export function AIDetailModal({ tool, onClose }: AIDetailModalProps) {
  if (!tool) return null;
  const Icon = tool.icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-card border border-white/10 rounded-3xl shadow-2xl flex flex-col z-10 scrollbar-hide"
        >
          {/* Modal Header Banner */}
          <div className={`h-32 sm:h-48 w-full bg-gradient-to-r ${tool.gradient} opacity-20 absolute top-0 left-0 rounded-t-3xl mask-image-b`} style={{ maskImage: 'linear-gradient(to bottom, black, transparent)' }} />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors z-20 backdrop-blur-md border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 sm:p-10 relative z-10 flex flex-col gap-8">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center pt-4">
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${tool.gradient} border border-white/20 shadow-xl shrink-0`}>
                <Icon className="w-12 h-12 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-display font-bold text-foreground">{tool.name}</h2>
                  <Badge variant="outline" className="border-white/10 bg-black/20 backdrop-blur text-muted-foreground hidden sm:flex">
                    <ShieldCheck className="w-3 h-3 mr-1" /> Verified
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                  <span className="font-medium text-white/80">{tool.company}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium text-foreground">{tool.rating} / 5</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <Badge 
                    variant={
                      tool.pricing === 'Free' ? 'success' : 
                      tool.pricing === 'Freemium' ? 'info' : 'warning'
                    }
                  >
                    {tool.pricing}
                  </Badge>
                </div>
              </div>
              
              <a 
                href={tool.websiteUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="shrink-0 w-full sm:w-auto px-6 py-3 rounded-xl font-semibold bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2"
              >
                Visit Website
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <hr className="border-white/10" />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <section>
                  <h3 className="text-lg font-semibold text-foreground mb-3 font-display">About {tool.name}</h3>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {tool.description}
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-foreground mb-4 font-display">Key Use Cases</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {tool.useCases.map(uc => (
                      <div key={uc} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30 border border-white/5">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-sm font-medium text-foreground/90">{uc}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="space-y-6">
                <section className="bg-secondary/20 rounded-2xl p-5 border border-white/5">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Platforms</h3>
                  <div className="flex flex-wrap gap-2">
                    {tool.platforms.map(platform => (
                      <Badge key={platform} variant="outline" className="bg-background/50 border-white/10">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </section>

                <section className="bg-secondary/20 rounded-2xl p-5 border border-white/5">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {tool.categories.map(cat => (
                      <Badge key={cat} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
