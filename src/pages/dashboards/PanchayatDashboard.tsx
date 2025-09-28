import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useProjects } from '@/contexts/ProjectContext';
import GoogleMapComponent from '@/components/GoogleMapComponent';
import { 
  Home,
  Users, 
  MapPin, 
  Coins,
  FileText,
  CheckCircle,
  Clock,
  TreePine,
  Fish,
  Vote,
  Bell,
  Calendar
} from 'lucide-react';

const PanchayatDashboard: React.FC = () => {
  const { projects } = useProjects();

  // Filter projects in panchayat jurisdiction (example: projects created by panchayat)
  const localProjects = projects.filter(p => p.organization?.includes('Panchayat') || 
                                            p.location.includes('Sundarbans') ||
                                            p.createdBy === '3');
  
  // Panchayat-specific statistics
  const villagePopulation = 12500;
  const beneficiaryFamilies = 2400;
  const localCreditsEarned = localProjects.reduce((sum, p) => sum + p.credits, 0);
  const communityRevenue = localCreditsEarned * 1650 * 0.3; // 30% share to community
  const pendingApprovals = 3;

  // Transform local projects for map
  const mapProjects = localProjects.map(project => ({
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
            <Home className="w-8 h-8 text-green-600" />
            Sundarbans Panchayat Dashboard
          </h1>
          <p className="text-muted-foreground">
            Community blue carbon projects and local governance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Bell className="w-4 h-4 mr-2" />
            Notifications ({pendingApprovals})
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <Vote className="w-4 h-4 mr-2" />
            Community Meeting
          </Button>
        </div>
      </div>

      {/* Community Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Local Projects"
          value={localProjects.length.toString()}
          subtitle="community initiatives"
          icon={<TreePine />}
          trend={{ value: 2, label: 'new this quarter' }}
          variant="forest"
        />
        <StatCard
          title="Beneficiary Families"
          value={beneficiaryFamilies.toLocaleString()}
          subtitle="households benefited"
          icon={<Users />}
          trend={{ value: 150, label: 'added this year' }}
          variant="ocean"
        />
        <StatCard
          title="Carbon Credits Earned"
          value={localCreditsEarned.toLocaleString()}
          subtitle="community credits"
          icon={<Coins />}
          trend={{ value: 8500, label: 'this month' }}
          variant="carbon"
        />
        <StatCard
          title="Community Revenue"
          value={`₹${(communityRevenue / 100000).toFixed(1)}L`}
          subtitle="shared benefits"
          icon={<Home />}
          trend={{ value: 24.5, label: 'vs last quarter' }}
          variant="forest"
        />
      </div>

      {/* Local Projects and Approvals */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Local Projects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TreePine className="w-5 h-5 text-forest" />
              Community Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {localProjects.slice(0, 3).map((project) => (
                <div key={project.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <span className="font-medium text-sm">{project.name}</span>
                    <p className="text-xs text-muted-foreground">{project.area} hectares</p>
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
                <FileText className="w-4 h-4 mr-2" />
                View All Projects
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              Pending Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div>
                  <span className="font-medium text-sm">Mangrove Expansion Plan</span>
                  <p className="text-xs text-muted-foreground">New 25 hectare site</p>
                </div>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Approve
                </Button>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div>
                  <span className="font-medium text-sm">Community Fishing Rights</span>
                  <p className="text-xs text-muted-foreground">Sustainable aquaculture permit</p>
                </div>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Approve
                </Button>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div>
                  <span className="font-medium text-sm">Eco-tourism Development</span>
                  <p className="text-xs text-muted-foreground">Community-based tourism</p>
                </div>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Approve
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Local Area Map */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-ocean" />
            Sundarbans Community Projects
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

      {/* Community Activities and Benefits */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Community Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-forest" />
              Recent Community Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  activity: 'Mangrove Plantation Drive',
                  details: '500 saplings planted by 50 families',
                  time: '3 days ago',
                  icon: TreePine,
                  status: 'success'
                },
                {
                  activity: 'Community Meeting',
                  details: 'Quarterly review and profit sharing',
                  time: '1 week ago',
                  icon: Users,
                  status: 'info'
                },
                {
                  activity: 'Sustainable Fishing Training',
                  details: '25 fishermen trained in eco-friendly methods',
                  time: '2 weeks ago',
                  icon: Fish,
                  status: 'success'
                },
                {
                  activity: 'Carbon Credit Distribution',
                  details: '₹2.5L distributed among 200 families',
                  time: '3 weeks ago',
                  icon: Coins,
                  status: 'success'
                }
              ].map((activity, index) => {
                const IconComponent = activity.icon;
                return (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <div className={`p-2 rounded-full ${
                      activity.status === 'success' ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      <IconComponent className={`w-4 h-4 ${
                        activity.status === 'success' ? 'text-green-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{activity.activity}</p>
                      <p className="text-xs text-muted-foreground">{activity.details}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Community Benefits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-yellow-600" />
              Community Benefits Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <span className="font-medium text-sm">Direct Employment</span>
                  <p className="text-xs text-muted-foreground">250 jobs created</p>
                </div>
                <Badge className="bg-green-100 text-green-700">Active</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <span className="font-medium text-sm">Skills Development</span>
                  <p className="text-xs text-muted-foreground">180 people trained</p>
                </div>
                <Badge className="bg-blue-100 text-blue-700">Ongoing</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div>
                  <span className="font-medium text-sm">Infrastructure Development</span>
                  <p className="text-xs text-muted-foreground">3 community centers built</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-700">In Progress</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div>
                  <span className="font-medium text-sm">Education Programs</span>
                  <p className="text-xs text-muted-foreground">5 schools upgraded</p>
                </div>
                <Badge className="bg-purple-100 text-purple-700">Completed</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PanchayatDashboard;