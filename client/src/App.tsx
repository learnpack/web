import { Switch, Route } from "wouter";
import { Suspense, lazy } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/not-found";
import RedirectHandler from "@/components/RedirectHandler";
import ProtectedRoute from "@/components/ProtectedRoute";

// Lazy load pages
const Pricing = lazy(() => import("@/pages/Pricing"));
const TermsAndConditions = lazy(() => import("@/pages/TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const OurMission = lazy(() => import("@/pages/OurMission"));
const ThumbnailPage = lazy(() => import("@/pages/ThumbnailPage"));

// Product pages
const PlatformOverview = lazy(() => import("@/pages/PlatformOverview"));
const TrainingCenters = lazy(() => import("@/pages/TrainingCenters"));
const Results = lazy(() => import("@/pages/Results"));
const Contact = lazy(() => import("@/pages/Contact"));
const InstructionalDesigner = lazy(() => import("@/pages/InstructionalDesigner"));

// Feature pages
const Automation = lazy(() => import("@/pages/features/Automation"));
const Hyperpersonalization = lazy(() => import("@/pages/features/Hyperpersonalization"));
const AdaptiveIntelligence = lazy(() => import("@/pages/features/AdaptiveIntelligence"));
const AnalyticsCompliance = lazy(() => import("@/pages/features/AnalyticsCompliance"));

// Use case pages
const SoftwareTraining = lazy(() => import("@/pages/usecases/SoftwareTraining"));
const RoleBased = lazy(() => import("@/pages/usecases/RoleBased"));
const ComplianceUseCase = lazy(() => import("@/pages/usecases/Compliance"));

// About pages
const LearnPackVsBootcamp = lazy(() => import("@/pages/LearnPackVsBootcamp"));
const Blog = lazy(() => import("@/pages/Blog"));
const Vision = lazy(() => import("@/pages/Vision"));
const Timeline = lazy(() => import("@/pages/Timeline"));

// Lazy load admin pages
const AdminLayout = lazy(() => import("@/pages/admin/AdminLayout"));
const Dashboard = lazy(() => import("@/pages/admin/Dashboard"));
const AdminContent = lazy(() => import("@/pages/admin/Content"));
const AdminSettings = lazy(() => import("@/pages/admin/Settings"));

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/pricing">
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>}>
          <Pricing />
        </Suspense>
      </Route>
      <Route path="/terms-and-conditions">
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>}>
          <TermsAndConditions />
        </Suspense>
      </Route>
      <Route path="/privacy-policy">
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>}>
          <PrivacyPolicy />
        </Suspense>
      </Route>
      <Route path="/our-mission">
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>}>
          <OurMission />
        </Suspense>
      </Route>
      <Route path="/thumbnail">
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>}>
          <ThumbnailPage />
        </Suspense>
      </Route>
      
      {/* Product Pages */}
      <Route path="/platform-overview">
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>}>
          <PlatformOverview />
        </Suspense>
      </Route>
      <Route path="/ai-content-assistant">
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>}>
          <InstructionalDesigner />
        </Suspense>
      </Route>
      <Route path="/training-centers">
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>}>
          <TrainingCenters />
        </Suspense>
      </Route>
      <Route path="/results">
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>}>
          <Results />
        </Suspense>
      </Route>
      <Route path="/contact">
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>}>
          <Contact />
        </Suspense>
      </Route>
      
      {/* Feature Pages */}
      <Route path="/features/automation">
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>}>
          <Automation />
        </Suspense>
      </Route>
      <Route path="/features/hyperpersonalization">
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>}>
          <Hyperpersonalization />
        </Suspense>
      </Route>
      <Route path="/features/hyperpersonalized-learning">
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>}>
          <Hyperpersonalization />
        </Suspense>
      </Route>
      <Route path="/features/adaptive-intelligence">
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>}>
          <AdaptiveIntelligence />
        </Suspense>
      </Route>
      <Route path="/features/analytics-compliance">
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>}>
          <AnalyticsCompliance />
        </Suspense>
      </Route>

      {/* Use Case Pages */}
      <Route path="/usecases/software-training">
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>}>
          <SoftwareTraining />
        </Suspense>
      </Route>
      <Route path="/usecases/role-based">
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>}>
          <RoleBased />
        </Suspense>
      </Route>
      <Route path="/usecases/compliance">
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>}>
          <ComplianceUseCase />
        </Suspense>
      </Route>

      {/* About Pages */}
      <Route path="/learnpack-vs-bootcamp">
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>}>
          <LearnPackVsBootcamp />
        </Suspense>
      </Route>
      <Route path="/blog">
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>}>
          <Blog />
        </Suspense>
      </Route>
      <Route path="/vision">
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>}>
          <Vision />
        </Suspense>
      </Route>
      <Route path="/timeline">
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>}>
          <Timeline />
        </Suspense>
      </Route>
      
      {/* Login */}
      <Route path="/login" component={Login} />
      
      {/* Admin Routes - Protected */}
      <Route path="/admin">
        <ProtectedRoute>
          <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>}>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </Suspense>
        </ProtectedRoute>
      </Route>
      <Route path="/admin/content">
        <ProtectedRoute>
          <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>}>
            <AdminLayout>
              <AdminContent />
            </AdminLayout>
          </Suspense>
        </ProtectedRoute>
      </Route>
      <Route path="/admin/settings">
        <ProtectedRoute>
          <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>}>
            <AdminLayout>
              <AdminSettings />
            </AdminLayout>
          </Suspense>
        </ProtectedRoute>
      </Route>
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <RedirectHandler>
              <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>}>
                <Toaster />
                <Router />
              </Suspense>
            </RedirectHandler>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
