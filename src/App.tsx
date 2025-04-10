
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Options from "./pages/Options";
import NotFound from "./pages/NotFound";
import TrendMap from "./pages/TrendMap";
import HistoryBytes from "./pages/HistoryBytes";
import TrendLetter from "./pages/TrendLetter";
import MoodBoard from "./pages/MoodBoard";
import AIAssistant from "./pages/AIAssistant";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/options" element={<Options />} />
          <Route path="/timeline" element={<Index />} />
          <Route path="/trendmap" element={<TrendMap />} />
          <Route path="/history-bytes" element={<HistoryBytes />} />
          <Route path="/trendletter" element={<TrendLetter />} />
          <Route path="/moodboard" element={<MoodBoard />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
