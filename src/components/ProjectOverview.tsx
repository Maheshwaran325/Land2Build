import type { Project } from '../db';

interface ProjectOverviewProps {
  project: Project;
}

const ProjectOverview = ({ project }: ProjectOverviewProps) => {
  // Calculate cost breakdown (mock percentages)
  const costBreakdown = {
    structure: { pct: 40, amount: Math.round(project.estimatedCost * 0.4) },
    interior: { pct: 30, amount: Math.round(project.estimatedCost * 0.3) },
    mep: { pct: 20, amount: Math.round(project.estimatedCost * 0.2) },
    logistics: { pct: 10, amount: Math.round(project.estimatedCost * 0.1) }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `₹${Math.round(amount / 1000)}k`;
    return `₹${amount}`;
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-10 scrollbar-thin">
      <div className="max-w-[1600px] mx-auto flex flex-col gap-6">
        {/* Project Info Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-xl p-5 mb-2">
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-primary text-2xl mt-1">location_on</span>
            <div>
              <p className="text-text-main font-bold">{project.address || 'No address specified'}</p>
              <p className="text-sm text-text-sub">
                {project.latitude} / {project.longitude} • {project.plotSize} {project.plotUnit} • {project.zoningType.charAt(0).toUpperCase() + project.zoningType.slice(1)} Zone • {project.topography.charAt(0).toUpperCase() + project.topography.slice(1)} Terrain
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-secondary p-5 rounded-xl border border-border-sub flex flex-col gap-1 hover:border-blue-200 transition-colors">
            <p className="text-text-sub text-sm font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-solid">square_foot</span> Total Area
            </p>
            <p className="text-2xl font-bold text-text-main">{project.totalArea.toLocaleString('en-IN')} <span className="text-lg text-text-sub font-normal">Sq. Ft</span></p>
          </div>
          <div className="bg-secondary p-5 rounded-xl border border-border-sub flex flex-col gap-1 hover:border-blue-200 transition-colors">
            <p className="text-text-sub text-sm font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-purple-500">layers</span> Floors
            </p>
            <p className="text-2xl font-bold text-text-main">{project.floors} <span className="text-lg text-text-sub font-normal">{project.hasBasement ? '+ Basement' : ''}</span></p>
          </div>
          <div className="bg-secondary p-5 rounded-xl border border-border-sub flex flex-col gap-1 hover:border-blue-200 transition-colors">
            <p className="text-text-sub text-sm font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-green-600">calendar_month</span> Est. Timeline
            </p>
            <p className="text-2xl font-bold text-text-main">{project.estimatedTimeline} <span className="text-lg text-text-sub font-normal">Months</span></p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-blue-100 flex flex-col gap-1 relative overflow-hidden group cursor-pointer shadow-sm">
            <div className="absolute inset-0 bg-primary-gradient opacity-5"></div>
            <div className="absolute top-0 right-0 p-2 opacity-50 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-primary-solid">arrow_outward</span>
            </div>
            <p className="text-primary-solid text-sm font-bold flex items-center gap-2 uppercase tracking-wide relative z-10">
              <span className="material-symbols-outlined text-base">smart_toy</span> AI Optimization
            </p>
            <p className="text-sm font-medium text-text-main mt-1 leading-snug relative z-10">Switching to steel framing could reduce timeline by <span className="text-primary-solid font-bold">12%</span>.</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 3D Preview */}
          <div className="lg:col-span-2 flex flex-col bg-secondary rounded-xl border border-border-sub overflow-hidden shadow-sm min-h-[500px]">
            <div className="p-4 border-b border-border-sub flex justify-between items-center bg-white">
              <h3 className="text-text-main font-bold text-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-solid">view_in_ar</span>
                Interactive 3D Preview
              </h3>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded bg-secondary hover:bg-gray-200 flex items-center justify-center text-text-sub hover:text-text-main transition-colors border border-border-sub">
                  <span className="material-symbols-outlined text-sm">open_with</span>
                </button>
                <button className="w-8 h-8 rounded bg-secondary hover:bg-gray-200 flex items-center justify-center text-text-sub hover:text-text-main transition-colors border border-border-sub">
                  <span className="material-symbols-outlined text-sm">zoom_in</span>
                </button>
                <button className="w-8 h-8 rounded bg-secondary hover:bg-gray-200 flex items-center justify-center text-text-sub hover:text-text-main transition-colors border border-border-sub">
                  <span className="material-symbols-outlined text-sm">360</span>
                </button>
              </div>
            </div>
            <div className="relative flex-1 bg-gray-100 group">
              <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1629814596130-1b777496035c?q=80&w=2757&auto=format&fit=crop')] bg-cover bg-center mix-blend-multiply"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4/5 h-4/5 bg-contain bg-center bg-no-repeat drop-shadow-xl transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAixRP8z-oZrHMVHOLAFpDoFXNwkYlDVGCHukWCNj8-sZPeo3eKAlee21gUmQJfUJ4ALKUdl7WYa7VD1o_GkMf1h-mh0710LVjcHGqB7PVmyrf50t8IlA9M40rALOxsKfyHCcy4Fihsla5PAsX9haLf7uhR69QQo492ghOXGX3GhOm1EAW2HtzGj7ovCVQpVRyGFKqI2Pc-I9EePncaLIp4WqF8hENgDv4a5Pns0wdHkkLrChwejkVHn0kdLMvsVmISmJXOM-qi-nQm')" }}>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
                <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-white/40 shadow-sm pointer-events-auto">
                  <p className="text-xs text-text-sub uppercase tracking-wider mb-1">Current View</p>
                  <p className="text-text-main font-bold text-sm">South-West Elevation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cost & Materials */}
          <div className="flex flex-col gap-6">
            <div className="bg-secondary rounded-xl border border-border-sub p-6 shadow-sm flex flex-col gap-6">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-text-sub font-medium text-sm">Total Estimated Cost</h3>
                  <button className="text-primary-solid text-xs font-bold hover:underline">View Details</button>
                </div>
                <p className="text-4xl font-black text-text-main tracking-tight">₹{project.estimatedCost.toLocaleString('en-IN')}</p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-text-main">Structure & Shell</span>
                    <span className="text-text-sub">{costBreakdown.structure.pct}% ({formatCurrency(costBreakdown.structure.amount)})</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-gradient rounded-full" style={{ width: `${costBreakdown.structure.pct}%` }}></div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-text-main">Interior Finish</span>
                    <span className="text-text-sub">{costBreakdown.interior.pct}% ({formatCurrency(costBreakdown.interior.amount)})</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: `${costBreakdown.interior.pct}%` }}></div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-text-main">MEP (Mech, Elec, Plumb)</span>
                    <span className="text-text-sub">{costBreakdown.mep.pct}% ({formatCurrency(costBreakdown.mep.amount)})</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 rounded-full" style={{ width: `${costBreakdown.mep.pct}%` }}></div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-text-main">Logistics & Fees</span>
                    <span className="text-text-sub">{costBreakdown.logistics.pct}% ({formatCurrency(costBreakdown.logistics.amount)})</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400 rounded-full" style={{ width: `${costBreakdown.logistics.pct}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-secondary rounded-xl border border-border-sub p-0 flex-1 flex flex-col overflow-hidden shadow-sm">
              <div className="p-5 border-b border-border-sub flex justify-between items-center bg-white">
                <h3 className="text-text-main font-bold text-sm">Key Materials</h3>
                <span className="material-symbols-outlined text-text-sub text-lg">inventory_2</span>
              </div>
              <div className="flex-1 overflow-y-auto">
                <table className="w-full text-left border-collapse">
                  <tbody className="text-sm">
                    <tr className="border-b border-border-sub hover:bg-white transition-colors">
                      <td className="p-4 text-text-main font-medium">Concrete (C25)</td>
                      <td className="p-4 text-right text-text-sub">{Math.round(project.totalArea * 0.16)} tons</td>
                    </tr>
                    <tr className="border-b border-border-sub hover:bg-white transition-colors">
                      <td className="p-4 text-text-main font-medium">Structural Steel</td>
                      <td className="p-4 text-right text-text-sub">{Math.round(project.totalArea * 0.05)} tons</td>
                    </tr>
                    <tr className="border-b border-border-sub hover:bg-white transition-colors">
                      <td className="p-4 text-text-main font-medium">Lumber (2x4)</td>
                      <td className="p-4 text-right text-text-sub">{Math.round(project.totalArea * 0.35)} units</td>
                    </tr>
                    <tr className="border-b border-border-sub hover:bg-white transition-colors">
                      <td className="p-4 text-text-main font-medium">Glass Panes</td>
                      <td className="p-4 text-right text-text-sub">{Math.round(project.totalArea * 0.18)} sq ft</td>
                    </tr>
                    <tr className="hover:bg-white transition-colors">
                      <td className="p-4 text-text-main font-medium">Roofing Tiles</td>
                      <td className="p-4 text-right text-text-sub">{Math.round(project.totalArea * 0.86)} pcs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-3 border-t border-border-sub bg-white text-center">
                <button className="text-primary-solid text-xs font-bold hover:text-blue-700 transition-colors">View Full Bill of Quantities</button>
              </div>
            </div>
          </div>
        </div>

        {/* Construction Phases */}
        <div className="bg-secondary rounded-xl border border-border-sub p-6 shadow-sm mb-6">
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <h3 className="text-text-main font-bold text-lg">Construction Phases</h3>
            <div className="flex gap-2 text-sm">
              <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-200 font-bold">On Track</span>
              <span className="px-3 py-1 rounded-full bg-white text-text-sub border border-border-sub">Phase 1: Foundation</span>
            </div>
          </div>
          <div className="relative pt-6 pb-2">
            <div className="absolute top-[36px] left-0 right-0 h-1 bg-gray-200 rounded-full"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              <div className="flex flex-col gap-2 relative group">
                <div className="w-5 h-5 rounded-full bg-primary-solid border-4 border-white relative z-10 mb-2 shadow-[0_0_0_4px_rgba(0,82,212,0.2)]"></div>
                <p className="text-text-main font-bold text-sm">Foundation</p>
                <p className="text-text-sub text-xs">Month 1 - {Math.ceil(project.estimatedTimeline * 0.15)}</p>
              </div>
              <div className="flex flex-col gap-2 relative group opacity-50">
                <div className="w-5 h-5 rounded-full bg-gray-300 border-4 border-white relative z-10 mb-2 ring-1 ring-gray-200"></div>
                <p className="text-text-main font-bold text-sm">Structure</p>
                <p className="text-text-sub text-xs">Month {Math.ceil(project.estimatedTimeline * 0.15) + 1} - {Math.ceil(project.estimatedTimeline * 0.45)}</p>
              </div>
              <div className="flex flex-col gap-2 relative group opacity-50">
                <div className="w-5 h-5 rounded-full bg-gray-300 border-4 border-white relative z-10 mb-2 ring-1 ring-gray-200"></div>
                <p className="text-text-main font-bold text-sm">Enclosure</p>
                <p className="text-text-sub text-xs">Month {Math.ceil(project.estimatedTimeline * 0.45) + 1} - {Math.ceil(project.estimatedTimeline * 0.7)}</p>
              </div>
              <div className="flex flex-col gap-2 relative group opacity-50">
                <div className="w-5 h-5 rounded-full bg-gray-300 border-4 border-white relative z-10 mb-2 ring-1 ring-gray-200"></div>
                <p className="text-text-main font-bold text-sm">Finishing</p>
                <p className="text-text-sub text-xs">Month {Math.ceil(project.estimatedTimeline * 0.7) + 1} - {project.estimatedTimeline}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
