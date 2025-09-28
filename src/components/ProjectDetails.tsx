import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import MapModal from './MapModal';
import { 
  Building, 
  MapPin, 
  Calendar, 
  CreditCard,
  TrendingUp,
  CheckCircle,
  FileText,
  Download,
  ExternalLink,
  Leaf,
  Users,
  Globe,
  TreePine,
  Waves,
  BarChart3,
  Activity,
  Award,
  Shield,
  Target,
  Camera,
  Clock,
  DollarSign,
  Ruler
} from 'lucide-react';
import { Project, formatIndianCurrency, formatIndianDate, getTransactionsByOrganization } from '@/data/transactionData';

interface ProjectDetailsProps {
  project: Project;
  onClose: () => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showMapModal, setShowMapModal] = useState(false);

  const getProjectTypeIcon = (type: string) => {
    switch (type) {
      case 'mangrove':
        return <TreePine className="w-5 h-5 text-green-600" />;
      case 'seagrass':
        return <Leaf className="w-5 h-5 text-blue-600" />;
      case 'saltmarsh':
        return <Waves className="w-5 h-5 text-purple-600" />;
      default:
        return <Globe className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'under_verification':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pending':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getOrganizationTypeIcon = (type: string) => {
    switch (type) {
      case 'private':
        return <Building className="w-4 h-4 text-blue-600" />;
      case 'ngo':
        return <Leaf className="w-4 h-4 text-green-600" />;
      case 'panchayat':
        return <Users className="w-4 h-4 text-orange-600" />;
      case 'government':
        return <Building className="w-4 h-4 text-purple-600" />;
      case 'verifier':
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      default:
        return <Globe className="w-4 h-4 text-gray-600" />;
    }
  };

  const creditUtilization = ((project.totalCreditsIssued - project.availableCredits) / project.totalCreditsIssued) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                {getProjectTypeIcon(project.type)}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
                <div className="flex items-center space-x-2 mt-1">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{project.location.district}, {project.location.state}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={getStatusColor(project.status)}>
                <CheckCircle className="w-4 h-4 mr-1" />
                {project.status.replace('_', ' ')}
              </Badge>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <Ruler className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Total Area</p>
                  <p className="text-xl font-bold">{project.area.toLocaleString()} ha</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Annual Sequestration</p>
                  <p className="text-xl font-bold">{project.annualSequestration.toLocaleString()} tCO₂</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-500">Credits Issued</p>
                  <p className="text-xl font-bold">{project.totalCreditsIssued.toLocaleString()}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-500">Price per Credit</p>
                  <p className="text-xl font-bold">{formatIndianCurrency(project.pricePerCredit)}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="organizations">Organizations</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="credits">Credits</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Project Description */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed">{project.description}</p>
                    </CardContent>
                  </Card>

                  {/* Project Timeline */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <span>Project Timeline</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">Start Date</p>
                          <p className="text-gray-600">{formatIndianDate(project.startDate)}</p>
                        </div>
                        {project.completionDate && (
                          <div>
                            <p className="font-semibold">Completion Date</p>
                            <p className="text-gray-600">{formatIndianDate(project.completionDate)}</p>
                          </div>
                        )}
                      </div>
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="w-4 h-4 text-gray-600" />
                          <span className="font-medium">Project Duration</span>
                        </div>
                        <p className="text-gray-700">
                          {new Date().getFullYear() - new Date(project.startDate).getFullYear()} years running
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Methodology & Standards */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Award className="w-5 h-5 text-purple-600" />
                        <span>Methodology & Standards</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="font-semibold text-gray-700 mb-2">Certification Standard</p>
                        <Badge variant="outline" className="text-sm">
                          <Shield className="w-4 h-4 mr-1" />
                          {project.certificationStandard}
                        </Badge>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700 mb-2">Methodology</p>
                        <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{project.methodology}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Location */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5 text-red-600" />
                        <span>Location</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">State</p>
                        <p className="font-semibold">{project.location.state}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">District</p>
                        <p className="font-semibold">{project.location.district}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Coordinates</p>
                        <p className="font-mono text-sm bg-gray-100 p-2 rounded">
                          {project.location.coordinates.lat.toFixed(6)}, {project.location.coordinates.lng.toFixed(6)}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setShowMapModal(true)}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View on Map
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Credit Utilization */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BarChart3 className="w-5 h-5 text-green-600" />
                        <span>Credit Utilization</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Utilized</span>
                          <span>{creditUtilization.toFixed(1)}%</span>
                        </div>
                        <Progress value={creditUtilization} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Issued</span>
                          <span className="font-semibold">{project.totalCreditsIssued.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Available</span>
                          <span className="font-semibold text-green-600">{project.availableCredits.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Sold</span>
                          <span className="font-semibold text-blue-600">
                            {(project.totalCreditsIssued - project.availableCredits).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Organizations Tab */}
            <TabsContent value="organizations" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Project Owner */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Building className="w-5 h-5 text-blue-600" />
                      <span>Project Owner</span>
                    </CardTitle>
                    <CardDescription>Legal owner and rights holder</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      {getOrganizationTypeIcon(project.owner.type)}
                      <Badge variant="outline" className="capitalize">{project.owner.type}</Badge>
                    </div>
                    <h4 className="font-semibold text-lg">{project.owner.name}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{project.owner.location.district}, {project.owner.location.state}</span>
                      </div>
                      <p><strong>Contact:</strong> {project.owner.contactPerson}</p>
                      <p><strong>Email:</strong> {project.owner.email}</p>
                      <p><strong>Reg. No:</strong> {project.owner.registrationNumber}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Project Developer */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-green-600" />
                      <span>Project Developer</span>
                    </CardTitle>
                    <CardDescription>Implementation and management</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      {getOrganizationTypeIcon(project.developer.type)}
                      <Badge variant="outline" className="capitalize">{project.developer.type}</Badge>
                    </div>
                    <h4 className="font-semibold text-lg">{project.developer.name}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{project.developer.location.district}, {project.developer.location.state}</span>
                      </div>
                      <p><strong>Contact:</strong> {project.developer.contactPerson}</p>
                      <p><strong>Email:</strong> {project.developer.email}</p>
                      <p><strong>Reg. No:</strong> {project.developer.registrationNumber}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Verifier */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                      <span>Verifier</span>
                    </CardTitle>
                    <CardDescription>Third-party verification body</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      {getOrganizationTypeIcon(project.verifier.type)}
                      <Badge variant="outline" className="capitalize">{project.verifier.type}</Badge>
                    </div>
                    <h4 className="font-semibold text-lg">{project.verifier.name}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{project.verifier.location.district}, {project.verifier.location.state}</span>
                      </div>
                      <p><strong>Contact:</strong> {project.verifier.contactPerson}</p>
                      <p><strong>Email:</strong> {project.verifier.email}</p>
                      <p><strong>Reg. No:</strong> {project.verifier.registrationNumber}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Monitoring Tab */}
            <TabsContent value="monitoring" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Current Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="w-5 h-5 text-green-600" />
                      <span>Current Monitoring Data</span>
                    </CardTitle>
                    <CardDescription>Last updated: {formatIndianDate(project.monitoring.lastUpdated)}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Carbon Stock */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Carbon Stock</span>
                        <span className="text-lg font-bold text-green-600">{project.monitoring.carbonStock} tCO₂</span>
                      </div>
                      <Progress value={85} className="h-2" />
                      <p className="text-sm text-gray-500 mt-1">Above baseline target</p>
                    </div>

                    {/* Biodiversity Index */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Biodiversity Index</span>
                        <span className="text-lg font-bold text-blue-600">{project.monitoring.biodiversityIndex}/10</span>
                      </div>
                      <Progress value={project.monitoring.biodiversityIndex * 10} className="h-2" />
                      <p className="text-sm text-gray-500 mt-1">Species diversity score</p>
                    </div>

                    {/* Community Benefit */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Community Benefit</span>
                        <span className="text-lg font-bold text-purple-600">{project.monitoring.communityBenefit}/10</span>
                      </div>
                      <Progress value={project.monitoring.communityBenefit * 10} className="h-2" />
                      <p className="text-sm text-gray-500 mt-1">Local community impact</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Monitoring Images */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Camera className="w-5 h-5 text-gray-600" />
                      <span>Site Images</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {project.images.map((image, index) => (
                        <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                          <Camera className="w-8 h-8 text-gray-400" />
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View All Images
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-gray-600" />
                    <span>Project Documents</span>
                  </CardTitle>
                  <CardDescription>Official documents and reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {project.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-gray-500">{doc.type}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Credits Tab */}
            <TabsContent value="credits" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="w-5 h-5 text-green-600" />
                      <span>Credit Overview</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">{project.totalCreditsIssued.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Total Issued</p>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">{project.availableCredits.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Available</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Price per Credit</span>
                        <span className="font-bold">{formatIndianCurrency(project.pricePerCredit)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Value</span>
                        <span className="font-bold text-green-600">
                          {formatIndianCurrency(project.availableCredits * project.pricePerCredit)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Purchase Credits</CardTitle>
                    <CardDescription>Buy carbon credits from this project</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Quantity (tCO₂)</label>
                      <input 
                        type="number" 
                        className="w-full p-2 border rounded-lg" 
                        placeholder="Enter quantity"
                        min="1"
                        max={project.availableCredits}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Purpose</label>
                      <select className="w-full p-2 border rounded-lg">
                        <option>Carbon offset</option>
                        <option>Corporate sustainability</option>
                        <option>Voluntary retirement</option>
                        <option>Portfolio diversification</option>
                      </select>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Purchase Credits
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Map Modal */}
      {showMapModal && (
        <MapModal
          project={project}
          onClose={() => setShowMapModal(false)}
        />
      )}
    </div>
  );
};

export default ProjectDetails;