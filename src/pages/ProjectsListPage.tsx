import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProjects } from '../hooks/useProjects';
import type { Project } from '../db';

const ProjectsListPage = () => {
    const navigate = useNavigate();
    const { user, loading: authLoading, logout } = useAuth();
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
        <div className="min-h-screen bg-canvas">
            {/* Header */}
            <header className="bg-white border-b border-border-light">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
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
                        <h1 className="text-xl font-bold text-dark-slate">Land2Build</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-gray">Welcome, {user?.name}</span>
                        <button
                            onClick={logout}
                            className="text-sm text-slate-gray hover:text-dark-slate transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-black text-dark-slate">My Projects</h2>
                        <p className="text-slate-gray mt-1">Manage your construction analysis projects</p>
                    </div>
                    <Link
                        to="/new-project"
                        className="px-6 py-3 rounded-lg bg-primary-gradient text-white font-bold shadow-lg shadow-blue-500/20 hover:opacity-90 transition-all flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined">add</span>
                        New Project
                    </Link>
                </div>

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
                                        <p className="text-sm font-bold text-dark-slate">{project.totalArea.toLocaleString()} sq ft</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-gray">Est. Cost</p>
                                        <p className="text-sm font-bold text-dark-slate">${project.estimatedCost.toLocaleString()}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default ProjectsListPage;
