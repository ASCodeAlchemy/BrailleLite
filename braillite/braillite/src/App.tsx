import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sooner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LoginTypeSelection from "./pages/LoginTypeSelection";
import UserLogin from "./pages/UserLogin";
import NGOLogin from "./pages/NGOLogin";
import NotFound from "./pages/NotFound";
import NGORegister from "./pages/NGORegister";
import RegisterTypeSelection from "./pages/RegisterTypeSelection";
import UserRegister from "./pages/UserRegister";
import Donate from "./pages/Donate";
import NGODashboard from "./pages/NGODashboard";
import DonationSuccess from "@/pages/DonationSuccess.tsx";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginTypeSelection />} />
          <Route path="/login/user" element={<UserLogin />} />
            <Route path="/login/ngo" element={<NGOLogin />} />
            <Route path="/ngo/dashboard" element={<NGODashboard />} /> 
          <Route path="/register" element={<RegisterTypeSelection />} />
          <Route path="/register/ngo" element={<NGORegister />} />
          <Route path="/register/user" element={<UserRegister />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/donation-success" element={<DonationSuccess />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
