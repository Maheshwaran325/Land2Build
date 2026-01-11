import Sidebar from '../components/Sidebar';
import ProjectHeader from '../components/ProjectHeader';
import ProjectOverview from '../components/ProjectOverview';

const ProjectOverviewPage = () => {
  return (
    <div className="flex h-screen w-full font-display bg-canvas text-text-main antialiased overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-canvas">
        <ProjectHeader />
        <ProjectOverview />
      </main>
    </div>
  );
};

export default ProjectOverviewPage;
