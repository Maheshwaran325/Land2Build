import { useEffect, useRef } from 'react';
import type L from 'leaflet';
import type { Project } from '../db';
import { getConstructionInsights, type WeatherData, type ForecastDay } from '../services/weatherService';

interface WeatherImpactProps {
  project: Project;
  weather: WeatherData | null;
  loading: boolean;
  error: string;
}

const WeatherImpact = ({ project, weather, loading, error }: WeatherImpactProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Initialize Leaflet map
  // Initialize Leaflet map
  useEffect(() => {
    let isMounted = true;
    const lat = parseFloat(project.latitude);
    const lng = parseFloat(project.longitude);

    if (!mapRef.current || isNaN(lat) || isNaN(lng)) return;

    import('leaflet').then((L) => {
      if (!isMounted) return;

      // Fix default marker icon
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const map = L.map(mapRef.current!).setView([lat, lng], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
      }).addTo(map);
      L.marker([lat, lng]).addTo(map).bindPopup(`<b>${project.title}</b><br>${project.address}`);

      mapInstanceRef.current = map;

      // Invalidate size after a longer delay to ensure container is rendered
      setTimeout(() => {
        if (isMounted && map) {
          map.invalidateSize();
        }
      }, 200);
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [project.latitude, project.longitude]);

  const getRiskColor = (day: ForecastDay) => {
    if (day.isGoodForConstruction) return 'bg-emerald-500';
    if (day.precipitation > 10) return 'bg-rose-500';
    return 'bg-amber-500';
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-text-sub">Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-red-500">
          <span className="material-symbols-outlined text-4xl mb-2">error</span>
          <p>{error || 'Failed to load weather data'}</p>
        </div>
      </div>
    );
  }

  const insights = getConstructionInsights(weather);

  const InsightCard = ({ title, icon, data }: { title: string, icon: string, data: { status: string, message: string } }) => (
    <div className={`flex flex-col gap-2 rounded-xl p-4 border ${data.status === 'good' ? 'border-emerald-200 bg-emerald-50' :
      data.status === 'warning' ? 'border-amber-200 bg-amber-50' :
        'border-rose-200 bg-rose-50'
      }`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider opacity-70">{title}</p>
        <span className={`material-symbols-outlined ${data.status === 'good' ? 'text-emerald-600' :
          data.status === 'warning' ? 'text-amber-600' :
            'text-rose-600'
          }`}>{icon}</span>
      </div>
      <p className={`text-sm font-bold ${data.status === 'good' ? 'text-emerald-800' :
        data.status === 'warning' ? 'text-amber-800' :
          'text-rose-800'
        }`}>{data.message}</p>
    </div>
  );

  return (
    <main className="flex-1 px-4 md:px-10 py-8 max-w-[1440px] mx-auto w-full flex flex-col gap-6 overflow-y-auto">
      {/* Real-time Activity Suitability Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <InsightCard title="Concrete Pouring" icon="construction" data={insights.concrete} />
        <InsightCard title="Painting & Finish" icon="format_paint" data={insights.painting} />
        <InsightCard title="Crane Ops" icon="engineering" data={insights.crane} />
        <InsightCard title="Excavation" icon="terrain" data={insights.excavation} />
      </div>

      {/* Current Conditions Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-border-light shadow-sm">
          <div className="p-3 bg-blue-50 rounded-full text-blue-600">
            <span className="material-symbols-outlined">thermostat</span>
          </div>
          <div>
            <p className="text-xs text-subtext uppercase font-bold">Temperature</p>
            <p className="text-xl font-bold text-dark-slate">{weather.current.temperature}°C</p>
            <p className="text-xs text-subtext">{weather.current.weatherDescription}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-border-light shadow-sm">
          <div className="p-3 bg-blue-50 rounded-full text-blue-600">
            <span className="material-symbols-outlined">air</span>
          </div>
          <div>
            <p className="text-xs text-subtext uppercase font-bold">Wind Speed</p>
            <p className="text-xl font-bold text-dark-slate">{weather.current.windSpeed} km/h</p>
            <p className="text-xs text-subtext">Direction: Variable</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-border-light shadow-sm">
          <div className="p-3 bg-blue-50 rounded-full text-blue-600">
            <span className="material-symbols-outlined">water_drop</span>
          </div>
          <div>
            <p className="text-xs text-subtext uppercase font-bold">Humidity</p>
            <p className="text-xl font-bold text-dark-slate">{weather.current.humidity}%</p>
            <p className="text-xs text-subtext">Dew point: {weather.current.temperature - 2}°C</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Forecast */}
        <div className="xl:col-span-2 bg-white border border-border-light rounded-xl p-6 flex flex-col gap-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-text-main text-lg font-bold">16-Day Construction Outlook</h3>
              <p className="text-text-sub text-sm">{insights.general}</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-text-main">
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-emerald-500"></div> Good</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-amber-500"></div> Risk</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-rose-500"></div> Bad</div>
            </div>
          </div>

          <div className="grid grid-cols-8 gap-2 overflow-x-auto">
            {weather.forecast.slice(0, 16).map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-gray-50 min-w-[70px]">
                <span className="text-xs text-text-sub font-medium">
                  {new Date(day.date).toLocaleDateString('en-IN', { weekday: 'short' })}
                </span>
                <div className={`w-4 h-4 rounded-full ${getRiskColor(day)}`}></div>
                <span className="text-sm font-bold text-text-main">{day.tempMax}°</span>
                <span className="text-xs text-text-sub">{day.tempMin}°</span>
                {day.precipitation > 0 && (
                  <span className="text-xs text-blue-500">{Math.round(day.precipitation)}mm</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="bg-white border border-border-light rounded-xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-border-light">
            <h3 className="text-text-main font-bold">Site Location</h3>
            <p className="text-text-sub text-sm">{project.latitude}, {project.longitude}</p>
          </div>
          <div ref={mapRef} className="h-[300px] bg-gray-100"></div>
        </div>
      </div>

      {/* Monthly Risk Analysis */}
      <div className="bg-white border border-border-light rounded-xl p-6 shadow-sm">
        <h3 className="text-text-main text-lg font-bold mb-4">Monthly Construction Risk</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {weather.monthly.map((month, i) => (
            <div key={i} className={`p-4 rounded-lg border ${month.constructionRisk === 'low' ? 'border-emerald-200 bg-emerald-50' :
              month.constructionRisk === 'medium' ? 'border-amber-200 bg-amber-50' :
                'border-rose-200 bg-rose-50'
              }`}>
              <p className="text-text-main font-bold text-lg">{month.month}</p>
              <p className="text-text-sub text-sm">Avg: {month.avgTemp}°C</p>
              <p className="text-text-sub text-sm">{month.rainyDays} rainy days</p>
              <span className={`inline-block mt-2 text-xs font-bold px-2 py-1 rounded ${month.constructionRisk === 'low' ? 'text-emerald-700 bg-emerald-100' :
                month.constructionRisk === 'medium' ? 'text-amber-700 bg-amber-100' :
                  'text-rose-700 bg-rose-100'
                }`}>
                {month.constructionRisk.toUpperCase()} RISK
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default WeatherImpact;
