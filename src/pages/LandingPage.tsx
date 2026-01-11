import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Process from '../components/Process';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="bg-background-light">
      <Header />
      <Hero />
      <Features />
      <Process />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
