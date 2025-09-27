import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatCard } from '@/components/ui/stat-card';
import { SimpleChart } from '@/components/ui/simple-chart';
import { 
  Satellite, 
  Database, 
  Activity, 
  Upload,
  Download,
  RefreshCw,
  Calendar,
  MapPin,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const satelliteData = [
  { date: '2024-01-01', ndvi: 0.75, evi: 0.68, biomass: 142 },
  { date: '2024-01-08', ndvi: 0.78, evi: 0.71, biomass: 148 },
  { date: '2024-01-15', ndvi: 0.82, evi: 0.74, biomass: 156 },
  { date: '2024-01-22', ndvi: 0.85, evi: 0.77, biomass: 162 },
  { date: '2024-01-29', ndvi: 0.83, evi: 0.75, biomass: 159 },
];

const dataSourcesStatus = [
  { name: 'Landsat-8/9', status: 'active', lastUpdate: '2 hours ago', coverage: '98%' },
  { name: 'Sentinel-2 MSI', status: 'active', lastUpdate: '4 hours ago', coverage: '95%' },
  { name: 'Sentinel-1 SAR', status: 'warning', lastUpdate: '1 day ago', coverage: '87%' },
  { name: 'MODIS', status: 'active', lastUpdate: '6 hours ago', coverage: '100%' },
  { name: 'ICESat-2 LiDAR', status: 'pending', lastUpdate: '3 days ago', coverage: '45%' },
  { name: 'SMAP Soil Moisture', status: 'active', lastUpdate: '8 hours ago', coverage: '92%' },
];

const fieldDataEntries = [
  { id: 1, site: 'Mangrove Site Alpha', type: 'Biomass Measurement', value: '156 t/ha', date: '2024-01-15', status: 'verified' },
  { id: 2, site: 'Seagrass Area Beta', type: 'Carbon Stock', value: '89 tC/ha', date: '2024-01-14', status: 'pending' },
  { id: 3, site: 'Salt Marsh Gamma', type: 'Species Count', value: '23 species', date: '2024-01-13', status: 'verified' },
  { id: 4, site: 'Mangrove Site Alpha', type: 'Water Quality', value: 'pH 7.8', date: '2024-01-12', status: 'verified' },
];

const Monitoring: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-forest text-white';
      case 'warning': return 'bg-yellow-500 text-white';
      case 'pending': return 'bg-orange-500 text-white';
      case 'error': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Monitoring & Data</h1>
          <p className="text-muted-foreground">
            Real-time satellite monitoring and field data collection
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
          <Button className="bg-ocean hover:bg-ocean-dark">
            <Upload className="w-4 h-4 mr-2" />
            Upload Field Data
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="Data Points Collected"
          value="12,458"
          subtitle="this month"
          icon={<Database />}
          trend={{ value: 23.1, label: 'vs last month' }}
          variant="ocean"
        />
        <StatCard
          title="Satellite Passes"
          value="89"
          subtitle="this week"
          icon={<Satellite />}
          trend={{ value: 5.2, label: 'vs last week' }}
          variant="forest"
        />
        <StatCard
          title="Field Surveys"
          value="24"
          subtitle="completed"
          icon={<Activity />}
          trend={{ value: 12, label: 'vs last month' }}
          variant="carbon"
        />
        <StatCard
          title="Data Quality"
          value="96.8%"
          subtitle="accuracy rate"
          icon={<CheckCircle />}
          trend={{ value: 2.1, label: 'improvement' }}
          variant="forest"
        />
      </div>

      {/* Main Content */}
      <Tabs defaultValue="satellite" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="satellite">Satellite Data</TabsTrigger>
          <TabsTrigger value="field">Field Data</TabsTrigger>
          <TabsTrigger value="sources">Data Sources</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="satellite" className="space-y-6">
          {/* Satellite Metrics Charts */}
          <div className="grid gap-6 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">NDVI Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <SimpleChart
                  data={satelliteData}
                  xKey="date"
                  yKey="ndvi"
                  type="line"
                  color="hsl(var(--forest-green))"
                  className="h-48"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">EVI Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <SimpleChart
                  data={satelliteData}
                  xKey="date"
                  yKey="evi"
                  type="line"
                  color="hsl(var(--ocean-blue))"
                  className="h-48"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Biomass Estimation</CardTitle>
              </CardHeader>
              <CardContent>
                <SimpleChart
                  data={satelliteData}
                  xKey="date"
                  yKey="biomass"
                  type="area"
                  color="hsl(var(--forest-green))"
                  className="h-48"
                />
              </CardContent>
            </Card>
          </div>

          {/* Recent Satellite Data */}
          <Card>
            <CardHeader>
              <CardTitle>Latest Satellite Observations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {satelliteData.slice(-3).map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-ocean/10 flex items-center justify-center">
                        <Satellite className="w-5 h-5 text-ocean" />
                      </div>
                      <div>
                        <p className="font-medium">Observation Date: {entry.date}</p>
                        <p className="text-sm text-muted-foreground">Multi-spectral analysis complete</p>
                      </div>
                    </div>
                    <div className="flex gap-6 text-sm">
                      <div className="text-center">
                        <p className="text-muted-foreground">NDVI</p>
                        <p className="font-semibold text-forest">{entry.ndvi}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">EVI</p>
                        <p className="font-semibold text-ocean">{entry.evi}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">Biomass</p>
                        <p className="font-semibold">{entry.biomass} t/ha</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="field" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Field Data Entries</CardTitle>
              <Button size="sm" className="bg-forest hover:bg-forest-dark">
                <Upload className="w-4 h-4 mr-2" />
                Add Entry
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fieldDataEntries.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-forest/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-forest" />
                      </div>
                      <div>
                        <p className="font-medium">{entry.type}</p>
                        <p className="text-sm text-muted-foreground">{entry.site}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="font-semibold">{entry.value}</p>
                        <p className="text-sm text-muted-foreground">{entry.date}</p>
                      </div>
                      <Badge className={getStatusColor(entry.status)}>
                        {entry.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Source Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {dataSourcesStatus.map((source, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${
                        source.status === 'active' ? 'bg-forest' :
                        source.status === 'warning' ? 'bg-yellow-500' :
                        source.status === 'pending' ? 'bg-orange-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <p className="font-medium">{source.name}</p>
                        <p className="text-sm text-muted-foreground">Updated {source.lastUpdate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{source.coverage}</p>
                      <p className="text-sm text-muted-foreground">Coverage</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Data Quality Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Satellite Data Accuracy</span>
                    <span className="font-semibold text-forest">98.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Field Data Completeness</span>
                    <span className="font-semibold text-ocean">94.7%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Temporal Coverage</span>
                    <span className="font-semibold">91.3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Spatial Resolution</span>
                    <span className="font-semibold text-forest">10m-30m</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Processing Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Images Processed</span>
                    <span className="font-semibold">2,847</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Analysis Runtime</span>
                    <span className="font-semibold text-ocean">4.2 min avg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Storage Used</span>
                    <span className="font-semibold">847 GB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>API Calls</span>
                    <span className="font-semibold text-forest">15,693</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Monitoring;