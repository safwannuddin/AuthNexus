import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import { useAuthStore } from '../../store/useAuthStore';

export default function DashboardLayout() {
  const { isAuthenticated, isLoading, fetchUserProfile } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-primary-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 ml-0 md:ml-72">
        <main className="p-6 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}