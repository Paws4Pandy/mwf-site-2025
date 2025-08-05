
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Meet from "./pages/Meet";
import GettingStarted from "./pages/GettingStarted";
import Resources from "./pages/Resources";
import Perks from "./pages/Perks";
import Calculator from "./pages/Calculator";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Playbooks from "./pages/Playbooks";
import ClaudeCodeDemo from "./pages/ClaudeCodeDemo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/meet" element={<Meet />} />
          <Route path="/getting-started" element={<GettingStarted />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/perks" element={<Perks />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/playbooks" element={<Playbooks />} />
          <Route path="/claude-code" element={<ClaudeCodeDemo />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
