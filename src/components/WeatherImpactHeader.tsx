const WeatherImpactHeader = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-border-light bg-canvas px-10 py-3">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3 text-text-main">
          <div className="size-8 flex items-center justify-center bg-blue-50 rounded-lg text-primary-blue">
            <span className="material-symbols-outlined">terrain</span>
          </div>
          <h2 className="text-text-main text-xl font-bold leading-tight tracking-[-0.015em]">Land2Build</h2>
        </div>
        <nav className="hidden lg:flex items-center gap-6">
          <a className="text-text-muted hover:text-text-main transition-colors text-sm font-medium leading-normal" href="#">Dashboard</a>
          <a className="text-text-muted hover:text-text-main transition-colors text-sm font-medium leading-normal" href="#">Projects</a>
          <a className="text-text-main text-sm font-bold leading-normal relative py-2" href="#">
            Weather Analysis
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-gradient rounded-full"></span>
          </a>
          <a className="text-text-muted hover:text-text-main transition-colors text-sm font-medium leading-normal" href="#">Schedule</a>
          <a className="text-text-muted hover:text-text-main transition-colors text-sm font-medium leading-normal" href="#">Reports</a>
        </nav>
      </div>
      <div className="flex flex-1 justify-end gap-6 items-center">
        <label className="flex flex-col min-w-40 !h-10 max-w-64 hidden md:flex">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-surface border border-border-light">
            <div className="text-text-muted flex border-none items-center justify-center pl-4">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-main focus:outline-0 focus:ring-0 border-none bg-transparent focus:border-none h-full placeholder:text-text-muted px-3 text-sm font-normal leading-normal" placeholder="Search site or project..." value="" />
          </div>
        </label>
        <button className="hidden sm:flex h-10 px-4 bg-primary-gradient hover:opacity-90 transition-opacity text-white text-sm font-bold items-center justify-center rounded-lg gap-2 shadow-sm shadow-blue-200">
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span className="truncate">New Project</span>
        </button>
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-border-light cursor-pointer" data-alt="User profile avatar showing a professional headshot" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAXfZwsZGlNw9aTsA2frMy7739Fr-C8zpY62Ui8KduAK6qSvKfRtg65q72-030lUB_OBWgmtNJphF50eOG1HLAD5pyBSnu05x5l8iBuwtjBSwGG63T0oEMNO5OYBMrSEVRZLgZnd_JfFyIZC4pNJG31oFp2dIxvX60EyRGoK4FGY8ItDH3HuQyxewtAUL9t-RuDQ9ykzBlUcgUqOMKqj1t0Vljh5Bbnq5c7Y0RD1MacZpF8v_9vc7KqFdC5w1YM3HnyPqBqjhmSGf0P')" }}></div>
      </div>
    </header>
  );
};

export default WeatherImpactHeader;
