import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useProjects } from '@/contexts/ProjectContext';
import GoogleMapComponent from '@/components/GoogleMapComponent';
import { 
  Heart,
  Target, 
  MapPin, 
  TrendingUp,
  FileText,
  Users,
  DollarSign,
  Award,
  Calendar,
  Briefcase,
  Globe,
  BarChart3
} from 'lucide-react';

const NGODashboard: React.FC = () => {
  const { projects } = useProjects();

  // Filter projects by NGO (example: projects created by NGO organizations)
  const ngoProjects = projects.filter(p => 
    p.organization?.includes('Forest Department') || 
    p.organization?.includes('Biodiversity Board') ||
    p.createdBy === '2'
  );
  
  // NGO-specific statistics
  const activeProjects = ngoProjects.filter(p => p.status === 'active').length;
  const totalFunding = ngoProjects.reduce((sum, p) => sum + p.budget, 0);
  const creditsGenerated = ngoProjects.reduce((sum, p) => sum + p.credits, 0);
  const impactArea = ngoProjects.reduce((sum, p) => sum + p.area, 0);
  const partnersCount = 8;
  const volunteersCount = 145;

  // Transform NGO projects for map
  const mapProjects = ngoProjects.map(project => ({
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Heart className="w-8 h-8 text-pink-600" />
            Conservation Impact Dashboard
          </h1>
          <p className="text-muted-foreground">
            Environmental restoration projects and community impact
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Impact Report
          </Button>
          <Button className="bg-pink-600 hover:bg-pink-700">
            <Target className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* NGO Impact Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Projects"
          value={activeProjects.toString()}
          subtitle="conservation initiatives"
          icon={<Target />}
          trend={{ value: 3, label: 'new this quarter' }}
          variant="forest"
        />
        <StatCard
          title="Total Funding"
          value={`₹${(totalFunding / 10000000).toFixed(1)}Cr`}
          subtitle="raised for projects"
          icon={<DollarSign />}
          trend={{ value: 25.8, label: 'vs last year' }}
          variant="ocean"
        />
        <StatCard
          title="Impact Area"
          value={`${impactArea.toFixed(0)} ha`}
          subtitle="ecosystem restored"
          icon={<Globe />}
          trend={{ value: 850, label: 'hectares added' }}
          variant="carbon"
        />
        <StatCard
          title="Credits Generated"
          value={creditsGenerated.toLocaleString()}
          subtitle="carbon credits"
          icon={<Award />}
          trend={{ value: 12500, label: 'this month' }}
          variant="forest"
        />
      </div>

      {/* Project Portfolio and Partnerships */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Project Portfolio */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-forest" />
              Project Portfolio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ngoProjects.slice(0, 3).map((project) => (
                <div key={project.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <span className="font-medium text-sm">{project.name}</span>
                    <p className="text-xs text-muted-foreground">
                      ₹{(project.budget / 100000).toFixed(1)}L • {project.area} ha
                    </p>
                  </div>
                  <Badge 
                    className={
                      project.status === 'verified' ? 'bg-green-100 text-green-700' :
                      project.status === 'active' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }
                  >
                    {project.status}
                  </Badge>
                </div>
              ))}
              <Button className="w-full" variant="outline">
                <Target className="w-4 h-4 mr-2" />
                View All Projects
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Partnerships & Volunteers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-pink-600" />
              Community Network
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg border border-pink-200">
                <div>
                  <span className="font-medium text-sm">Partner Organizations</span>
                  <p className="text-xs text-muted-foreground">Collaborating entities</p>
                </div>
                <Badge className="bg-pink-100 text-pink-700">{partnersCount}</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <span className="font-medium text-sm">Active Volunteers</span>
                  <p className="text-xs text-muted-foreground">Field workers & supporters</p>
                </div>
                <Badge className="bg-blue-100 text-blue-700">{volunteersCount}</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <span className="font-medium text-sm">Community Leaders</span>
                  <p className="text-xs text-muted-foreground">Local champions</p>
                </div>
                <Badge className="bg-green-100 text-green-700">32</Badge>
              </div>
              <Button className="w-full" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Manage Network
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Locations Map */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-ocean" />
            Conservation Project Locations
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

      {/* Impact Metrics and Recent Activities */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Environmental Impact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-forest" />
              Environmental Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <span className="font-medium text-sm">CO₂ Sequestered</span>
                  <p className="text-xs text-muted-foreground">Total carbon captured</p>
                </div>
                <span className="font-bold text-green-700">82,500 tons</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <span className="font-medium text-sm">Biodiversity Index</span>
                  <p className="text-xs text-muted-foreground">Species diversity improvement</p>
                </div>
                <span className="font-bold text-blue-700">+35%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div>
                  <span className="font-medium text-sm">Water Quality</span>
                  <p className="text-xs text-muted-foreground">Ecosystem health indicator</p>
                </div>
                <span className="font-bold text-purple-700">Excellent</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div>
                  <span className="font-medium text-sm">Community Livelihoods</span>
                  <p className="text-xs text-muted-foreground">Families benefited</p>
                </div>
                <span className="font-bold text-yellow-700">1,850</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-ocean" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  activity: 'Project Site Visit',
                  details: 'Pichavaram Mangrove Restoration monitoring',
                  time: '2 days ago',
                  status: 'success'
                },
                {
                  activity: 'Community Workshop',
                  details: 'Sustainable fishing practices training',
                  time: '5 days ago',
                  status: 'info'
                },
                {
                  activity: 'Funding Proposal',
                  details: 'New seagrass restoration project submitted',
                  time: '1 week ago',
                  status: 'warning'
                },
                {
                  activity: 'Impact Assessment',
                  details: 'Quarterly biodiversity survey completed',
                  time: '2 weeks ago',
                  status: 'success'
                },
                {
                  activity: 'Partnership Agreement',
                  details: 'MOU signed with Marine Research Institute',
                  time: '3 weeks ago',
                  status: 'success'
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.activity}</p>
                    <p className="text-xs text-muted-foreground">{activity.details}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NGODashboard;