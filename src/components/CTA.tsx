import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <div className="w-full flex justify-center py-20 px-4 md:px-10 lg:px-40 bg-background-light">
      <div className="max-w-[1280px] w-full rounded-2xl overflow-hidden relative">
        <div className="absolute inset-0 bg-[#1F2937]">
          <img className="w-full h-full object-cover opacity-20 mix-blend-overlay" data-alt="Abstract skyscrapers view from bottom up" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxgqTODqeydDL391CeTjf3_cJZSSM10oHZOQLU9zOB0Nisinzn5tXK1WdfBfwTW8AoUFvVkAgyhyKymmOMnoAAOuw-RGljlqqNwrVkSGVMRIhFI0K-ICMRkCcD6dgoq4M5KTYNy79E_ywCMXNc5NTk2G5qfF-nnvPY2RB3fm-aOaE3gOjzYuZzU4SzeumAldk4w3zA43ehBF-dSxv6QMwAgXOmiTw7GS-YCCHz1mW9N5xzlDSsma9IgEs59_wCtWIXki6AAgGVsL1w" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937] via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 p-10 md:p-16">
          <div className="flex flex-col gap-6 max-w-lg">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">Ready to streamline your pre-construction?</h2>
            <p className="text-gray-300 text-lg">Join forward-thinking developers and architects using Land2Build to save time and money.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login">
                <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-gradient-custom text-white text-base font-bold shadow-lg shadow-[#4364F7]/25 hover:opacity-90 transition-all">
                  Get Started Now
                </button>
              </Link>
              <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-white/10 backdrop-blur border border-white/20 text-white text-base font-bold hover:bg-white/20 transition-all">
                Contact Sales
              </button>
            </div>
          </div>
          <div className="glass-panel rounded-xl p-6 max-w-md w-full border border-white/10 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="size-3 rounded-full bg-red-500"></div>
                <div className="size-3 rounded-full bg-yellow-500"></div>
                <div className="size-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs text-gray-400 font-mono">analysis_report.json</span>
            </div>
            <div className="space-y-3 font-mono text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">"site_area":</span>
                <span className="text-green-400">"14,500 sq ft"</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">"zoning_status":</span>
                <span className="text-[#6FB1FC]">"APPROVED"</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">"buildable_area":</span>
                <span className="text-white">"8,200 sq ft"</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">"est_cost_variance":</span>
                <span className="text-green-400">"-12.5%"</span>
              </div>
              <div className="w-full bg-white/5 h-1 rounded mt-2 overflow-hidden">
                <div className="bg-gradient-custom w-[94%] h-full"></div>
              </div>
              <div className="text-xs text-right text-gray-500">Processing complete (0.4s)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
