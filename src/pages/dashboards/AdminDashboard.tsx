import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useProjects } from '@/contexts/ProjectContext';
import GoogleMapComponent from '@/components/GoogleMapComponent';
import RecentTransactions from '@/components/RecentTransactions';
import TransactionDetails from '@/components/TransactionDetails';
import ProjectDetails from '@/components/ProjectDetails';
import { transactions, projects, Transaction, Project } from '@/data/transactionData';
import { 
  Users, 
  Shield, 
  TrendingUp, 
  AlertTriangle,
  Database,
  Settings,
  CheckCircle,
  Clock,
  Building,
  MapPin,
  DollarSign,
  Activity
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { projects: contextProjects } = useProjects();
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Admin-specific statistics
  const totalUsers = 156;
  const totalOrganizations = 23;
  const pendingVerifications = projects.filter(p => p.status === 'pending').length;
  const systemAlerts = 3;
  const totalCreditsIssued = projects.reduce((sum, p) => sum + p.totalCreditsIssued, 0);
  const platformRevenue = totalCreditsIssued * 50; // ₹50 platform fee per credit

  // Transform projects for map - using context projects for backward compatibility
  const mapProjects = contextProjects.map(project => ({
    id: project.id,
    name: project.name,
    coordinates: [project.coordinates.longitude, project.coordinates.latitude] as [number, number],
    status: project.status as "active" | "pending" | "verified",
    area: project.area,
    type: project.type,
    credits: project.credits,
    lastUpdate: project.lastUpdate,
    description: project.description,
  }));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="w-8 h-8 text-red-600" />
            System Administration
          </h1>
          <p className="text-muted-foreground">
            Platform-wide overview and management controls
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            System Settings
          </Button>
          <Button className="bg-red-600 hover:bg-red-700">
            <AlertTriangle className="w-4 h-4 mr-2" />
            System Alerts ({systemAlerts})
          </Button>
        </div>
      </div>

      {/* System Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={totalUsers.toString()}
          subtitle="platform users"
          icon={<Users />}
          trend={{ value: 12, label: 'new this month' }}
          variant="ocean"
        />
        <StatCard
          title="Organizations"
          value={totalOrganizations.toString()}
          subtitle="registered entities"
          icon={<Building />}
          trend={{ value: 3, label: 'pending approval' }}
          variant="forest"
        />
        <StatCard
          title="Pending Reviews"
          value={pendingVerifications.toString()}
          subtitle="verification queue"
          icon={<Clock />}
          trend={{ value: -2, label: 'vs last week' }}
          variant="carbon"
        />
        <StatCard
          title="Platform Revenue"
          value={`₹${(platformRevenue / 100000).toFixed(1)}L`}
          subtitle="total fees collected"
          icon={<DollarSign />}
          trend={{ value: 18.5, label: 'vs last month' }}
          variant="ocean"
        />
      </div>

      {/* System Management Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-ocean" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div>
                  <span className="font-medium">Admin Users</span>
                  <p className="text-sm text-muted-foreground">System administrators</p>
                </div>
                <Badge className="bg-red-100 text-red-700">3</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div>
                  <span className="font-medium">NGO Organizations</span>
                  <p className="text-sm text-muted-foreground">Conservation groups</p>
                </div>
                <Badge className="bg-green-100 text-green-700">8</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div>
                  <span className="font-medium">Panchayat Officers</span>
                  <p className="text-sm text-muted-foreground">Local governance</p>
                </div>
                <Badge className="bg-blue-100 text-blue-700">12</Badge>
              </div>
              <Button className="w-full" variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Manage Users
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-forest" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">API Response Time</span>
                <Badge className="bg-green-100 text-green-700">125ms</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Database Status</span>
                <Badge className="bg-green-100 text-green-700">Healthy</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Google Maps API</span>
                <Badge className="bg-green-100 text-green-700">Active</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Blockchain Network</span>
                <Badge className="bg-yellow-100 text-yellow-700">Sync (98%)</Badge>
              </div>
              <Button className="w-full" variant="outline">
                <Database className="w-4 h-4 mr-2" />
                System Diagnostics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform-wide Map */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-ocean" />
            National Blue Carbon Projects Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-96">
            <GoogleMapComponent 
              projects={mapProjects}
              className="rounded-b-lg"
              showControls={true}
            />
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <RecentTransactions
        transactions={transactions}
        onViewTransaction={setSelectedTransaction}
        maxTransactions={5}
      />

      {/* Recent System Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-forest" />
            Recent System Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                action: 'New organization registered',
                details: 'Tamil Nadu Coastal Conservation Society',
                time: '2 hours ago',
                status: 'success'
              },
              {
                action: 'Project verification completed',
                details: 'Sundarbans Restoration Phase-II',
                time: '4 hours ago',
                status: 'success'
              },
              {
                action: 'System alert triggered',
                details: 'High API usage detected',
                time: '6 hours ago',
                status: 'warning'
              },
              {
                action: 'Bulk credit issuance',
                details: '15,000 credits issued to Gulf of Mannar project',
                time: '1 day ago',
                status: 'info'
              },
              {
                action: 'User account suspended',
                details: 'Fraudulent activity detected',
                time: '2 days ago',
                status: 'error'
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'warning' ? 'bg-yellow-500' :
                  activity.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="font-medium text-sm">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.details}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      {selectedTransaction && (
        <TransactionDetails
          transaction={selectedTransaction}
          onViewProject={(projectId) => {
            const project = projects.find(p => p.id === projectId);
            if (project) {
              setSelectedProject(project);
              setSelectedTransaction(null);
            }
          }}
          onClose={() => setSelectedTransaction(null)}
        />
      )}

      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;