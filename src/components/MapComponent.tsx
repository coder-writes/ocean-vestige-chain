import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Layers, Satellite, Map as MapIcon } from 'lucide-react';

interface MapComponentProps {
  className?: string;
  showControls?: boolean;
  projects?: Array<{
    id: string;
    name: string;
    coordinates: [number, number];
    status: 'active' | 'verified' | 'pending';
  }>;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  className = '', 
  showControls = true,
  projects = []
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [currentLayer, setCurrentLayer] = useState<'satellite' | 'ndvi' | 'carbon'>('satellite');

  useEffect(() => {
    if (!mapContainer.current) return;

    // For demo purposes, we'll use a placeholder map without API key
    // In production, users would need to add their Mapbox token
    try {
      mapboxgl.accessToken = 'pk.your-mapbox-token-here';
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-v9',
        center: [-74.5, 40], // Default to NY area
        zoom: 9,
        projection: 'globe' as any,
      });

      // Add navigation controls
      if (showControls) {
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
        map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');
      }

      map.current.on('load', () => {
        setMapLoaded(true);
        
        // Add sample project markers
        projects.forEach((project) => {
          const markerColor = project.status === 'verified' ? '#10b981' : 
                             project.status === 'active' ? '#3b82f6' : '#f59e0b';
          
          new mapboxgl.Marker({ color: markerColor })
            .setLngLat(project.coordinates)
            .setPopup(new mapboxgl.Popup().setHTML(`
              <div class="p-2">
                <h3 class="font-bold">${project.name}</h3>
                <p class="text-sm">Status: ${project.status}</p>
              </div>
            `))
            .addTo(map.current!);
        });
      });

    } catch (error) {
      console.log('Mapbox token not provided - showing placeholder');
    }

    return () => {
      map.current?.remove();
    };
  }, [projects, showControls]);

  const switchLayer = (layer: 'satellite' | 'ndvi' | 'carbon') => {
    setCurrentLayer(layer);
    if (!map.current) return;

    let style = 'mapbox://styles/mapbox/satellite-v9';
    if (layer === 'ndvi') {
      style = 'mapbox://styles/mapbox/light-v11';
    } else if (layer === 'carbon') {
      style = 'mapbox://styles/mapbox/dark-v11';
    }

    try {
      map.current.setStyle(style);
    } catch (error) {
      console.log('Style switching requires Mapbox token');
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
        {/* Placeholder when no Mapbox token */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ocean/20 to-forest/20">
          <Card className="p-6 max-w-md text-center bg-white/90 backdrop-blur-sm">
            <MapIcon className="w-12 h-12 mx-auto mb-4 text-ocean" />
            <h3 className="font-semibold mb-2">Interactive Map Preview</h3>
            <p className="text-sm text-muted-foreground mb-4">
              To enable full map functionality, connect your Mapbox API key. 
              This will provide satellite imagery, NDVI overlays, and project locations.
            </p>
            <Button variant="outline" size="sm">
              Configure Map Settings
            </Button>
          </Card>
        </div>
      </div>

      {/* Layer Controls */}
      {showControls && (
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <Button
            variant={currentLayer === 'satellite' ? 'default' : 'outline'}
            size="sm"
            onClick={() => switchLayer('satellite')}
            className="bg-white/90 backdrop-blur-sm"
          >
            <Satellite className="w-4 h-4 mr-2" />
            Satellite
          </Button>
          <Button
            variant={currentLayer === 'ndvi' ? 'default' : 'outline'}
            size="sm"
            onClick={() => switchLayer('ndvi')}
            className="bg-white/90 backdrop-blur-sm"
          >
            <Layers className="w-4 h-4 mr-2" />
            NDVI
          </Button>
          <Button
            variant={currentLayer === 'carbon' ? 'default' : 'outline'}
            size="sm"
            onClick={() => switchLayer('carbon')}
            className="bg-white/90 backdrop-blur-sm"
          >
            <MapIcon className="w-4 h-4 mr-2" />
            Carbon
          </Button>
        </div>
      )}

      {/* Map Legend */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs">
        <h4 className="font-semibold mb-2">Project Status</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-forest"></div>
            <span>Verified</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-ocean"></div>
            <span>Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;