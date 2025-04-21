import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import TestSupabasePage from './pages/TestSupabasePage';

// Dashboard Pages
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import UploadPage from './pages/dashboard/UploadPage';
import StatusPage from './pages/dashboard/StatusPage';
import ProfilePage from './pages/dashboard/ProfilePage';

function App() {
  const { isAuthenticated, fetchUserProfile } = useAuthStore();

  useEffect(() => {
    // Check if user is logged in
    if (localStorage.getItem('authToken')) {
      fetchUserProfile();
    }
  }, [fetchUserProfile]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/test-supabase" element={<TestSupabasePage />} />
        
        {/* Dashboard Routes - Protected */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="status" element={<StatusPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<div>Settings</div>} />
        </Route>
        
        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;