const Process = () => {
  return (
    <div className="w-full flex justify-center py-20 bg-bg-secondary">
      <div className="flex flex-col max-w-[1280px] w-full px-4 md:px-10 lg:px-40">
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <h2 className="text-primary font-bold text-sm uppercase tracking-wider">Process</h2>
          <h3 className="text-text-main text-3xl md:text-4xl font-extrabold">From Raw Land to Blueprint</h3>
          <p className="text-[#637588] max-w-2xl">
            Our streamlined workflow takes you from initial survey to actionable construction documents in three simple steps.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-[#4364F7]/30 to-transparent"></div>
          <div className="flex flex-col items-center text-center gap-6 relative z-10">
            <div className="size-24 rounded-2xl bg-white border border-[#e5e7eb] flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-4xl text-[#0052D4]">satellite_alt</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="inline-block px-3 py-1 rounded-full bg-[#0052D4]/10 text-primary text-xs font-bold mb-2 w-fit mx-auto">STEP 01</div>
              <h4 className="text-text-main text-xl font-bold">Input Data</h4>
              <p className="text-[#637588] text-sm">Upload survey data or select a parcel from our satellite map integration.</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-6 relative z-10">
            <div className="size-24 rounded-2xl bg-white border border-[#e5e7eb] flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-4xl text-[#4364F7]">psychology</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="inline-block px-3 py-1 rounded-full bg-[#4364F7]/10 text-primary text-xs font-bold mb-2 w-fit mx-auto">STEP 02</div>
              <h4 className="text-text-main text-xl font-bold">AI Processing</h4>
              <p className="text-[#637588] text-sm">Our algorithms analyze slope, soil, and regulations to optimize building placement.</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-6 relative z-10">
            <div className="size-24 rounded-2xl bg-white border border-[#e5e7eb] flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-4xl text-[#6FB1FC]">schema</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="inline-block px-3 py-1 rounded-full bg-[#6FB1FC]/10 text-primary text-xs font-bold mb-2 w-fit mx-auto">STEP 03</div>
              <h4 className="text-text-main text-xl font-bold">Generate Plan</h4>
              <p className="text-[#637588] text-sm">Download comprehensive site plans, 3D models, and cost reports instantly.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;
