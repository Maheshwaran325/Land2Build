import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, signup, user } = useAuth();

  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  if (user) {
    navigate('/projects');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (activeTab === 'login') {
        const result = await login(email, password);
        if (result.success) {
          navigate('/projects');
        } else {
          setError(result.error || 'Login failed');
        }
      } else {
        if (!name.trim()) {
          setError('Please enter your name');
          setLoading(false);
          return;
        }
        const result = await signup(email, password, name);
        if (result.success) {
          navigate('/projects');
        } else {
          setError(result.error || 'Signup failed');
        }
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-row">
      <div className="flex flex-col w-full lg:w-[45%] xl:w-[40%] h-full overflow-y-auto z-10 bg-canvas relative border-r border-border-light">
        <div className="p-6 lg:p-10 flex items-center gap-3">
          <div className="size-8 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logo-gradient" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#0052D4"></stop>
                  <stop offset="50%" stopColor="#4364F7"></stop>
                  <stop offset="100%" stopColor="#6FB1FC"></stop>
                </linearGradient>
              </defs>
              <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="url(#logo-gradient)"></path>
            </svg>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-dark-slate">Land2Build</h2>
        </div>
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24 pb-10">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-black leading-tight tracking-tight mb-2 text-dark-slate">
              {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-slate-gray text-base font-normal">
              {activeTab === 'login'
                ? 'Turn raw land into intelligent plans.'
                : 'Start your construction analysis journey.'}
            </p>
          </div>
          <div className="mb-8">
            <div className="flex border-b border-border-light gap-8">
              <button
                className={`relative pb-3 text-sm font-bold tracking-wide transition-colors duration-200 ${activeTab === 'login'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-slate-gray border-b-2 border-transparent hover:text-dark-slate'
                  }`}
                type="button"
                onClick={() => { setActiveTab('login'); setError(''); }}
              >
                Log In
              </button>
              <button
                className={`relative pb-3 text-sm font-bold tracking-wide transition-colors duration-200 ${activeTab === 'signup'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-slate-gray border-b-2 border-transparent hover:text-dark-slate'
                  }`}
                type="button"
                onClick={() => { setActiveTab('signup'); setError(''); }}
              >
                Sign Up
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {activeTab === 'signup' && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-dark-slate" htmlFor="name">Full Name</label>
                <input
                  className="flex w-full h-12 rounded-lg border border-border-light bg-surface px-4 py-2 text-base text-dark-slate placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                  id="name"
                  placeholder="John Doe"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-dark-slate" htmlFor="email">Email Address</label>
              <input
                className="flex w-full h-12 rounded-lg border border-border-light bg-surface px-4 py-2 text-base text-dark-slate placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                id="email"
                placeholder="name@company.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-dark-slate" htmlFor="password">Password</label>
                {activeTab === 'login' && (
                  <a className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors" href="#">Forgot Password?</a>
                )}
              </div>
              <div className="relative">
                <input
                  className="flex w-full h-12 rounded-lg border border-border-light bg-surface px-4 py-2 pr-10 text-base text-dark-slate placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                  id="password"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-dark-slate transition-colors"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
            </div>
            <button
              className="mt-4 flex w-full items-center justify-center rounded-lg bg-primary-gradient py-3.5 text-base font-bold text-white shadow-lg shadow-blue-500/20 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Please wait...' : (activeTab === 'login' ? 'Log In' : 'Create Account')}
            </button>
          </form>
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border-light"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-slate-gray border border-border-light rounded">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 rounded-lg border border-border-light bg-white py-2.5 text-sm font-semibold text-dark-slate hover:bg-surface transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1" type="button">
              <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M12.0003 20.45c4.6667 0 8.45-3.7833 8.45-8.45 0-4.6667-3.7833-8.45-8.45-8.45-4.6667 0-8.45 3.7833-8.45 8.45 0 4.6667 3.7833 8.45 8.45 8.45Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                <path d="M12 20.45V12h8.45" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 rounded-lg border border-border-light bg-white py-2.5 text-sm font-semibold text-dark-slate hover:bg-surface transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1" type="button">
              <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"></path>
              </svg>
              Microsoft
            </button>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-gray">
              By continuing, you agree to our
              <a className="font-medium text-dark-slate underline decoration-slate-300 underline-offset-4 hover:text-primary transition-colors" href="#"> Terms of Service</a>
              {' '}and
              <a className="font-medium text-dark-slate underline decoration-slate-300 underline-offset-4 hover:text-primary transition-colors" href="#"> Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex w-[55%] xl:w-[60%] relative bg-dark-slate overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img alt="Abstract dark topographic wireframe landscape" className="h-full w-full object-cover opacity-60 mix-blend-overlay" data-alt="Abstract dark topographic wireframe landscape glowing with blue nodes" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4-VjuTKkFu933CAGHiv9jTy-TcqSZQqj7phs5uczddZYjkGBKqBswbZ_mtuC154_O8-4sObZrliRtjHUOoknzFeoDb1k-THFgXc9oxaCW2E_AZsQRH6dEaPy6QDG-YF8gHR4aKf5FPYOnJ-F5oSPsl6M9uLpj7c_CO9f0T1zhd3ma_mEQTwoGFwqH3waoCBKtLPqI2m-vKJG1ZKjr0MGiz59QksM4n3MunmJb7hIljUDSxnsyI6RnmwHsGXeb8xUA9Q9RFSKn0ZaV" />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-dark-slate via-dark-slate/80 to-transparent"></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-dark-slate via-transparent to-transparent"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 xl:translate-x-0 w-3/4 max-w-2xl h-3/4 z-20 pointer-events-none opacity-80">
          <div className="w-full h-full rounded-l-3xl border border-primary/20 bg-dark-slate/50 backdrop-blur-md shadow-2xl shadow-primary/10 overflow-hidden p-1">
            <div className="w-full h-full rounded-l-2xl bg-center bg-cover opacity-60 relative" data-alt="Futuristic city planning grid with neon blue data lines" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCk2zGI2KehoQowxbWxff4T5J7ZX-BTJdA5cW-amo9qE7Lii525TtM24nXC8T3-kHWRNp9nw5aWeFBc6JmZRtCBAtHBj7SY4q5tJGNjRM-qvU5yLnkCIAce2tOQKyOF6bcyJUSXF_T3XImOeVpYl16mOUEZRdC-J8PuV0wdK0_NMilMI0VuTk_hTv9OS7RscfIy8kkWDcMF4BdSnWoLe6mFgseI_-qEvtnq-yizPyUiB3ikCGV_lya6reboLbMtmwa24ISG9GNrHZqp')" }}>
              <div className="absolute inset-0 bg-primary/10"></div>
              <div className="absolute top-1/4 left-0 right-0 h-[2px] bg-primary shadow-[0_0_15px_2px_rgba(67,100,247,0.8)] opacity-70"></div>
              <div className="absolute top-10 left-10 bg-dark-slate/90 backdrop-blur border border-white/10 p-3 rounded-lg shadow-lg flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">analytics</span>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Analysis Complete</p>
                  <p className="text-white text-sm font-bold">Terrain Optimization: 98%</p>
                </div>
              </div>
              <div className="absolute bottom-20 right-20 bg-dark-slate/90 backdrop-blur border border-white/10 p-3 rounded-lg shadow-lg flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="size-8 rounded-full bg-gray-600 border-2 border-dark-slate"></div>
                  <div className="size-8 rounded-full bg-gray-500 border-2 border-dark-slate"></div>
                  <div className="size-8 rounded-full bg-primary flex items-center justify-center text-[10px] text-white font-bold border-2 border-dark-slate">+5</div>
                </div>
                <p className="text-white text-sm font-bold">Team Collaborating</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-30 mt-auto px-12 pb-16 w-full max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">AI-Driven Engine</span>
          </div>
          <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight mb-4">
            From raw data to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">intelligent construction.</span>
          </h2>
          <p className="text-lg text-slate-300 max-w-md leading-relaxed">
            Automate your site feasibility studies and generate optimized construction plans in minutes, not weeks.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
