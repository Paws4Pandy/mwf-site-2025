import React from "react";
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { RatesProvider } from "@/contexts/RatesContext";
import Index from "./pages/Index";

const Calculator = lazy(() => import("./pages/Calculator"));
const Rates = lazy(() => import("./pages/Rates"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const Playbooks = lazy(() => import("./pages/Playbooks"));
const PlaybookDetail = lazy(() => import("./pages/PlaybookDetail"));
const Meet = lazy(() => import("./pages/Meet"));
const MyStrategy = lazy(() => import("./pages/MyStrategy"));
const ComingSoon = lazy(() => import("./components/ComingSoon"));
const AnalyticsDashboard = lazy(() => import("./components/AnalyticsDashboard"));
const CallbackAdmin = lazy(() => import("./pages/CallbackAdmin"));
const Guides = lazy(() => import("./pages/Guides"));
const TestGlass = lazy(() => import("./pages/TestGlass"));
const TestEmailForms = lazy(() => import("./pages/TestEmailForms"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-hunter-green">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RatesProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/rates" element={<Rates />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/playbooks" element={<ComingSoon />} />
              <Route path="/playbooks/:playbookId" element={<ComingSoon />} />
              <Route path="/meet" element={<Meet />} />
              <Route path="/my-strategy" element={<MyStrategy />} />
              <Route path="/analytics" element={<AnalyticsDashboard />} />
              <Route path="/callback-admin" element={<CallbackAdmin />} />
              <Route path="/guides" element={<Guides />} />
              <Route path="/test-glass" element={<TestGlass />} />
              <Route path="/test-email-forms" element={<TestEmailForms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Analytics />
      </TooltipProvider>
    </RatesProvider>
  </QueryClientProvider>
);

export default App;