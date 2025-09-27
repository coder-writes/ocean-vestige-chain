import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatCard } from '@/components/ui/stat-card';
import { 
  Shield, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  FileText,
  Eye,
  Download,
  Upload,
  User,
  Calendar,
  MapPin,
  Leaf
} from 'lucide-react';

const verificationRequests = [
  {
    id: 'VR001',
    project: 'Mangrove Restoration Site Alpha',
    requestDate: '2024-01-15',
    credits: 1250,
    status: 'pending',
    verifier: 'EcoVerify Inc.',
    priority: 'high',
    documents: 8,
    progress: 75
  },
  {
    id: 'VR002', 
    project: 'Seagrass Conservation Beta',
    requestDate: '2024-01-10',
    credits: 890,
    status: 'in-review',
    verifier: 'Carbon Audit Ltd.',
    priority: 'medium',
    documents: 12,
    progress: 45
  },
  {
    id: 'VR003',
    project: 'Salt Marsh Protection Gamma',
    requestDate: '2024-01-08',
    credits: 675,
    status: 'verified',
    verifier: 'Green Standard Co.',
    priority: 'low',
    documents: 15,
    progress: 100
  },
];

const verificationSteps = [
  { step: 1, title: 'Document Review', status: 'completed', description: 'Initial documentation and data validation' },
  { step: 2, title: 'Field Verification', status: 'completed', description: 'On-site assessment and measurements' },
  { step: 3, title: 'Satellite Analysis', status: 'in-progress', description: 'Remote sensing data verification' },
  { step: 4, title: 'Carbon Calculation', status: 'pending', description: 'Final carbon sequestration calculations' },
  { step: 5, title: 'Report Generation', status: 'pending', description: 'Comprehensive verification report' },
  { step: 6, title: 'Certificate Issuance', status: 'pending', description: 'Blockchain certificate minting' },
];

const Verification: React.FC = () => {
  const [selectedRequest, setSelectedRequest] = useState(verificationRequests[0]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-forest text-white';
      case 'in-review': return 'bg-ocean text-white';
      case 'pending': return 'bg-yellow-500 text-white';
      case 'rejected': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getStepStatus = (status: string) => {
    switch (status) {
      case 'completed': return { icon: <CheckCircle className="w-5 h-5 text-forest" />, color: 'border-forest' };
      case 'in-progress': return { icon: <Clock className="w-5 h-5 text-ocean" />, color: 'border-ocean' };
      case 'pending': return { icon: <Clock className="w-5 h-5 text-gray-400" />, color: 'border-gray-300' };
      default: return { icon: <AlertTriangle className="w-5 h-5 text-red-500" />, color: 'border-red-300' };
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Verification & Compliance</h1>
          <p className="text-muted-foreground">
            Manage carbon credit verification processes and compliance documentation
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Reports
          </Button>
          <Button className="bg-ocean hover:bg-ocean-dark">
            <Upload className="w-4 h-4 mr-2" />
            Submit for Verification
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="Pending Verifications"
          value={verificationRequests.filter(r => r.status === 'pending').length}
          subtitle="awaiting review"
          icon={<Clock />}
          variant="ocean"
        />
        <StatCard
          title="In Progress"
          value={verificationRequests.filter(r => r.status === 'in-review').length}
          subtitle="under review"
          icon={<Eye />}
          variant="carbon"
        />
        <StatCard
          title="Verified Credits"
          value={verificationRequests.filter(r => r.status === 'verified').reduce((sum, r) => sum + r.credits, 0).toLocaleString()}
          subtitle="tCO₂e certified"
          icon={<Shield />}
          variant="forest"
        />
        <StatCard
          title="Success Rate"
          value="94.2%"
          subtitle="verification rate"
          icon={<CheckCircle />}
          variant="forest"
        />
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Verification Requests */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Verification Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {verificationRequests.map((request) => (
                  <div 
                    key={request.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedRequest.id === request.id ? 'border-ocean bg-ocean/5' : 'hover:border-ocean/50'
                    }`}
                    onClick={() => setSelectedRequest(request)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{request.project}</h3>
                          <Badge variant="outline">{request.id}</Badge>
                          <Badge className={getStatusColor(request.status)}>
                            {request.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Credits</p>
                            <p className="font-medium">{request.credits.toLocaleString()} tCO₂e</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Verifier</p>
                            <p className="font-medium">{request.verifier}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Priority</p>
                            <p className={`font-medium ${getPriorityColor(request.priority)}`}>
                              {request.priority.toUpperCase()}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Progress</p>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-ocean h-2 rounded-full transition-all"
                                  style={{ width: `${request.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-xs font-medium">{request.progress}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Verification Process */}
          <Card>
            <CardHeader>
              <CardTitle>Verification Process - {selectedRequest.id}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {verificationSteps.map((step, index) => {
                  const stepStatus = getStepStatus(step.status);
                  const isConnected = index < verificationSteps.length - 1;
                  
                  return (
                    <div key={step.step} className="relative">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full border-2 ${stepStatus.color} bg-white flex items-center justify-center`}>
                          {stepStatus.icon}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{step.title}</h3>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                      
                      {isConnected && (
                        <div className="absolute left-5 top-10 w-px h-6 bg-border"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Upload Documents
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Eye className="w-4 h-4 mr-2" />
                Schedule Site Visit
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Download Reports
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <User className="w-4 h-4 mr-2" />
                Contact Verifier
              </Button>
            </CardContent>
          </Card>

          {/* Request Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Request Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Request ID</span>
                  <span className="font-medium">{selectedRequest.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Submitted</span>
                  <span className="font-medium">{selectedRequest.requestDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Documents</span>
                  <span className="font-medium">{selectedRequest.documents} files</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Completion</span>
                  <span className="font-medium">5-7 days</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verification Standards */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Standards Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: 'VCS (Verified Carbon Standard)', status: 'compliant' },
                { name: 'Gold Standard', status: 'compliant' },
                { name: 'Plan Vivo', status: 'pending' },
                { name: 'Climate Action Reserve', status: 'compliant' },
              ].map((standard, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded bg-muted/50">
                  <span className="text-sm font-medium">{standard.name}</span>
                  <Badge 
                    className={standard.status === 'compliant' ? 'bg-forest text-white' : 'bg-yellow-500 text-white'}
                  >
                    {standard.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { action: 'Document uploaded', time: '2 hours ago', user: 'Project Manager' },
                { action: 'Site visit scheduled', time: '1 day ago', user: 'EcoVerify Inc.' },
                { action: 'Initial review completed', time: '2 days ago', user: 'Verifier' },
                { action: 'Verification request submitted', time: '5 days ago', user: 'Project Owner' },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-ocean mt-2"></div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-muted-foreground">{activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Verification;