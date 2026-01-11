import CostAnalysisHeader from '../components/CostAnalysisHeader';
import CostAnalysis from '../components/CostAnalysis';

const DetailedCostAnalysisPage = () => {
  return (
    <div className="bg-background-light text-text-slate font-display overflow-x-hidden">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root">
        <CostAnalysisHeader />
        <CostAnalysis />
      </div>
    </div>
  );
};

export default DetailedCostAnalysisPage;
