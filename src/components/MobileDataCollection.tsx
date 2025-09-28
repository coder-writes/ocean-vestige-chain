import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  Camera, 
  MapPin, 
  Upload, 
  Wifi, 
  WifiOff, 
  Save, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Smartphone,
  Thermometer,
  Droplets,
  Wind,
  Eye,
  TreePine,
  Fish
} from 'lucide-react';

interface GPSCoordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

interface FieldMeasurement {
  id: string;
  type: 'plantation' | 'monitoring' | 'restoration';
  projectId: string;
  timestamp: string;
  location: GPSCoordinates;
  data: {
    // Plantation specific
    speciesPlanted?: string[];
    numberOfSeedlings?: number;
    plantationMethod?: string;
    survivalRate?: number;
    
    // Monitoring specific
    biomass?: number;
    carbonStock?: number;
    canopyCover?: number;
    speciesDiversity?: number;
    waterQuality?: {
      ph: number;
      salinity: number;
      turbidity: number;
      temperature: number;
    };
    soilHealth?: {
      organicCarbon: number;
      nitrogen: number;
      phosphorus: number;
      moisture: number;
    };
    
    // Environmental conditions
    weatherConditions: {
      temperature: number;
      humidity: number;
      windSpeed: number;
      visibility: number;
      conditions: string;
    };
  };
  photographs: File[];
  fieldNotes: string;
  fieldOfficer: string;
  organizationId: string;
  syncStatus: 'offline' | 'syncing' | 'synced' | 'error';
}

interface MobileDataCollectionProps {
  projectId: string;
  organizationId: string;
  fieldOfficer: string;
  onDataSubmit?: (data: FieldMeasurement) => void;
}

export const MobileDataCollection: React.FC<MobileDataCollectionProps> = ({
  projectId,
  organizationId,
  fieldOfficer,
  onDataSubmit
}) => {
  const [currentLocation, setCurrentLocation] = useState<GPSCoordinates | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [measurementType, setMeasurementType] = useState<'plantation' | 'monitoring' | 'restoration'>('plantation');
  const [photographs, setPhotographs] = useState<File[]>([]);
  const [fieldNotes, setFieldNotes] = useState('');
  const [syncProgress, setSyncProgress] = useState(0);
  const [savedMeasurements, setSavedMeasurements] = useState<FieldMeasurement[]>([]);
  
  // Form data states
  const [plantationData, setPlantationData] = useState({
    speciesPlanted: [] as string[],
    numberOfSeedlings: 0,
    plantationMethod: '',
    survivalRate: 0
  });

  const [monitoringData, setMonitoringData] = useState({
    biomass: 0,
    carbonStock: 0,
    canopyCover: 0,
    speciesDiversity: 0,
    waterQuality: {
      ph: 7.0,
      salinity: 0,
      turbidity: 0,
      temperature: 25
    },
    soilHealth: {
      organicCarbon: 0,
      nitrogen: 0,
      phosphorus: 0,
      moisture: 0
    }
  });

  const [environmentalData, setEnvironmentalData] = useState({
    temperature: 25,
    humidity: 60,
    windSpeed: 5,
    visibility: 10,
    conditions: 'Clear'
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Get current location
  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location: GPSCoordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: Date.now()
        };
        setCurrentLocation(location);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to get current location. Please enable GPS.');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  }, []);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Auto-get location on component mount
  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  // Handle photo capture/upload
  const handlePhotoCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setPhotographs(prev => [...prev, ...files]);
  };

  const removePhoto = (index: number) => {
    setPhotographs(prev => prev.filter((_, i) => i !== index));
  };

  // Save measurement offline
  const saveMeasurementOffline = () => {
    if (!currentLocation) {
      alert('Please get GPS location first');
      return;
    }

    const measurement: FieldMeasurement = {
      id: `measurement-${Date.now()}`,
      type: measurementType,
      projectId,
      timestamp: new Date().toISOString(),
      location: currentLocation,
      data: {
        ...plantationData,
        ...monitoringData,
        weatherConditions: environmentalData
      },
      photographs,
      fieldNotes,
      fieldOfficer,
      organizationId,
      syncStatus: 'offline'
    };

    setSavedMeasurements(prev => [...prev, measurement]);
    
    // Save to localStorage for persistence
    const stored = localStorage.getItem('offlineMeasurements');
    const existing = stored ? JSON.parse(stored) : [];
    localStorage.setItem('offlineMeasurements', JSON.stringify([...existing, measurement]));

    // Reset form
    resetForm();
    alert('Measurement saved offline successfully!');
  };

  // Sync all offline measurements
  const syncOfflineMeasurements = async () => {
    if (!isOnline) {
      alert('Please connect to internet to sync data');
      return;
    }

    const offlineMeasurements = savedMeasurements.filter(m => m.syncStatus === 'offline');
    
    for (let i = 0; i < offlineMeasurements.length; i++) {
      const measurement = offlineMeasurements[i];
      setSyncProgress((i / offlineMeasurements.length) * 100);
      
      try {
        // Update sync status
        measurement.syncStatus = 'syncing';
        setSavedMeasurements(prev => prev.map(m => m.id === measurement.id ? measurement : m));

        // Simulate API call with delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mark as synced
        measurement.syncStatus = 'synced';
        setSavedMeasurements(prev => prev.map(m => m.id === measurement.id ? measurement : m));
        
        // Call parent callback
        if (onDataSubmit) {
          onDataSubmit(measurement);
        }
        
        console.log(`Synced measurement: ${measurement.id}`);
      } catch (error) {
        console.error('Sync error:', error);
        measurement.syncStatus = 'error';
        setSavedMeasurements(prev => prev.map(m => m.id === measurement.id ? measurement : m));
      }
    }

    setSyncProgress(100);
    setTimeout(() => setSyncProgress(0), 2000);
  };

  const resetForm = () => {
    setPhotographs([]);
    setFieldNotes('');
    setPlantationData({
      speciesPlanted: [],
      numberOfSeedlings: 0,
      plantationMethod: '',
      survivalRate: 0
    });
    setMonitoringData({
      biomass: 0,
      carbonStock: 0,
      canopyCover: 0,
      speciesDiversity: 0,
      waterQuality: { ph: 7.0, salinity: 0, turbidity: 0, temperature: 25 },
      soilHealth: { organicCarbon: 0, nitrogen: 0, phosphorus: 0, moisture: 0 }
    });
  };

  const getSyncStatusColor = (status: string) => {
    switch (status) {
      case 'synced': return 'bg-green-500';
      case 'syncing': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSyncStatusIcon = (status: string) => {
    switch (status) {
      case 'synced': return <CheckCircle className="h-4 w-4" />;
      case 'syncing': return <Upload className="h-4 w-4 animate-spin" />;
      case 'error': return <AlertCircle className="h-4 w-4" />;
      default: return <Save className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header with connectivity status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Smartphone className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold">Field Data Collection</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant={isOnline ? "default" : "destructive"} className="flex items-center space-x-1">
            {isOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
            <span>{isOnline ? 'Online' : 'Offline'}</span>
          </Badge>
          {savedMeasurements.filter(m => m.syncStatus === 'offline').length > 0 && (
            <Badge variant="secondary">
              {savedMeasurements.filter(m => m.syncStatus === 'offline').length} pending sync
            </Badge>
          )}
        </div>
      </div>

      {/* GPS Location Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>GPS Location</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentLocation ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Latitude</Label>
                <div className="text-sm font-mono">{currentLocation.latitude.toFixed(6)}</div>
              </div>
              <div>
                <Label>Longitude</Label>
                <div className="text-sm font-mono">{currentLocation.longitude.toFixed(6)}</div>
              </div>
              <div>
                <Label>Accuracy</Label>
                <div className="text-sm">{currentLocation.accuracy.toFixed(1)}m</div>
              </div>
              <div>
                <Label>Timestamp</Label>
                <div className="text-sm">{new Date(currentLocation.timestamp).toLocaleTimeString()}</div>
              </div>
            </div>
          ) : (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Getting GPS location...
              </AlertDescription>
            </Alert>
          )}
          <Button onClick={getCurrentLocation} className="mt-4">
            <MapPin className="h-4 w-4 mr-2" />
            Refresh Location
          </Button>
        </CardContent>
      </Card>

      {/* Measurement Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Measurement Type</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={measurementType} onValueChange={(value: 'plantation' | 'monitoring' | 'restoration') => setMeasurementType(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="plantation">Plantation Data</SelectItem>
              <SelectItem value="monitoring">Monitoring Data</SelectItem>
              <SelectItem value="restoration">Restoration Data</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Data Collection Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Field Measurements</CardTitle>
          <CardDescription>Collect detailed field data for blue carbon projects</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="primary" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="primary">Primary Data</TabsTrigger>
              <TabsTrigger value="environmental">Environmental</TabsTrigger>
              <TabsTrigger value="photos">Photos & Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="primary" className="space-y-4">
              {measurementType === 'plantation' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Species Planted</Label>
                    <Input
                      placeholder="e.g., Rhizophora mucronata"
                      value={plantationData.speciesPlanted.join(', ')}
                      onChange={(e) => setPlantationData(prev => ({
                        ...prev,
                        speciesPlanted: e.target.value.split(', ').filter(s => s.trim())
                      }))}
                    />
                  </div>
                  <div>
                    <Label>Number of Seedlings</Label>
                    <Input
                      type="number"
                      value={plantationData.numberOfSeedlings}
                      onChange={(e) => setPlantationData(prev => ({
                        ...prev,
                        numberOfSeedlings: parseInt(e.target.value) || 0
                      }))}
                    />
                  </div>
                  <div>
                    <Label>Plantation Method</Label>
                    <Input
                      value={plantationData.plantationMethod}
                      onChange={(e) => setPlantationData(prev => ({
                        ...prev,
                        plantationMethod: e.target.value
                      }))}
                    />
                  </div>
                  <div>
                    <Label>Survival Rate (%)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={plantationData.survivalRate}
                      onChange={(e) => setPlantationData(prev => ({
                        ...prev,
                        survivalRate: parseInt(e.target.value) || 0
                      }))}
                    />
                  </div>
                </div>
              )}

              {measurementType === 'monitoring' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="flex items-center space-x-1">
                      <TreePine className="h-4 w-4" />
                      <span>Biomass (t/ha)</span>
                    </Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={monitoringData.biomass}
                      onChange={(e) => setMonitoringData(prev => ({
                        ...prev,
                        biomass: parseFloat(e.target.value) || 0
                      }))}
                    />
                  </div>
                  <div>
                    <Label>Carbon Stock (tCO2/ha)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={monitoringData.carbonStock}
                      onChange={(e) => setMonitoringData(prev => ({
                        ...prev,
                        carbonStock: parseFloat(e.target.value) || 0
                      }))}
                    />
                  </div>
                  <div>
                    <Label>Canopy Cover (%)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={monitoringData.canopyCover}
                      onChange={(e) => setMonitoringData(prev => ({
                        ...prev,
                        canopyCover: parseInt(e.target.value) || 0
                      }))}
                    />
                  </div>
                  <div>
                    <Label className="flex items-center space-x-1">
                      <Fish className="h-4 w-4" />
                      <span>Species Diversity</span>
                    </Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={monitoringData.speciesDiversity}
                      onChange={(e) => setMonitoringData(prev => ({
                        ...prev,
                        speciesDiversity: parseFloat(e.target.value) || 0
                      }))}
                    />
                  </div>
                  
                  {/* Water Quality */}
                  <div className="col-span-2">
                    <Label className="flex items-center space-x-1">
                      <Droplets className="h-4 w-4" />
                      <span>Water Quality</span>
                    </Label>
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      <div>
                        <Label className="text-xs">pH</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={monitoringData.waterQuality.ph}
                          onChange={(e) => setMonitoringData(prev => ({
                            ...prev,
                            waterQuality: { ...prev.waterQuality, ph: parseFloat(e.target.value) || 0 }
                          }))}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Salinity (ppt)</Label>
                        <Input
                          type="number"
                          value={monitoringData.waterQuality.salinity}
                          onChange={(e) => setMonitoringData(prev => ({
                            ...prev,
                            waterQuality: { ...prev.waterQuality, salinity: parseInt(e.target.value) || 0 }
                          }))}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Turbidity (NTU)</Label>
                        <Input
                          type="number"
                          value={monitoringData.waterQuality.turbidity}
                          onChange={(e) => setMonitoringData(prev => ({
                            ...prev,
                            waterQuality: { ...prev.waterQuality, turbidity: parseInt(e.target.value) || 0 }
                          }))}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Temperature (°C)</Label>
                        <Input
                          type="number"
                          value={monitoringData.waterQuality.temperature}
                          onChange={(e) => setMonitoringData(prev => ({
                            ...prev,
                            waterQuality: { ...prev.waterQuality, temperature: parseInt(e.target.value) || 0 }
                          }))}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="environmental" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="flex items-center space-x-1">
                    <Thermometer className="h-4 w-4" />
                    <span>Temperature (°C)</span>
                  </Label>
                  <Input
                    type="number"
                    value={environmentalData.temperature}
                    onChange={(e) => setEnvironmentalData(prev => ({
                      ...prev,
                      temperature: parseInt(e.target.value) || 0
                    }))}
                  />
                </div>
                <div>
                  <Label className="flex items-center space-x-1">
                    <Droplets className="h-4 w-4" />
                    <span>Humidity (%)</span>
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={environmentalData.humidity}
                    onChange={(e) => setEnvironmentalData(prev => ({
                      ...prev,
                      humidity: parseInt(e.target.value) || 0
                    }))}
                  />
                </div>
                <div>
                  <Label className="flex items-center space-x-1">
                    <Wind className="h-4 w-4" />
                    <span>Wind Speed (m/s)</span>
                  </Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={environmentalData.windSpeed}
                    onChange={(e) => setEnvironmentalData(prev => ({
                      ...prev,
                      windSpeed: parseFloat(e.target.value) || 0
                    }))}
                  />
                </div>
                <div>
                  <Label className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>Visibility (km)</span>
                  </Label>
                  <Input
                    type="number"
                    value={environmentalData.visibility}
                    onChange={(e) => setEnvironmentalData(prev => ({
                      ...prev,
                      visibility: parseInt(e.target.value) || 0
                    }))}
                  />
                </div>
                <div className="col-span-2">
                  <Label>Weather Conditions</Label>
                  <Select 
                    value={environmentalData.conditions} 
                    onValueChange={(value) => setEnvironmentalData(prev => ({ ...prev, conditions: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Clear">Clear</SelectItem>
                      <SelectItem value="Partly Cloudy">Partly Cloudy</SelectItem>
                      <SelectItem value="Cloudy">Cloudy</SelectItem>
                      <SelectItem value="Light Rain">Light Rain</SelectItem>
                      <SelectItem value="Heavy Rain">Heavy Rain</SelectItem>
                      <SelectItem value="Foggy">Foggy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="photos" className="space-y-4">
              <div>
                <Label>Field Photographs</Label>
                <div className="flex space-x-2 mt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => cameraInputRef.current?.click()}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Take Photo
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photos
                  </Button>
                </div>
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  multiple
                  onChange={handlePhotoCapture}
                  className="hidden"
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoCapture}
                  className="hidden"
                />
                
                {photographs.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {photographs.map((photo, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Field photo ${index + 1}`}
                          className="w-full h-32 object-cover rounded-md"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-1 right-1"
                          onClick={() => removePhoto(index)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <Label>Field Notes</Label>
                <Textarea
                  placeholder="Detailed observations, challenges faced, additional notes..."
                  value={fieldNotes}
                  onChange={(e) => setFieldNotes(e.target.value)}
                  rows={4}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Button onClick={saveMeasurementOffline} className="flex-1">
          <Save className="h-4 w-4 mr-2" />
          Save Offline
        </Button>
        <Button 
          onClick={syncOfflineMeasurements} 
          disabled={!isOnline || savedMeasurements.filter(m => m.syncStatus === 'offline').length === 0}
          variant="outline"
          className="flex-1"
        >
          <Send className="h-4 w-4 mr-2" />
          Sync Data ({savedMeasurements.filter(m => m.syncStatus === 'offline').length})
        </Button>
      </div>

      {/* Sync Progress */}
      {syncProgress > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Syncing measurements...</span>
                <span className="text-sm">{Math.round(syncProgress)}%</span>
              </div>
              <Progress value={syncProgress} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Saved Measurements */}
      {savedMeasurements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Saved Measurements</CardTitle>
            <CardDescription>Recent field data collection records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {savedMeasurements.slice(-5).map((measurement) => (
                <div key={measurement.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <div className="font-medium">{measurement.type} - {new Date(measurement.timestamp).toLocaleString()}</div>
                    <div className="text-sm text-gray-600">
                      {measurement.location.latitude.toFixed(4)}, {measurement.location.longitude.toFixed(4)}
                    </div>
                  </div>
                  <Badge variant="secondary" className={`${getSyncStatusColor(measurement.syncStatus)} text-white flex items-center space-x-1`}>
                    {getSyncStatusIcon(measurement.syncStatus)}
                    <span>{measurement.syncStatus}</span>
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MobileDataCollection;