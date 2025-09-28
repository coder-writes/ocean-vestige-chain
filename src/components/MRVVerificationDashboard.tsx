import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Camera, 
  MapPin, 
  TrendingUp, 
  Database,
  Shield,
  Eye,
  Download,
  Upload,
  Smartphone,
  Plane,
  Satellite,
  Award,
  Lock,
  Unlock,
  RefreshCw,
  BarChart3,
  PieChart,
  Leaf,
  Coins,
  Users,
  Calendar,
  CheckSquare,
  AlertCircle,
  Info,
  Zap,
  Globe
} from 'lucide-react';
import { blockchainService } from '@/services/blockchainService';
import { droneService } from '@/services/droneService';

interface VerificationRecord {
  id: string;
  projectId: string;
  projectName: string;
  organizationName: string;
  verificationDate: string;
  verifier: string;
  verificationMethod: 'field_visit' | 'drone_survey' | 'satellite_imagery' | 'mobile_data' | 'hybrid';
  dataTypes: Array<'plantation' | 'monitoring' | 'restoration' | 'carbon_calculation'>;
  status: 'pending' | 'in_progress' | 'verified' | 'rejected' | 'requires_additional_data';
  confidenceScore: number;
  evidenceItems: Array<{
    type: 'photograph' | 'drone_imagery' | 'field_measurement' | 'document' | 'gps_data' | 'satellite' | 'mobile_data';
    description: string;
    url: string;
    timestamp: string;
    verified: boolean;
  }>;
  findings: {
    carbonSequestrationRate: number;
    areaVerified: number;
    biomassEstimate: number;
    speciesVerification: string[];
    complianceIssues: string[];
    recommendations: string[];
  };
  carbonCreditsRecommended: number;
  blockchainHash?: string;
  immutableRecord: boolean;
  complianceIssues: string[];
}

interface MRVMetrics {
  totalVerifications: number;
  pendingVerifications: number;
  verificationBacklog: number;
  averageVerificationTime: number; // days
  verificationAccuracy: number; // percentage
  totalCarbonCredited: number;
  blockedCredits: number;
  dataQualityScore: number;
  automationLevel: number; // percentage
}

interface QualityAssessment {
  dataCompleteness: number;
  temporalConsistency: number;
  spatialAccuracy: number;
  methodologicalCompliance: number;
  evidenceQuality: number;
  overallQuality: number;
}

export const MRVVerificationDashboard: React.FC = () => {
  const [verificationRecords, setVerificationRecords] = useState<VerificationRecord[]>([]);
  const [mrvMetrics, setMRVMetrics] = useState<MRVMetrics>({
    totalVerifications: 156,
    pendingVerifications: 23,
    verificationBacklog: 8,
    averageVerificationTime: 12.5,
    verificationAccuracy: 94.2,
    totalCarbonCredited: 245600,
    blockedCredits: 12400,
    dataQualityScore: 91.5,
    automationLevel: 78.5
  });

  const [selectedRecord, setSelectedRecord] = useState<VerificationRecord | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Demo verification records
  useEffect(() => {
    const demoRecords: VerificationRecord[] = [
      {
        id: 'ver-001',
        projectId: 'proj-1',
        projectName: 'Sundarbans Mangrove Restoration',
        organizationName: 'West Bengal Forest Department',
        verificationDate: '2025-01-15T00:00:00Z',
        verifier: 'Quality Council of India',
        verificationMethod: 'hybrid',
        dataTypes: ['plantation', 'monitoring', 'carbon_calculation'],
        status: 'verified',
        confidenceScore: 94,
        evidenceItems: [
          {
            type: 'drone_imagery',
            description: '45 aerial photographs showing mangrove coverage',
            url: 'ipfs://QmX1eVtZy9rQ3mP4nL8kJ6wT2cV5bN7x',
            timestamp: '2025-01-10T10:30:00Z',
            verified: true
          },
          {
            type: 'field_measurement',
            description: 'Field measurements from 25 sample plots',
            url: 'ipfs://QmY2fWuAz0sR4oQ5oM9lK7xU3dW6cO8y',
            timestamp: '2025-01-08T14:20:00Z',
            verified: true
          },
          {
            type: 'photograph',
            description: 'Ground truth photographs of plantation sites',
            url: 'ipfs://QmZ3gXvBy1tS5pR6pN0mL8yV4eX7dP9z',
            timestamp: '2025-01-08T16:45:00Z',
            verified: true
          }
        ],
        findings: {
          carbonSequestrationRate: 18.5,
          areaVerified: 450.2,
          biomassEstimate: 42.3,
          speciesVerification: ['Rhizophora mucronata', 'Avicennia marina', 'Sonneratia apetala'],
          complianceIssues: [],
          recommendations: ['Continue monitoring', 'Expand plantation to adjacent areas']
        },
        carbonCreditsRecommended: 25600,
        blockchainHash: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
        immutableRecord: true,
        complianceIssues: []
      },
      {
        id: 'ver-002',
        projectId: 'proj-3',
        projectName: 'Chilika Lake Seagrass Conservation',
        organizationName: 'Chilika Development Authority',
        verificationDate: '2025-01-12T00:00:00Z',
        verifier: 'Indian Institute of Science',
        verificationMethod: 'satellite_imagery',
        dataTypes: ['monitoring', 'restoration'],
        status: 'requires_additional_data',
        confidenceScore: 76,
        evidenceItems: [
          {
            type: 'satellite',
            description: 'Satellite imagery analysis from last 6 months',
            url: 'https://storage.googleapis.com/satellite-data/chilika-analysis-2025',
            timestamp: '2025-01-05T12:00:00Z',
            verified: true
          },
          {
            type: 'field_measurement',
            description: 'Incomplete field measurements - missing water quality data',
            url: 'ipfs://QmA4bC5dE6fG7hI8jK9lM0nO1pQ2rS3tU4vW5xY6zA7bC',
            timestamp: '2024-12-28T11:15:00Z',
            verified: false
          }
        ],
        findings: {
          carbonSequestrationRate: 12.8,
          areaVerified: 280.5,
          biomassEstimate: 28.7,
          speciesVerification: ['Zostera marina', 'Halophila ovalis'],
          complianceIssues: ['Incomplete water quality monitoring', 'Missing biodiversity assessment'],
          recommendations: ['Complete missing measurements', 'Enhance monitoring protocol']
        },
        carbonCreditsRecommended: 0,
        immutableRecord: false,
        complianceIssues: ['Incomplete water quality monitoring', 'Missing biodiversity assessment']
      },
      {
        id: 'ver-003',
        projectId: 'proj-2',
        projectName: 'Mahanadi Delta Blue Carbon Project',
        organizationName: 'Odisha Wetland Authority',
        verificationDate: '2025-01-18T00:00:00Z',
        verifier: 'National Institute of Oceanography',
        verificationMethod: 'mobile_data',
        dataTypes: ['plantation', 'monitoring'],
        status: 'in_progress',
        confidenceScore: 0,
        evidenceItems: [
          {
            type: 'mobile_data',
            description: 'Mobile app data from field officers',
            url: 'mobile://field-data-batch-001',
            timestamp: '2025-01-16T09:30:00Z',
            verified: false
          }
        ],
        findings: {
          carbonSequestrationRate: 0,
          areaVerified: 0,
          biomassEstimate: 0,
          speciesVerification: [],
          complianceIssues: [],
          recommendations: []
        },
        carbonCreditsRecommended: 0,
        immutableRecord: false,
        complianceIssues: []
      }
    ];

    setVerificationRecords(demoRecords);
  }, []);

  const getStatusColor = (status: VerificationRecord['status']) => {
    switch (status) {
      case 'verified': return 'text-green-600 bg-green-50';
      case 'in_progress': return 'text-blue-600 bg-blue-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      case 'requires_additional_data': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: VerificationRecord['status']) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-4 w-4" />;
      case 'in_progress': return <Clock className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'requires_additional_data': return <AlertTriangle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getMethodIcon = (method: VerificationRecord['verificationMethod']) => {
    switch (method) {
      case 'field_visit': return <Users className="h-4 w-4" />;
      case 'drone_survey': return <Plane className="h-4 w-4" />;
      case 'satellite_imagery': return <Satellite className="h-4 w-4" />;
      case 'mobile_data': return <Smartphone className="h-4 w-4" />;
      case 'hybrid': return <Globe className="h-4 w-4" />;
      default: return <Eye className="h-4 w-4" />;
    }
  };

  const calculateQualityAssessment = (record: VerificationRecord): QualityAssessment => {
    // Simulate quality assessment calculation
    return {
      dataCompleteness: record.evidenceItems.length >= 3 ? 95 : 60,
      temporalConsistency: record.status === 'verified' ? 92 : 75,
      spatialAccuracy: record.verificationMethod === 'hybrid' ? 96 : 85,
      methodologicalCompliance: record.complianceIssues.length === 0 ? 98 : 70,
      evidenceQuality: record.evidenceItems.filter(e => e.verified).length / record.evidenceItems.length * 100,
      overallQuality: record.confidenceScore
    };
  };

  const handleVerifyRecord = async (recordId: string) => {
    const record = verificationRecords.find(r => r.id === recordId);
    if (!record) return;

    // Simulate verification process
    const updatedRecord = {
      ...record,
      status: 'verified' as const,
      confidenceScore: 95,
      blockchainHash: await blockchainService.addMonitoringData({
        id: `monitoring-${recordId}`,
        projectId: record.projectId,
        recordDate: new Date().toISOString(),
        measurements: {
          biomass: record.findings.biomassEstimate,
          carbonStock: record.findings.carbonSequestrationRate,
          canopyCover: 85,
          speciesDiversity: 2.8,
          waterQuality: { ph: 7.8, salinity: 28, turbidity: 15 },
          soilHealth: { organicCarbon: 3.2, nitrogen: 0.8, phosphorus: 0.15 }
        },
        dataSource: { type: 'manual', accuracy: 95 },
        verification: { status: 'verified', confidenceScore: 95 },
        immutableHash: ''
      }),
      immutableRecord: true
    };

    setVerificationRecords(prev => 
      prev.map(r => r.id === recordId ? updatedRecord : r)
    );

    // Mint carbon credits
    if (updatedRecord.carbonCreditsRecommended > 0) {
      await blockchainService.mintCarbonCredits(
        record.projectId,
        updatedRecord.carbonCreditsRecommended,
        {
          ecosystemType: 'mangrove',
          methodology: 'VM0007',
          verifier: record.verifier,
          gpsCoordinates: { lat: 21.9497, lng: 88.7500 },
          evidenceHash: record.evidenceItems[0]?.url || ''
        }
      );
    }
  };

  const handleRejectRecord = (recordId: string, reason: string) => {
    setVerificationRecords(prev => 
      prev.map(r => r.id === recordId ? {
        ...r,
        status: 'rejected' as const,
        findings: {
          ...r.findings,
          complianceIssues: [...r.findings.complianceIssues, reason]
        }
      } : r)
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">MRV Verification Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitoring, Reporting & Verification System</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Verifications</p>
                <p className="text-2xl font-bold text-gray-900">{mrvMetrics.totalVerifications}</p>
                <p className="text-xs text-green-600 mt-1">
                  +8 this month
                </p>
              </div>
              <CheckSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Verification Accuracy</p>
                <p className="text-2xl font-bold text-gray-900">{mrvMetrics.verificationAccuracy}%</p>
                <p className="text-xs text-green-600 mt-1">
                  +1.2% improvement
                </p>
              </div>
              <Award className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Carbon Credits Issued</p>
                <p className="text-2xl font-bold text-gray-900">{mrvMetrics.totalCarbonCredited.toLocaleString()}</p>
                <p className="text-xs text-blue-600 mt-1">
                  tCO2 equivalent
                </p>
              </div>
              <Coins className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                <p className="text-2xl font-bold text-gray-900">{mrvMetrics.pendingVerifications}</p>
                <p className="text-xs text-orange-600 mt-1">
                  Requires attention
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="verification">
            Verification Queue
            {mrvMetrics.pendingVerifications > 0 && (
              <Badge variant="destructive" className="ml-2">
                {mrvMetrics.pendingVerifications}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="quality">Quality Assessment</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain Records</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* System Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Verification Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Average Processing Time</span>
                  <div className="text-right">
                    <div className="text-lg font-bold">{mrvMetrics.averageVerificationTime} days</div>
                    <div className="text-xs text-green-600">-2.1 days improvement</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Data Quality Score</span>
                  <div className="text-right">
                    <div className="text-lg font-bold">{mrvMetrics.dataQualityScore}%</div>
                    <Progress value={mrvMetrics.dataQualityScore} className="w-20 mt-1" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Automation Level</span>
                  <div className="text-right">
                    <div className="text-lg font-bold">{mrvMetrics.automationLevel}%</div>
                    <Progress value={mrvMetrics.automationLevel} className="w-20 mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5" />
                  <span>Verification Methods</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Plane className="h-4 w-4" />
                    <span className="text-sm">Drone Survey</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={45} className="w-20" />
                    <span className="text-sm font-medium">45%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4" />
                    <span className="text-sm">Hybrid Method</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={30} className="w-20" />
                    <span className="text-sm font-medium">30%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">Field Visit</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={15} className="w-20" />
                    <span className="text-sm font-medium">15%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="h-4 w-4" />
                    <span className="text-sm">Mobile Data</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={10} className="w-20" />
                    <span className="text-sm font-medium">10%</span>
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
                <span>Recent Verification Activities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {verificationRecords.slice(0, 5).map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getMethodIcon(record.verificationMethod)}
                        <Badge className={getStatusColor(record.status)}>
                          {getStatusIcon(record.status)}
                          <span className="ml-1">{record.status.replace('_', ' ').toUpperCase()}</span>
                        </Badge>
                      </div>
                      <div>
                        <div className="font-medium">{record.projectName}</div>
                        <div className="text-sm text-gray-600">{record.organizationName}</div>
                        <div className="text-xs text-gray-500">
                          Verified by {record.verifier} • {new Date(record.verificationDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {record.status === 'verified' && (
                        <div className="text-sm">
                          <div className="font-medium text-green-600">
                            {record.carbonCreditsRecommended.toLocaleString()} tCO2
                          </div>
                          <div className="text-xs text-gray-500">Credits Issued</div>
                        </div>
                      )}
                      {record.status === 'requires_additional_data' && (
                        <div className="text-sm">
                          <div className="font-medium text-orange-600">Action Required</div>
                          <div className="text-xs text-gray-500">Missing Data</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckSquare className="h-5 w-5" />
                <span>Verification Queue</span>
              </CardTitle>
              <CardDescription>
                Review and verify project data for carbon credit issuance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {verificationRecords.map((record) => (
                  <div key={record.id} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold">{record.projectName}</h3>
                          <Badge className={getStatusColor(record.status)}>
                            {getStatusIcon(record.status)}
                            <span className="ml-1">{record.status.replace('_', ' ').toUpperCase()}</span>
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          {record.organizationName} • Verified by {record.verifier}
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center space-x-1">
                            {getMethodIcon(record.verificationMethod)}
                            <span>{record.verificationMethod.replace('_', ' ')}</span>
                          </span>
                          <span>{new Date(record.verificationDate).toLocaleDateString()}</span>
                          <span>{record.evidenceItems.length} evidence items</span>
                        </div>
                      </div>
                      {record.status === 'verified' && (
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">
                            {record.confidenceScore}%
                          </div>
                          <div className="text-xs text-gray-500">Confidence</div>
                        </div>
                      )}
                    </div>

                    {/* Evidence Items */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      {record.evidenceItems.map((evidence, index) => (
                        <div key={index} className="border rounded p-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className={`w-2 h-2 rounded-full ${evidence.verified ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                            <span className="text-sm font-medium capitalize">{evidence.type.replace('_', ' ')}</span>
                          </div>
                          <div className="text-xs text-gray-600 mb-2">{evidence.description}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(evidence.timestamp).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Findings Summary */}
                    {record.findings.carbonSequestrationRate > 0 && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h4 className="font-medium mb-2">Verification Findings</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-gray-600">Carbon Rate</div>
                            <div className="font-medium">{record.findings.carbonSequestrationRate} tCO2/ha/yr</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Area Verified</div>
                            <div className="font-medium">{record.findings.areaVerified} ha</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Biomass Estimate</div>
                            <div className="font-medium">{record.findings.biomassEstimate} t/ha</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Credits Recommended</div>
                            <div className="font-medium text-green-600">{record.carbonCreditsRecommended} tCO2</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Compliance Issues */}
                    {record.findings.complianceIssues.length > 0 && (
                      <Alert className="mb-4">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Compliance Issues</AlertTitle>
                        <AlertDescription>
                          <ul className="list-disc list-inside space-y-1 mt-2">
                            {record.findings.complianceIssues.map((issue, index) => (
                              <li key={index} className="text-sm">{issue}</li>
                            ))}
                          </ul>
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Actions */}
                    <div className="flex space-x-2">
                      {record.status === 'pending' || record.status === 'in_progress' ? (
                        <>
                          <Button 
                            size="sm" 
                            onClick={() => handleVerifyRecord(record.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verify & Issue Credits
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleRejectRecord(record.id, 'Failed verification criteria')}
                          >
                            <XCircle className="h-3 w-3 mr-1" />
                            Reject
                          </Button>
                        </>
                      ) : record.status === 'requires_additional_data' ? (
                        <Button size="sm" variant="outline">
                          <Upload className="h-3 w-3 mr-1" />
                          Request Additional Data
                        </Button>
                      ) : null}
                      
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                      
                      {record.blockchainHash && (
                        <Button size="sm" variant="outline">
                          <Lock className="h-3 w-3 mr-1" />
                          View Blockchain Record
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Data Quality Assessment</span>
              </CardTitle>
              <CardDescription>
                Comprehensive quality analysis of verification data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {verificationRecords.filter(r => r.status !== 'pending').map((record) => {
                  const quality = calculateQualityAssessment(record);
                  return (
                    <div key={record.id} className="border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{record.projectName}</h3>
                          <div className="text-sm text-gray-600">{record.organizationName}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{quality.overallQuality}%</div>
                          <div className="text-xs text-gray-500">Overall Quality</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <div className="text-sm font-medium mb-2">Data Completeness</div>
                          <Progress value={quality.dataCompleteness} className="mb-1" />
                          <div className="text-xs text-gray-600">{quality.dataCompleteness}%</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium mb-2">Temporal Consistency</div>
                          <Progress value={quality.temporalConsistency} className="mb-1" />
                          <div className="text-xs text-gray-600">{quality.temporalConsistency}%</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium mb-2">Spatial Accuracy</div>
                          <Progress value={quality.spatialAccuracy} className="mb-1" />
                          <div className="text-xs text-gray-600">{quality.spatialAccuracy}%</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium mb-2">Methodological Compliance</div>
                          <Progress value={quality.methodologicalCompliance} className="mb-1" />
                          <div className="text-xs text-gray-600">{quality.methodologicalCompliance}%</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium mb-2">Evidence Quality</div>
                          <Progress value={quality.evidenceQuality} className="mb-1" />
                          <div className="text-xs text-gray-600">{quality.evidenceQuality.toFixed(1)}%</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blockchain" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Blockchain Records</span>
              </CardTitle>
              <CardDescription>
                Immutable verification records on the blockchain
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {verificationRecords
                  .filter(record => record.immutableRecord)
                  .map((record) => (
                    <div key={record.id} className="border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{record.projectName}</h3>
                          <div className="text-sm text-gray-600">{record.organizationName}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Lock className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-green-600">Immutable</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-gray-600">Blockchain Hash</div>
                            <div className="font-mono text-xs">{record.blockchainHash}</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Verification Date</div>
                            <div className="font-medium">{new Date(record.verificationDate).toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Credits Issued</div>
                            <div className="font-medium text-green-600">{record.carbonCreditsRecommended} tCO2</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Confidence Score</div>
                            <div className="font-medium">{record.confidenceScore}%</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          View on Explorer
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          Download Certificate
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MRVVerificationDashboard;