import WeatherImpactHeader from '../components/WeatherImpactHeader';
import WeatherImpact from '../components/WeatherImpact';

const WeatherImpactPage = () => {
  return (
    <div className="bg-canvas text-text-main min-h-screen flex flex-col overflow-x-hidden">
      <WeatherImpactHeader />
      <WeatherImpact />
    </div>
  );
};

export default WeatherImpactPage;
