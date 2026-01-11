import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProjects } from '../hooks/useProjects';
import Sidebar from '../components/Sidebar';
import type { Project } from '../db';

const ProjectsListPage = () => {
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth();
    const { getUserProjects } = useProjects();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login');
        }
    }, [user, authLoading, navigate]);

    useEffect(() => {
        const loadProjects = async () => {
            if (user) {
                const userProjects = await getUserProjects();
                setProjects(userProjects);
                setLoading(false);
            }
        };
        loadProjects();
    }, [user, getUserProjects]);

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-canvas flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="flex h-screen w-full font-display bg-canvas text-text-main antialiased overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-canvas">
                <header className="flex-shrink-0 w-full bg-canvas/90 backdrop-blur-md sticky top-0 z-20 border-b border-border-sub">
                    <div className="px-6 py-3 lg:px-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-2xl lg:text-3xl font-black text-text-main tracking-tight">My Projects</h2>
                            <p className="text-text-sub text-sm flex items-center gap-2">
                                <span className="material-symbols-outlined text-base">folder_open</span>
                                Manage your construction analysis projects
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link
                                to="/new-project"
                                className="flex items-center justify-center gap-2 px-5 h-10 rounded-lg bg-primary-gradient text-white text-sm font-bold shadow-lg shadow-blue-500/30 transition-all hover:opacity-90"
                            >
                                <span className="material-symbols-outlined text-[20px]">add</span>
                                <span>New Project</span>
                            </Link>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto px-6 lg:px-10 py-8">
                    {projects.length === 0 ? (
                        <div className="bg-white rounded-xl border border-border-light p-12 text-center">
                            <div className="size-20 mx-auto mb-6 rounded-full bg-blue-50 flex items-center justify-center">
                                <span className="material-symbols-outlined text-4xl text-primary">folder_open</span>
                            </div>
                            <h3 className="text-xl font-bold text-dark-slate mb-2">No projects yet</h3>
                            <p className="text-slate-gray mb-6">Create your first project to get started with AI-powered construction analysis.</p>
                            <Link
                                to="/new-project"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-gradient text-white font-bold shadow-lg shadow-blue-500/20 hover:opacity-90 transition-all"
                            >
                                <span className="material-symbols-outlined">add</span>
                                Create Project
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project) => (
                                <Link
                                    key={project.id}
                                    to={`/project/${project.id}`}
                                    className="bg-white rounded-xl border border-border-light p-6 hover:shadow-lg hover:border-blue-200 transition-all group"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="size-12 rounded-lg bg-primary-gradient flex items-center justify-center text-white shadow-md">
                                            <span className="material-symbols-outlined">apartment</span>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${project.status === 'complete'
                                            ? 'bg-green-50 text-green-600 border border-green-200'
                                            : project.status === 'analyzing'
                                                ? 'bg-yellow-50 text-yellow-600 border border-yellow-200'
                                                : 'bg-gray-50 text-gray-600 border border-gray-200'
                                            }`}>
                                            {project.status === 'complete' ? 'Complete' : project.status === 'analyzing' ? 'Analyzing' : 'Draft'}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-dark-slate mb-2 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-slate-gray mb-4 line-clamp-1">{project.address}</p>
                                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border-light">
                                        <div>
                                            <p className="text-xs text-slate-gray">Total Area</p>
                                            <p className="text-sm font-bold text-dark-slate">{project.totalArea.toLocaleString('en-IN')} sq ft</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-gray">Est. Cost</p>
                                            <p className="text-sm font-bold text-dark-slate">₹{project.estimatedCost.toLocaleString('en-IN')}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ProjectsListPage;
