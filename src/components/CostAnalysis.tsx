const CostAnalysis = () => {
  return (
    <div className="layout-container flex h-full grow flex-col bg-background-light">
      <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-8">
        <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
          <div className="flex flex-wrap justify-between items-end gap-6 mb-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-1 rounded bg-[#F8F9FB] text-xs font-bold text-[#4364F7] uppercase tracking-wide border border-gray-200">In Progress</span>
                <span className="text-text-secondary text-xs">Last updated: 2 hrs ago</span>
              </div>
              <h1 className="text-text-slate text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Detailed Cost & Material Analysis</h1>
              <p className="text-text-slate-light text-base font-normal leading-normal flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-text-secondary">location_on</span>
                Project Alpha - Plot 4B | Site ID: L2B-8821 | Austin, TX
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-white text-text-slate text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-50 border border-gray-200 transition-all shadow-sm">
                <span className="material-symbols-outlined text-[20px] mr-2 text-text-secondary">download</span>
                <span className="truncate">Export Report</span>
              </button>
              <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary-gradient text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-all shadow-[0_4px_10px_rgba(67,100,247,0.3)]">
                <span className="truncate">Approve Budget</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-card-dark border border-gray-100 hover:border-[#4364F7]/30 transition-colors shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-text-secondary text-sm font-medium leading-normal">Total Estimated Cost</p>
                <span className="material-symbols-outlined text-[#4364F7] text-[24px]">currency_rupee</span>
              </div>
              <p className="text-text-slate tracking-light text-2xl font-bold leading-tight">₹4,52,000</p>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[#0bda57] text-[16px]">trending_up</span>
                <p className="text-[#0bda57] text-sm font-medium leading-normal">+2.5% vs Plan</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-card-dark border border-gray-100 hover:border-[#4364F7]/30 transition-colors shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-text-secondary text-sm font-medium leading-normal">Cost per Sq. Ft.</p>
                <span className="material-symbols-outlined text-[#4364F7] text-[24px]">square_foot</span>
              </div>
              <p className="text-text-slate tracking-light text-2xl font-bold leading-tight">₹185</p>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[#fa5f38] text-[16px]">trending_down</span>
                <p className="text-[#fa5f38] text-sm font-medium leading-normal">-1.2% Efficiency</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-card-dark border border-gray-100 hover:border-[#4364F7]/30 transition-colors shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-text-secondary text-sm font-medium leading-normal">Material Count</p>
                <span className="material-symbols-outlined text-[#4364F7] text-[24px]">inventory_2</span>
              </div>
              <p className="text-text-slate tracking-light text-2xl font-bold leading-tight">24 Items</p>
              <p className="text-text-secondary text-sm font-medium leading-normal">Fully Procured: 45%</p>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-card-dark border border-gray-100 hover:border-[#4364F7]/30 transition-colors shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-text-secondary text-sm font-medium leading-normal">Contingency Budget</p>
                <span className="material-symbols-outlined text-[#4364F7] text-[24px]">savings</span>
              </div>
              <p className="text-text-slate tracking-light text-2xl font-bold leading-tight">₹45,000</p>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[#0bda57] text-[16px]">shield</span>
                <p className="text-[#0bda57] text-sm font-medium leading-normal">Healthy</p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#4364F7]/5 to-transparent border border-[#4364F7]/20 p-5 mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between shadow-sm bg-white">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary-gradient"></div>
            <div className="flex gap-4 items-start">
              <div className="bg-[#4364F7]/10 p-2 rounded-full text-[#4364F7] shrink-0 animate-pulse">
                <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
              </div>
              <div>
                <p className="text-text-slate font-bold text-sm mb-1">AI Cost Optimization Insight</p>
                <p className="text-text-slate-light text-sm">Steel prices are trending up by 4% next month. Consider locking in rates for <span className="text-text-slate font-bold">Rebar #4</span> and <span className="text-text-slate font-bold">Structural Beams</span> now to save approximately <span className="text-[#0bda57] font-bold">₹1,200</span>.</p>
              </div>
            </div>
            <button className="text-[#4364F7] text-sm font-bold whitespace-nowrap hover:underline shrink-0 px-4">
              View Details
            </button>
          </div>
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            <div className="flex-1 rounded-xl bg-card-dark border border-gray-100 p-6 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-text-slate text-lg font-bold">Expenditure Timeline</p>
                  <p className="text-text-secondary text-sm">Projected cash flow based on milestones</p>
                </div>
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
                  <button className="px-3 py-1 bg-gray-100 text-text-slate text-xs font-bold rounded shadow-sm">Monthly</button>
                  <button className="px-3 py-1 text-text-secondary text-xs font-medium hover:text-text-slate transition-colors">Weekly</button>
                </div>
              </div>
              <div className="h-[200px] w-full mt-4">
                <svg className="overflow-visible" fill="none" height="100%" preserveAspectRatio="none" viewBox="-3 0 478 150" width="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_chart" x1="236" x2="236" y1="1" y2="149">
                      <stop stopColor="#4364F7" stopOpacity="0.3"></stop>
                      <stop offset="1" stopColor="#4364F7" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                  <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z" fill="url(#paint0_linear_chart)"></path>
                  <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25" stroke="#4364F7" strokeLinecap="round" strokeWidth="3"></path>
                </svg>
              </div>
              <div className="flex justify-between mt-4 px-2">
                <p className="text-text-secondary text-xs font-bold uppercase tracking-wider">Jan</p>
                <p className="text-text-secondary text-xs font-bold uppercase tracking-wider">Feb</p>
                <p className="text-text-secondary text-xs font-bold uppercase tracking-wider">Mar</p>
                <p className="text-text-secondary text-xs font-bold uppercase tracking-wider">Apr</p>
                <p className="text-text-secondary text-xs font-bold uppercase tracking-wider">May</p>
                <p className="text-text-secondary text-xs font-bold uppercase tracking-wider">Jun</p>
              </div>
            </div>
            <div className="flex-1 lg:max-w-md rounded-xl bg-card-dark border border-gray-100 p-6 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-text-slate text-lg font-bold">Cost Distribution</p>
                  <p className="text-text-secondary text-sm">Allocation by category</p>
                </div>
                <span className="material-symbols-outlined text-text-secondary">pie_chart</span>
              </div>
              <div className="grid gap-y-6 grid-cols-[auto_1fr] items-center py-2">
                <div className="flex flex-col pr-4 min-w-[80px]">
                  <p className="text-text-slate text-sm font-bold">Labor</p>
                  <p className="text-text-secondary text-xs">42%</p>
                </div>
                <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-primary-gradient h-full rounded-full" style={{ width: '42%' }}></div>
                </div>
                <div className="flex flex-col pr-4 min-w-[80px]">
                  <p className="text-text-slate text-sm font-bold">Materials</p>
                  <p className="text-text-secondary text-xs">30%</p>
                </div>
                <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-[#36c5f0] h-full rounded-full" style={{ width: '30%' }}></div>
                </div>
                <div className="flex flex-col pr-4 min-w-[80px]">
                  <p className="text-text-slate text-sm font-bold">Permits</p>
                  <p className="text-text-secondary text-xs">15%</p>
                </div>
                <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-[#2eb88a] h-full rounded-full" style={{ width: '15%' }}></div>
                </div>
                <div className="flex flex-col pr-4 min-w-[80px]">
                  <p className="text-text-slate text-sm font-bold">Equip.</p>
                  <p className="text-text-secondary text-xs">13%</p>
                </div>
                <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-[#e05d44] h-full rounded-full" style={{ width: '13%' }}></div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
                <span className="text-text-secondary text-sm">Total Budget Utilized</span>
                <span className="text-text-slate text-lg font-bold">100%</span>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-card-dark border border-gray-100 overflow-hidden flex flex-col shadow-sm">
            <div className="p-6 border-b border-gray-200 flex flex-wrap gap-4 justify-between items-center bg-white">
              <div>
                <h3 className="text-text-slate text-lg font-bold">Material Procurement Breakdown</h3>
                <p className="text-text-secondary text-sm">Detailed list of required materials and current pricing status.</p>
              </div>
              <div className="flex gap-3">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-text-secondary text-[18px]">filter_list</span>
                  <select className="bg-gray-50 text-text-slate text-sm border border-gray-200 rounded-lg pl-8 pr-8 py-2 focus:ring-1 focus:ring-[#4364F7] focus:border-[#4364F7] appearance-none cursor-pointer">
                    <option>All Categories</option>
                    <option>Structural</option>
                    <option>Finishing</option>
                    <option>Electrical</option>
                  </select>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-text-secondary text-[18px]">sort</span>
                  <select className="bg-gray-50 text-text-slate text-sm border border-gray-200 rounded-lg pl-8 pr-8 py-2 focus:ring-1 focus:ring-[#4364F7] focus:border-[#4364F7] appearance-none cursor-pointer">
                    <option>Highest Cost</option>
                    <option>Lowest Cost</option>
                    <option>Risk Level</option>
                  </select>
                </div>
              </div>
            </div>
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
                    <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr className="hover:bg-gray-50 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded bg-blue-50 flex items-center justify-center text-[#4364F7]">
                          <span className="material-symbols-outlined text-[18px]">foundation</span>
                        </div>
                        <div>
                          <p className="text-text-slate text-sm font-medium">Concrete (Type II)</p>
                          <p className="text-text-secondary text-xs">Standard Mix</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-text-secondary text-sm">Structural</td>
                    <td className="p-4 text-text-slate text-sm font-mono">450 Bags</td>
                    <td className="p-4 text-text-slate text-sm text-right font-mono">₹12.50</td>
                    <td className="p-4 text-text-slate text-sm font-bold text-right font-mono">₹5,625</td>
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#0bda57]/10 text-[#0bda57] border border-[#0bda57]/20">
                        Low
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button className="text-text-secondary hover:text-text-slate transition-colors">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded bg-blue-50 flex items-center justify-center text-[#4364F7]">
                          <span className="material-symbols-outlined text-[18px]">forest</span>
                        </div>
                        <div>
                          <p className="text-text-slate text-sm font-medium">Lumber (2x4 Pine)</p>
                          <p className="text-text-secondary text-xs">Grade A</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-text-secondary text-sm">Structural</td>
                    <td className="p-4 text-text-slate text-sm font-mono">1,200 Pcs</td>
                    <td className="p-4 text-text-slate text-sm text-right font-mono">₹8.40</td>
                    <td className="p-4 text-text-slate text-sm font-bold text-right font-mono">₹10,080</td>
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#fa5f38]/10 text-[#fa5f38] border border-[#fa5f38]/20">
                        High
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button className="text-text-secondary hover:text-text-slate transition-colors">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded bg-blue-50 flex items-center justify-center text-[#4364F7]">
                          <span className="material-symbols-outlined text-[18px]">grid_on</span>
                        </div>
                        <div>
                          <p className="text-text-slate text-sm font-medium">Steel Rebar #4</p>
                          <p className="text-text-secondary text-xs">Reinforcement</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-text-secondary text-sm">Structural</td>
                    <td className="p-4 text-text-slate text-sm font-mono">800 Units</td>
                    <td className="p-4 text-text-slate text-sm text-right font-mono">₹15.20</td>
                    <td className="p-4 text-text-slate text-sm font-bold text-right font-mono">₹12,160</td>
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                        Med
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button className="text-text-secondary hover:text-text-slate transition-colors">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded bg-blue-50 flex items-center justify-center text-[#4364F7]">
                          <span className="material-symbols-outlined text-[18px]">window</span>
                        </div>
                        <div>
                          <p className="text-text-slate text-sm font-medium">Glass Panes (Temp.)</p>
                          <p className="text-text-secondary text-xs">Double Glazed</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-text-secondary text-sm">Finishing</td>
                    <td className="p-4 text-text-slate text-sm font-mono">50 Units</td>
                    <td className="p-4 text-text-slate text-sm text-right font-mono">₹240.00</td>
                    <td className="p-4 text-text-slate text-sm font-bold text-right font-mono">₹12,000</td>
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#0bda57]/10 text-[#0bda57] border border-[#0bda57]/20">
                        Low
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button className="text-text-secondary hover:text-text-slate transition-colors">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded bg-blue-50 flex items-center justify-center text-[#4364F7]">
                          <span className="material-symbols-outlined text-[18px]">electrical_services</span>
                        </div>
                        <div>
                          <p className="text-text-slate text-sm font-medium">Copper Wiring (14g)</p>
                          <p className="text-text-secondary text-xs">Spools</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-text-secondary text-sm">Electrical</td>
                    <td className="p-4 text-text-slate text-sm font-mono">20 Spools</td>
                    <td className="p-4 text-text-slate text-sm text-right font-mono">₹185.00</td>
                    <td className="p-4 text-text-slate text-sm font-bold text-right font-mono">₹3,700</td>
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                        Med
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button className="text-text-secondary hover:text-text-slate transition-colors">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-gray-200 flex items-center justify-between bg-white">
              <p className="text-sm text-text-secondary">Showing <span className="text-text-slate font-bold">1-5</span> of <span className="text-text-slate font-bold">24</span> items</p>
              <div className="flex gap-2">
                <button className="size-8 flex items-center justify-center rounded bg-gray-100 text-text-secondary hover:text-text-slate hover:bg-gray-200 disabled:opacity-50 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button className="size-8 flex items-center justify-center rounded bg-primary-gradient text-white font-bold text-sm shadow-sm">1</button>
                <button className="size-8 flex items-center justify-center rounded bg-gray-100 text-text-secondary hover:text-text-slate hover:bg-gray-200 transition-colors text-sm">2</button>
                <button className="size-8 flex items-center justify-center rounded bg-gray-100 text-text-secondary hover:text-text-slate hover:bg-gray-200 transition-colors text-sm">3</button>
                <button className="size-8 flex items-center justify-center rounded bg-gray-100 text-text-secondary hover:text-text-slate hover:bg-gray-200 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostAnalysis;
