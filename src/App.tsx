import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import BackToTop from "@/components/BackToTop";
import PageTransition from "@/components/PageTransition";
import Index from "./pages/Index";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
          <LanguageProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              
              {/* Loading Screen */}
              {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
              
              {/* Custom Cursor */}
              <CustomCursor />
              
              {/* Back to Top Button */}
              <BackToTop />
              
              <BrowserRouter>
                <PageTransition>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/project/:id" element={<ProjectDetail />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </PageTransition>
              </BrowserRouter>
            </TooltipProvider>
          </LanguageProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
