import { useState, useMemo } from 'react';
import type { Project } from '../db';

interface CostAnalysisProps {
  project?: Project;
}

const CATEGORY_ICONS: Record<string, string> = {
  structural: 'foundation',
  finishing: 'format_paint',
  electrical: 'electrical_services',
  plumbing: 'plumbing'
};

const RISK_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  low: { bg: 'bg-[#0bda57]/10', text: 'text-[#0bda57]', border: 'border-[#0bda57]/20' },
  medium: { bg: 'bg-yellow-500/10', text: 'text-yellow-600', border: 'border-yellow-500/20' },
  high: { bg: 'bg-[#fa5f38]/10', text: 'text-[#fa5f38]', border: 'border-[#fa5f38]/20' }
};

const CostAnalysis = ({ project }: CostAnalysisProps) => {
  const materials = project?.materials || [];
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Calculate totals from materials
  const totals = useMemo(() => {
    const totalCost = materials.reduce((sum, m) => sum + m.totalPrice, 0);
    const builtUpArea = project ? Math.round(project.plotSize * project.builtUpPercent / 100) : 1000;
    return {
      totalCost,
      costPerSqFt: Math.round(totalCost / builtUpArea),
      materialCount: materials.length,
      procuredPercent: 45 // Mock for now
    };
  }, [materials, project]);

  // Filter materials by category
  const filteredMaterials = useMemo(() => {
    if (filterCategory === 'all') return materials;
    return materials.filter(m => m.category === filterCategory);
  }, [materials, filterCategory]);

  return (
    <div className="layout-container flex h-full grow flex-col bg-background-light">
      <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-8">
        <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
          {/* Header */}
          <div className="flex flex-wrap justify-between items-end gap-6 mb-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-1 rounded bg-[#F8F9FB] text-xs font-bold text-[#4364F7] uppercase tracking-wide border border-gray-200">
                  {materials.length > 0 ? 'Generated' : 'Pending'}
                </span>
                <span className="text-text-secondary text-xs">
                  {materials.length > 0 ? `${materials.length} items` : 'No materials yet'}
                </span>
              </div>
              <h1 className="text-text-slate text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                Detailed Cost & Material Analysis
              </h1>
              <p className="text-text-slate-light text-base font-normal leading-normal flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-text-secondary">location_on</span>
                {project?.title || 'New Project'} | {project?.city || 'Location N/A'}
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-card-dark border border-gray-100 hover:border-[#4364F7]/30 transition-colors shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-text-secondary text-sm font-medium leading-normal">Total Estimated Cost</p>
                <span className="material-symbols-outlined text-[#4364F7] text-[24px]">currency_rupee</span>
              </div>
              <p className="text-text-slate tracking-light text-2xl font-bold leading-tight">
                ₹{totals.totalCost.toLocaleString('en-IN')}
              </p>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[#0bda57] text-[16px]">trending_up</span>
                <p className="text-[#0bda57] text-sm font-medium leading-normal">AI Estimated</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-card-dark border border-gray-100 hover:border-[#4364F7]/30 transition-colors shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-text-secondary text-sm font-medium leading-normal">Cost per Sq. Ft.</p>
                <span className="material-symbols-outlined text-[#4364F7] text-[24px]">square_foot</span>
              </div>
              <p className="text-text-slate tracking-light text-2xl font-bold leading-tight">
                ₹{totals.costPerSqFt.toLocaleString('en-IN')}
              </p>
              <p className="text-text-secondary text-sm font-medium leading-normal">Per sq.ft built-up</p>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-card-dark border border-gray-100 hover:border-[#4364F7]/30 transition-colors shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-text-secondary text-sm font-medium leading-normal">Material Count</p>
                <span className="material-symbols-outlined text-[#4364F7] text-[24px]">inventory_2</span>
              </div>
              <p className="text-text-slate tracking-light text-2xl font-bold leading-tight">{totals.materialCount} Items</p>
              <p className="text-text-secondary text-sm font-medium leading-normal">Fully Procured: {totals.procuredPercent}%</p>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-card-dark border border-gray-100 hover:border-[#4364F7]/30 transition-colors shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-text-secondary text-sm font-medium leading-normal">Contingency Budget</p>
                <span className="material-symbols-outlined text-[#4364F7] text-[24px]">savings</span>
              </div>
              <p className="text-text-slate tracking-light text-2xl font-bold leading-tight">
                ₹{Math.round(totals.totalCost * 0.1).toLocaleString('en-IN')}
              </p>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[#0bda57] text-[16px]">shield</span>
                <p className="text-[#0bda57] text-sm font-medium leading-normal">10% Reserve</p>
              </div>
            </div>
          </div>

          {/* AI Insight Banner */}
          {materials.length > 0 && (
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#4364F7]/5 to-transparent border border-[#4364F7]/20 p-5 mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between shadow-sm bg-white">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary-gradient"></div>
              <div className="flex gap-4 items-start">
                <div className="bg-[#4364F7]/10 p-2 rounded-full text-[#4364F7] shrink-0 animate-pulse">
                  <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
                </div>
                <div>
                  <p className="text-text-slate font-bold text-sm mb-1">AI Cost Optimization Insight</p>
                  <p className="text-text-slate-light text-sm">
                    Based on {project?.city || 'your location'} prices, consider bulk purchasing
                    <span className="text-text-slate font-bold"> Cement</span> and
                    <span className="text-text-slate font-bold"> Steel</span> to save approximately
                    <span className="text-[#0bda57] font-bold"> ₹{Math.round(totals.totalCost * 0.05).toLocaleString('en-IN')}</span>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Materials Table */}
          <div className="rounded-xl bg-card-dark border border-gray-100 overflow-hidden flex flex-col shadow-sm">
            <div className="p-6 border-b border-gray-200 flex flex-wrap gap-4 justify-between items-center bg-white">
              <div>
                <h3 className="text-text-slate text-lg font-bold">Material Procurement Breakdown</h3>
                <p className="text-text-secondary text-sm">
                  {materials.length > 0
                    ? 'AI-generated bill of materials with current market prices.'
                    : 'Click "Generate with AI" to create your Bill of Materials.'}
                </p>
              </div>
              <div className="flex gap-3">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-gray-50 text-text-slate text-sm border border-gray-200 rounded-lg px-3 py-2 focus:ring-1 focus:ring-[#4364F7] focus:border-[#4364F7]"
                >
                  <option value="all">All Categories</option>
                  <option value="structural">Structural</option>
                  <option value="finishing">Finishing</option>
                  <option value="electrical">Electrical</option>
                  <option value="plumbing">Plumbing</option>
                </select>
              </div>
            </div>

            {filteredMaterials.length > 0 ? (
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Material Name</th>
                      <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Category</th>
                      <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Quantity</th>
                      <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider text-right">Unit Price</th>
                      <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider text-right">Total Price</th>
                      <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider text-center">Risk Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredMaterials.map((material, index) => {
                      const riskStyle = RISK_COLORS[material.riskLevel] || RISK_COLORS.low;
                      return (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="size-8 rounded bg-blue-50 flex items-center justify-center text-[#4364F7]">
                                <span className="material-symbols-outlined text-[18px]">
                                  {CATEGORY_ICONS[material.category] || 'inventory_2'}
                                </span>
                              </div>
                              <div>
                                <p className="text-text-slate text-sm font-medium">{material.name}</p>
                                <p className="text-text-secondary text-xs">{material.unit}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-text-secondary text-sm capitalize">{material.category}</td>
                          <td className="p-4 text-text-slate text-sm font-mono">{material.quantity.toLocaleString('en-IN')}</td>
                          <td className="p-4 text-text-slate text-sm text-right font-mono">₹{material.unitPrice.toLocaleString('en-IN')}</td>
                          <td className="p-4 text-text-slate text-sm font-bold text-right font-mono">₹{material.totalPrice.toLocaleString('en-IN')}</td>
                          <td className="p-4 text-center">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${riskStyle.bg} ${riskStyle.text} border ${riskStyle.border}`}>
                              {material.riskLevel.charAt(0).toUpperCase() + material.riskLevel.slice(1)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center">
                <span className="material-symbols-outlined text-[48px] text-gray-300 mb-4">inventory_2</span>
                <p className="text-text-secondary text-sm">No materials generated yet.</p>
                <p className="text-text-secondary text-sm">Use the "Generate with AI" button to create your Bill of Materials.</p>
              </div>
            )}

            {filteredMaterials.length > 0 && (
              <div className="p-4 border-t border-gray-200 flex items-center justify-between bg-white">
                <p className="text-sm text-text-secondary">
                  Showing <span className="text-text-slate font-bold">{filteredMaterials.length}</span> of <span className="text-text-slate font-bold">{materials.length}</span> items
                </p>
                <p className="text-sm text-text-slate font-bold">
                  Total: ₹{filteredMaterials.reduce((sum, m) => sum + m.totalPrice, 0).toLocaleString('en-IN')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostAnalysis;
