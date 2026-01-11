const Header = () => {
  return (
    <div className="sticky top-0 z-50 border-b border-[#e5e7eb] bg-background-light/95 backdrop-blur-md">
      <div className="px-4 md:px-10 lg:px-40 flex justify-center">
        <div className="flex w-full max-w-[1280px] flex-col">
          <header className="flex items-center justify-between whitespace-nowrap py-4">
            <div className="flex items-center gap-4 text-text-main">
              <div className="size-8 text-primary">
                <span className="material-symbols-outlined !text-[32px] text-gradient">landscape</span>
              </div>
              <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Land2Build</h2>
            </div>
            <div className="flex flex-1 justify-end gap-8">
              <div className="hidden md:flex items-center gap-9">
                <a className="text-sm font-medium leading-normal hover:text-primary transition-colors text-text-main" href="#">Features</a>
                <a className="text-sm font-medium leading-normal hover:text-primary transition-colors text-text-main" href="#">How it Works</a>
                <a className="text-sm font-medium leading-normal hover:text-primary transition-colors text-text-main" href="#">Pricing</a>
              </div>
              <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gradient-custom text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity">
                <span className="truncate">Get Started</span>
              </button>
            </div>
          </header>
        </div>
      </div>
    </div>
  );
};

export default Header;
