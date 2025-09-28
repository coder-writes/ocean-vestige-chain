import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MapComponent from '@/components/MapComponent';
import GoogleMapComponent from '@/components/GoogleMapComponent';
import { useProjects } from '@/contexts/ProjectContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Map as MapIcon, 
  Satellite, 
  Layers, 
  Settings,
  Info,
  Download,
  Share,
  Filter
} from 'lucide-react';

const MapDemo: React.FC = () => {
  const { projects } = useProjects();
  const { toast } = useToast();
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [mapView, setMapView] = useState<'full' | 'dashboard' | 'projects'>('full');

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

  const handleProjectClick = (projectId: string) => {
    setSelectedProject(projectId);
    const project = projects.find(p => p.id === projectId);
    toast({
      title: "Project Selected",
      description: `Selected: ${project?.name || projectId}`,
    });
  };

  const exportMapData = () => {
    const data = {
      projects: mapProjects,
      timestamp: new Date().toISOString(),
      totalProjects: projects.length,
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'blue-carbon-projects-map-data.json';
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Map Data Exported",
      description: "Project data has been downloaded as JSON",
    });
  };

  const shareMap = () => {
    const shareData = {
      title: 'EcoSangam Blue Carbon Projects Map',
      text: `View ${projects.length} blue carbon restoration projects on our interactive map`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(shareData.url);
      toast({
        title: "Map Link Copied",
        description: "Share link copied to clipboard",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <MapIcon className="w-8 h-8 text-ocean" />
            Google Maps Explorer
          </h1>
          <p className="text-muted-foreground">
            Explore blue carbon projects with real satellite imagery and interactive Google Maps
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportMapData}>
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" onClick={shareMap}>
            <Share className="w-4 h-4 mr-2" />
            Share Map
          </Button>
          <Button className="bg-ocean hover:bg-ocean-dark">
            <Settings className="w-4 h-4 mr-2" />
            Map Settings
          </Button>
        </div>
      </div>

      {/* Map Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MapIcon className="w-5 h-5 text-ocean" />
              <div>
                <p className="text-2xl font-bold">{projects.length}</p>
                <p className="text-sm text-muted-foreground">Total Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Satellite className="w-5 h-5 text-forest" />
              <div>
                <p className="text-2xl font-bold">{projects.filter(p => p.status === 'verified').length}</p>
                <p className="text-sm text-muted-foreground">Verified Sites</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{projects.reduce((sum, p) => sum + (p.area || 0), 0).toFixed(1)}</p>
                <p className="text-sm text-muted-foreground">Total Area (ha)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{projects.reduce((sum, p) => sum + (p.credits || 0), 0).toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Credits</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Map Section */}
      <Tabs value={mapView} onValueChange={(value) => setMapView(value as 'full' | 'dashboard' | 'projects')} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="full">Full Map View</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard Style</TabsTrigger>
          <TabsTrigger value="projects">Projects Style</TabsTrigger>
        </TabsList>

        <TabsContent value="full" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapIcon className="w-5 h-5 text-ocean" />
                Google Maps - Blue Carbon Projects
                <Badge variant="outline" className="ml-auto">
                  {projects.length} Projects
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[600px] relative">
                <GoogleMapComponent 
                  projects={mapProjects}
                  onProjectClick={handleProjectClick}
                  selectedProject={selectedProject}
                  showControls={true}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Google Maps View</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[400px] relative">
                <GoogleMapComponent 
                  projects={mapProjects}
                  onProjectClick={handleProjectClick}
                  selectedProject={selectedProject}
                  showControls={true}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Projects Google Maps View</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[500px] relative">
                <GoogleMapComponent 
                  projects={mapProjects}
                  onProjectClick={handleProjectClick}
                  selectedProject={selectedProject}
                  showControls={true}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Map Features Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5 text-ocean" />
            Map Features & Functionality
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-3">Google Maps Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✅ Real Google Maps with satellite imagery</li>
                <li>✅ Interactive project markers with info windows</li>
                <li>✅ Project area visualization with circles</li>
                <li>✅ Carbon credit density heatmap</li>
                <li>✅ Multiple map types (Satellite, Hybrid, Terrain)</li>
                <li>✅ Zoom controls and full map navigation</li>
                <li>✅ Fit to projects functionality</li>
                <li>✅ Street View integration</li>
                <li>✅ Drawing and measurement tools</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Map Types Available</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><span className="font-medium text-blue-600">Satellite:</span> High-resolution satellite imagery</li>
                <li><span className="font-medium text-green-600">Hybrid:</span> Satellite with labels and roads</li>
                <li><span className="font-medium text-purple-600">Terrain:</span> Topographical terrain view</li>
                <li><span className="font-medium text-orange-600">Roadmap:</span> Standard street map</li>
              </ul>
              
              <h4 className="font-semibold mb-3 mt-4">Project Visualization</h4>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-500 text-white">Verified Sites</Badge>
                <Badge className="bg-blue-500 text-white">Active Projects</Badge>
                <Badge className="bg-yellow-500 text-white">Pending Review</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Project Info */}
      {selectedProject && (
        <Card>
          <CardHeader>
            <CardTitle>Selected Project Details</CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const project = projects.find(p => p.id === selectedProject);
              if (!project) return <p>Project not found</p>;
              
              return (
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-2">{project.name}</h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Location:</span> {project.location}</p>
                      <p><span className="font-medium">Type:</span> {project.type}</p>
                      <p><span className="font-medium">Area:</span> {project.area} ha</p>
                      <p><span className="font-medium">Status:</span> 
                        <Badge className={`ml-2 ${
                          project.status === 'verified' ? 'bg-forest text-white' :
                          project.status === 'active' ? 'bg-ocean text-white' : 
                          'bg-yellow-500 text-white'
                        }`}>
                          {project.status}
                        </Badge>
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Project Metrics</h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Credits Generated:</span> {project.credits?.toLocaleString() || 0} tCO₂e</p>
                      <p><span className="font-medium">Estimated Credits:</span> {project.estimatedCredits?.toLocaleString() || 0} tCO₂e</p>
                      <p><span className="font-medium">Budget:</span> ${project.budget?.toLocaleString() || 0}</p>
                      <p><span className="font-medium">Methodology:</span> {project.methodology?.toUpperCase() || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MapDemo;