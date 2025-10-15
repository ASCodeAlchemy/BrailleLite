import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Type, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeatureHighlight = () => {
  const navigate = useNavigate();
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="animate-fade-in-left">
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-[var(--font-family-display)]">
                Convert Text into Braille in One Click
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Our revolutionary tool instantly transforms any digital text, document, or book 
                into accurate Braille format. Making education accessible has never been easier.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-foreground">Instant conversion with 99.9% accuracy</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-foreground">Support for multiple languages and formats</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-foreground">Direct printing to Braille embossers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-foreground">Cloud storage for easy access</span>
                </div>
              </div>

              <Button variant="cta" size="xl" onClick={() => navigate('/convert')}>
                Convert Now
                <Type className="ml-2 h-5 w-5" />
              </Button>

            </div>

            {/* Visual Demo */}
            <div className="animate-fade-in-right">
              <Card className="relative overflow-hidden shadow-hero border-0 bg-gradient-subtle">
                <CardContent className="p-8">
                  {/* Text Input Simulation */}
                  <div className="bg-background rounded-lg p-6 mb-6 shadow-lg">
                    <div className="text-sm text-muted-foreground mb-2">Input Text:</div>
                    <div className="text-lg font-medium text-foreground">
                      "Education is the most powerful weapon which you can use to change the world."
                    </div>
                  </div>

                  {/* Conversion Arrow */}
                  <div className="flex justify-center mb-6">
                    <div className="flex items-center space-x-2 bg-accent text-white px-4 py-2 rounded-full animate-float">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="text-sm font-medium">Converting...</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Braille Output Simulation */}
                  <div className="bg-background rounded-lg p-6 shadow-lg">
                    <div className="text-sm text-muted-foreground mb-2">Braille Output:</div>
                    <div className="grid grid-cols-12 gap-1 text-2xl text-accent">
                      {/* Simulated Braille dots pattern */}
                      {Array.from({ length: 48 }).map((_, i) => (
                        <div key={i} className="braille-dot bg-accent opacity-80"></div>
                      ))}
                    </div>
                    <div className="mt-4 text-sm text-muted-foreground">
                      Grade 2 Braille • Ready for printing • 8 cells
                    </div>
                  </div>

                  {/* Floating Animation Elements */}
                  <div className="absolute top-4 right-4 opacity-20">
                    <div className="braille-dots">
                      <div className="braille-dot bg-primary"></div>
                      <div className="braille-dot bg-primary"></div>
                      <div className="braille-dot bg-primary"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlight;