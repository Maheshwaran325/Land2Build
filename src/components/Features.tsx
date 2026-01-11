const Features = () => {
  return (
    <div className="w-full flex justify-center py-5 bg-background-light relative">
      <div className="flex flex-col max-w-[1280px] w-full px-4 md:px-10 lg:px-40">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 px-4 pb-10 pt-16 border-b border-[#e5e7eb]">
          <div className="max-w-2xl">
            <h2 className="text-primary font-bold text-sm uppercase tracking-wider mb-2">Core Features</h2>
            <h3 className="text-text-main text-3xl md:text-4xl font-extrabold leading-tight">
              Intelligent Analysis at Your Fingertips
            </h3>
          </div>
          <p className="text-[#637588] text-base md:text-lg max-w-md text-left md:text-right">
            Our AI engine processes complex geospatial data to deliver actionable insights for your construction projects.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10">
          <div className="flex flex-col gap-4 rounded-xl border border-[#e5e7eb] bg-white p-6 hover:shadow-xl hover:shadow-[#4364F7]/5 transition-all group">
            <div className="size-12 rounded-lg bg-[#F0F4FF] flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[28px] text-[#4364F7]">terrain</span>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-text-main text-xl font-bold leading-tight">Topography Analysis</h4>
              <p className="text-[#637588] text-sm leading-relaxed">
                Instant topographical scanning and terrain modeling. Generate 3D contour maps from simple satellite inputs.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-xl border border-[#e5e7eb] bg-white p-6 hover:shadow-xl hover:shadow-[#4364F7]/5 transition-all group">
            <div className="size-12 rounded-lg bg-[#F0F4FF] flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[28px] text-[#4364F7]">verified_user</span>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-text-main text-xl font-bold leading-tight">Zoning Compliance</h4>
              <p className="text-[#637588] text-sm leading-relaxed">
                Automated checks against local zoning laws. Ensure your project meets height, setback, and usage regulations instantly.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-xl border border-[#e5e7eb] bg-white p-6 hover:shadow-xl hover:shadow-[#4364F7]/5 transition-all group">
            <div className="flex items-center justify-between">
              <div className="size-12 rounded-lg bg-[#F0F4FF] flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px] text-[#4364F7]">attach_money</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-text-main text-xl font-bold leading-tight">Cost Estimation</h4>
              <p className="text-[#637588] text-sm leading-relaxed">
                Real-time budget forecasting based on site conditions. Get material and labor estimates derived from local data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
