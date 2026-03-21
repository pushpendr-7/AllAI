import { cn } from "@/lib/utils";

type Tab = 'ai' | 'shopping' | 'movies';

interface NavbarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const tabs = [
  { id: 'ai' as Tab, label: '🤖 AI Directory', mobileLabel: 'AI' },
  { id: 'shopping' as Tab, label: '🛒 Shopping', mobileLabel: 'Shopping' },
  { id: 'movies' as Tab, label: '🎬 Movies & OTT', mobileLabel: 'Movies' },
];

export function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-sm shadow-md">
              IH
            </div>
            <div>
              <span className="font-bold text-gray-900 text-base leading-none">InfoHub India</span>
              <p className="text-[10px] text-gray-400 leading-none mt-0.5 hidden sm:block">AI • Shopping • Movies</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all border",
                  activeTab === tab.id
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-transparent text-gray-600 border-transparent hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.mobileLabel}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
