import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ProjectHeader from '../components/ProjectHeader';
import ProjectOverview from '../components/ProjectOverview';
import { db, type Project } from '../db';
import { useAuth } from '../context/AuthContext';

const ProjectOverviewPage = () => {
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
        <ProjectHeader project={project} />
        <ProjectOverview project={project} />
      </main>
    </div>
  );
};

export default ProjectOverviewPage;
