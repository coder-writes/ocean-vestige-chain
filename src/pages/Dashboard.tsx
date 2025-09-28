import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AdminDashboard from './dashboards/AdminDashboard';
import PanchayatDashboard from './dashboards/PanchayatDashboard';
import NGODashboard from './dashboards/NGODashboard';
import GovernmentDashboard from './dashboards/GovernmentDashboard';
import VerifierDashboard from './dashboards/VerifierDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // If user is not authenticated, show a fallback
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">Please log in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  // Route to appropriate dashboard based on user role
  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'panchayat':
      return <PanchayatDashboard />;
    case 'ngo':
      return <NGODashboard />;
    case 'government':
      return <GovernmentDashboard />;
    case 'verifier':
      return <VerifierDashboard />;
    default:
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Unknown Role</h2>
            <p className="text-gray-600">Your user role "{user.role}" is not recognized.</p>
          </div>
        </div>
      );
  }
};

export default Dashboard;