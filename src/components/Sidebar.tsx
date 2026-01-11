const Sidebar = () => {
  return (
    <aside className="hidden lg:flex w-72 flex-col border-r border-border-sub bg-secondary h-full flex-shrink-0">
      <div className="p-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-text-main text-xl font-bold leading-normal flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-solid text-3xl">architecture</span>
            Land2Build
          </h1>
          <p className="text-text-sub text-xs font-medium pl-10">AI Construction Planner</p>
        </div>
      </div>
      <nav className="flex-1 flex flex-col gap-2 px-4 overflow-y-auto">
        <a className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white border border-border-sub text-text-main shadow-sm group" href="#">
          <span className="material-symbols-outlined text-primary-solid transition-colors">folder_open</span>
          <span className="text-sm font-semibold">Projects</span>
        </a>
        <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-sub hover:bg-white hover:text-text-main hover:shadow-sm transition-all" href="#">
          <span className="material-symbols-outlined">edit_note</span>
          <span className="text-sm font-medium">Blueprint Editor</span>
        </a>
        <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-sub hover:bg-white hover:text-text-main hover:shadow-sm transition-all" href="#">
          <span className="material-symbols-outlined">layers</span>
          <span className="text-sm font-medium">Materials</span>
        </a>
        <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-sub hover:bg-white hover:text-text-main hover:shadow-sm transition-all" href="#">
          <span className="material-symbols-outlined">bar_chart</span>
          <span className="text-sm font-medium">Reports</span>
        </a>
        <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-sub hover:bg-white hover:text-text-main hover:shadow-sm transition-all" href="#">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-sm font-medium">Settings</span>
        </a>
      </nav>
      <div className="p-4 border-t border-border-sub">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-primary-gradient flex items-center justify-center text-xs font-bold text-white shadow-md">
            JD
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-bold text-text-main">John Doe</p>
            <p className="text-xs text-text-sub">Lead Architect</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
