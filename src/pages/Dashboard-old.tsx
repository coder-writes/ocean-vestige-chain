import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AdminDashboard from './dashboards/AdminDashboard';
import PanchayatDashboard from './dashboards/PanchayatDashboard';
import NGODashboard from './dashboards/NGODashboard';
import GovernmentDashboard from './dashboards/GovernmentDashboard';
import VerifierDashboard from './dashboards/VerifierDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Transform projects for MapComponent
  const mapProjects = projects.map(project => ({
    id: project.id,
    name: project.name,
    coordinates: [project.coordinates.longitude, project.coordinates.latitude] as [number, number],
    status: project.status,
    area: project.area,
    type: project.type,
    credits: project.credits,
    lastUpdate: project.lastUpdate,
    description: project.description,
  }));

  const totalCredits = projects.reduce((sum, project) => sum + project.credits, 0);
  const totalArea = projects.reduce((sum, project) => sum + project.area, 0);
  const verifiedProjects = projects.filter(p => p.status === 'verified').length;
  const activeProjects = projects.filter(p => p.status === 'active').length;

  const handleProjectCreated = (newProject: Project) => {
    addProject(newProject);
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/projects?selected=${projectId}`);
  };

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
        <NewProjectDialog onProjectCreated={handleProjectCreated} />
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Carbon Credits"
          value={totalCredits.toLocaleString()}
          subtitle="tCO₂e generated"
          icon={<Leaf />}
          trend={{ value: 12.3, label: 'vs last month' }}
          variant="forest"
        />
        <StatCard
          title="Active Projects"
          value={projects.length.toString()}
          subtitle="restoration sites"
          icon={<MapPin />}
          trend={{ value: activeProjects, label: 'active now' }}
          variant="ocean"
        />
        <StatCard
          title="Market Value"
          value={`₹${(totalCredits * 1650).toLocaleString()}`}
          subtitle="current portfolio"
          icon={<DollarSign />}
          trend={{ value: 12.4, label: 'vs last month' }}
          variant="carbon"
        />
        <StatCard
          title="Verified Areas"
          value={`${totalArea.toFixed(1)} ha`}
          subtitle="total coverage"
          icon={<Shield />}
          trend={{ value: verifiedProjects, label: 'verified sites' }}
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
              <GoogleMapComponent 
                projects={mapProjects} 
                onProjectClick={handleProjectClick}
                showControls={true}
              />
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
                project: 'Sundarbans Conservation',
                amount: '8,500 tCO₂e',
                time: '2 hours ago',
                status: 'success'
              },
              {
                action: 'New satellite data',
                project: 'Gulf of Mannar Seagrass',
                amount: 'NDVI: 0.88',
                time: '4 hours ago',
                status: 'info'
              },
              {
                action: 'Verification pending',
                project: 'Chilika Lake Wetlands',
                amount: '2,400 tCO₂e',
                time: '1 day ago',
                status: 'warning'
              },
              {
                action: 'Credits traded',
                project: 'Sundarbans Project',
                amount: '₹12,58,000',
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
            <NewProjectDialog>
              <Button variant="outline" className="justify-start gap-2 w-full">
                <MapPin className="w-4 h-4" />
                Add New Site
              </Button>
            </NewProjectDialog>
            <Button 
              variant="outline" 
              className="justify-start gap-2"
              onClick={() => navigate('/monitoring')}
            >
              <Satellite className="w-4 h-4" />
              Update Monitoring
            </Button>
            <Button 
              variant="outline" 
              className="justify-start gap-2"
              onClick={() => navigate('/verification')}
            >
              <Shield className="w-4 h-4" />
              Request Verification
            </Button>
            <Button 
              variant="outline" 
              className="justify-start gap-2"
              onClick={() => navigate('/marketplace')}
            >
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