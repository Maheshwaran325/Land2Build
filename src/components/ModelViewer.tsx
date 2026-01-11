const ModelViewer = () => {
  return (
    <main className="flex-1 flex overflow-hidden relative">
      <aside className="w-72 flex-none flex flex-col border-r border-border-light bg-secondary z-10 hidden lg:flex">
        <div className="p-4 border-b border-border-light flex items-center justify-between">
          <h3 className="text-dark-slate font-bold text-sm uppercase tracking-wider">Model Layers</h3>
          <button className="text-subtext hover:text-primary">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
          <div className="group">
            <button className="flex w-full items-center gap-2 p-2 rounded-md hover:bg-white text-left transition-colors">
              <span className="material-symbols-outlined text-subtext text-[20px]">expand_more</span>
              <span className="material-symbols-outlined text-primary text-[20px]">folder</span>
              <span className="flex-1 text-sm text-dark-slate font-medium">Structural</span>
              <span className="material-symbols-outlined text-dark-slate text-[18px] hover:text-primary" role="button">visibility</span>
            </button>
            <div className="pl-9 pr-2 py-1 space-y-1">
              <div className="flex items-center justify-between group/item p-1.5 rounded hover:bg-white cursor-pointer">
                <span className="text-subtext text-sm group-hover/item:text-dark-slate">Foundation</span>
                <span className="material-symbols-outlined text-subtext text-[16px]">visibility</span>
              </div>
              <div className="flex items-center justify-between group/item p-1.5 rounded hover:bg-white cursor-pointer bg-white border-l-2 border-primary shadow-sm">
                <span className="text-primary text-sm font-medium">Framing</span>
                <span className="material-symbols-outlined text-primary text-[16px]">visibility</span>
              </div>
              <div className="flex items-center justify-between group/item p-1.5 rounded hover:bg-white cursor-pointer">
                <span className="text-subtext text-sm group-hover/item:text-dark-slate">Roof Deck</span>
                <span className="material-symbols-outlined text-subtext text-[16px]">visibility</span>
              </div>
            </div>
          </div>
          <div className="group">
            <button className="flex w-full items-center gap-2 p-2 rounded-md hover:bg-white text-left transition-colors">
              <span className="material-symbols-outlined text-subtext text-[20px]">chevron_right</span>
              <span className="material-symbols-outlined text-orange-400 text-[20px]">folder</span>
              <span className="flex-1 text-sm text-subtext font-medium group-hover:text-dark-slate">MEP Systems</span>
              <span className="material-symbols-outlined text-subtext text-[18px] hover:text-dark-slate">visibility_off</span>
            </button>
          </div>
          <div className="group">
            <button className="flex w-full items-center gap-2 p-2 rounded-md hover:bg-white text-left transition-colors">
              <span className="material-symbols-outlined text-subtext text-[20px]">chevron_right</span>
              <span className="material-symbols-outlined text-purple-400 text-[20px]">folder</span>
              <span className="flex-1 text-sm text-subtext font-medium group-hover:text-dark-slate">Architecture</span>
              <span className="material-symbols-outlined text-subtext text-[18px] hover:text-dark-slate">visibility</span>
            </button>
          </div>
        </div>
        <div className="p-4 border-t border-border-light bg-secondary">
          <div className="text-xs text-subtext uppercase tracking-wider mb-2">Context Map</div>
          <div className="h-32 w-full rounded bg-gray-100 relative overflow-hidden bg-cover bg-center opacity-80 hover:opacity-100 transition-opacity cursor-pointer border border-border-light shadow-sm" data-alt="Satellite view of urban area map" data-location="New York" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAfYgolap3QEHQuASb5QPkXD_UZsFNFAFFhgZU-s8IdN8lxmfWWxv6bzxuElT8Kb5nuOvndZu0DgnZL3azWnhAv5jq0_ttcU6BtRt0dfN50HL0aa5oEAl51aI48aV_w0L62GWPjWJmcXP-6swlfL0t4blnrc-Vb49ofNvQQJ4dvPApIvj1RSTevKB0sSx3ZAjRqDEtMKpO0UTPAt-78sECVqscdKoNKGRiIC9psKsrlZVeKGGyrkdCBRgKaP0za4NDq7cKZ8g2o2yEa')" }}>
            <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
              <div className="size-2 bg-primary rounded-full animate-ping"></div>
              <div className="size-2 bg-white rounded-full absolute ring-2 ring-primary"></div>
            </div>
          </div>
        </div>
      </aside>
      <section className="flex-1 relative bg-canvas group/viewport overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-90 transition-transform duration-700 group-hover/viewport:scale-[1.01]" data-alt="3D wireframe render of a modern office building on a dark background" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCNUA5ojCKRBEHj1xIlBX55jGo0LCe6SMDpZpK0YttihiRaoarF6Af66QkEnzE3AWKD8EGy8t7as26zIqLj51YlpOW1vVbM-xa_j1y594EXFXQ1pxcLMRhqTk3fG-HEDUmC0mQX-IP7rMFl8bZED_Rkj83oDvSa8TdwV7R-3i25fzh0zfLZ9a2omJooGppKHDBZyoswPQxuDNgy5iOgo47orlReNqlBqA8jcw6_2NVSEnMAs3wRdjsLOn0Qamq5Hn6dF5stcCInT1_l')" }}>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/10"></div>
        </div>
        <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
          <div className="flex bg-white/90 backdrop-blur-md rounded-lg p-1 border border-border-light shadow-lg">
            <button className="p-2 text-dark-slate hover:bg-gray-100 rounded" title="Rendered View">
              <span className="material-symbols-outlined">view_in_ar</span>
            </button>
            <button className="p-2 text-subtext hover:text-dark-slate hover:bg-gray-100 rounded" title="Wireframe">
              <span className="material-symbols-outlined">grid_4x4</span>
            </button>
            <button className="p-2 text-subtext hover:text-dark-slate hover:bg-gray-100 rounded" title="Heatmap">
              <span className="material-symbols-outlined">local_fire_department</span>
            </button>
            <div className="w-px bg-border-light mx-1 my-1"></div>
            <button className="p-2 text-subtext hover:text-dark-slate hover:bg-gray-100 rounded" title="Day/Night Cycle">
              <span className="material-symbols-outlined">light_mode</span>
            </button>
          </div>
          <div className="bg-white/90 backdrop-blur-md rounded-lg flex items-center h-10 border border-border-light shadow-lg px-3 w-64 transition-all focus-within:w-80 focus-within:ring-2 ring-primary/30">
            <span className="material-symbols-outlined text-subtext text-[20px]">search</span>
            <input className="bg-transparent border-none text-dark-slate text-sm w-full focus:ring-0 placeholder:text-subtext/70 ml-2" placeholder="Search components..." />
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 max-w-full px-4">
          <div className="flex items-center bg-white/95 backdrop-blur-md rounded-xl border border-border-light shadow-2xl p-1.5 gap-1">
            <button className="p-2.5 rounded-lg text-subtext hover:text-dark-slate hover:bg-gray-100 transition-colors tooltip-trigger relative group">
              <span className="material-symbols-outlined">3d_rotation</span>
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-dark-slate text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">Orbit</span>
            </button>
            <button className="p-2.5 rounded-lg text-primary bg-primary/10 border border-primary/20 transition-colors relative group">
              <span className="material-symbols-outlined">pan_tool</span>
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-dark-slate text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">Pan</span>
            </button>
            <button className="p-2.5 rounded-lg text-subtext hover:text-dark-slate hover:bg-gray-100 transition-colors relative group">
              <span className="material-symbols-outlined">zoom_in</span>
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-dark-slate text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">Zoom</span>
            </button>
            <div className="w-px h-6 bg-border-light mx-1"></div>
            <button className="p-2.5 rounded-lg text-subtext hover:text-dark-slate hover:bg-gray-100 transition-colors relative group">
              <span className="material-symbols-outlined">straighten</span>
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-dark-slate text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">Measure</span>
            </button>
            <button className="p-2.5 rounded-lg text-subtext hover:text-dark-slate hover:bg-gray-100 transition-colors relative group">
              <span className="material-symbols-outlined">photo_camera</span>
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-dark-slate text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">Screenshot</span>
            </button>
          </div>
          <button className="hidden lg:flex items-center gap-2 bg-primary-gradient hover:opacity-90 text-white text-sm font-bold px-4 py-2.5 rounded-lg shadow-lg shadow-primary/25 transition-colors whitespace-nowrap">
            <span className="material-symbols-outlined text-[20px]">restart_alt</span>
            Reset View
          </button>
        </div>
        <div className="absolute right-4 bottom-6 flex flex-col items-center gap-2 bg-white/90 backdrop-blur-md p-1 rounded-lg border border-border-light shadow-lg">
          <button className="p-1 text-dark-slate hover:bg-gray-100 rounded"><span className="material-symbols-outlined">add</span></button>
          <div className="h-24 w-1 bg-gray-200 rounded-full relative">
            <div className="absolute bottom-0 left-0 w-full h-2/3 bg-primary rounded-full"></div>
            <div className="absolute bottom-2/3 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border border-gray-300 rounded-full shadow cursor-pointer translate-y-1/2 hover:scale-125 transition"></div>
          </div>
          <button className="p-1 text-dark-slate hover:bg-gray-100 rounded"><span className="material-symbols-outlined">remove</span></button>
        </div>
      </section>
      <aside className="w-80 flex-none flex flex-col border-l border-border-light bg-secondary z-10 lg:relative absolute right-0 h-full lg:h-auto transform lg:transform-none transition-transform duration-300 translate-x-full lg:translate-x-0" id="propertiesPanel">
        <div className="flex border-b border-border-light">
          <button className="flex-1 py-3 text-sm font-bold text-primary border-b-2 border-primary bg-primary/5">Properties</button>
          <button className="flex-1 py-3 text-sm font-medium text-subtext hover:text-dark-slate hover:bg-white/50 transition-colors">Comments</button>
          <button className="flex-1 py-3 text-sm font-medium text-subtext hover:text-dark-slate hover:bg-white/50 transition-colors">History</button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Selected Object</span>
              <span className="bg-gray-200 text-gray-600 text-[10px] px-1.5 py-0.5 rounded">ID: #W-1042</span>
            </div>
            <h2 className="text-xl font-bold text-dark-slate leading-tight">External Wall <br /><span className="text-subtext text-base font-normal">South Face, Level 2</span></h2>
          </div>
          <div className="bg-white rounded-lg p-4 border border-border-light shadow-sm">
            <h4 className="text-dark-slate font-bold text-sm mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">square_foot</span>
              Dimensions
            </h4>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              <div>
                <p className="text-subtext text-xs">Height</p>
                <p className="text-dark-slate text-sm font-mono">3.20 m</p>
              </div>
              <div>
                <p className="text-subtext text-xs">Length</p>
                <p className="text-dark-slate text-sm font-mono">8.50 m</p>
              </div>
              <div>
                <p className="text-subtext text-xs">Thickness</p>
                <p className="text-dark-slate text-sm font-mono">0.30 m</p>
              </div>
              <div>
                <p className="text-subtext text-xs">Area</p>
                <p className="text-dark-slate text-sm font-mono">27.2 m²</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-dark-slate font-bold text-sm">Material Specification</h4>
            <div className="flex items-center gap-3 p-2 rounded-lg bg-white border border-border-light shadow-sm">
              <div className="size-10 rounded bg-gray-200 bg-cover ring-1 ring-black/5" data-alt="Concrete texture swatch" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCssFEkQx3Y0wx_UJo-zWLF1WbO8UO16laO9JmEdIQrrhj-xQAc4f1TRP-xZ0P_DB7DH3oGSEpoOXfQEXJD8DjVHJ8VtNqDDro_cOtac-zuM976hT5M929c26qf8XcYOqoR58VyBVQa2cEHj6rgaUTSSgdcNxQ0-Vez2R0hkzeV34mvbNgKgARazqbAVnAKtraFmrxt2hdX-CJrHy4uvZkKzUhWhQrk6WJFKVztfRdYfdwRRRC-ul6OfCJdn7Psd9uF_Mk7IOan84oJ')" }}></div>
              <div>
                <p className="text-dark-slate text-sm font-medium">Reinforced Concrete</p>
                <p className="text-subtext text-xs">Grade C35/45</p>
              </div>
            </div>
          </div>
          <div className="border-t border-border-light pt-5 mt-2">
            <h4 className="text-dark-slate font-bold text-sm mb-4">Plot 4B Summary</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-subtext">Zoning Compliance</span>
                  <span className="text-green-600 font-bold">98%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[98%] rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-subtext">Estimated Cost</span>
                  <span className="text-dark-slate font-mono">$2.4M</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-subtext">Total Floor Area</span>
                  <span className="text-dark-slate font-mono">12,500 ft²</span>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full py-2 rounded-lg border border-border-light text-subtext text-sm hover:text-primary hover:border-primary hover:bg-primary/5 transition mt-4">
            View Full Cost Report
          </button>
        </div>
      </aside>
    </main>
  );
};

export default ModelViewer;
