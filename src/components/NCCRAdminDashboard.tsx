import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  MapPin, 
  FileText, 
  Users, 
  Coins,
  Database,
  Globe,
  Activity,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  RefreshCw,
  Eye,
  Filter,
  Search,
  Bell,
  Flag,
  Award,
  Lock,
  Unlock,
  UserCheck,
  Building,
  Leaf
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface NCCRMetrics {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  pendingVerification: number;
  totalCarbonCredits: number;
  creditsIssued: number;
  creditsRetired: number;
  totalStakeholders: number;
  verifiedStakeholders: number;
  complianceRate: number;
  totalArea: number; // hectares
  carbonSequestered: number; // tCO2
}

interface ComplianceAlert {
  id: string;
  projectId: string;
  projectName: string;
  alertType: 'verification_overdue' | 'document_missing' | 'performance_deviation' | 'stakeholder_issue';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  timestamp: string;
  status: 'open' | 'investigating' | 'resolved';
  assignedTo?: string;
}

interface ProjectCompliance {
  projectId: string;
  projectName: string;
  organization: string;
  complianceScore: number;
  lastVerification: string;
  nextVerificationDue: string;
  status: 'compliant' | 'at_risk' | 'non_compliant';
  issues: string[];
  carbonCreditsIssued: number;
  area: number;
  location: { state: string; district: string };
}

interface StakeholderVerification {
  id: string;
  organizationName: string;
  type: 'NGO' | 'government' | 'panchayat' | 'private' | 'community';
  verificationStatus: 'pending' | 'verified' | 'rejected' | 'suspended';
  registrationDate: string;
  lastActivity: string;
  projectsInvolved: number;
  complianceHistory: Array<{
    date: string;
    issue: string;
    resolution: string;
    status: 'resolved' | 'ongoing';
  }>;
  documents: Array<{
    type: string;
    status: 'valid' | 'expired' | 'missing';
    expiryDate?: string;
  }>;
}

export const NCCRAdminDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<NCCRMetrics>({
    totalProjects: 247,
    activeProjects: 189,
    completedProjects: 58,
    pendingVerification: 23,
    totalCarbonCredits: 1245600,
    creditsIssued: 856400,
    creditsRetired: 245300,
    totalStakeholders: 156,
    verifiedStakeholders: 142,
    complianceRate: 94.2,
    totalArea: 12450,
    carbonSequestered: 845600
  });

  const [complianceAlerts, setComplianceAlerts] = useState<ComplianceAlert[]>([
    {
      id: 'alert-001',
      projectId: 'proj-1',
      projectName: 'Sundarbans Mangrove Restoration',
      alertType: 'verification_overdue',
      severity: 'high',
      description: 'Quarterly verification report is 15 days overdue',
      timestamp: '2025-01-15T10:30:00Z',
      status: 'open',
      assignedTo: 'Dr. Rajesh Kumar'
    },
    {
      id: 'alert-002',
      projectId: 'proj-3',
      projectName: 'Chilika Lake Seagrass Conservation',
      alertType: 'performance_deviation',
      severity: 'medium',
      description: 'Carbon sequestration rate 20% below projected targets',
      timestamp: '2025-01-14T14:20:00Z',
      status: 'investigating'
    },
    {
      id: 'alert-003',
      projectId: 'proj-5',
      projectName: 'Pulicat Lake Salt Marsh Restoration',
      alertType: 'document_missing',
      severity: 'critical',
      description: 'Environmental clearance certificate not uploaded',
      timestamp: '2025-01-13T09:15:00Z',
      status: 'open'
    }
  ]);

  const [projectCompliance, setProjectCompliance] = useState<ProjectCompliance[]>([
    {
      projectId: 'proj-1',
      projectName: 'Sundarbans Mangrove Restoration',
      organization: 'West Bengal Forest Department',
      complianceScore: 85,
      lastVerification: '2024-12-15T00:00:00Z',
      nextVerificationDue: '2025-03-15T00:00:00Z',
      status: 'at_risk',
      issues: ['Verification overdue', 'Monitoring data incomplete'],
      carbonCreditsIssued: 25600,
      area: 450,
      location: { state: 'West Bengal', district: 'South 24 Parganas' }
    },
    {
      projectId: 'proj-2',
      projectName: 'Mahanadi Delta Blue Carbon Project',
      organization: 'Odisha Wetland Authority',
      complianceScore: 96,
      lastVerification: '2025-01-10T00:00:00Z',
      nextVerificationDue: '2025-04-10T00:00:00Z',
      status: 'compliant',
      issues: [],
      carbonCreditsIssued: 18900,
      area: 320,
      location: { state: 'Odisha', district: 'Kendrapara' }
    },
    {
      projectId: 'proj-3',
      projectName: 'Chilika Lake Seagrass Conservation',
      organization: 'Chilika Development Authority',
      complianceScore: 72,
      lastVerification: '2024-11-20T00:00:00Z',
      nextVerificationDue: '2025-02-20T00:00:00Z',
      status: 'non_compliant',
      issues: ['Performance below targets', 'Stakeholder concerns', 'Data quality issues'],
      carbonCreditsIssued: 12400,
      area: 280,
      location: { state: 'Odisha', district: 'Puri' }
    }
  ]);

  const [stakeholderVerifications, setStakeholderVerifications] = useState<StakeholderVerification[]>([
    {
      id: 'stake-001',
      organizationName: 'Coastal Conservation Foundation',
      type: 'NGO',
      verificationStatus: 'verified',
      registrationDate: '2024-03-15T00:00:00Z',
      lastActivity: '2025-01-14T16:30:00Z',
      projectsInvolved: 8,
      complianceHistory: [
        {
          date: '2024-12-01T00:00:00Z',
          issue: 'Late submission of quarterly report',
          resolution: 'Report submitted with explanation',
          status: 'resolved'
        }
      ],
      documents: [
        { type: 'Registration Certificate', status: 'valid', expiryDate: '2026-03-15T00:00:00Z' },
        { type: 'Environmental Clearance', status: 'valid', expiryDate: '2025-09-30T00:00:00Z' },
        { type: 'Project Authorization', status: 'valid' }
      ]
    },
    {
      id: 'stake-002',
      organizationName: 'Sundarbans Fishermen Cooperative',
      type: 'community',
      verificationStatus: 'pending',
      registrationDate: '2025-01-10T00:00:00Z',
      lastActivity: '2025-01-10T12:00:00Z',
      projectsInvolved: 0,
      complianceHistory: [],
      documents: [
        { type: 'Registration Certificate', status: 'valid' },
        { type: 'Community Authorization', status: 'missing' },
        { type: 'Bank Details', status: 'valid' }
      ]
    }
  ]);

  const [activeTab, setActiveTab] = useState('overview');
  const [searchFilter, setSearchFilter] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getComplianceStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-600 bg-green-50';
      case 'at_risk': return 'text-yellow-600 bg-yellow-50';
      case 'non_compliant': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getVerificationStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      case 'suspended': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredAlerts = complianceAlerts.filter(alert => {
    const matchesSearch = alert.projectName.toLowerCase().includes(searchFilter.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">NCCR Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">National Centre for Climate Resilience - Blue Carbon MRV Oversight</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.totalProjects}</p>
                <p className="text-xs text-green-600 mt-1">
                  +12 this month
                </p>
              </div>
              <Building className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Carbon Credits Issued</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.creditsIssued.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">
                  +8.5% this quarter
                </p>
              </div>
              <Coins className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Compliance Rate</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.complianceRate}%</p>
                <p className="text-xs text-yellow-600 mt-1">
                  -2.1% from last month
                </p>
              </div>
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Verifications</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.pendingVerification}</p>
                <p className="text-xs text-red-600 mt-1">
                  Requires attention
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="alerts">
            Alerts
            {complianceAlerts.filter(a => a.status === 'open').length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {complianceAlerts.filter(a => a.status === 'open').length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* System Health */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>System Health</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Blockchain Network</span>
                  <Badge variant="default" className="bg-green-500">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Operational
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Data Verification</span>
                  <Badge variant="default" className="bg-green-500">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Mobile Data Sync</span>
                  <Badge variant="default" className="bg-yellow-500">
                    <Clock className="h-3 w-3 mr-1" />
                    Delayed
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Credit Registry</span>
                  <Badge variant="default" className="bg-green-500">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Operational
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Geographic Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">West Bengal</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={65} className="w-20" />
                      <span className="text-sm font-medium">65 projects</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Odisha</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={45} className="w-20" />
                      <span className="text-sm font-medium">45 projects</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tamil Nadu</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={38} className="w-20" />
                      <span className="text-sm font-medium">38 projects</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Gujarat</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={28} className="w-20" />
                      <span className="text-sm font-medium">28 projects</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Recent Activities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 pb-4 border-b">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Mahanadi Delta Project - Verification Completed</p>
                    <p className="text-xs text-gray-600">18,900 carbon credits issued • 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 pb-4 border-b">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New Stakeholder Registration</p>
                    <p className="text-xs text-gray-600">Sundarbans Fishermen Cooperative awaiting verification • 4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 pb-4 border-b">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Compliance Alert - Sundarbans Project</p>
                    <p className="text-xs text-gray-600">Verification report overdue by 15 days • 6 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Project Compliance Status</span>
              </CardTitle>
              <CardDescription>
                Monitor compliance scores and verification status across all projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectCompliance.map((project) => (
                  <div key={project.projectId} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{project.projectName}</h3>
                        <p className="text-sm text-gray-600">{project.organization}</p>
                        <p className="text-xs text-gray-500">{project.location.state}, {project.location.district}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={getComplianceStatusColor(project.status)}>
                          {project.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <div className="text-2xl font-bold mt-1">{project.complianceScore}%</div>
                        <div className="text-xs text-gray-500">Compliance Score</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <div className="text-sm font-medium">Last Verification</div>
                        <div className="text-xs text-gray-600">
                          {new Date(project.lastVerification).toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Next Due</div>
                        <div className="text-xs text-gray-600">
                          {new Date(project.nextVerificationDue).toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Credits Issued</div>
                        <div className="text-xs text-gray-600">
                          {project.carbonCreditsIssued.toLocaleString()} tCO2
                        </div>
                      </div>
                    </div>

                    <Progress value={project.complianceScore} className="mb-3" />
                    
                    {project.issues.length > 0 && (
                      <div className="bg-red-50 border border-red-200 rounded p-3">
                        <div className="text-sm font-medium text-red-800 mb-1">Outstanding Issues:</div>
                        <ul className="text-xs text-red-700 space-y-1">
                          {project.issues.map((issue, index) => (
                            <li key={index}>• {issue}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search alerts..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Alerts List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Compliance Alerts</span>
              </CardTitle>
              <CardDescription>
                Critical issues requiring immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAlerts.map((alert) => (
                  <div key={alert.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={`${getSeverityColor(alert.severity)} text-white`}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                          <Badge variant="outline">
                            {alert.alertType.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {new Date(alert.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <h3 className="font-semibold text-lg mb-1">{alert.projectName}</h3>
                        <p className="text-sm text-gray-700 mb-2">{alert.description}</p>
                        {alert.assignedTo && (
                          <p className="text-xs text-gray-600">Assigned to: {alert.assignedTo}</p>
                        )}
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Badge 
                          variant={alert.status === 'open' ? 'destructive' : alert.status === 'investigating' ? 'default' : 'secondary'}
                        >
                          {alert.status.toUpperCase()}
                        </Badge>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Flag className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stakeholders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserCheck className="h-5 w-5" />
                <span>Stakeholder Verification</span>
              </CardTitle>
              <CardDescription>
                Manage stakeholder registrations and verification status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stakeholderVerifications.map((stakeholder) => (
                  <div key={stakeholder.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{stakeholder.organizationName}</h3>
                        <p className="text-sm text-gray-600 capitalize">{stakeholder.type}</p>
                        <p className="text-xs text-gray-500">
                          Registered: {new Date(stakeholder.registrationDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={getVerificationStatusColor(stakeholder.verificationStatus)}>
                          {stakeholder.verificationStatus.toUpperCase()}
                        </Badge>
                        <div className="text-sm font-medium mt-1">
                          {stakeholder.projectsInvolved} Projects
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <div className="text-sm font-medium">Document Status</div>
                        <div className="space-y-1 mt-1">
                          {stakeholder.documents.map((doc, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${
                                doc.status === 'valid' ? 'bg-green-500' : 
                                doc.status === 'expired' ? 'bg-red-500' : 'bg-gray-400'
                              }`}></div>
                              <span className="text-xs">{doc.type}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Last Activity</div>
                        <div className="text-xs text-gray-600 mt-1">
                          {new Date(stakeholder.lastActivity).toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Compliance Issues</div>
                        <div className="text-xs text-gray-600 mt-1">
                          {stakeholder.complianceHistory.length} historical
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      {stakeholder.verificationStatus === 'pending' && (
                        <>
                          <Button size="sm" variant="default">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive">
                            <XCircle className="h-3 w-3 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      {stakeholder.verificationStatus === 'verified' && (
                        <Button size="sm" variant="outline">
                          <Lock className="h-3 w-3 mr-1" />
                          Suspend
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Carbon Credit Issuance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {metrics.creditsIssued.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total Credits Issued</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold">45%</div>
                      <div className="text-xs text-gray-600">Mangroves</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">35%</div>
                      <div className="text-xs text-gray-600">Seagrass</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">20%</div>
                      <div className="text-xs text-gray-600">Salt Marsh</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5" />
                  <span>Project Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Exceeding Targets</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={25} className="w-20" />
                      <span className="text-sm font-medium">25%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Meeting Targets</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={60} className="w-20" />
                      <span className="text-sm font-medium">60%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Below Targets</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={15} className="w-20" />
                      <span className="text-sm font-medium">15%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Leaf className="h-5 w-5" />
                <span>Environmental Impact</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {metrics.totalArea.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Hectares Restored</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {metrics.carbonSequestered.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">tCO2 Sequestered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {(metrics.carbonSequestered / metrics.totalArea).toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600">Avg tCO2/ha</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NCCRAdminDashboard;