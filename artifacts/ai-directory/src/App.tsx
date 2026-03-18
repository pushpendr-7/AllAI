import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/Navbar";
import Home from "@/pages/home";
import ShoppingPage from "@/pages/shopping";
import MoviesPage from "@/pages/movies";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

type Tab = 'ai' | 'shopping' | 'movies';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('ai');

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main>
          {activeTab === 'ai' && <Home />}
          {activeTab === 'shopping' && <ShoppingPage />}
          {activeTab === 'movies' && <MoviesPage />}
        </main>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
