# Google Maps API Configuration

## To enable Google Maps functionality:

1. **Get a Google Maps API Key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the following APIs:
     - Maps JavaScript API
     - Places API
     - Geocoding API (optional)
   - Create credentials (API Key)
   - Restrict the API key to your domain for security

2. **Set up the API Key:**
   - Create a `.env.local` file in the project root
   - Add your API key:
     ```
     VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
     ```

3. **Current Setup:**
   - The app uses a demo/placeholder API key by default
   - For production use, replace with your actual API key
   - The map components will fallback gracefully if the API key is invalid

## Map Features Implemented:

### 1. **Interactive Project Map Modal**
- **Location**: Accessible from "View on Map" button in Project Details
- **Features**:
  - Satellite view centered on project location
  - Project marker with custom styling
  - Project area visualization (circle overlay)
  - Detailed info window with project stats
  - Fullscreen toggle capability
  - Sidebar with complete project information

### 2. **Google Maps Integration**
- **Location**: "View Location on Google Maps" in Transaction Details
- **Features**:
  - Opens external Google Maps in new tab
  - Shows exact project coordinates
  - Fallback when integrated map is not available

### 3. **Map Controls & Styling**
- Satellite view optimized for coastal ecosystem visibility
- Custom water and landscape colors for blue carbon projects
- Zoom controls and map type controls enabled
- Responsive design for mobile and desktop

## Testing the Map Functionality:

1. **Navigate to Dashboard** → Login with any demo account
2. **View Recent Transactions** → Click any transaction
3. **Transaction Details** → Click "View Full Project Details"
4. **Project Details** → Click "View on Map" button
5. **Map Modal Opens** → Shows project location with details
6. **Alternative**: Click "View Location on Google Maps" for external map

## Map Data:
- **Sundarbans**: 21.9497°N, 88.7500°E (West Bengal)
- **Gujarat Salt Marsh**: 23.0225°N, 68.8397°E (Gujarat)
- **Tamil Nadu Seagrass**: 9.2647°N, 79.1319°E (Tamil Nadu)

All coordinates are real locations of blue carbon ecosystems in India!