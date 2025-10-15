import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import heroImage from '../assets/hero-braille-student.jpg';

const HeroSection = () => {
  const scrollToFeatures = () => {
    document.getElementById('impact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary/80 to-primary-dark/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Empowering the{' '}
            <span className="text-shimmer">Visually Impaired</span>{' '}
            with Knowledge in Braille
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90">
            Breaking barriers through accessible education. Converting digital text and physical books 
            into Braille, building inclusive learning environments for every student.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={scrollToFeatures}
              className="animate-float"
            >
              Get Started
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
            
            {/*Button Styling */}
            <Button
              variant="outline"
              size="xl"
              className="border-white text-black hover:bg-white hover:text-primary"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 scroll-indicator">
        <div className="text-white/70 text-sm mb-4"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 opacity-20 animate-float">
        <div className="braille-dots text-4xl">
          <div className="braille-dot bg-white"></div>
          <div className="braille-dot bg-white"></div>
          <div className="braille-dot bg-white"></div>
        </div>
      </div>
      
      <div className="absolute bottom-40 left-20 opacity-20 animate-float" style={{ animationDelay: '2s' }}>
        <div className="braille-dots text-2xl">
          <div className="braille-dot bg-white"></div>
          <div className="braille-dot bg-white"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
