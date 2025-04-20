import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Game from "./pages/Game";
import Profile from "./pages/Profile";
import MarketplacePage from "./pages/Marketplace";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/MainLayout";
import { PlayerProvider } from "./contexts/PlayerContext";
import { ContractProvider } from "./contexts/ContractContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ContractProvider>
        <PlayerProvider>
          <Toaster />
          <Sonner richColors />
          <BrowserRouter>
            <MainLayout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/game" element={<Game />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MainLayout>
          </BrowserRouter>
        </PlayerProvider>
      </ContractProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
