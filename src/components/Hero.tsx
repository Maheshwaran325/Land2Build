import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative w-full flex justify-center py-5 hero-pattern bg-background-light">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#4364F7]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="flex flex-col max-w-[1280px] w-full px-4 md:px-10 lg:px-40 z-10">
        <div className="@container">
          <div className="flex flex-col-reverse gap-6 py-12 md:py-24 @[864px]:flex-row @[864px]:items-center">
            <div className="flex flex-col gap-6 flex-1 @[864px]:pr-10">
              <div className="flex flex-col gap-4 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0052D4]/5 border border-[#0052D4]/20 w-fit">
                  <span className="size-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">AI-Powered Construction</span>
                </div>
                <h1 className="text-4xl font-extrabold leading-tight tracking-[-0.033em] @[480px]:text-5xl @[864px]:text-6xl text-text-main">
                  Turn Raw Land into <span className="text-gradient">Intelligent Plans</span>
                </h1>
                <h2 className="text-base font-normal leading-relaxed text-[#637588] max-w-[600px]">
                  Harness the power of AI to analyze terrain, ensure zoning compliance, and generate build-ready blueprints instantly. Reduce planning time by 90%.
                </h2>
              </div>
              <div className="flex flex-wrap gap-4 mt-2">
                <Link to="/login">
                  <button className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-gradient-custom text-white text-base font-bold shadow-lg shadow-[#4364F7]/25 hover:opacity-90 hover:scale-105 transition-all">
                    Start Free Trial
                  </button>
                </Link>
                <button className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-transparent border border-[#e5e7eb] text-text-main text-base font-bold hover:bg-bg-secondary transition-all gap-2">
                  <span className="material-symbols-outlined text-[20px]">play_circle</span>
                  Watch Demo
                </button>
              </div>
              <div className="flex items-center gap-4 mt-4 text-sm text-[#637588]">
                <div className="flex -space-x-2">
                  <div className="size-8 rounded-full border-2 border-white bg-gray-300 bg-cover bg-center" data-alt="User avatar 1" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDuPnddnLxvPCcmUIzd6xvewsLdBRLnvWhNe-f7A-nn4TQuRMCQgX1wezVVQTgPzv6cC4xYOx5dRyCNywRM79jf0NuHiwoGWsupLrHJaRYZlc_2IIst8CPAZOUm3Vv7meqr6BOxRiPS9N7P6BDvwYRkbojkXzybfaXr7fUtjhdPL0WvsSbYlNfxo8VpXkXnMJrXcIVlfo1gMTZiKdbGKCtU-Ftutaxvgdk0TuRuIKBHWmyxb5vRAxT-gFUVrTNSLJxd2NeocZJXw8Ob')" }}></div>
                  <div className="size-8 rounded-full border-2 border-white bg-gray-300 bg-cover bg-center" data-alt="User avatar 2" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBId7b25XYMaHDoylqY9exNG8QhFdT8-ASLoe6XZaMQdmbHTxVyMWMU1zZxqkXmeqSBEGeTBREAsI4DXnjbXd_8jt5ulMwsFH3ihc5HRb3yc6DanaxXt5IV1Qmsq1Sp9pybDCUZxKhqnrzBWp_QIL7KFHIM2rKMQpHGSHykkis_gbVbVh-WElNSqX3o3xVjmtp1lrQmYN3AIWJnLX9wSHjlvmYdlSYiJ8KQitDDO-ji4AmTU_waXz3G_2URjlxwcv9vud35a9Stry1f')" }}></div>
                  <div className="size-8 rounded-full border-2 border-white bg-gray-300 bg-cover bg-center" data-alt="User avatar 3" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDRTpL-KJrsckaaF-2dPZ1qgmDTzMQBRMcbjfQMEeLgN1ZXHKategBC7QkcomlkvhCjlCqWVCgX0PFuY0e3QcLWspEw1H1ldsJIKZC2AlT-LtGyIGIks1hSyuTnzv_ebqcRgV_vF5zBTdLq1Q16VlRTsbuZbOhi8K8tidtjvDCIczmgIO3lsomUJLEnEsCRA-akke0i1WMT_Ih1gOnQYAvizN271P8NN8M9mnHErIgzrUhAz_eLUWhnPDHe1no-BsNgRmDRk-RuVosS')" }}></div>
                </div>
                <p>Trusted by 2,000+ Architects</p>
              </div>
            </div>
            <div className="flex-1 w-full relative group">
              <div className="absolute -inset-1 bg-gradient-custom rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-full aspect-video bg-[#1F2937] rounded-xl overflow-hidden border border-[#e5e7eb] shadow-2xl">
                <div className="w-full h-full bg-cover bg-center" data-alt="Architectural wireframe blueprint overlay on construction site" data-location="New York City" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAfYgolap3QEHQuASb5QPkXD_UZsFNFAFFhgZU-s8IdN8lxmfWWxv6bzxuElT8Kb5nuOvndZu0DgnZL3azWnhAv5jq0_ttcU6BtRt0dfN50HL0aa5oEAl51aI48aV_w0L62GWPjWJmcXP-6swlfL0t4blnrc-Vb49ofNvQQJ4dvPApIvj1RSTevKB0sSx3ZAjRqDEtMKpO0UTPAt-78sECVqscdKoNKGRiIC9psKsrlZVeKGGyrkdCBRgKaP0za4NDq7cKZ8g2o2yEa')" }}>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-lg p-3 border border-white/10 flex items-center gap-3">
                      <div className="size-10 bg-white/10 rounded flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-gradient">analytics</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-400">Analysis Complete</div>
                        <div className="text-sm font-bold text-white">Site Optimization: 94%</div>
                      </div>
                      <div className="text-[#6FB1FC] font-bold">READY</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
