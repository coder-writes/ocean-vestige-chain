import React, { useState, useCallback, useEffect } from 'react';
import { 
  GoogleMap, 
  useJsApiLoader, 
  Marker, 
  InfoWindow,
  Circle,
  Polygon,
  HeatmapLayer
} from '@react-google-maps/api';
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
  Navigation,
  Thermometer,
  Activity
} from 'lucide-react';

// Google Maps API key - In production, this should be in environment variables
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyBFw0Qbyq9zTFTd-tUY6dQBJ8Nqb-3MQ0E'; // Demo key - replace with your own

const libraries: ("places" | "geometry" | "drawing" | "visualization")[] = ['places', 'geometry', 'drawing', 'visualization'];

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

// Major Blue Carbon Ecosystem Hotspots in India
const indianBlueCarbonHotspots = [
  {
    id: 'hotspot-1',
    name: 'Sundarbans Delta',
    coordinates: { lat: 21.9497, lng: 88.7500 },
    type: 'Mangrove Forest',
    area: '10,000 km²',
    description: 'World\'s largest mangrove forest, UNESCO World Heritage Site, critical tiger habitat',
    carbonStorage: '12.8 million tons CO2',
    biodiversity: 'Royal Bengal Tigers, Saltwater Crocodiles, 260+ bird species'
  },
  {
    id: 'hotspot-2',
    name: 'Gulf of Mannar',
    coordinates: { lat: 9.0648, lng: 79.1378 },
    type: 'Marine National Park',
    area: '560 km²',
    description: 'India\'s first Marine National Park with seagrass beds and coral reefs',
    carbonStorage: '2.1 million tons CO2',
    biodiversity: 'Dugongs, Sea Turtles, 117 coral species, 641 fish species'
  },
  {
    id: 'hotspot-3',
    name: 'Chilika Lake',
    coordinates: { lat: 19.7167, lng: 85.3167 },
    type: 'Brackish Water Lagoon',
    area: '1,165 km²',
    description: 'Asia\'s largest brackish water lagoon, Ramsar Wetland of International Importance',
    carbonStorage: '3.4 million tons CO2',
    biodiversity: '1.5 million migratory birds, Irrawaddy Dolphins, 132 fish species'
  },
  {
    id: 'hotspot-4',
    name: 'Bhitarkanika National Park',
    coordinates: { lat: 20.7071, lng: 86.9220 },
    type: 'Mangrove Sanctuary',
    area: '672 km²',
    description: 'Second largest mangrove ecosystem in India, critical for saltwater crocodiles',
    carbonStorage: '4.2 million tons CO2',
    biodiversity: 'Saltwater Crocodiles, King Cobras, 215 bird species'
  },
  {
    id: 'hotspot-5',
    name: 'Pulicat Lake',
    coordinates: { lat: 13.6667, lng: 80.1833 },
    type: 'Saltwater Lagoon',
    area: '759 km²',
    description: 'Second largest saltwater lagoon in India, flamingo breeding ground',
    carbonStorage: '1.8 million tons CO2',
    biodiversity: 'Greater Flamingos, Spot-billed Pelicans, 115 bird species'
  },
  {
    id: 'hotspot-6',
    name: 'Pichavaram Mangroves',
    coordinates: { lat: 11.4500, lng: 79.7667 },
    type: 'Mangrove Forest',
    area: '11.5 km²',
    description: 'Unique mangrove forest with intricate waterways and rich biodiversity',
    carbonStorage: '0.3 million tons CO2',
    biodiversity: 'Fishing Cats, Water Snakes, 177 bird species'
  }
];

// Default center - India's coastline (Arabian Sea and Bay of Bengal)
const defaultCenter = {
  lat: 15.3173,  // Central India coastline
  lng: 75.7139   // Between Arabian Sea and Bay of Bengal
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: true,
  scaleControl: true,
  streetViewControl: true,
  rotateControl: true,
  fullscreenControl: true,
  mapTypeId: 'satellite' as google.maps.MapTypeId,
  styles: [
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#193a7b' }]
    },
    {
      featureType: 'landscape.natural',
      elementType: 'geometry',
      stylers: [{ color: '#2d5a2d' }]
    }
  ]
};

interface GoogleMapComponentProps {
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
    description?: string;
  }>;
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
  className = '',
  showControls = true,
  projects = [],
  onProjectClick,
  selectedProject
}) => {
  const { toast } = useToast();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'hybrid' | 'terrain'>('satellite');
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showProjectAreas, setShowProjectAreas] = useState(true);
  const [showHotspots, setShowHotspots] = useState(true);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
    version: 'weekly',
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    
    // Fit bounds to show all projects
    if (projects.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      projects.forEach(project => {
        bounds.extend({
          lat: project.coordinates[1],
          lng: project.coordinates[0]
        });
      });
      map.fitBounds(bounds);
    }
  }, [projects]);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Generate heatmap data for visualization
  const getHeatmapData = () => {
    return projects.map(project => ({
      location: new google.maps.LatLng(project.coordinates[1], project.coordinates[0]),
      weight: project.credits || 1
    }));
  };

  // Get marker icon based on project status
  const getMarkerIcon = (status: string, isSelected: boolean) => {
    const baseSize = isSelected ? 40 : 30;
    let color = '#6b7280'; // gray default
    
    switch (status) {
      case 'verified':
        color = '#10b981'; // green
        break;
      case 'active':
        color = '#3b82f6'; // blue
        break;
      case 'pending':
        color = '#f59e0b'; // yellow
        break;
    }

    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg width="${baseSize}" height="${baseSize}" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="${color}" stroke="white" stroke-width="2"/>
          <circle cx="12" cy="12" r="6" fill="white" opacity="0.8"/>
          <text x="12" y="16" text-anchor="middle" fill="${color}" font-size="8" font-weight="bold">●</text>
        </svg>
      `)}`,
      scaledSize: new google.maps.Size(baseSize, baseSize),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(baseSize / 2, baseSize / 2)
    };
  };

  // Generate project area polygon
  const getProjectAreaCoordinates = (center: [number, number], area: number) => {
    // Create a rough circular area based on hectares
    const radius = Math.sqrt(area / Math.PI) * 100; // Convert hectares to approximate radius in meters
    const points: google.maps.LatLng[] = [];
    const centerLat = center[1];
    const centerLng = center[0];
    
    for (let i = 0; i < 16; i++) {
      const angle = (i * 360) / 16;
      const radians = (angle * Math.PI) / 180;
      const lat = centerLat + (radius / 111320) * Math.cos(radians);
      const lng = centerLng + (radius / (111320 * Math.cos(centerLat * Math.PI / 180))) * Math.sin(radians);
      points.push(new google.maps.LatLng(lat, lng));
    }
    
    return points;
  };

  // Map control functions
  const changeMapType = (type: 'roadmap' | 'satellite' | 'hybrid' | 'terrain') => {
    setMapType(type);
    if (map) {
      map.setMapTypeId(type);
    }
    toast({
      title: `Map Type Changed`,
      description: `Switched to ${type} view`,
    });
  };

  const zoomIn = () => {
    if (map) {
      map.setZoom((map.getZoom() || 10) + 1);
    }
  };

  const zoomOut = () => {
    if (map) {
      map.setZoom((map.getZoom() || 10) - 1);
    }
  };

  const resetView = () => {
    if (map) {
      map.setCenter(defaultCenter);
      map.setZoom(10);
    }
  };

  const fitToProjects = () => {
    if (map && projects.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      projects.forEach(project => {
        bounds.extend({
          lat: project.coordinates[1],
          lng: project.coordinates[0]
        });
      });
      map.fitBounds(bounds);
    }
  };

  const toggleHeatmap = () => {
    setShowHeatmap(!showHeatmap);
    toast({
      title: showHeatmap ? 'Heatmap Hidden' : 'Heatmap Shown',
      description: showHeatmap ? 'Carbon credit heatmap disabled' : 'Showing carbon credit density',
    });
  };

  const toggleHotspots = () => {
    setShowHotspots(!showHotspots);
    toast({
      title: showHotspots ? 'Ecosystem Hotspots Hidden' : 'Ecosystem Hotspots Shown',
      description: showHotspots ? 'Blue carbon hotspots disabled' : 'Showing major blue carbon ecosystems',
    });
  };

  if (loadError) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
          <Card className="p-6 max-w-md text-center bg-white/90 backdrop-blur-sm">
            <MapIcon className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <h3 className="font-semibold mb-2 text-red-700">Map Loading Error</h3>
            <p className="text-sm text-red-600 mb-4">
              Failed to load Google Maps. Please check your API key and internet connection.
            </p>
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
              Retry Loading
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
          <Card className="p-6 max-w-md text-center bg-white/90 backdrop-blur-sm">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h3 className="font-semibold mb-2">Loading Google Maps</h3>
            <p className="text-sm text-muted-foreground">
              Initializing interactive map with satellite imagery...
            </p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Google Map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={6}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
      >
        {/* Project Markers */}
        {projects.map((project) => (
          <Marker
            key={project.id}
            position={{
              lat: project.coordinates[1],
              lng: project.coordinates[0]
            }}
            icon={getMarkerIcon(project.status, selectedProject === project.id)}
            onClick={() => {
              setSelectedMarker(project.id);
              onProjectClick?.(project.id);
            }}
            title={project.name}
          />
        ))}

        {/* Indian Blue Carbon Hotspot Markers */}
        {showHotspots && indianBlueCarbonHotspots.map((hotspot) => (
          <Marker
            key={hotspot.id}
            position={hotspot.coordinates}
            icon={{
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="#16a34a" stroke="#ffffff" stroke-width="2"/>
                  <path d="M8 12l2 2 4-4" stroke="#ffffff" stroke-width="2" fill="none"/>
                </svg>
              `),
              scaledSize: new window.google.maps.Size(32, 32),
              anchor: new window.google.maps.Point(16, 16)
            }}
            onClick={() => {
              setSelectedHotspot(hotspot.id);
            }}
            title={`${hotspot.name} - ${hotspot.type}`}
          />
        ))}

        {/* Project Area Polygons */}
        {showProjectAreas && projects.map((project) => (
          project.area && (
            <Circle
              key={`area-${project.id}`}
              center={{
                lat: project.coordinates[1],
                lng: project.coordinates[0]
              }}
              radius={Math.sqrt(project.area * 10000 / Math.PI)} // Convert hectares to radius in meters
              options={{
                fillColor: project.status === 'verified' ? '#10b981' : 
                          project.status === 'active' ? '#3b82f6' : '#f59e0b',
                fillOpacity: 0.15,
                strokeColor: project.status === 'verified' ? '#10b981' : 
                            project.status === 'active' ? '#3b82f6' : '#f59e0b',
                strokeOpacity: 0.4,
                strokeWeight: 2,
              }}
            />
          )
        ))}

        {/* Heatmap Layer */}
        {showHeatmap && isLoaded && (
          <HeatmapLayer
            data={getHeatmapData()}
            options={{
              radius: 50,
              opacity: 0.6,
            }}
          />
        )}

        {/* Info Windows */}
        {selectedMarker && (
          <InfoWindow
            position={{
              lat: projects.find(p => p.id === selectedMarker)?.coordinates[1] || 0,
              lng: projects.find(p => p.id === selectedMarker)?.coordinates[0] || 0
            }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="p-3 max-w-xs">
              {(() => {
                const project = projects.find(p => p.id === selectedMarker);
                if (!project) return <div>Project not found</div>;
                
                return (
                  <div>
                    <h3 className="font-bold text-lg mb-2">{project.name}</h3>
                    <div className="space-y-1 text-sm mb-3">
                      <p><span className="font-medium">Status:</span> 
                        <Badge className={`ml-2 ${
                          project.status === 'verified' ? 'bg-green-500' :
                          project.status === 'active' ? 'bg-blue-500' : 'bg-yellow-500'
                        } text-white`}>
                          {project.status}
                        </Badge>
                      </p>
                      {project.area && <p><span className="font-medium">Area:</span> {project.area} ha</p>}
                      {project.type && <p><span className="font-medium">Type:</span> {project.type}</p>}
                      {project.credits && <p><span className="font-medium">Credits:</span> {project.credits} tCO₂e</p>}
                    </div>
                    {project.description && (
                      <p className="text-xs text-gray-600 mb-3">{project.description}</p>
                    )}
                    <button 
                      onClick={() => onProjectClick?.(project.id)}
                      className="w-full px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                );
              })()}
            </div>
          </InfoWindow>
        )}

        {/* Hotspot Info Windows */}
        {selectedHotspot && (
          <InfoWindow
            position={indianBlueCarbonHotspots.find(h => h.id === selectedHotspot)?.coordinates}
            onCloseClick={() => setSelectedHotspot(null)}
          >
            <div className="p-4 max-w-sm">
              {(() => {
                const hotspot = indianBlueCarbonHotspots.find(h => h.id === selectedHotspot);
                if (!hotspot) return null;
                
                return (
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-forest">{hotspot.name}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">Type:</span>
                        <span className="text-ocean">{hotspot.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Area:</span>
                        <span>{hotspot.area}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Carbon Storage:</span>
                        <span className="text-forest font-medium">{hotspot.carbonStorage}</span>
                      </div>
                      <div className="mt-3">
                        <p className="text-muted-foreground mb-2">{hotspot.description}</p>
                        <div>
                          <span className="font-medium text-sm">Key Species:</span>
                          <p className="text-xs text-muted-foreground mt-1">{hotspot.biodiversity}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t">
                      <span className="text-xs text-green-600 font-medium">🌿 Protected Blue Carbon Ecosystem</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Enhanced Controls */}
      {showControls && (
        <>
          {/* Map Type Controls */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <Button
              variant={mapType === 'satellite' ? 'default' : 'outline'}
              size="sm"
              onClick={() => changeMapType('satellite')}
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              <Satellite className="w-4 h-4 mr-2" />
              Satellite
            </Button>
            <Button
              variant={mapType === 'hybrid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => changeMapType('hybrid')}
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              <Layers className="w-4 h-4 mr-2" />
              Hybrid
            </Button>
            <Button
              variant={mapType === 'terrain' ? 'default' : 'outline'}
              size="sm"
              onClick={() => changeMapType('terrain')}
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              <MapIcon className="w-4 h-4 mr-2" />
              Terrain
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
          <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={fitToProjects}
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              <Search className="w-4 h-4 mr-1" />
              Fit Projects
            </Button>
            <Button
              variant={showHeatmap ? 'default' : 'outline'}
              size="sm"
              onClick={toggleHeatmap}
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              <Thermometer className="w-4 h-4 mr-1" />
              Heatmap
            </Button>
            <Button
              variant={showProjectAreas ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowProjectAreas(!showProjectAreas)}
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              <Activity className="w-4 h-4 mr-1" />
              Areas
            </Button>
            <Button
              variant={showHotspots ? 'default' : 'outline'}
              size="sm"
              onClick={toggleHotspots}
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              <MapPin className="w-4 h-4 mr-1" />
              Hotspots
            </Button>
          </div>
        </>
      )}

      {/* Enhanced Legend */}
      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 text-xs shadow-lg max-w-xs">
        <h4 className="font-semibold mb-2 flex items-center gap-1">
          <Info className="w-3 h-3" />
          Project Status
        </h4>
        <div className="space-y-1 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500 border border-white shadow-sm"></div>
            <span>Verified ({projects.filter(p => p.status === 'verified').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 border border-white shadow-sm"></div>
            <span>Active ({projects.filter(p => p.status === 'active').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500 border border-white shadow-sm"></div>
            <span>Pending ({projects.filter(p => p.status === 'pending').length})</span>
          </div>
        </div>
        {showHotspots && (
          <div className="mb-3">
            <h4 className="font-semibold mb-2 text-forest">Blue Carbon Hotspots</h4>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-600 border border-white shadow-sm"></div>
              <span>Protected Ecosystems ({indianBlueCarbonHotspots.length})</span>
            </div>
          </div>
        )}
        <div className="pt-2 border-t">
          <p className="text-muted-foreground">View: {mapType.toUpperCase()}</p>
          <p className="text-muted-foreground">Projects: {projects.length}</p>
          <p className="text-muted-foreground flex items-center gap-1">
            <Navigation className="w-3 h-3" />
            Google Maps
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoogleMapComponent;