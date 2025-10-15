import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ImpactSection from '@/components/ImpactSection';
import FeatureHighlight from '@/components/FeatureHighlight';
import SecondaryFeatures from '@/components/SecondaryFeatures';
import BlogsPrograms from '@/components/BlogsPrograms';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <ImpactSection />
        <FeatureHighlight />
        <SecondaryFeatures />
        <BlogsPrograms />
      </main>
      <Footer />
    </div>
  );
};

export default Index;