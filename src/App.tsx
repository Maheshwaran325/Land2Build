import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import NewProjectPage from './pages/NewProjectPage';
import ProjectOverviewPage from './pages/ProjectOverviewPage';
import DetailedCostAnalysisPage from './pages/DetailedCostAnalysisPage';
import ModelViewerPage from './pages/ModelViewerPage';
import WeatherImpactPage from './pages/WeatherImpactPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/new-project" element={<NewProjectPage />} />
        <Route path="/project/:id" element={<ProjectOverviewPage />} />
        <Route path="/project/:id/cost-analysis" element={<DetailedCostAnalysisPage />} />
        <Route path="/project/:id/viewer" element={<ModelViewerPage />} />
        <Route path="/project/:id/weather" element={<WeatherImpactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
