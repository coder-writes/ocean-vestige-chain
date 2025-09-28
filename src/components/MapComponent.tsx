import React, { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Layers, 
  Satellite, 
  Map as MapIcon, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  MapPin,
  Info,
  Ruler,
  Search,
  Filter,
  Download,
  Share
} from 'lucide-react';

interface MapComponentProps {
  className?: string;
  showControls?: boolean;
  onProjectClick?: (projectId: string) => void;
  selectedProject?: string;
  projects?: Array<{
    id: string;
    name: string;
    coordinates: [number, number];
    status: 'active' | 'verified' | 'pending';
    area?: number;
    type?: string;
    credits?: number;
    lastUpdate?: string;
  }>;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  className = '', 
  showControls = true,
  projects = [],
  onProjectClick,
  selectedProject
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [currentLayer, setCurrentLayer] = useState<'satellite' | 'ndvi' | 'carbon'>('satellite');
  const [selectedProjectInfo, setSelectedProjectInfo] = useState<{
    id: string;
    name: string;
    coordinates: [number, number];
    status: 'active' | 'verified' | 'pending';
    area?: number;
    type?: string;
    credits?: number;
    lastUpdate?: string;
  } | null>(null);
  const [isMapboxAvailable, setIsMapboxAvailable] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([-74.5, 40]);
  const [mapZoom, setMapZoom] = useState(9);
  const { toast } = useToast();

  // Create interactive map markers
  const createProjectMarkers = useCallback(() => {
    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    projects.forEach((project) => {
      const markerColor = project.status === 'verified' ? '#10b981' : 
                         project.status === 'active' ? '#3b82f6' : '#f59e0b';
      
      // Create custom marker element
      const markerElement = document.createElement('div');
      markerElement.className = `project-marker ${selectedProject === project.id ? 'selected' : ''}`;
      markerElement.style.cssText = `
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: ${markerColor};
        border: 3px solid white;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        transition: all 0.2s ease;
      `;
      
      if (selectedProject === project.id) {
        markerElement.style.transform = 'scale(1.5)';
        markerElement.style.zIndex = '1000';
      }

      // Create popup content
      const popupContent = `
        <div class="p-3 min-w-[200px]">
          <h3 class="font-bold text-lg mb-2">${project.name}</h3>
          <div class="space-y-1 text-sm">
            <p><span class="font-medium">Status:</span> <span class="capitalize">${project.status}</span></p>
            ${project.area ? `<p><span class="font-medium">Area:</span> ${project.area} ha</p>` : ''}
            ${project.type ? `<p><span class="font-medium">Type:</span> ${project.type}</p>` : ''}
            ${project.credits ? `<p><span class="font-medium">Credits:</span> ${project.credits} tCO₂e</p>` : ''}
            ${project.lastUpdate ? `<p><span class="font-medium">Updated:</span> ${new Date(project.lastUpdate).toLocaleDateString()}</p>` : ''}
          </div>
          <button 
            onclick="window.handleProjectClick?.('${project.id}')"
            class="mt-3 px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors"
          >
            View Details
          </button>
        </div>
      `;

      const marker = new mapboxgl.Marker({ element: markerElement })
        .setLngLat(project.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent));

      if (isMapboxAvailable) {
        marker.addTo(map.current!);
      }
      
      markersRef.current.push(marker);

      // Add click handler
      markerElement.addEventListener('click', () => {
        setSelectedProjectInfo(project);
        onProjectClick?.(project.id);
      });
    });
  }, [projects, selectedProject, isMapboxAvailable, onProjectClick]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;

    // Set up global click handler for popup buttons
    (window as Window & { handleProjectClick?: (projectId: string) => void }).handleProjectClick = (projectId: string) => {
      onProjectClick?.(projectId);
    };

    // Try to initialize Mapbox
    try {
      // Check if Mapbox token is available (you can set this in environment variables)
      const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN || 'pk.your-mapbox-token-here';
      
      if (mapboxToken && mapboxToken !== 'pk.your-mapbox-token-here') {
        mapboxgl.accessToken = mapboxToken;
        
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/satellite-v9',
          center: mapCenter,
          zoom: mapZoom,
          projection: 'globe',
        });

        // Add navigation controls
        if (showControls) {
          map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
          map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');
          map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-left');
        }

        map.current.on('load', () => {
          setMapLoaded(true);
          setIsMapboxAvailable(true);
          createProjectMarkers();
        });

        // Add click handler for map
        map.current.on('click', () => {
          setSelectedProjectInfo(null);
        });

        // Update center and zoom when map moves
        map.current.on('moveend', () => {
          if (map.current) {
            const center = map.current.getCenter();
            const zoom = map.current.getZoom();
            setMapCenter([center.lng, center.lat]);
            setMapZoom(zoom);
          }
        });

      } else {
        console.log('Mapbox token not provided - using interactive placeholder');
        setIsMapboxAvailable(false);
      }

    } catch (error) {
      console.log('Mapbox initialization failed - using placeholder');
      setIsMapboxAvailable(false);
    }

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      map.current?.remove();
      delete (window as Window & { handleProjectClick?: (projectId: string) => void }).handleProjectClick;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapCenter, mapZoom, showControls, onProjectClick]);

  // Update markers when projects change
  useEffect(() => {
    if (isMapboxAvailable && mapLoaded) {
      createProjectMarkers();
    }
  }, [projects, selectedProject, isMapboxAvailable, mapLoaded, createProjectMarkers]);

  const switchLayer = (layer: 'satellite' | 'ndvi' | 'carbon') => {
    setCurrentLayer(layer);
    
    if (map.current && isMapboxAvailable) {
      let style = 'mapbox://styles/mapbox/satellite-v9';
      if (layer === 'ndvi') {
        style = 'mapbox://styles/mapbox/light-v11';
      } else if (layer === 'carbon') {
        style = 'mapbox://styles/mapbox/dark-v11';
      }

      try {
        map.current.setStyle(style);
        
        // Re-add markers after style change
        map.current.once('styledata', () => {
          createProjectMarkers();
        });
      } catch (error) {
        console.log('Style switching requires Mapbox token');
      }
    } else {
      // Show toast for placeholder functionality
      toast({
        title: `Switched to ${layer.toUpperCase()} view`,
        description: "Connect Mapbox API for full functionality",
      });
    }
  };

  // Map control functions
  const zoomIn = () => {
    if (map.current && isMapboxAvailable) {
      map.current.zoomIn();
    } else {
      setMapZoom(prev => Math.min(prev + 1, 20));
      toast({ title: "Zoom In", description: `Zoom level: ${mapZoom + 1}` });
    }
  };

  const zoomOut = () => {
    if (map.current && isMapboxAvailable) {
      map.current.zoomOut();
    } else {
      setMapZoom(prev => Math.max(prev - 1, 1));
      toast({ title: "Zoom Out", description: `Zoom level: ${mapZoom - 1}` });
    }
  };

  const resetView = () => {
    const defaultCenter: [number, number] = [-74.5, 40];
    const defaultZoom = 9;
    
    if (map.current && isMapboxAvailable) {
      map.current.flyTo({ center: defaultCenter, zoom: defaultZoom });
    } else {
      setMapCenter(defaultCenter);
      setMapZoom(defaultZoom);
      toast({ title: "View Reset", description: "Returned to default view" });
    }
  };

  const fitToProjects = () => {
    if (projects.length === 0) return;

    if (map.current && isMapboxAvailable) {
      const bounds = new mapboxgl.LngLatBounds();
      projects.forEach(project => bounds.extend(project.coordinates));
      map.current.fitBounds(bounds, { padding: 50 });
    } else {
      toast({ 
        title: "Fit to Projects", 
        description: `Viewing ${projects.length} projects` 
      });
    }
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Map Container */}
      <div 
        ref={mapContainer} 
        className="absolute inset-0 rounded-lg overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--ocean-blue)), hsl(var(--forest-green)))',
          backgroundImage: `
            radial-gradient(circle at 25% 25%, hsl(var(--ocean-blue) / 0.3) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, hsl(var(--forest-green) / 0.3) 0%, transparent 50%)
          `
        }}
      >
        {/* Interactive Placeholder when no Mapbox token */}
        {!isMapboxAvailable && (
          <div className="absolute inset-0 flex flex-col">
            {/* Interactive Map Placeholder */}
            <div className="flex-1 relative">
              {/* Simulated map background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-green-50 to-blue-50">
                {/* Grid overlay to simulate map tiles */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                  }}
                />
                
                {/* Simulated project markers */}
                {projects.map((project, index) => {
                  const x = 20 + (index * 15) % 60; // Distribute across width
                  const y = 20 + (index * 12) % 60; // Distribute across height
                  const markerColor = project.status === 'verified' ? 'bg-forest' : 
                                     project.status === 'active' ? 'bg-ocean' : 'bg-yellow-500';
                  
                  return (
                    <div
                      key={project.id}
                      className={`absolute w-4 h-4 ${markerColor} rounded-full border-2 border-white shadow-lg cursor-pointer transform hover:scale-125 transition-all ${
                        selectedProject === project.id ? 'scale-150 ring-2 ring-blue-400' : ''
                      }`}
                      style={{ left: `${x}%`, top: `${y}%` }}
                      onClick={() => {
                        setSelectedProjectInfo(project);
                        onProjectClick?.(project.id);
                      }}
                      title={project.name}
                    />
                  );
                })}
                
                {/* Layer indicator overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-4xl font-bold text-white/10 select-none">
                    {currentLayer.toUpperCase()} VIEW
                  </div>
                </div>
              </div>
              
              {/* Map info overlay */}
              <div className="absolute top-4 right-4">
                <Card className="p-3 bg-white/95 backdrop-blur-sm text-xs">
                  <div className="text-center">
                    <MapIcon className="w-6 h-6 mx-auto mb-2 text-ocean" />
                    <p className="font-semibold">Interactive Demo</p>
                    <p className="text-muted-foreground">Zoom: {mapZoom}</p>
                    <p className="text-muted-foreground">Projects: {projects.length}</p>
                  </div>
                </Card>
              </div>
            </div>
            
            {/* Info banner */}
            <div className="bg-white/95 backdrop-blur-sm p-3 text-center border-t">
              <p className="text-sm text-muted-foreground">
                <strong>Demo Mode:</strong> Connect Mapbox API for satellite imagery and full functionality
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Controls */}
      {showControls && (
        <>
          {/* Layer Controls */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <Button
              variant={currentLayer === 'satellite' ? 'default' : 'outline'}
              size="sm"
              onClick={() => switchLayer('satellite')}
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              <Satellite className="w-4 h-4 mr-2" />
              Satellite
            </Button>
            <Button
              variant={currentLayer === 'ndvi' ? 'default' : 'outline'}
              size="sm"
              onClick={() => switchLayer('ndvi')}
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              <Layers className="w-4 h-4 mr-2" />
              NDVI
            </Button>
            <Button
              variant={currentLayer === 'carbon' ? 'default' : 'outline'}
              size="sm"
              onClick={() => switchLayer('carbon')}
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              <MapIcon className="w-4 h-4 mr-2" />
              Carbon
            </Button>
          </div>

          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={zoomIn}
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={zoomOut}
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetView}
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          {/* Additional Tools */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fitToProjects}
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              <Search className="w-4 h-4 mr-1" />
              Fit to Projects
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
              onClick={() => toast({ title: "Measurement Tool", description: "Feature available with Mapbox integration" })}
            >
              <Ruler className="w-4 h-4" />
            </Button>
          </div>
        </>
      )}

      {/* Enhanced Legend */}
      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 text-xs shadow-lg">
        <h4 className="font-semibold mb-2 flex items-center gap-1">
          <Info className="w-3 h-3" />
          Project Status
        </h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-forest border border-white shadow-sm"></div>
            <span>Verified ({projects.filter(p => p.status === 'verified').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-ocean border border-white shadow-sm"></div>
            <span>Active ({projects.filter(p => p.status === 'active').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500 border border-white shadow-sm"></div>
            <span>Pending ({projects.filter(p => p.status === 'pending').length})</span>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t">
          <p className="text-muted-foreground">Layer: {currentLayer.toUpperCase()}</p>
          <p className="text-muted-foreground">Zoom: {mapZoom}</p>
        </div>
      </div>

      {/* Project Info Panel */}
      {selectedProjectInfo && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <Card className="p-4 bg-white/95 backdrop-blur-sm shadow-xl max-w-sm">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-lg">{selectedProjectInfo.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedProjectInfo(null)}
                className="h-6 w-6 p-0"
              >
                ×
              </Button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge className={
                  selectedProjectInfo.status === 'verified' ? 'bg-forest text-white' :
                  selectedProjectInfo.status === 'active' ? 'bg-ocean text-white' : 
                  'bg-yellow-500 text-white'
                }>
                  {selectedProjectInfo.status}
                </Badge>
              </div>
              {selectedProjectInfo.area && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Area:</span>
                  <span>{selectedProjectInfo.area} ha</span>
                </div>
              )}
              {selectedProjectInfo.type && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span>{selectedProjectInfo.type}</span>
                </div>
              )}
              {selectedProjectInfo.credits && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Credits:</span>
                  <span className="font-medium text-forest">{selectedProjectInfo.credits} tCO₂e</span>
                </div>
              )}
            </div>
            <Button 
              className="w-full mt-3 bg-ocean hover:bg-ocean-dark"
              size="sm"
              onClick={() => onProjectClick?.(selectedProjectInfo.id)}
            >
              View Project Details
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MapComponent;