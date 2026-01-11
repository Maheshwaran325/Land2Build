const Header = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border-light px-6 lg:px-10 py-3 bg-white z-20 sticky top-0 shadow-sm">
      <div className="flex items-center gap-4 text-text-main">
        <div className="size-8 text-primary">
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
        <h2 className="text-text-main text-xl font-bold leading-tight tracking-[-0.015em]">Land2Build</h2>
      </div>
      <div className="hidden md:flex flex-1 justify-center gap-8">
        <nav className="flex items-center gap-9">
          <a className="text-text-secondary hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Dashboard</a>
          <a className="text-primary font-bold text-sm leading-normal border-b-2 border-primary pb-0.5" href="#">Projects</a>
          <a className="text-text-secondary hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Analysis</a>
          <a className="text-text-secondary hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Settings</a>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-text-secondary hover:text-primary">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 border border-border-light shadow-sm" data-alt="User profile picture showing a smiling architect" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDiVshaScYdBbtJQ22inAnezGJbai9t249-SIawxo5wvyGHM-CIAcwUBJmEraI-7kEPTMKHZdrFa1HmMOM_ZHxCcsxslZDJr9FFFO9g1lZTB7xlzYe6TP-ZoPv2b6uMyJX-VS2ofhHzn3igjz3O6GRDvpkdrbgcGAvClkS0Ko3bqaw02vPzyc9T8oG6zvn0qg7ZQWVl-f3eOi2HtKFzUim2Qodiw6c7kF1eT31QLq8TxXS650EIYbSjnlzth3i0GiSX2RGCqfgaUfp8')" }}></div>
      </div>
    </header>
  );
};

export default Header;
