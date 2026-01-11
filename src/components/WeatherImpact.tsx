const WeatherImpact = () => {
  return (
    <main className="flex-1 px-4 md:px-10 py-8 max-w-[1440px] mx-auto w-full flex flex-col gap-6">
      <div className="flex flex-wrap justify-between items-end gap-4 pb-2 border-b border-border-light">
        <div className="flex min-w-72 flex-col gap-2">
          <div className="flex items-center gap-2 text-primary-blue text-sm font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-sm">location_on</span>
            Site 4B • Coordinates: 34.05° N, 118.24° W
          </div>
          <h1 className="text-text-main text-3xl md:text-4xl font-black leading-tight tracking-[-0.02em]">Project Alpha: Weather Impact</h1>
          <p className="text-text-muted text-base font-normal">Correlated meteorological data & construction phase planning.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex h-10 px-4 bg-white hover:bg-gray-50 transition-colors text-text-main text-sm font-bold items-center justify-center rounded-lg gap-2 border border-border-light shadow-sm">
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            <span>Oct 14 - Oct 28</span>
          </button>
          <button className="flex h-10 px-4 bg-white hover:bg-gray-50 transition-colors text-text-main text-sm font-bold items-center justify-center rounded-lg gap-2 border border-border-light shadow-sm">
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span className="truncate">Export Report</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative overflow-hidden flex flex-col gap-2 rounded-xl p-6 border border-blue-100 bg-surface group hover:border-blue-300 transition-colors shadow-sm">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-100/50 rounded-full blur-2xl group-hover:bg-blue-200/50 transition-all"></div>
          <div className="flex items-center justify-between z-10">
            <p className="text-text-muted text-sm font-medium uppercase tracking-wider">Buildability Score</p>
            <span className="material-symbols-outlined text-primary-blue">verified</span>
          </div>
          <div className="flex items-end gap-2 z-10">
            <p className="text-text-main text-4xl font-black leading-none">85%</p>
            <p className="text-emerald-600 text-sm font-bold mb-1">Favorable</p>
          </div>
          <p className="text-emerald-600 text-xs font-medium mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            +5% vs last week
          </p>
        </div>
        <div className="flex flex-col gap-2 rounded-xl p-6 border border-border-light bg-surface shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-text-muted text-sm font-medium uppercase tracking-wider">Current Temp</p>
            <span className="material-symbols-outlined text-text-muted">thermostat</span>
          </div>
          <p className="text-text-main text-3xl font-bold leading-tight">72°F</p>
          <p className="text-text-muted text-sm font-medium mt-1">Feels like 74° • Partly Cloudy</p>
        </div>
        <div className="flex flex-col gap-2 rounded-xl p-6 border border-border-light bg-surface shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-text-muted text-sm font-medium uppercase tracking-wider">Wind Speed</p>
            <span className="material-symbols-outlined text-text-muted">air</span>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-text-main text-3xl font-bold leading-tight">12 <span className="text-lg text-text-muted font-normal">mph</span></p>
            <span className="bg-gray-200 text-xs px-2 py-1 rounded text-text-main font-bold">NW</span>
          </div>
          <p className="text-amber-600 text-sm font-medium mt-1">Caution: Gusts 15mph</p>
        </div>
        <div className="flex flex-col gap-2 rounded-xl p-6 border border-border-light bg-surface shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-text-muted text-sm font-medium uppercase tracking-wider">Precipitation</p>
            <span className="material-symbols-outlined text-text-muted">water_drop</span>
          </div>
          <p className="text-text-main text-3xl font-bold leading-tight">0%</p>
          <p className="text-text-muted text-sm font-medium mt-1">Next rain expected: 4 days</p>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 min-h-[400px]">
        <div className="xl:col-span-2 bg-surface border border-border-light rounded-xl p-6 flex flex-col gap-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-text-main text-lg font-bold">14-Day Operational Outlook</h3>
              <p className="text-text-muted text-sm">Forecasted conditions correlated with risk levels.</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-text-main">
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-emerald-500"></div> Optimal</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-amber-500"></div> Risk</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-rose-500"></div> High Risk</div>
            </div>
          </div>
          <div className="flex-1 flex items-end gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-4 min-h-[240px]">
            <div className="flex flex-col items-center gap-2 flex-1 min-w-[40px] group cursor-pointer">
              <div className="relative w-full h-[180px] bg-white border border-border-light rounded-lg overflow-hidden flex items-end group-hover:bg-gray-50 transition-colors">
                <div className="w-full h-[70%] bg-emerald-500 rounded-b-lg group-hover:bg-emerald-400 transition-colors relative">
                  <div className="absolute -top-6 w-full text-center text-xs font-bold text-text-main hidden group-hover:block">72°</div>
                </div>
              </div>
              <span className="text-xs text-text-muted font-medium">Mon</span>
            </div>
            <div className="flex flex-col items-center gap-2 flex-1 min-w-[40px] group cursor-pointer">
              <div className="relative w-full h-[180px] bg-white border border-border-light rounded-lg overflow-hidden flex items-end group-hover:bg-gray-50 transition-colors">
                <div className="w-full h-[75%] bg-emerald-500 rounded-b-lg group-hover:bg-emerald-400 transition-colors relative">
                  <div className="absolute -top-6 w-full text-center text-xs font-bold text-text-main hidden group-hover:block">74°</div>
                </div>
              </div>
              <span className="text-xs text-text-muted font-medium">Tue</span>
            </div>
            <div className="flex flex-col items-center gap-2 flex-1 min-w-[40px] group cursor-pointer">
              <div className="relative w-full h-[180px] bg-white border border-border-light rounded-lg overflow-hidden flex items-end group-hover:bg-gray-50 transition-colors">
                <div className="w-full h-[65%] bg-amber-500 rounded-b-lg group-hover:bg-amber-400 transition-colors relative">
                  <div className="absolute -top-6 w-full text-center text-xs font-bold text-text-main hidden group-hover:block">68°</div>
                  <div className="absolute bottom-2 left-0 w-full flex justify-center text-white/70"><span className="material-symbols-outlined text-[16px]">air</span></div>
                </div>
              </div>
              <span className="text-xs text-text-main font-bold">Wed</span>
            </div>
            <div className="flex flex-col items-center gap-2 flex-1 min-w-[40px] group cursor-pointer">
              <div className="relative w-full h-[180px] bg-white border border-border-light rounded-lg overflow-hidden flex items-end group-hover:bg-gray-50 transition-colors">
                <div className="w-full h-[40%] bg-rose-500 rounded-b-lg group-hover:bg-rose-400 transition-colors relative">
                  <div className="absolute -top-6 w-full text-center text-xs font-bold text-text-main hidden group-hover:block">55°</div>
                  <div className="absolute bottom-2 left-0 w-full flex justify-center text-white"><span className="material-symbols-outlined text-[16px]">rainy</span></div>
                </div>
              </div>
              <span className="text-xs text-text-muted font-medium">Thu</span>
            </div>
            <div className="flex flex-col items-center gap-2 flex-1 min-w-[40px] group cursor-pointer">
              <div className="relative w-full h-[180px] bg-white border border-border-light rounded-lg overflow-hidden flex items-end group-hover:bg-gray-50 transition-colors">
                <div className="w-full h-[45%] bg-amber-500 rounded-b-lg group-hover:bg-amber-400 transition-colors relative">
                  <div className="absolute -top-6 w-full text-center text-xs font-bold text-text-main hidden group-hover:block">58°</div>
                  <div className="absolute bottom-2 left-0 w-full flex justify-center text-white/70"><span className="material-symbols-outlined text-[16px]">rainy</span></div>
                </div>
              </div>
              <span className="text-xs text-text-muted font-medium">Fri</span>
            </div>
            <div className="flex flex-col items-center gap-2 flex-1 min-w-[40px] group cursor-pointer">
              <div className="relative w-full h-[180px] bg-white border border-border-light rounded-lg overflow-hidden flex items-end group-hover:bg-gray-50 transition-colors">
                <div className="w-full h-[60%] bg-emerald-500 rounded-b-lg group-hover:bg-emerald-400 transition-colors relative">
                  <div className="absolute -top-6 w-full text-center text-xs font-bold text-text-main hidden group-hover:block">65°</div>
                </div>
              </div>
              <span className="text-xs text-text-muted font-medium">Sat</span>
            </div>
            <div className="flex flex-col items-center gap-2 flex-1 min-w-[40px] group cursor-pointer">
              <div className="relative w-full h-[180px] bg-white border border-border-light rounded-lg overflow-hidden flex items-end group-hover:bg-gray-50 transition-colors">
                <div className="w-full h-[70%] bg-emerald-500 rounded-b-lg group-hover:bg-emerald-400 transition-colors relative">
                  <div className="absolute -top-6 w-full text-center text-xs font-bold text-text-main hidden group-hover:block">69°</div>
                </div>
              </div>
              <span className="text-xs text-text-muted font-medium">Sun</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 bg-surface border border-border-light rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-text-main text-base font-bold">Interactive Radar</h3>
            <div className="flex gap-2">
              <button className="size-8 flex items-center justify-center rounded-lg bg-white border border-border-light text-text-main hover:text-primary-blue hover:border-primary-blue transition-colors shadow-sm"><span className="material-symbols-outlined text-[18px]">layers</span></button>
              <button className="size-8 flex items-center justify-center rounded-lg bg-white border border-border-light text-text-main hover:text-primary-blue hover:border-primary-blue transition-colors shadow-sm"><span className="material-symbols-outlined text-[18px]">zoom_out_map</span></button>
            </div>
          </div>
          <div className="relative w-full h-full min-h-[240px] rounded-lg overflow-hidden group border border-border-light">
            <div className="w-full h-full bg-cover bg-center" data-alt="Satellite map view of a construction site with weather radar overlay showing clouds approaching" data-location="Los Angeles" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuANQ9Ga1zYeXhNZBN92Iz_MH62e9OHh25qfuTvJDYuHMm6j32Zto19DADaXAj6Un67YRNI8q1Qp5CJmSkQQNLj511bASCMPRSPu6RFS__5BBQZSpMtu1peFau22d4h-GIGvOL6yuH6fumCwE_0G-vZKXdOWdRjzETmms6Q4i-X5jQGm6cf_z0n4dCgdAHE8zWnrBfiJAe9kB8dziKiL6z0Iu3I0tm6RZQKu80RFI8v8KmTuVtxOEnrjXNEBtcqt3fM9AQ_iOJyXqsze')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-blue-900/30 opacity-60"></div>
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-md border border-border-light shadow-sm">
              <div className="flex items-center gap-2">
                <span className="animate-pulse size-2 rounded-full bg-green-500"></span>
                <span className="text-xs text-text-main font-bold">Live Doppler</span>
              </div>
            </div>
          </div>
          <div className="p-3 bg-white rounded-lg border border-border-light">
            <p className="text-xs text-text-muted">Incoming storm front from NW estimated to reach site in <span className="text-text-main font-bold">72 hours</span>.</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary-blue">smart_toy</span>
            <h3 className="text-text-main text-xl font-bold">AI Planning Recommendations</h3>
          </div>
          <div className="flex gap-4 p-4 rounded-xl bg-surface border border-border-light border-l-4 border-l-rose-500 hover:bg-gray-50 transition-colors shadow-sm">
            <div className="min-w-10 size-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
              <span className="material-symbols-outlined">warning</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="text-text-main font-bold text-base">Reschedule Excavation Phase</h4>
                <button className="text-xs font-medium text-primary-blue hover:text-blue-700 transition-colors">Update Plan</button>
              </div>
              <p className="text-text-muted text-sm mt-1">High precipitation forecast for Thursday poses significant erosion risk to open trenches.</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 rounded-xl bg-surface border border-border-light border-l-4 border-l-amber-500 hover:bg-gray-50 transition-colors shadow-sm">
            <div className="min-w-10 size-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <span className="material-symbols-outlined">wind_power</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="text-text-main font-bold text-base">Crane Operation Alert</h4>
                <button className="text-xs font-medium text-primary-blue hover:text-blue-700 transition-colors">View Details</button>
              </div>
              <p className="text-text-muted text-sm mt-1">Wind gusts &gt;15mph predicted for Wednesday afternoon. Secure loads and monitor hourly.</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 rounded-xl bg-surface border border-border-light border-l-4 border-l-emerald-500 hover:bg-gray-50 transition-colors shadow-sm">
            <div className="min-w-10 size-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <span className="material-symbols-outlined">calendar_month</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="text-text-main font-bold text-base">Optimal Concrete Window</h4>
                <button className="text-xs font-medium text-primary-blue hover:text-blue-700 transition-colors">Apply</button>
              </div>
              <p className="text-text-muted text-sm mt-1">Tuesday offers ideal humidity and temperature range for foundation pouring.</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-text-muted">checklist</span>
            <h3 className="text-text-main text-xl font-bold">Operational Thresholds</h3>
          </div>
          <div className="flex flex-col gap-3 bg-surface border border-border-light rounded-xl p-6 shadow-sm">
            <div className="flex flex-col gap-2 pb-4 border-b border-border-light">
              <div className="flex justify-between items-center">
                <span className="text-text-main text-sm font-bold">Crane Wind Limit</span>
                <span className="text-amber-600 text-xs font-bold px-2 py-0.5 bg-amber-100 rounded">Warning</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-text-muted">
                <span>Current: 12mph (Gusts 15)</span>
                <span>Limit: 20mph</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 pb-4 border-b border-border-light">
              <div className="flex justify-between items-center">
                <span className="text-text-main text-sm font-bold">Concrete Curing Temp</span>
                <span className="text-emerald-600 text-xs font-bold px-2 py-0.5 bg-emerald-100 rounded">Optimal</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-text-muted">
                <span>Current: 72°F</span>
                <span>Range: 50°F - 90°F</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-text-main text-sm font-bold">Painting/Finishing Humidity</span>
                <span className="text-text-muted text-xs font-bold px-2 py-0.5 bg-gray-200 rounded">Stable</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary-gradient h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-text-muted">
                <span>Current: 45%</span>
                <span>Max: 85%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WeatherImpact;
