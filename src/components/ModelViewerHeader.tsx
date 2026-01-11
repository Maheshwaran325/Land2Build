const ModelViewerHeader = () => {
  return (
    <header className="flex-none flex items-center justify-between whitespace-nowrap border-b border-solid border-border-light bg-secondary px-6 py-3 z-20 relative shadow-sm">
      <div className="flex items-center gap-4 text-dark-slate">
        <div className="size-8 text-primary flex items-center justify-center">
          <span className="material-symbols-outlined text-[32px]">deployed_code</span>
        </div>
        <h2 className="text-dark-slate text-xl font-bold leading-tight tracking-[-0.015em]">Land2Build</h2>
        <div className="h-6 w-px bg-border-light mx-2 hidden md:block"></div>
        <nav className="hidden md:flex items-center gap-6">
          <a className="text-subtext hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Dashboard</a>
          <a className="text-dark-slate text-sm font-medium leading-normal" href="#">Projects</a>
          <a className="text-subtext hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Library</a>
        </nav>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-4">
          <button className="text-subtext hover:text-primary transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="text-subtext hover:text-primary transition-colors">
            <span className="material-symbols-outlined">help</span>
          </button>
        </div>
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 ring-2 ring-border-light" data-alt="User profile avatar showing a smiling professional" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCFir_Weg5z0wb3vtvIpK-cRJo1mjtW4vuALNZNLD2TdasPuc2ZfSYURlomfDeYP2f99oA-HRerprgh5fQJPRqV51uDPQYoTR1NU8U9rgFJkt42dbBZcH03yJEViYPPnDb4JpExRDEqhiyCL6rq0fp3QgGHTjCxwUG51RQKZpAleAgwHCixoi9LY2DndrJ9jEJ6S5tIgTaaRhgwWrEvxXGJb98TG1dm92zAWIZAvfWbJG2iOx3SPmjz5r7OVcBddtz3f87JVYaUC_cl')" }}></div>
      </div>
    </header>
  );
};

export default ModelViewerHeader;
