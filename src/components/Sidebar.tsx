import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  projectId?: number;
}

const Sidebar = ({ projectId }: SidebarProps) => {
  const { user, logout } = useAuth();

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <aside className="hidden lg:flex w-72 flex-col border-r border-border-sub bg-secondary h-full flex-shrink-0">
      <div className="p-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-text-main text-xl font-bold leading-normal flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-solid text-3xl">architecture</span>
            Land2Build
          </h1>
          <p className="text-text-sub text-xs font-medium pl-10">AI Construction Planner</p>
        </div>
      </div>
      <nav className="flex-1 flex flex-col gap-2 px-4 overflow-y-auto">
        <Link
          to="/projects"
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white border border-border-sub text-text-main shadow-sm group"
        >
          <span className="material-symbols-outlined text-primary-solid transition-colors">folder_open</span>
          <span className="text-sm font-semibold">Projects</span>
        </Link>
        {projectId && (
          <>
            <Link
              to={`/project/${projectId}`}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-sub hover:bg-white hover:text-text-main hover:shadow-sm transition-all"
            >
              <span className="material-symbols-outlined">dashboard</span>
              <span className="text-sm font-medium">Overview</span>
            </Link>
            <Link
              to={`/project/${projectId}/cost-analysis`}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-sub hover:bg-white hover:text-text-main hover:shadow-sm transition-all"
            >
              <span className="material-symbols-outlined">bar_chart</span>
              <span className="text-sm font-medium">Cost Analysis</span>
            </Link>
            <Link
              to={`/project/${projectId}/viewer`}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-sub hover:bg-white hover:text-text-main hover:shadow-sm transition-all"
            >
              <span className="material-symbols-outlined">view_in_ar</span>
              <span className="text-sm font-medium">3D Viewer</span>
            </Link>
            <Link
              to={`/project/${projectId}/weather`}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-sub hover:bg-white hover:text-text-main hover:shadow-sm transition-all"
            >
              <span className="material-symbols-outlined">cloud</span>
              <span className="text-sm font-medium">Weather Impact</span>
            </Link>
          </>
        )}
        <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-sub hover:bg-white hover:text-text-main hover:shadow-sm transition-all" href="#">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-sm font-medium">Settings</span>
        </a>
      </nav>
      <div className="p-4 border-t border-border-sub">
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white cursor-pointer transition-colors"
          onClick={logout}
        >
          <div className="w-8 h-8 rounded-full bg-primary-gradient flex items-center justify-center text-xs font-bold text-white shadow-md">
            {initials}
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-bold text-text-main">{user?.name || 'User'}</p>
            <p className="text-xs text-text-sub">Click to logout</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
