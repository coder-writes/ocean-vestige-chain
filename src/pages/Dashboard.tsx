import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/ui/stat-card';
import { SimpleChart } from '@/components/ui/simple-chart';
import MapComponent from '@/components/MapComponent';
import { 
  TrendingUp, 
  Leaf, 
  Shield, 
  Database,
  Satellite,
  Activity,
  DollarSign,
  Users,
  MapPin,
  Plus
} from 'lucide-react';

// Mock data for demonstration
const mockProjects = [
  { id: '1', name: 'Mangrove Restoration Site A', coordinates: [-74.0, 40.7] as [number, number], status: 'verified' as const },
  { id: '2', name: 'Seagrass Conservation Area', coordinates: [-74.2, 40.8] as [number, number], status: 'active' as const },
  { id: '3', name: 'Salt Marsh Protection Zone', coordinates: [-74.1, 40.6] as [number, number], status: 'pending' as const },
];

const ndviData = [
  { month: 'Jan', ndvi: 0.65 },
  { month: 'Feb', ndvi: 0.68 },
  { month: 'Mar', ndvi: 0.72 },
  { month: 'Apr', ndvi: 0.78 },
  { month: 'May', ndvi: 0.82 },
  { month: 'Jun', ndvi: 0.85 },
];

const carbonData = [
  { month: 'Jan', credits: 1250 },
  { month: 'Feb', credits: 1420 },
  { month: 'Mar', credits: 1680 },
  { month: 'Apr', credits: 1890 },
  { month: 'May', credits: 2100 },
  { month: 'Jun', credits: 2350 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your blue carbon projects and carbon credit generation
          </p>
        </div>
        <Button className="bg-ocean hover:bg-ocean-dark">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Carbon Credits"
          value="2,350"
          subtitle="tCO₂e generated"
          icon={<Leaf />}
          trend={{ value: 12.3, label: 'vs last month' }}
          variant="forest"
        />
        <StatCard
          title="Active Projects"
          value="8"
          subtitle="restoration sites"
          icon={<MapPin />}
          trend={{ value: 2, label: 'new this month' }}
          variant="ocean"
        />
        <StatCard
          title="Market Value"
          value="$47,000"
          subtitle="current portfolio"
          icon={<DollarSign />}
          trend={{ value: 8.7, label: 'vs last month' }}
          variant="carbon"
        />
        <StatCard
          title="Verified Areas"
          value="145 ha"
          subtitle="total coverage"
          icon={<Shield />}
          trend={{ value: 15.2, label: 'vs last month' }}
          variant="forest"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Map Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Satellite className="w-5 h-5 text-ocean" />
              Project Locations & Satellite Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-96">
              <MapComponent projects={mockProjects} />
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-forest" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                action: 'Carbon credits verified',
                project: 'Mangrove Site A',
                amount: '450 tCO₂e',
                time: '2 hours ago',
                status: 'success'
              },
              {
                action: 'New satellite data',
                project: 'Seagrass Area B',
                amount: 'NDVI: 0.82',
                time: '4 hours ago',
                status: 'info'
              },
              {
                action: 'Verification pending',
                project: 'Salt Marsh C',
                amount: '320 tCO₂e',
                time: '1 day ago',
                status: 'warning'
              },
              {
                action: 'Credits traded',
                project: 'Mangrove Site A',
                amount: '$15,200',
                time: '2 days ago',
                status: 'success'
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'success' ? 'bg-forest' :
                  activity.status === 'warning' ? 'bg-yellow-500' : 'bg-ocean'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.project}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm font-semibold text-ocean">{activity.amount}</span>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* NDVI Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-forest" />
              Vegetation Health (NDVI)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleChart
              data={ndviData}
              xKey="month"
              yKey="ndvi"
              type="area"
              color="hsl(var(--forest-green))"
            />
          </CardContent>
        </Card>

        {/* Carbon Credits Generation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-ocean" />
              Carbon Credits Generated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleChart
              data={carbonData}
              xKey="month"
              yKey="credits"
              type="line"
              color="hsl(var(--ocean-blue))"
            />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-4">
            <Button variant="outline" className="justify-start gap-2">
              <MapPin className="w-4 h-4" />
              Add New Site
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <Satellite className="w-4 h-4" />
              Update Monitoring
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <Shield className="w-4 h-4" />
              Request Verification
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <TrendingUp className="w-4 h-4" />
              View Marketplace
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;