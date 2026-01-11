import { useState, createContext, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  projectId?: number;
}

// Create a context to share sidebar state
interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  return context;
};

const Sidebar = ({ projectId }: SidebarProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : true;
  });

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinkClass = (path: string) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive(path)
      ? 'bg-white border border-border-sub text-text-main shadow-sm'
      : 'text-text-sub hover:bg-white hover:text-text-main hover:shadow-sm'
    }`;

  return (
    <aside
      className={`hidden lg:flex flex-col border-r border-border-sub bg-secondary h-full flex-shrink-0 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-72'
        }`}
    >
      {/* Header */}
      <div className={`p-4 ${isCollapsed ? 'px-2' : 'p-6'}`}>
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-2 ${isCollapsed ? 'justify-center w-full' : ''}`}>
            <span className="material-symbols-outlined text-primary-solid text-3xl">architecture</span>
            {!isCollapsed && (
              <div className="flex flex-col">
                <h1 className="text-text-main text-xl font-bold leading-normal">Land2Build</h1>
                <p className="text-text-sub text-xs font-medium">AI Construction Planner</p>
              </div>
            )}
          </div>
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-text-sub hover:bg-white hover:text-text-main transition-all"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <span className={`material-symbols-outlined text-[20px] transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}>
              chevron_left
            </span>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`flex-1 flex flex-col gap-2 overflow-y-auto ${isCollapsed ? 'px-2' : 'px-4'}`}>
        <Link
          to="/projects"
          className={navLinkClass('/projects')}
          title="Projects"
        >
          <span className="material-symbols-outlined text-primary-solid transition-colors">folder_open</span>
          {!isCollapsed && <span className="text-sm font-semibold">Projects</span>}
        </Link>
        {projectId && (
          <>
            <Link
              to={`/project/${projectId}`}
              className={navLinkClass(`/project/${projectId}`)}
              title="Overview"
            >
              <span className="material-symbols-outlined">dashboard</span>
              {!isCollapsed && <span className="text-sm font-medium">Overview</span>}
            </Link>
            <Link
              to={`/project/${projectId}/viewer`}
              className={navLinkClass(`/project/${projectId}/viewer`)}
              title="3D Viewer"
            >
              <span className="material-symbols-outlined">view_in_ar</span>
              {!isCollapsed && <span className="text-sm font-medium">3D Viewer</span>}
            </Link>
            <Link
              to={`/project/${projectId}/cost-analysis`}
              className={navLinkClass(`/project/${projectId}/cost-analysis`)}
              title="Cost Analysis"
            >
              <span className="material-symbols-outlined">bar_chart</span>
              {!isCollapsed && <span className="text-sm font-medium">Cost Analysis</span>}
            </Link>
            <Link
              to={`/project/${projectId}/weather`}
              className={navLinkClass(`/project/${projectId}/weather`)}
              title="Weather Impact"
            >
              <span className="material-symbols-outlined">cloud</span>
              {!isCollapsed && <span className="text-sm font-medium">Weather Impact</span>}
            </Link>
          </>
        )}
        <a
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-text-sub hover:bg-white hover:text-text-main hover:shadow-sm transition-all`}
          href="#"
          title="Settings"
        >
          <span className="material-symbols-outlined">settings</span>
          {!isCollapsed && <span className="text-sm font-medium">Settings</span>}
        </a>
      </nav>

      {/* User Section */}
      <div className={`p-4 border-t border-border-sub ${isCollapsed ? 'px-2' : ''}`}>
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white cursor-pointer transition-colors ${isCollapsed ? 'justify-center px-2' : ''
            }`}
          onClick={logout}
          title={isCollapsed ? 'Click to logout' : undefined}
        >
          <div className="w-8 h-8 rounded-full bg-primary-gradient flex items-center justify-center text-xs font-bold text-white shadow-md flex-shrink-0">
            {initials}
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <p className="text-sm font-bold text-text-main">{user?.name || 'User'}</p>
              <p className="text-xs text-text-sub">Click to logout</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
