import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ProjectProvider } from "./contexts/ProjectContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Monitoring from "./pages/Monitoring";
import Marketplace from "./pages/Marketplace";
import Verification from "./pages/Verification";
import MapDemo from "./pages/MapDemo";
import MainLanding from "./pages/MainLanding";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import MobileDataCollection from "./components/MobileDataCollection";
import NCCRAdminDashboard from "./components/NCCRAdminDashboard";
import MRVVerificationDashboard from "./components/MRVVerificationDashboard";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<MainLanding />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Protected routes */}
      {isAuthenticated ? (
        <>
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/projects" element={<Layout><Projects /></Layout>} />
          <Route path="/monitoring" element={<Layout><Monitoring /></Layout>} />
          <Route path="/marketplace" element={<Layout><Marketplace /></Layout>} />
          <Route path="/verification" element={<Layout><Verification /></Layout>} />
          <Route path="/map" element={<Layout><MapDemo /></Layout>} />
          <Route path="/settings" element={<Layout><Dashboard /></Layout>} />
          
          {/* Blockchain MRV System Routes */}
          <Route path="/field-data" element={<Layout><MobileDataCollection projectId="proj-1" organizationId="org-1" fieldOfficer="John Doe" /></Layout>} />
          <Route path="/nccr-admin" element={<Layout><NCCRAdminDashboard /></Layout>} />
          <Route path="/mrv-verification" element={<Layout><MRVVerificationDashboard /></Layout>} />
        </>
      ) : (
        // Redirect to login for protected routes when not authenticated
        <>
          <Route path="/dashboard" element={<Login />} />
          <Route path="/projects" element={<Login />} />
          <Route path="/monitoring" element={<Login />} />
          <Route path="/marketplace" element={<Login />} />
          <Route path="/verification" element={<Login />} />
          <Route path="/field-data" element={<Login />} />
          <Route path="/nccr-admin" element={<Login />} />
          <Route path="/mrv-verification" element={<Login />} />
          <Route path="/map" element={<Login />} />
          <Route path="/settings" element={<Login />} />
        </>
      )}
      
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <ProjectProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ProjectProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
