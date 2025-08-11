import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Catalog from "./pages/Catalog";
import Stock from "./pages/Stock";
import Entries from "./pages/Entries";
import Exits from "./pages/Exits";
import Reports from "./pages/Reports";
import Tools from "./pages/Tools";
import NotFound from "./pages/NotFound";
import CriticalStock from "./pages/CriticalStock";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/stock" element={<Stock />} />
                <Route path="/stock-critico" element={<CriticalStock />} />
                <Route path="/entries" element={<Entries />} />
                <Route path="/exits" element="/exits" />
                <Route path="/reports" element={<Reports />} />
                <Route path="/tools" element={<Tools />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;