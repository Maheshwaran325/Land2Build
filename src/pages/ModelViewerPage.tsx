import ModelViewerHeader from '../components/ModelViewerHeader';
import ModelViewer from '../components/ModelViewer';

const ModelViewerPage = () => {
  return (
    <div className="bg-secondary text-dark-slate font-display overflow-hidden h-screen flex flex-col">
      <ModelViewerHeader />
      <ModelViewer />
    </div>
  );
};

export default ModelViewerPage;
