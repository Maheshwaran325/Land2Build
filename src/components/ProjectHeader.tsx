const ProjectHeader = () => {
  return (
    <header className="flex-shrink-0 w-full bg-canvas/90 backdrop-blur-md sticky top-0 z-20 border-b border-border-sub">
      <div className="px-6 py-6 lg:px-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl lg:text-3xl font-black text-text-main tracking-tight">Project Alpha - Plot 4B</h2>
            <span className="px-2 py-1 rounded text-xs font-bold bg-green-50 text-green-600 border border-green-200">Plan Generated</span>
          </div>
          <p className="text-text-sub text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-base">schedule</span>
            Last updated: 2 mins ago
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center gap-2 px-4 h-10 rounded-lg bg-white hover:bg-gray-50 border border-border-sub text-text-main text-sm font-bold transition-all shadow-sm">
            <span className="material-symbols-outlined text-[20px] text-red-500">picture_as_pdf</span>
            <span>Export PDF</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-5 h-10 rounded-lg bg-primary-gradient text-white text-sm font-bold shadow-lg shadow-blue-500/30 transition-all hover:opacity-90">
            <span className="material-symbols-outlined text-[20px]">edit_square</span>
            <span>Edit Plan</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default ProjectHeader;
