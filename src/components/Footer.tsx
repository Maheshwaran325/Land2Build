const Footer = () => {
  return (
    <footer className="w-full border-t border-[#e5e7eb] bg-bg-secondary py-12">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-40 flex flex-col md:flex-row justify-between gap-10">
        <div className="flex flex-col gap-4 max-w-xs">
          <div className="flex items-center gap-2 text-text-main">
            <span className="material-symbols-outlined text-primary text-2xl text-gradient">landscape</span>
            <span className="text-lg font-bold">Land2Build</span>
          </div>
          <p className="text-sm text-[#637588]">
            Intelligent construction planning for the modern world.
          </p>
          <div className="flex gap-4 mt-2">
            <a className="text-[#637588] hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">public</span></a>
            <a className="text-[#637588] hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">group</span></a>
            <a className="text-[#637588] hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">videocam</span></a>
          </div>
        </div>
        <div className="flex flex-wrap gap-10 md:gap-20">
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-text-main uppercase tracking-wider">Product</h4>
            <a className="text-sm text-[#637588] hover:text-primary" href="#">Features</a>
            <a className="text-sm text-[#637588] hover:text-primary" href="#">Pricing</a>
            <a className="text-sm text-[#637588] hover:text-primary" href="#">API</a>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-text-main uppercase tracking-wider">Resources</h4>
            <a className="text-sm text-[#637588] hover:text-primary" href="#">Documentation</a>
            <a className="text-sm text-[#637588] hover:text-primary" href="#">Blog</a>
            <a className="text-sm text-[#637588] hover:text-primary" href="#">Case Studies</a>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-text-main uppercase tracking-wider">Legal</h4>
            <a className="text-sm text-[#637588] hover:text-primary" href="#">Privacy</a>
            <a className="text-sm text-[#637588] hover:text-primary" href="#">Terms</a>
          </div>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-40 mt-12 pt-8 border-t border-[#e5e7eb] text-center md:text-left">
        <p className="text-sm text-[#637588]">© 2024 Land2Build Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
