import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CostAnalysis from '../components/CostAnalysis';
import { db, type Project } from '../db';
import { useAuth } from '../context/AuthContext';

const DetailedCostAnalysisPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const loadProject = async () => {
      if (id) {
        const foundProject = await db.projects.get(parseInt(id));
        if (foundProject) {
          setProject(foundProject);
        } else {
          navigate('/projects');
        }
        setLoading(false);
      }
    };
    loadProject();
  }, [id, navigate]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="flex h-screen w-full font-display bg-canvas text-text-main antialiased overflow-hidden">
      <Sidebar projectId={project.id} />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-canvas">
        <header className="flex-shrink-0 w-full bg-canvas/90 backdrop-blur-md sticky top-0 z-20 border-b border-border-sub">
          <div className="px-6 py-3 lg:px-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl lg:text-3xl font-black text-text-main tracking-tight">Cost Analysis</h2>
              <p className="text-text-sub text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-base">bar_chart</span>
                Detailed breakdown for {project.title}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center justify-center gap-2 px-4 h-10 rounded-lg bg-white hover:bg-gray-50 border border-border-sub text-text-main text-sm font-bold transition-all shadow-sm">
                <span className="material-symbols-outlined text-[20px] text-red-500">picture_as_pdf</span>
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto">
          <CostAnalysis project={project} />
        </div>
      </main>
    </div>
  );
};

export default DetailedCostAnalysisPage;
