import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useProjects } from '@/contexts/ProjectContext';
import GoogleMapComponent from '@/components/GoogleMapComponent';
import { 
  Building2,
  FileText, 
  MapPin, 
  TrendingUp,
  Shield,
  Users,
  Globe,
  Award,
  BarChart3,
  PieChart,
  Flag,
  Scale
} from 'lucide-react';

const GovernmentDashboard: React.FC = () => {
  const { projects } = useProjects();

  // Government oversight statistics
  const totalProjects = projects.length;
  const verifiedProjects = projects.filter(p => p.status === 'verified').length;
  const pendingVerifications = projects.filter(p => p.status === 'pending').length;
  const totalCreditsIssued = projects.reduce((sum, p) => sum + p.credits, 0);
  const nationalCarbonGoal = 500000; // National target
  const goalAchievement = (totalCreditsIssued / nationalCarbonGoal) * 100;
  
  // Policy and regulatory metrics
  const registeredOrganizations = 23;
  const complianceRate = 94.5;
  const totalInvestment = projects.reduce((sum, p) => sum + p.budget, 0);

  // Transform all projects for national overview map
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Building2 className="w-8 h-8 text-blue-600" />
            National Blue Carbon Policy Dashboard
          </h1>
          <p className="text-muted-foreground">
            Ministry of Environment oversight and policy implementation
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Policy Reports
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Flag className="w-4 h-4 mr-2" />
            National Targets
          </Button>
        </div>
      </div>

      {/* National Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="National Projects"
          value={totalProjects.toString()}
          subtitle="registered initiatives"
          icon={<Globe />}
          trend={{ value: totalProjects, label: 'across India' }}
          variant="ocean"
        />
        <StatCard
          title="Carbon Goal Progress"
          value={`${goalAchievement.toFixed(1)}%`}
          subtitle="of national target"
          icon={<TrendingUp />}
          trend={{ value: totalCreditsIssued, label: 'credits achieved' }}
          variant="forest"
        />
        <StatCard
          title="Investment Mobilized"
          value={`₹${(totalInvestment / 10000000).toFixed(0)}Cr`}
          subtitle="total funding"
          icon={<BarChart3 />}
          trend={{ value: 34.2, label: 'vs last fiscal' }}
          variant="carbon"
        />
        <StatCard
          title="Compliance Rate"
          value={`${complianceRate}%`}
          subtitle="regulatory adherence"
          icon={<Shield />}
          trend={{ value: 2.1, label: 'improvement' }}
          variant="ocean"
        />
      </div>

      {/* Policy Implementation and State-wise Progress */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* State-wise Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flag className="w-5 h-5 text-blue-600" />
              State-wise Implementation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <span className="font-medium text-sm">West Bengal</span>
                  <p className="text-xs text-muted-foreground">Sundarbans region projects</p>
                </div>
                <div className="text-right">
                  <Badge className="bg-green-100 text-green-700">185K credits</Badge>
                  <p className="text-xs text-muted-foreground mt-1">3 projects</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <span className="font-medium text-sm">Tamil Nadu</span>
                  <p className="text-xs text-muted-foreground">Gulf of Mannar & coastal areas</p>
                </div>
                <div className="text-right">
                  <Badge className="bg-blue-100 text-blue-700">120K credits</Badge>
                  <p className="text-xs text-muted-foreground mt-1">2 projects</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <span className="font-medium text-sm">Odisha</span>
                  <p className="text-xs text-muted-foreground">Chilika & Bhitarkanika</p>
                </div>
                <div className="text-right">
                  <Badge className="bg-yellow-100 text-yellow-700">78K credits</Badge>
                  <p className="text-xs text-muted-foreground mt-1">1 project</p>
                </div>
              </div>
              <Button className="w-full" variant="outline">
                <PieChart className="w-4 h-4 mr-2" />
                Detailed State Analysis
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Regulatory Framework */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-purple-600" />
              Regulatory Framework
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div>
                  <span className="font-medium text-sm">Registered Organizations</span>
                  <p className="text-xs text-muted-foreground">Approved implementing entities</p>
                </div>
                <Badge className="bg-purple-100 text-purple-700">{registeredOrganizations}</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <span className="font-medium text-sm">Verified Projects</span>
                  <p className="text-xs text-muted-foreground">Meeting quality standards</p>
                </div>
                <Badge className="bg-green-100 text-green-700">{verifiedProjects}</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div>
                  <span className="font-medium text-sm">Pending Reviews</span>
                  <p className="text-xs text-muted-foreground">Awaiting verification</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-700">{pendingVerifications}</Badge>
              </div>
              <Button className="w-full" variant="outline">
                <Shield className="w-4 h-4 mr-2" />
                Compliance Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* National Blue Carbon Map */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-ocean" />
            National Blue Carbon Project Distribution
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

      {/* Policy Metrics and National Initiatives */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* National Climate Targets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-green-600" />
              National Climate Targets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <span className="font-medium text-sm">NDC Commitment</span>
                  <p className="text-xs text-muted-foreground">Paris Agreement targets</p>
                </div>
                <span className="font-bold text-green-700">On Track</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <span className="font-medium text-sm">Blue Economy Target</span>
                  <p className="text-xs text-muted-foreground">Coastal GDP contribution</p>
                </div>
                <span className="font-bold text-blue-700">₹10L Cr by 2030</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div>
                  <span className="font-medium text-sm">Mangrove Coverage</span>
                  <p className="text-xs text-muted-foreground">Conservation target</p>
                </div>
                <span className="font-bold text-purple-700">+20% by 2030</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div>
                  <span className="font-medium text-sm">Coastal Communities</span>
                  <p className="text-xs text-muted-foreground">Livelihood beneficiaries</p>
                </div>
                <span className="font-bold text-yellow-700">50L families</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Policy Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              Recent Policy Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: 'Blue Carbon Guidelines Released',
                  details: 'National framework for MRV implementation',
                  time: '1 week ago',
                  status: 'success'
                },
                {
                  action: 'Coastal Regulation Amendment',
                  details: 'CRZ notification updated for blue carbon projects',
                  time: '2 weeks ago',
                  status: 'info'
                },
                {
                  action: 'Interstate Coordination Meeting',
                  details: 'Coastal states collaboration framework',
                  time: '3 weeks ago',
                  status: 'success'
                },
                {
                  action: 'Carbon Credit Registry Setup',
                  details: 'National blue carbon credit database launched',
                  time: '1 month ago',
                  status: 'success'
                },
                {
                  action: 'Budget Allocation Approved',
                  details: '₹2000 Cr allocated for blue carbon initiatives',
                  time: '6 weeks ago',
                  status: 'success'
                }
              ].map((action, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    action.status === 'success' ? 'bg-green-500' :
                    action.status === 'info' ? 'bg-blue-500' :
                    'bg-yellow-500'
                  }`} />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{action.action}</p>
                    <p className="text-xs text-muted-foreground">{action.details}</p>
                    <p className="text-xs text-muted-foreground mt-1">{action.time}</p>
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

export default GovernmentDashboard;