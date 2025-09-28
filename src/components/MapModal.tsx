import React, { useState, useCallback } from 'react';
import { 
  GoogleMap, 
  useJsApiLoader, 
  Marker, 
  InfoWindow,
  Circle
} from '@react-google-maps/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  X,
  MapPin,
  Ruler,
  TrendingUp,
  Building,
  Leaf,
  Waves,
  TreePine,
  Maximize2,
  Minimize2,
  ExternalLink
} from 'lucide-react';
import { Project } from '@/data/transactionData';

// Google Maps API key - replace with your own
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyBFw0Qbyq9zTFTd-tUY6dQBJ8Nqb-3MQ0E';

const libraries: ("places" | "geometry" | "drawing" | "visualization")[] = ['places', 'geometry', 'drawing', 'visualization'];

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

interface MapModalProps {
  project: Project;
  onClose: () => void;
}

const MapModal: React.FC<MapModalProps> = ({ project, onClose }) => {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapError, setMapError] = useState(false);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries
  });

  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: false,
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

  const onLoad = useCallback((map: google.maps.Map) => {
    // Set the map bounds to show the project area
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(project.location.coordinates);
    map.fitBounds(bounds);
    map.setZoom(14); // Zoom level for project detail view
  }, [project]);

  const getProjectTypeIcon = (type: string) => {
    switch (type) {
      case 'mangrove':
        return <TreePine className="w-4 h-4 text-green-600" />;
      case 'seagrass':
        return <Leaf className="w-4 h-4 text-blue-600" />;
      case 'saltmarsh':
        return <Waves className="w-4 h-4 text-purple-600" />;
      default:
        return <MapPin className="w-4 h-4 text-gray-600" />;
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

  if (loadError) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-red-500" />
              <span>Map Unavailable</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 text-sm">
              Unable to load Google Maps. This might be due to:
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Missing or invalid API key</li>
              <li>• Network connectivity issues</li>
              <li>• API quota exceeded</li>
            </ul>
            <div className="space-y-2">
              <p className="text-sm font-medium">Project Location:</p>
              <p className="font-mono text-sm bg-gray-100 p-2 rounded">
                {project.location.coordinates.lat.toFixed(6)}, {project.location.coordinates.lng.toFixed(6)}
              </p>
              <Button
                onClick={() => {
                  const { lat, lng } = project.location.coordinates;
                  const mapsUrl = `https://www.google.com/maps/@${lat},${lng},15z`;
                  window.open(mapsUrl, '_blank');
                }}
                className="w-full"
                variant="outline"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in Google Maps
              </Button>
            </div>
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <Card className="w-96">
          <CardContent className="p-6">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4 animate-pulse" />
              <p className="text-gray-500">Loading map...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
      isFullscreen ? 'p-0' : 'p-4'
    }`}>
      <div className={`bg-white rounded-lg shadow-xl overflow-hidden ${
        isFullscreen ? 'w-full h-full' : 'w-full max-w-6xl h-[80vh]'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              {getProjectTypeIcon(project.type)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{project.name}</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{project.location.district}, {project.location.state}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(project.status)}>
              {project.status.replace('_', ' ')}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex h-full">
          {/* Map */}
          <div className={`${isFullscreen ? 'w-full' : 'flex-1'} relative`}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={project.location.coordinates}
              zoom={14}
              onLoad={onLoad}
              options={mapOptions}
            >
              {/* Project Marker */}
              <Marker
                position={project.location.coordinates}
                onClick={() => setSelectedMarker(project.id)}
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 10,
                  fillColor: project.status === 'active' ? '#10b981' : '#6b7280',
                  fillOpacity: 0.8,
                  strokeColor: '#ffffff',
                  strokeWeight: 2,
                }}
              />

              {/* Project Area Circle */}
              <Circle
                center={project.location.coordinates}
                radius={Math.sqrt(project.area * 10000) * 0.8} // Approximate area visualization
                options={{
                  fillColor: project.type === 'mangrove' ? '#10b981' : 
                            project.type === 'seagrass' ? '#3b82f6' : '#8b5cf6',
                  fillOpacity: 0.2,
                  strokeColor: project.type === 'mangrove' ? '#10b981' : 
                              project.type === 'seagrass' ? '#3b82f6' : '#8b5cf6',
                  strokeOpacity: 0.6,
                  strokeWeight: 2,
                }}
              />

              {/* Info Window */}
              {selectedMarker === project.id && (
                <InfoWindow
                  position={project.location.coordinates}
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <div className="p-2 max-w-xs">
                    <h3 className="font-semibold text-lg mb-2">{project.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>Area:</span>
                        <span className="font-semibold">{project.area.toLocaleString()} ha</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="font-semibold capitalize">{project.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="font-semibold capitalize">{project.status.replace('_', ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Credits Available:</span>
                        <span className="font-semibold text-green-600">{project.availableCredits.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>

            {/* Map Controls */}
            <div className="absolute top-4 left-4 space-y-2">
              <Card className="p-2">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Active Project</span>
                </div>
              </Card>
            </div>
          </div>

          {/* Sidebar - hidden in fullscreen */}
          {!isFullscreen && (
            <div className="w-80 bg-gray-50 border-l p-4 space-y-4 overflow-y-auto">
              {/* Project Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Project Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Coordinates</p>
                    <p className="font-mono text-sm bg-white p-2 rounded border">
                      {project.location.coordinates.lat.toFixed(6)}, {project.location.coordinates.lng.toFixed(6)}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Total Area</span>
                    <span className="font-semibold">{project.area.toLocaleString()} ha</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Project Type</span>
                    <div className="flex items-center space-x-1">
                      {getProjectTypeIcon(project.type)}
                      <span className="font-semibold capitalize">{project.type}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Annual Sequestration</span>
                    <span className="font-semibold text-green-600">{project.annualSequestration.toLocaleString()} tCO₂/yr</span>
                  </div>
                </CardContent>
              </Card>

              {/* Organizations */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Organizations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Owner</p>
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4 text-blue-600" />
                      <p className="font-semibold text-sm">{project.owner.name}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Developer</p>
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4 text-green-600" />
                      <p className="font-semibold text-sm">{project.developer.name}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Verifier</p>
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4 text-purple-600" />
                      <p className="font-semibold text-sm">{project.verifier.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Credits */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Carbon Credits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Total Issued</span>
                    <span className="font-semibold">{project.totalCreditsIssued.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Available</span>
                    <span className="font-semibold text-green-600">{project.availableCredits.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Price per Credit</span>
                    <span className="font-semibold">₹{project.pricePerCredit.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Monitoring Data */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Latest Monitoring</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Carbon Stock</span>
                    <span className="font-semibold text-green-600">{project.monitoring.carbonStock} tCO₂</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Biodiversity Index</span>
                    <span className="font-semibold text-blue-600">{project.monitoring.biodiversityIndex}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Community Benefit</span>
                    <span className="font-semibold text-purple-600">{project.monitoring.communityBenefit}/10</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Last updated: {new Date(project.monitoring.lastUpdated).toLocaleDateString('en-IN')}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapModal;