import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProjects } from '../hooks/useProjects';
import type L from 'leaflet';

const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`);
    const data = await response.json();
    return data.display_name || `${lat}, ${lng}`;
  } catch (error) {
    console.error('Reverse geocoding failed:', error);
    return `${lat}, ${lng}`;
  }
};

const fetchSuggestions = async (query: string): Promise<any[]> => {
  if (!query.trim()) return [];
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetching suggestions failed:', error);
    return [];
  }
};

const NewProjectForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createProject } = useProjects();

  // Form state - Land Parameters
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [plotSize, setPlotSize] = useState('');
  const [plotUnit, setPlotUnit] = useState<'acres' | 'sqft'>('sqft');
  const [zoningType, setZoningType] = useState('');
  const [topography, setTopography] = useState<'flat' | 'sloped' | 'mixed'>('flat');

  // Form state - Building Specifications
  const [floors, setFloors] = useState('2');
  const [constructionType, setConstructionType] = useState<'residential' | 'commercial'>('residential');
  const [builtUpPercent, setBuiltUpPercent] = useState('60');
  const [foundationType, setFoundationType] = useState<'rcc' | 'strip' | 'pile'>('rcc');

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);


  // Redirect if not logged in
  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSubmit = async () => {
    setError('');

    if (!title.trim()) {
      setError('Please enter a project title');
      return;
    }
    if (!address.trim()) {
      setError('Please enter an address');
      return;
    }
    if (!plotSize || parseFloat(plotSize) <= 0) {
      setError('Please enter a valid plot size');
      return;
    }
    if (!zoningType) {
      setError('Please select a zoning type');
      return;
    }

    setLoading(true);
    try {
      const projectId = await createProject({
        title: title.trim(),
        address: address.trim(),
        latitude: latitude || '0',
        longitude: longitude || '0',
        plotSize: parseFloat(plotSize),
        plotUnit,
        zoningType,
        topography,
        // Building specifications - extract city from address
        city: address.split(',').slice(-3, -2)[0]?.trim() || 'Not specified',
        floors: parseInt(floors) || 2,
        constructionType,
        builtUpPercent: parseInt(builtUpPercent) || 60,
        foundationType
      });

      if (projectId) {
        navigate(`/project/${projectId}`);
      } else {
        setError('Failed to create project. Please try again.');
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude.toString());
        setLongitude(longitude.toString());
        try {
          const address = await reverseGeocode(latitude, longitude);
          setAddress(address);
        } catch {
          // Keep address empty if geocoding fails
        }
        setLocationLoading(false);
      },
      (_error) => {
        setError('Unable to retrieve your location. Please enter manually.');
        setLocationLoading(false);
      }
    );
  };

  const handleAddressChange = useCallback((value: string) => {
    setAddress(value);
    if (debounceTimer) clearTimeout(debounceTimer);
    const timer = setTimeout(async () => {
      if (value.trim()) {
        const suggs = await fetchSuggestions(value);
        setSuggestions(suggs);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);
    setDebounceTimer(timer);
  }, [debounceTimer]);

  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Only initialize map if we have valid coordinates
    if (!mapRef.current || !latitude || !longitude) return;

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng) || (lat === 0 && lng === 0)) return;

    // Dynamically import Leaflet
    import('leaflet').then((L) => {
      // Fix default marker icon issue in Vite/Webpack
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      // Destroy existing map if any
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Create new map
      const map = L.map(mapRef.current!).setView([lat, lng], 15);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Create marker (we'll update it on click)
      const marker = L.marker([lat, lng]).addTo(map);

      // Add click handler to select location on map
      map.on('click', async (e: L.LeafletMouseEvent) => {
        const clickedLat = e.latlng.lat;
        const clickedLng = e.latlng.lng;

        // Update marker position
        marker.setLatLng([clickedLat, clickedLng]);

        // Update form state
        setLatitude(clickedLat.toFixed(6));
        setLongitude(clickedLng.toFixed(6));

        // Reverse geocode to get address
        try {
          const addr = await reverseGeocode(clickedLat, clickedLng);
          setAddress(addr);
        } catch {
          // Keep existing address if geocoding fails
        }
      });

      mapInstanceRef.current = map;

      // Force a resize after a short delay to ensure proper rendering
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    });

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [latitude, longitude]);


  // Loading overlay during project creation
  if (loading) {
    return (
      <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-primary/20 border-t-primary mx-auto"></div>
            <span className="material-symbols-outlined text-4xl text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">auto_awesome</span>
          </div>
          <h2 className="text-2xl font-black text-text-main mb-3">Creating Your Project</h2>
          <p className="text-text-sub mb-6">Our AI is analyzing your land data and generating estimates...</p>
          <div className="flex flex-col gap-3 text-left bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-emerald-500 animate-pulse">check_circle</span>
              <span className="text-sm text-text-main">Validating land parameters</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary animate-spin">progress_activity</span>
              <span className="text-sm text-text-main">Calculating cost estimates</span>
            </div>
            <div className="flex items-center gap-3 opacity-50">
              <span className="material-symbols-outlined text-gray-400">radio_button_unchecked</span>
              <span className="text-sm text-text-sub">Generating 3D model dimensions</span>
            </div>
            <div className="flex items-center gap-3 opacity-50">
              <span className="material-symbols-outlined text-gray-400">radio_button_unchecked</span>
              <span className="text-sm text-text-sub">Fetching weather data</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-grow flex flex-col items-center py-8 px-4 md:px-10 w-full max-w-[1200px] mx-auto">
      <div className="w-full flex flex-wrap gap-2 px-4 py-1 mb-2">
        <a className="text-text-secondary hover:text-primary transition-colors text-sm font-medium leading-normal flex items-center gap-1" href="/projects">
          <span className="material-symbols-outlined text-[18px]">folder</span>
          Projects
        </a>
        <span className="text-text-secondary text-sm font-medium leading-normal">/</span>
        <span className="text-text-main text-sm font-bold leading-normal">New Project</span>
      </div>
      <div className="w-full flex flex-wrap justify-between gap-3 px-4 mb-8">
        <div className="flex w-full flex-col gap-3">
          <h1 className="text-text-main text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Initialize Construction Analysis</h1>
          <p className="text-text-secondary text-base font-normal leading-normal max-w-2xl">
            Enter the raw land parameters below. Our AI will analyze topography and zoning to generate your initial build plan.
          </p>
        </div>
      </div>

      {error && (
        <div className="w-full mb-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600">
          {error}
        </div>
      )}

      <div className="w-full flex flex-col gap-6">
        <div className="bg-surface-light border border-border-light rounded-xl p-6 shadow-sm">
          <label className="flex flex-col w-full">
            <p className="text-text-main text-base font-bold leading-normal pb-3">Project Title</p>
            <input
              className="w-full rounded-lg text-text-main focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-200 bg-white placeholder:text-gray-400 p-4 text-base font-normal leading-normal transition-all shadow-sm"
              placeholder="e.g. Riverside Commercial Complex"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>
        <div className="bg-surface-light border border-border-light rounded-xl p-6 shadow-sm">
          <h2 className="text-text-main text-[22px] font-bold leading-tight tracking-[-0.015em] pb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-transparent bg-clip-text bg-primary-gradient">location_on</span>
            Location Data
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col gap-5">
              <label className="flex flex-col w-full">
                <p className="text-text-main text-sm font-medium leading-normal pb-2">Full Address</p>
                <div className="relative">
                  <input
                    className="w-full rounded-lg text-text-main focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-200 bg-white placeholder:text-gray-400 pl-11 pr-4 py-3 text-base font-normal leading-normal transition-all shadow-sm"
                    placeholder="Enter street address, city, state"
                    type="text"
                    value={address}
                    onChange={(e) => handleAddressChange(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  />
                  <span className="material-symbols-outlined absolute left-3 top-3.5 text-gray-400">search</span>
                  {showSuggestions && suggestions.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg top-full mt-1 max-h-60 overflow-y-auto">
                      {suggestions.map((sugg, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                          onClick={() => {
                            setAddress(sugg.display_name);
                            setLatitude(sugg.lat);
                            setLongitude(sugg.lon);
                            setShowSuggestions(false);
                          }}
                        >
                          {sugg.display_name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  type="button"
                  className="mt-2 px-4 py-2 bg-primary-gradient text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
                  onClick={handleGetCurrentLocation}
                  disabled={locationLoading}
                >
                  <span className="material-symbols-outlined text-base">{locationLoading ? 'refresh' : 'my_location'}</span>
                  {locationLoading ? 'Getting Location...' : 'Use Current Location'}
                </button>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col w-full">
                  <p className="text-text-main text-sm font-medium leading-normal pb-2">Latitude</p>
                  <input
                    className="w-full rounded-lg text-text-main focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-200 bg-white placeholder:text-gray-400 px-4 py-3 text-base font-normal leading-normal transition-all shadow-sm"
                    placeholder="34.0522"
                    type="text"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                  />
                </label>
                <label className="flex flex-col w-full">
                  <p className="text-text-main text-sm font-medium leading-normal pb-2">Longitude</p>
                  <input
                    className="w-full rounded-lg text-text-main focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-200 bg-white placeholder:text-gray-400 px-4 py-3 text-base font-normal leading-normal transition-all shadow-sm"
                    placeholder="-118.2437"
                    type="text"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                  />
                </label>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 flex gap-3 items-start">
                <span className="material-symbols-outlined text-primary text-xl mt-0.5">info</span>
                <p className="text-sm text-text-secondary">
                  Entering precise coordinates helps our AI access more accurate satellite topography data.
                </p>
              </div>
            </div>
            <div ref={mapRef} className="w-full h-64 lg:h-auto min-h-[250px] rounded-lg border border-border-light shadow-sm bg-gray-100 flex items-center justify-center">
              {(!latitude || !longitude || (parseFloat(latitude) === 0 && parseFloat(longitude) === 0)) && (
                <div className="text-center text-gray-400">
                  <span className="material-symbols-outlined text-4xl mb-2">map</span>
                  <p className="text-sm">Enter coordinates or use current location to see map</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-surface-light border border-border-light rounded-xl p-6 shadow-sm">
          <h2 className="text-text-main text-[22px] font-bold leading-tight tracking-[-0.015em] pb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-transparent bg-clip-text bg-primary-gradient">landscape</span>
            Land Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <label className="flex flex-col w-full">
              <div className="flex justify-between items-center pb-2">
                <p className="text-text-main text-sm font-medium leading-normal">Plot Size</p>
                <div className="flex bg-white rounded p-0.5 border border-gray-200">
                  <button
                    type="button"
                    className={`px-2 py-0.5 text-[10px] font-bold rounded shadow-sm transition-all ${plotUnit === 'acres' ? 'bg-primary-gradient text-white' : 'text-text-secondary hover:text-primary'}`}
                    onClick={() => setPlotUnit('acres')}
                  >
                    ACRES
                  </button>
                  <button
                    type="button"
                    className={`px-2 py-0.5 text-[10px] font-bold transition-colors ${plotUnit === 'sqft' ? 'bg-primary-gradient text-white rounded shadow-sm' : 'text-text-secondary hover:text-primary'}`}
                    onClick={() => setPlotUnit('sqft')}
                  >
                    SQ FT
                  </button>
                </div>
              </div>
              <input
                className="w-full rounded-lg text-text-main focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-200 bg-white placeholder:text-gray-400 px-4 py-3 text-base font-normal leading-normal transition-all shadow-sm"
                placeholder="0.00"
                type="number"
                value={plotSize}
                onChange={(e) => setPlotSize(e.target.value)}
              />
            </label>
            <label className="flex flex-col w-full">
              <p className="text-text-main text-sm font-medium leading-normal pb-2">Zoning Type</p>
              <div className="relative">
                <select
                  className="w-full appearance-none rounded-lg text-text-main focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-200 bg-white px-4 py-3 text-base font-normal leading-normal transition-all cursor-pointer shadow-sm"
                  value={zoningType}
                  onChange={(e) => setZoningType(e.target.value)}
                >
                  <option value="" disabled>Select Zoning</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="mixed">Mixed Use</option>
                  <option value="agricultural">Agricultural</option>
                  <option value="institutional">Institutional</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-3.5 text-gray-400 pointer-events-none">expand_more</span>
              </div>
            </label>
            <label className="flex flex-col w-full">
              <p className="text-text-main text-sm font-medium leading-normal pb-2">Topography Estimate</p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  className={`flex flex-col items-center justify-center gap-1 p-2 border rounded-lg transition-all ${topography === 'flat'
                    ? 'border-primary bg-blue-50 ring-1 ring-primary/20'
                    : 'border-gray-200 bg-white hover:border-primary hover:bg-blue-50'
                    } group focus:ring-2 focus:ring-primary/50 focus:border-primary shadow-sm`}
                  onClick={() => setTopography('flat')}
                >
                  <span className={`material-symbols-outlined ${topography === 'flat' ? 'text-primary' : 'text-text-secondary group-hover:text-primary'}`}>horizontal_rule</span>
                  <span className={`text-xs font-medium ${topography === 'flat' ? 'text-primary font-bold' : 'text-text-secondary group-hover:text-primary'}`}>Flat</span>
                </button>
                <button
                  type="button"
                  className={`flex flex-col items-center justify-center gap-1 p-2 border rounded-lg transition-all ${topography === 'sloped'
                    ? 'border-primary bg-blue-50 ring-1 ring-primary/20'
                    : 'border-gray-200 bg-white hover:border-primary hover:bg-blue-50'
                    } group focus:ring-2 focus:ring-primary/50 focus:border-primary shadow-sm`}
                  onClick={() => setTopography('sloped')}
                >
                  <span className={`material-symbols-outlined ${topography === 'sloped' ? 'text-primary' : 'text-text-secondary group-hover:text-primary'}`}>ssid_chart</span>
                  <span className={`text-xs font-medium ${topography === 'sloped' ? 'text-primary font-bold' : 'text-text-secondary group-hover:text-primary'}`}>Sloped</span>
                </button>
                <button
                  type="button"
                  className={`flex flex-col items-center justify-center gap-1 p-2 border rounded-lg transition-all ${topography === 'mixed'
                    ? 'border-primary bg-blue-50 ring-1 ring-primary/20'
                    : 'border-gray-200 bg-white hover:border-primary hover:bg-blue-50'
                    } group focus:ring-2 focus:ring-primary/50 focus:border-primary shadow-sm`}
                  onClick={() => setTopography('mixed')}
                >
                  <span className={`material-symbols-outlined ${topography === 'mixed' ? 'text-primary' : 'text-text-secondary group-hover:text-primary'}`}>terrain</span>
                  <span className={`text-xs font-medium ${topography === 'mixed' ? 'text-primary font-bold' : 'text-text-secondary group-hover:text-primary'}`}>Mixed</span>
                </button>
              </div>
            </label>
          </div>
        </div>

        {/* Building Specifications Section */}
        <div className="bg-surface-light border border-border-light rounded-xl p-6 shadow-sm">
          <h2 className="text-text-main text-[22px] font-bold leading-tight tracking-[-0.015em] pb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-transparent bg-clip-text bg-primary-gradient">home</span>
            Building Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <label className="flex flex-col w-full">
              <p className="text-text-main text-sm font-medium leading-normal pb-2">Number of Floors</p>
              <input
                className="w-full rounded-lg text-text-main focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-200 bg-white placeholder:text-gray-400 px-4 py-3 text-base font-normal leading-normal transition-all shadow-sm"
                placeholder="e.g. 2"
                type="number"
                min="1"
                max="10"
                value={floors}
                onChange={(e) => setFloors(e.target.value)}
              />
            </label>
            <label className="flex flex-col w-full">
              <p className="text-text-main text-sm font-medium leading-normal pb-2">Construction Type</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className={`flex flex-col items-center justify-center gap-1 p-3 border rounded-lg transition-all ${constructionType === 'residential'
                    ? 'border-primary bg-blue-50 ring-1 ring-primary/20'
                    : 'border-gray-200 bg-white hover:border-primary hover:bg-blue-50'
                    } group focus:ring-2 focus:ring-primary/50 focus:border-primary shadow-sm`}
                  onClick={() => setConstructionType('residential')}
                >
                  <span className={`material-symbols-outlined ${constructionType === 'residential' ? 'text-primary' : 'text-text-secondary group-hover:text-primary'}`}>home</span>
                  <span className={`text-xs font-medium ${constructionType === 'residential' ? 'text-primary font-bold' : 'text-text-secondary group-hover:text-primary'}`}>Residential</span>
                </button>
                <button
                  type="button"
                  className={`flex flex-col items-center justify-center gap-1 p-3 border rounded-lg transition-all ${constructionType === 'commercial'
                    ? 'border-primary bg-blue-50 ring-1 ring-primary/20'
                    : 'border-gray-200 bg-white hover:border-primary hover:bg-blue-50'
                    } group focus:ring-2 focus:ring-primary/50 focus:border-primary shadow-sm`}
                  onClick={() => setConstructionType('commercial')}
                >
                  <span className={`material-symbols-outlined ${constructionType === 'commercial' ? 'text-primary' : 'text-text-secondary group-hover:text-primary'}`}>business</span>
                  <span className={`text-xs font-medium ${constructionType === 'commercial' ? 'text-primary font-bold' : 'text-text-secondary group-hover:text-primary'}`}>Commercial</span>
                </button>
              </div>
            </label>
            <label className="flex flex-col w-full">
              <p className="text-text-main text-sm font-medium leading-normal pb-2">Built-up Area %</p>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="30"
                  max="80"
                  value={builtUpPercent}
                  onChange={(e) => setBuiltUpPercent(e.target.value)}
                  className="flex-1"
                />
                <span className="text-text-main font-mono font-bold w-12 text-right">{builtUpPercent}%</span>
              </div>
              <p className="text-text-secondary text-xs mt-1">Coverage of plot area to be built</p>
            </label>
            <label className="flex flex-col w-full">
              <p className="text-text-main text-sm font-medium leading-normal pb-2">Foundation Type</p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  className={`flex flex-col items-center justify-center gap-1 p-2 border rounded-lg transition-all ${foundationType === 'rcc'
                    ? 'border-primary bg-blue-50 ring-1 ring-primary/20'
                    : 'border-gray-200 bg-white hover:border-primary hover:bg-blue-50'
                    } group focus:ring-2 focus:ring-primary/50 focus:border-primary shadow-sm`}
                  onClick={() => setFoundationType('rcc')}
                >
                  <span className={`text-xs font-medium ${foundationType === 'rcc' ? 'text-primary font-bold' : 'text-text-secondary group-hover:text-primary'}`}>RCC</span>
                </button>
                <button
                  type="button"
                  className={`flex flex-col items-center justify-center gap-1 p-2 border rounded-lg transition-all ${foundationType === 'strip'
                    ? 'border-primary bg-blue-50 ring-1 ring-primary/20'
                    : 'border-gray-200 bg-white hover:border-primary hover:bg-blue-50'
                    } group focus:ring-2 focus:ring-primary/50 focus:border-primary shadow-sm`}
                  onClick={() => setFoundationType('strip')}
                >
                  <span className={`text-xs font-medium ${foundationType === 'strip' ? 'text-primary font-bold' : 'text-text-secondary group-hover:text-primary'}`}>Strip</span>
                </button>
                <button
                  type="button"
                  className={`flex flex-col items-center justify-center gap-1 p-2 border rounded-lg transition-all ${foundationType === 'pile'
                    ? 'border-primary bg-blue-50 ring-1 ring-primary/20'
                    : 'border-gray-200 bg-white hover:border-primary hover:bg-blue-50'
                    } group focus:ring-2 focus:ring-primary/50 focus:border-primary shadow-sm`}
                  onClick={() => setFoundationType('pile')}
                >
                  <span className={`text-xs font-medium ${foundationType === 'pile' ? 'text-primary font-bold' : 'text-text-secondary group-hover:text-primary'}`}>Pile</span>
                </button>
              </div>
            </label>
          </div>
        </div>
        <div className="bg-surface-light border border-border-light rounded-xl p-6 shadow-sm">
          <h2 className="text-text-main text-[22px] font-bold leading-tight tracking-[-0.015em] pb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-transparent bg-clip-text bg-primary-gradient">folder_open</span>
            Supporting Documents
          </h2>
          <div className="w-full border-2 border-dashed border-gray-300 hover:border-primary hover:bg-blue-50/50 transition-all rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer group bg-white">
            <div className="size-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
              <span className="material-symbols-outlined text-3xl text-primary">cloud_upload</span>
            </div>
            <p className="text-text-main text-lg font-bold mb-1">Click to upload or drag and drop</p>
            <p className="text-text-secondary text-sm">Survey PDFs, Soil Reports, or CAD files (DWG, DXF)</p>
            <p className="text-text-secondary text-xs mt-4 bg-gray-100 px-2 py-1 rounded">Max file size: 50MB</p>
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4 py-6 border-t border-border-light mt-4">
          <button
            className="w-full md:w-auto px-8 py-3 rounded-lg text-text-secondary hover:text-text-main font-bold text-sm transition-colors"
            onClick={() => navigate('/projects')}
          >
            Cancel and Return
          </button>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <button className="w-full md:w-auto px-6 py-3 rounded-lg border border-gray-300 bg-white text-text-main hover:bg-gray-50 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm">
              <span className="material-symbols-outlined text-lg">save</span>
              Save Draft
            </button>
            <button
              className="w-full md:w-auto px-8 py-3 rounded-lg bg-primary-gradient hover:opacity-90 text-white font-bold text-sm shadow-[0_4px_14px_rgba(0,82,212,0.3)] transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              onClick={handleSubmit}
              disabled={loading}
            >
              <span className="material-symbols-outlined">auto_awesome</span>
              {loading ? 'Creating...' : 'Analyze & Create Project'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NewProjectForm;
