import { cn } from "@/lib/utils";

type Tab = 'ai' | 'shopping' | 'movies';

interface NavbarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const tabs = [
    { id: 'ai' as Tab, label: '🤖 AI Directory', desc: 'World AI Tools' },
    { id: 'shopping' as Tab, label: '🛒 Shopping Sites', desc: 'Best Online Stores' },
    { id: 'movies' as Tab, label: '🎬 Movies & OTT', desc: 'Watch Online' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 gap-2">
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">🌐 InfoHub India</h1>
            <p className="text-xs text-gray-400">AI • Shopping • Movies — Sab ek jagah</p>
          </div>
          <nav className="flex gap-1 w-full sm:w-auto overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all border",
                  activeTab === tab.id
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-transparent text-gray-600 border-transparent hover:bg-gray-100"
                )}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
