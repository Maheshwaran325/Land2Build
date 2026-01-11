const NewProjectForm = () => {
  return (
    <main className="flex-grow flex flex-col items-center py-8 px-4 md:px-10 w-full max-w-[1200px] mx-auto">
      <div className="w-full flex flex-wrap gap-2 px-4 py-2 mb-4">
        <a className="text-text-secondary hover:text-primary transition-colors text-sm font-medium leading-normal flex items-center gap-1" href="#">
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
      <div className="w-full flex flex-col gap-6">
        <div className="bg-surface-light border border-border-light rounded-xl p-6 shadow-sm">
          <label className="flex flex-col w-full">
            <p className="text-text-main text-base font-bold leading-normal pb-3">Project Title</p>
            <input className="w-full rounded-lg text-text-main focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-200 bg-white placeholder:text-gray-400 p-4 text-base font-normal leading-normal transition-all shadow-sm" placeholder="e.g. Riverside Commercial Complex" type="text" />
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
                  <input className="w-full rounded-lg text-text-main focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-200 bg-white placeholder:text-gray-400 pl-11 pr-4 py-3 text-base font-normal leading-normal transition-all shadow-sm" placeholder="Enter street address, city, state" type="text" />
                  <span className="material-symbols-outlined absolute left-3 top-3.5 text-gray-400">search</span>
                </div>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col w-full">
                  <p className="text-text-main text-sm font-medium leading-normal pb-2">Latitude</p>
                  <input className="w-full rounded-lg text-text-main focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-200 bg-white placeholder:text-gray-400 px-4 py-3 text-base font-normal leading-normal transition-all shadow-sm" placeholder="34.0522" type="text" />
                </label>
                <label className="flex flex-col w-full">
                  <p className="text-text-main text-sm font-medium leading-normal pb-2">Longitude</p>
                  <input className="w-full rounded-lg text-text-main focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-200 bg-white placeholder:text-gray-400 px-4 py-3 text-base font-normal leading-normal transition-all shadow-sm" placeholder="-118.2437" type="text" />
                </label>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 flex gap-3 items-start">
                <span className="material-symbols-outlined text-primary text-xl mt-0.5">info</span>
                <p className="text-sm text-text-secondary">
                  Entering precise coordinates helps our AI access more accurate satellite topography data.
                </p>
              </div>
            </div>
            <div className="w-full h-64 lg:h-auto min-h-[250px] relative rounded-lg overflow-hidden border border-border-light shadow-sm group">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Satellite map view of a city grid with streets and buildings" data-location="Los Angeles" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuANQ9Ga1zYeXhNZBN92Iz_MH62e9OHh25qfuTvJDYuHMm6j32Zto19DADaXAj6Un67YRNI8q1Qp5CJmSkQQNLj511bASCMPRSPu6RFS__5BBQZSpMtu1peFau22d4h-GIGvOL6yuH6fumCwE_0G-vZKXdOWdRjzETmms6Q4i-X5jQGm6cf_z0n4dCgdAHE8zWnrBfiJAe9kB8dziKiL6z0Iu3I0tm6RZQKu80RFI8v8KmTuVtxOEnrjXNEBtcqt3fM9AQ_iOJyXqsze')" }}>
              </div>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="size-8 bg-primary-gradient text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/40 animate-bounce">
                  <span className="material-symbols-outlined text-lg">location_on</span>
                </div>
                <div className="w-3 h-1.5 bg-black/50 rounded-[100%] blur-[2px] mt-1"></div>
              </div>
              <div className="absolute bottom-3 right-3">
                <button className="bg-white text-text-main text-xs font-bold px-3 py-1.5 rounded shadow-md hover:bg-gray-50 transition-colors">
                  Expand Map
                </button>
              </div>
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
                  <button className="px-2 py-0.5 text-[10px] font-bold bg-primary-gradient text-white rounded shadow-sm">ACRES</button>
                  <button className="px-2 py-0.5 text-[10px] font-bold text-text-secondary hover:text-primary transition-colors">SQ FT</button>
                </div>
              </div>
              <input className="w-full rounded-lg text-text-main focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-200 bg-white placeholder:text-gray-400 px-4 py-3 text-base font-normal leading-normal transition-all shadow-sm" placeholder="0.00" type="number" />
            </label>
            <label className="flex flex-col w-full">
              <p className="text-text-main text-sm font-medium leading-normal pb-2">Zoning Type</p>
              <div className="relative">
                <select className="w-full appearance-none rounded-lg text-text-main focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-200 bg-white px-4 py-3 text-base font-normal leading-normal transition-all cursor-pointer shadow-sm">
                  <option disabled="" selected="" value="">Select Zoning</option>
                  <option value="residential">Residential (R1-R3)</option>
                  <option value="commercial">Commercial (C1-C4)</option>
                  <option value="industrial">Industrial</option>
                  <option value="mixed">Mixed Use</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-3.5 text-gray-400 pointer-events-none">expand_more</span>
              </div>
            </label>
            <label className="flex flex-col w-full">
              <p className="text-text-main text-sm font-medium leading-normal pb-2">Topography Estimate</p>
              <div className="grid grid-cols-3 gap-2">
                <button className="flex flex-col items-center justify-center gap-1 p-2 border border-gray-200 bg-white rounded-lg hover:border-primary hover:bg-blue-50 transition-all group focus:ring-2 focus:ring-primary/50 focus:border-primary shadow-sm">
                  <span className="material-symbols-outlined text-text-secondary group-hover:text-primary">horizontal_rule</span>
                  <span className="text-xs text-text-secondary group-hover:text-primary font-medium">Flat</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1 p-2 border border-primary bg-blue-50 rounded-lg shadow-sm transition-all ring-1 ring-primary/20">
                  <span className="material-symbols-outlined text-primary">ssid_chart</span>
                  <span className="text-xs text-primary font-bold">Sloped</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1 p-2 border border-gray-200 bg-white rounded-lg hover:border-primary hover:bg-blue-50 transition-all group focus:ring-2 focus:ring-primary/50 focus:border-primary shadow-sm">
                  <span className="material-symbols-outlined text-text-secondary group-hover:text-primary">terrain</span>
                  <span className="text-xs text-text-secondary group-hover:text-primary font-medium">Mixed</span>
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
          <div className="mt-4 flex flex-col gap-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded bg-red-50 border border-red-100 flex items-center justify-center text-red-500">
                  <span className="material-symbols-outlined">picture_as_pdf</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-text-main">Site_Survey_2023.pdf</span>
                  <span className="text-xs text-text-secondary">2.4 MB • Uploaded just now</span>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full text-text-secondary hover:text-red-500 transition-colors">
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4 py-6 border-t border-border-light mt-4">
          <button className="w-full md:w-auto px-8 py-3 rounded-lg text-text-secondary hover:text-text-main font-bold text-sm transition-colors">
            Cancel and Return
          </button>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <button className="w-full md:w-auto px-6 py-3 rounded-lg border border-gray-300 bg-white text-text-main hover:bg-gray-50 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm">
              <span className="material-symbols-outlined text-lg">save</span>
              Save Draft
            </button>
            <button className="w-full md:w-auto px-8 py-3 rounded-lg bg-primary-gradient hover:opacity-90 text-white font-bold text-sm shadow-[0_4px_14px_rgba(0,82,212,0.3)] transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
              <span className="material-symbols-outlined">auto_awesome</span>
              Analyze & Create Project
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NewProjectForm;
