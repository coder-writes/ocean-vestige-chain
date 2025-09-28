import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useProjects } from '@/contexts/ProjectContext';
import GoogleMapComponent from '@/components/GoogleMapComponent';
import { 
  CheckCircle,
  Clock, 
  MapPin, 
  AlertTriangle,
  FileText,
  Search,
  Award,
  TrendingUp,
  Calendar,
  Microscope,
  Satellite,
  Camera
} from 'lucide-react';

const VerifierDashboard: React.FC = () => {
  const { projects } = useProjects();

  // Verifier-specific statistics
  const pendingVerifications = projects.filter(p => p.status === 'pending').length;
  const verifiedProjects = projects.filter(p => p.status === 'verified').length;
  const activeReviews = projects.filter(p => p.status === 'active').length;
  const totalCreditsVerified = projects
    .filter(p => p.status === 'verified')
    .reduce((sum, p) => sum + p.credits, 0);
  const averageVerificationTime = 14; // days
  const complianceScore = 96.5;

  // Projects requiring verification action
  const priorityReviews = projects.filter(p => p.status === 'pending').slice(0, 4);

  // Transform projects for verification map
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
            <CheckCircle className="w-8 h-8 text-green-600" />
            Carbon Credit Verification
          </h1>
          <p className="text-muted-foreground">
            Independent verification and quality assurance dashboard
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Verification Reports
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <Search className="w-4 h-4 mr-2" />
            Start Verification ({pendingVerifications})
          </Button>
        </div>
      </div>

      {/* Verification Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Pending Reviews"
          value={pendingVerifications.toString()}
          subtitle="awaiting verification"
          icon={<Clock />}
          trend={{ value: -2, label: 'vs last week' }}
          variant="carbon"
        />
        <StatCard
          title="Verified Projects"
          value={verifiedProjects.toString()}
          subtitle="approved initiatives"
          icon={<CheckCircle />}
          trend={{ value: 5, label: 'this month' }}
          variant="forest"
        />
        <StatCard
          title="Credits Verified"
          value={totalCreditsVerified.toLocaleString()}
          subtitle="total approved credits"
          icon={<Award />}
          trend={{ value: 15400, label: 'this quarter' }}
          variant="ocean"
        />
        <StatCard
          title="Compliance Score"
          value={`${complianceScore}%`}
          subtitle="quality rating"
          icon={<TrendingUp />}
          trend={{ value: 1.2, label: 'improvement' }}
          variant="forest"
        />
      </div>

      {/* Verification Queue and Quality Checks */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Priority Verification Queue */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              Priority Verification Queue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {priorityReviews.map((project) => (
                <div key={project.id} className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div>
                    <span className="font-medium text-sm">{project.name}</span>
                    <p className="text-xs text-muted-foreground">
                      Submitted: {new Date(project.startDate).toLocaleDateString()} • 
                      {project.estimatedCredits.toLocaleString()} credits
                    </p>
                  </div>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Review
                  </Button>
                </div>
              ))}
              {priorityReviews.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500" />
                  <p>All projects up to date!</p>
                </div>
              )}
              <Button className="w-full" variant="outline">
                <Clock className="w-4 h-4 mr-2" />
                View Full Queue
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Verification Tools */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Microscope className="w-5 h-5 text-blue-600" />
              Verification Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <span className="font-medium text-sm">Satellite Data Analysis</span>
                  <p className="text-xs text-muted-foreground">NDVI & vegetation monitoring</p>
                </div>
                <Button size="sm" variant="outline">
                  <Satellite className="w-3 h-3 mr-1" />
                  Launch
                </Button>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <span className="font-medium text-sm">Field Photo Verification</span>
                  <p className="text-xs text-muted-foreground">Image analysis & validation</p>
                </div>
                <Button size="sm" variant="outline">
                  <Camera className="w-3 h-3 mr-1" />
                  Review
                </Button>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div>
                  <span className="font-medium text-sm">Carbon Calculator</span>
                  <p className="text-xs text-muted-foreground">Sequestration modeling</p>
                </div>
                <Button size="sm" variant="outline">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Calculate
                </Button>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div>
                  <span className="font-medium text-sm">Compliance Checker</span>
                  <p className="text-xs text-muted-foreground">Standard adherence verification</p>
                </div>
                <Button size="sm" variant="outline">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verify
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Under Review Map */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-ocean" />
            Projects Under Review
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

      {/* Verification Analytics and Recent Activities */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Verification Methodology Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              Verification Standards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <span className="font-medium text-sm">VCS (Verified Carbon Standard)</span>
                  <p className="text-xs text-muted-foreground">Primary verification methodology</p>
                </div>
                <Badge className="bg-blue-100 text-blue-700">4 projects</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <span className="font-medium text-sm">Gold Standard</span>
                  <p className="text-xs text-muted-foreground">Premium quality verification</p>
                </div>
                <Badge className="bg-green-100 text-green-700">1 project</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div>
                  <span className="font-medium text-sm">Climate Action Reserve</span>
                  <p className="text-xs text-muted-foreground">Regional standard compliance</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-700">1 project</Badge>
              </div>
              <div className="text-center pt-2 border-t">
                <p className="text-sm font-medium">Average Verification Time</p>
                <p className="text-2xl font-bold text-green-600">{averageVerificationTime} days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Verification Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              Recent Verification Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  activity: 'Project Verification Completed',
                  details: 'Sundarbans Conservation - 185,000 credits approved',
                  time: '2 days ago',
                  status: 'success'
                },
                {
                  activity: 'Field Assessment Scheduled',
                  details: 'Pichavaram Mangroves site visit planned',
                  time: '3 days ago',
                  status: 'info'
                },
                {
                  activity: 'Documentation Review',
                  details: 'Gulf of Mannar project - additional docs requested',
                  time: '5 days ago',
                  status: 'warning'
                },
                {
                  activity: 'Satellite Data Analysis',
                  details: 'Chilika Lake NDVI monitoring completed',
                  time: '1 week ago',
                  status: 'success'
                },
                {
                  activity: 'Compliance Audit',
                  details: 'Bhitarkanika project standards verification',
                  time: '10 days ago',
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

export default VerifierDashboard;