import type { Project } from '../db';

interface ProjectHeaderProps {
  project: Project;
}

const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  const getStatusLabel = () => {
    switch (project.status) {
      case 'complete': return 'Plan Generated';
      case 'analyzing': return 'Analyzing...';
      default: return 'Draft';
    }
  };

  const getStatusClass = () => {
    switch (project.status) {
      case 'complete': return 'bg-green-50 text-green-600 border-green-200';
      case 'analyzing': return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  return (
    <header className="flex-shrink-0 w-full bg-canvas/90 backdrop-blur-md sticky top-0 z-20 border-b border-border-sub">
      <div className="px-6 py-3 lg:px-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl lg:text-3xl font-black text-text-main tracking-tight">{project.title}</h2>
            <span className={`px-2 py-1 rounded text-xs font-bold border ${getStatusClass()}`}>
              {getStatusLabel()}
            </span>
          </div>
          <p className="text-text-sub text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-base">schedule</span>
            Last updated: {formatDate(project.createdAt)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center gap-2 px-4 h-10 rounded-lg bg-white hover:bg-gray-50 border border-border-sub text-text-main text-sm font-bold transition-all shadow-sm">
            <span className="material-symbols-outlined text-[20px] text-red-500">picture_as_pdf</span>
            <span>Export PDF</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-5 h-10 rounded-lg bg-primary-gradient text-white text-sm font-bold shadow-lg shadow-blue-500/30 transition-all hover:opacity-90">
            <span className="material-symbols-outlined text-[20px]">edit_square</span>
            <span>Edit Plan</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default ProjectHeader;
