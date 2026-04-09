import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Salute from "./pages/Salute.tsx";
import RiverCruises from "./pages/RiverCruises.tsx";
import BusTours from "./pages/BusTours.tsx";
import DinnerCruise from "./pages/DinnerCruise.tsx";
import NotFound from "./pages/NotFound.tsx";
import Location from "./pages/Location.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/salute-9-may" element={<Salute />} />
          <Route path="/salute-9-may/:city" element={<Salute />} />
          <Route path="/river-cruises" element={<RiverCruises />} />
          <Route path="/river-cruises/:city" element={<RiverCruises />} />
          <Route path="/bus-tours" element={<BusTours />} />
          <Route path="/bus-tours/:city" element={<BusTours />} />
          <Route path="/dinner-cruise" element={<DinnerCruise />} />
          <Route path="/events/dinner-cruise/moscow" element={<DinnerCruise />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
