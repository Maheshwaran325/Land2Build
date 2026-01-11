const CostAnalysisHeader = () => {
  return (
    <div className="flex flex-col w-full bg-white border-b border-gray-200">
      <div className="layout-container flex h-full grow flex-col justify-center">
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center">
          <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 w-full">
            <header className="flex items-center justify-between whitespace-nowrap py-3">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-4 text-text-slate">
                  <div className="size-8 text-[#0052D4]">
                    <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                      <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="url(#logo-gradient)"></path>
                      <defs>
                        <linearGradient id="logo-gradient" x1="0%" x2="100%" y1="0%" y2="100%">
                          <stop offset="0%" style={{ stopColor: '#0052D4', stopOpacity: 1 }}></stop>
                          <stop offset="50%" style={{ stopColor: '#4364F7', stopOpacity: 1 }}></stop>
                          <stop offset="100%" style={{ stopColor: '#6FB1FC', stopOpacity: 1 }}></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <h2 className="text-text-slate text-lg font-bold leading-tight tracking-[-0.015em]">Land2Build</h2>
                </div>
                <div className="hidden lg:flex items-center gap-9">
                  <a className="text-text-secondary hover:text-text-slate text-sm font-medium leading-normal transition-colors" href="#">Dashboard</a>
                  <a className="text-text-secondary hover:text-text-slate text-sm font-medium leading-normal transition-colors" href="#">Projects</a>
                  <a className="text-text-slate text-sm font-medium leading-normal border-b-2 border-[#4364F7] py-4" href="#">Cost Analysis</a>
                  <a className="text-text-secondary hover:text-text-slate text-sm font-medium leading-normal transition-colors" href="#">Procurement</a>
                </div>
              </div>
              <div className="flex flex-1 justify-end gap-4 md:gap-8 items-center">
                <label className="hidden md:flex flex-col min-w-40 !h-10 max-w-64">
                  <div className="flex w-full flex-1 items-stretch rounded-lg h-full border border-gray-200 bg-[#F8F9FB]">
                    <div className="text-text-secondary flex border-none items-center justify-center pl-4 rounded-l-lg border-r-0">
                      <span className="material-symbols-outlined text-[20px]">search</span>
                    </div>
                    <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-slate focus:outline-0 focus:ring-0 border-none bg-transparent focus:border-none h-full placeholder:text-text-secondary px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal" placeholder="Search data..." value="" />
                  </div>
                </label>
                <button className="flex min-w-[40px] md:min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary-gradient text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity">
                  <span className="hidden md:inline">Profile</span>
                  <span className="md:hidden material-symbols-outlined">person</span>
                </button>
                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-gray-200" data-alt="User profile picture placeholder" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDntBoSTxEC-menlfefxgtU6BC1GoMeMZ9nbky4HsKms-r9iGvrNx4z9qic4sH8QSL6JjAefFI5BwrZmVMEvp841TN3D1Kzfu9wjPsOKgetogwZmKEXgYVczozgfMUbvoJMT7XKEE50S9MzFOKjKFxxY9biZsxyJmaywDbIJsH_r9IIOibbqMlPjy5b8yotNMmrWAIks4bBUTCPRASWymhzA3jafty1yervWucAA6B2mIPWxmC2jLt_ztdpO4kLvj3fyYTPffTemNoc')" }}></div>
              </div>
            </header>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostAnalysisHeader;
