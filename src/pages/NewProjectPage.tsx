import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import NewProjectForm from '../components/NewProjectForm';
import { useAuth } from '../context/AuthContext';

const NewProjectPage = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full font-display bg-canvas text-text-main antialiased overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-background-light">
        <header className="flex-shrink-0 w-full bg-white/90 backdrop-blur-md sticky top-0 z-20 border-b border-border-sub">
          <div className="px-6 py-3 lg:px-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl lg:text-3xl font-black text-text-main tracking-tight">New Project</h2>
              <p className="text-text-sub text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-base">add_circle</span>
                Create a new construction analysis project
              </p>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto">
          <NewProjectForm />
        </div>
      </main>
    </div>
  );
};

export default NewProjectPage;
