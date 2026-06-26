import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import LinksPage from "./pages/dashboard/LinksPage";
import AnalyticsPage from "./pages/dashboard/AnalyticsPage";
import SettingsPage from "./pages/dashboard/SettingsPage";

const HIDE_NAVBAR_PATHS = ["/login", "/register"];

const AppContent = () => {
  const location = useLocation();
  const hideNavbar =
    HIDE_NAVBAR_PATHS.includes(location.pathname) ||
    location.pathname.startsWith("/dashboard");

  return (
    <div className="relative min-h-screen bg-background text-white font-sans overflow-x-hidden selection:bg-primary/30 selection:text-white">
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected dashboard routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="links" element={<LinksPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route
              path="help"
              element={
                <div className="flex items-center justify-center h-full text-gray-400 text-xl font-medium">
                  Help & Support — Coming Soon
                </div>
              }
            />
          </Route>
        </Route>

        {/* Fallback */}
        <Route
          path="*"
          element={
            <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
              <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
              <p className="text-xl text-gray-400 mb-8">Page not found.</p>
              <a
                href="/"
                className="text-primary hover:underline font-medium"
              >
                ← Back home
              </a>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

const App = () => (
  <Router>
    <AuthProvider>
      <AppContent />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            fontSize: "14px",
          },
          success: {
            iconTheme: { primary: "#ff0033", secondary: "#fff" },
          },
          error: {
            iconTheme: { primary: "#ff4444", secondary: "#fff" },
          },
        }}
      />
    </AuthProvider>
  </Router>
);

export default App;
