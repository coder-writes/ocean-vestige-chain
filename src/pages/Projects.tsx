import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { StatCard } from '@/components/ui/stat-card';
import MapComponent from '@/components/MapComponent';
import { 
  Search, 
  Filter, 
  Plus, 
  MapPin, 
  Calendar,
  Leaf,
  TrendingUp,
  Shield,
  Eye,
  Edit,
  MoreHorizontal
} from 'lucide-react';

const mockProjects = [
  {
    id: '1',
    name: 'Mangrove Restoration Site Alpha',
    location: 'Florida Keys, USA',
    coordinates: [-81.5, 24.7] as [number, number],
    area: '45.2 ha',
    status: 'verified' as const,
    credits: 1250,
    ndvi: 0.85,
    startDate: '2023-06-15',
    lastUpdate: '2024-01-15',
    description: 'Large-scale mangrove restoration in critical coastal protection area'
  },
  {
    id: '2',
    name: 'Seagrass Conservation Project Beta',
    location: 'Chesapeake Bay, USA',
    coordinates: [-76.2, 38.9] as [number, number],
    area: '67.8 ha',
    status: 'active' as const,
    credits: 890,
    ndvi: 0.78,
    startDate: '2023-08-20',
    lastUpdate: '2024-01-10',
    description: 'Seagrass meadow restoration and protection initiative'
  },
  {
    id: '3',
    name: 'Salt Marsh Protection Gamma',
    location: 'San Francisco Bay, USA',
    coordinates: [-122.3, 37.8] as [number, number],
    area: '32.1 ha',
    status: 'pending' as const,
    credits: 0,
    ndvi: 0.72,
    startDate: '2024-01-05',
    lastUpdate: '2024-01-12',
    description: 'New salt marsh restoration project awaiting verification'
  },
];

const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'verified' | 'active' | 'pending'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-forest text-white';
      case 'active': return 'bg-ocean text-white';
      case 'pending': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const totalCredits = mockProjects.reduce((sum, project) => sum + project.credits, 0);
  const totalArea = mockProjects.reduce((sum, project) => sum + parseFloat(project.area), 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage your blue carbon restoration and conservation projects
          </p>
        </div>
        <Button className="bg-ocean hover:bg-ocean-dark">
          <Plus className="w-4 h-4 mr-2" />
          Create New Project
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="Total Projects"
          value={mockProjects.length}
          subtitle="restoration sites"
          icon={<MapPin />}
          variant="ocean"
        />
        <StatCard
          title="Total Area"
          value={`${totalArea.toFixed(1)} ha`}
          subtitle="under management"
          icon={<Leaf />}
          variant="forest"
        />
        <StatCard
          title="Carbon Credits"
          value={totalCredits.toLocaleString()}
          subtitle="tCO₂e generated"
          icon={<TrendingUp />}
          variant="carbon"
        />
        <StatCard
          title="Verified Projects"
          value={mockProjects.filter(p => p.status === 'verified').length}
          subtitle="certified sites"
          icon={<Shield />}
          variant="forest"
        />
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search projects by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {['all', 'verified', 'active', 'pending'].map((status) => (
                <Button
                  key={status}
                  variant={selectedStatus === status ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedStatus(status as any)}
                  className={selectedStatus === status ? 'bg-ocean hover:bg-ocean-dark' : ''}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-ocean hover:bg-ocean-dark' : ''}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('map')}
                className={viewMode === 'map' ? 'bg-ocean hover:bg-ocean-dark' : ''}
              >
                Map
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      {viewMode === 'map' ? (
        <Card>
          <CardContent className="p-0">
            <div className="h-[600px]">
              <MapComponent projects={filteredProjects} />
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{project.name}</CardTitle>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {project.location}
                    </p>
                  </div>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Area</p>
                    <p className="font-semibold">{project.area}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">NDVI</p>
                    <p className="font-semibold text-forest">{project.ndvi}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Credits</p>
                    <p className="font-semibold text-ocean">{project.credits} tCO₂e</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Started</p>
                    <p className="font-semibold">{new Date(project.startDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredProjects.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || selectedStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by creating your first blue carbon project'
              }
            </p>
            <Button className="bg-ocean hover:bg-ocean-dark">
              <Plus className="w-4 h-4 mr-2" />
              Create New Project
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Projects;