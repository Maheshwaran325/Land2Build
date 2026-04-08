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
    <div className={`flex flex-col gap-2 rounded-xl p-5 border shadow-xl ${data.status === 'good' ? 'border-emerald-500/30 bg-emerald-500/10' :
      data.status === 'warning' ? 'border-amber-500/30 bg-amber-500/10' :
        'border-rose-500/30 bg-rose-500/10'
      }`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-text-main opacity-80">{title}</p>
        <span className={`material-symbols-outlined ${data.status === 'good' ? 'text-emerald-400' :
          data.status === 'warning' ? 'text-amber-400' :
            'text-rose-400'
          }`}>{icon}</span>
      </div>
      <p className={`text-sm font-bold ${data.status === 'good' ? 'text-emerald-300' :
        data.status === 'warning' ? 'text-amber-300' :
          'text-rose-300'
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
        <div className="flex items-center gap-4 bg-surface p-5 rounded-xl border border-border-light shadow-xl">
          <div className="p-3 bg-blue-500/10 rounded-full text-blue-400">
            <span className="material-symbols-outlined">thermostat</span>
          </div>
          <div>
            <p className="text-xs text-text-sub uppercase tracking-wider font-bold">Temperature</p>
            <p className="text-2xl font-black text-text-main font-display">{weather.current.temperature}°C</p>
            <p className="text-xs text-text-sub font-medium">{weather.current.weatherDescription}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-surface p-5 rounded-xl border border-border-light shadow-xl">
          <div className="p-3 bg-emerald-500/10 rounded-full text-emerald-400">
            <span className="material-symbols-outlined">air</span>
          </div>
          <div>
            <p className="text-xs text-text-sub uppercase tracking-wider font-bold">Wind Speed</p>
            <p className="text-2xl font-black text-text-main font-display">{weather.current.windSpeed} km/h</p>
            <p className="text-xs text-text-sub font-medium">Safe for operations</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-surface p-5 rounded-xl border border-border-light shadow-xl">
          <div className="p-3 bg-purple-500/10 rounded-full text-purple-400">
            <span className="material-symbols-outlined">water_drop</span>
          </div>
          <div>
            <p className="text-xs text-text-sub uppercase tracking-wider font-bold">Humidity</p>
            <p className="text-2xl font-black text-text-main font-display">{weather.current.humidity}%</p>
            <p className="text-xs text-text-sub font-medium">Dew point: {weather.current.temperature - 2}°C</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Forecast */}
        <div className="xl:col-span-2 bg-surface border border-border-light rounded-xl p-6 flex flex-col gap-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-text-main text-lg font-bold font-display">16-Day Exact Prediction</h3>
              <p className="text-text-sub text-sm">{insights.general}</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-text-sub font-medium">
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div> Good</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></div> Risk</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]"></div> Bad</div>
            </div>
          </div>

          <div className="grid grid-cols-8 gap-3 overflow-x-auto pb-2 custom-scrollbar">
            {weather.forecast.slice(0, 16).map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-canvas border border-border-light min-w-[70px] hover:border-primary-solid transition-colors group">
                <span className="text-xs text-text-sub font-bold uppercase tracking-wider">
                  {new Date(day.date).toLocaleDateString('en-IN', { weekday: 'short' })}
                </span>
                <div className={`w-3 h-3 rounded-full ${getRiskColor(day)} shadow-[0_0_6px_currentColor]`}></div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-lg font-black text-text-main">{day.tempMax}°</span>
                  <span className="text-xs font-bold text-text-sub">{day.tempMin}°</span>
                </div>
                <div className="flex flex-col items-center mt-1">
                  {day.precipProbability > 0 ? (
                    <span className="text-xs text-blue-400 font-bold flex items-center bg-blue-500/10 px-1.5 py-0.5 rounded"><span className="material-symbols-outlined text-[12px] mr-1">umbrella</span>{day.precipProbability}%</span>
                  ) : <span className="text-xs text-text-sub/50 font-bold px-1.5 py-0.5">—</span>}
                  {day.precipitation > 0 && (
                    <span className="text-[10px] text-text-sub mt-1">{day.precipitation.toFixed(1)}mm</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="bg-surface border border-border-light rounded-xl overflow-hidden shadow-xl flex flex-col">
          <div className="p-4 border-b border-border-light bg-surface z-10">
            <h3 className="text-text-main font-bold font-display">Site Location</h3>
             <p className="text-text-sub text-xs mt-1 font-mono">{Number(project.latitude).toFixed(6)}, {Number(project.longitude).toFixed(6)}</p>
          </div>
          <div ref={mapRef} className="flex-1 min-h-[300px]"></div>
        </div>
      </div>

      {/* Monthly Risk Analysis */}
      <div className="bg-surface border border-border-light rounded-xl p-6 shadow-xl">
        <h3 className="text-text-main text-lg font-bold mb-6 font-display">Long-Term Risk Analysis</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {weather.monthly.map((month, i) => (
            <div key={i} className={`p-5 rounded-xl border flex flex-col gap-1 items-center text-center transition-transform hover:-translate-y-1 ${month.constructionRisk === 'low' ? 'border-emerald-500/30 bg-emerald-500/5' :
              month.constructionRisk === 'medium' ? 'border-amber-500/30 bg-amber-500/5' :
                'border-rose-500/30 bg-rose-500/5'
              }`}>
              <p className="text-text-main font-black text-xl mb-1">{month.month}</p>
              <p className="text-text-sub text-sm font-medium">Avg: {month.avgTemp}°C</p>
              <p className="text-text-sub text-xs">{month.rainyDays} rain days</p>
              <div className="flex-1 content-end w-full mt-3">
                 <span className={`w-full block text-xs font-bold px-2 py-1.5 rounded-lg tracking-wider ${month.constructionRisk === 'low' ? 'text-emerald-400 bg-emerald-500/10' :
                   month.constructionRisk === 'medium' ? 'text-amber-400 bg-amber-500/10' :
                     'text-rose-400 bg-rose-500/10'
                   }`}>
                   {month.constructionRisk.toUpperCase()}
                 </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default WeatherImpact;
