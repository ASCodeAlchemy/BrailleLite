import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Library, FileText, Users } from 'lucide-react';

const SecondaryFeatures = () => {
  const features = [
    {
      icon: Library,
      title: 'E-Library',
      description: 'Access thousands of Braille-ready resources including textbooks, novels, research papers, and educational materials.',
      cta: 'Explore Library',
      gradient: 'from-primary to-primary-dark',
      iconColor: 'text-black',
    },
    {
      icon: FileText,
      title: 'Exam Helper',
      description: 'Convert question papers and exam materials for students instantly. Ensure fair assessment opportunities for all.',
      cta: 'Try Now',
      gradient: 'from-accent to-accent-dark',
      iconColor: 'text-black',
    },
    {
      icon: Users,
      title: 'Volunteer Program',
      description: 'Support our mission by joining hands with us. Help us reach more students and build inclusive communities.',
      cta: 'Sign Up',
      gradient: 'from-success to-success/80',
      iconColor: 'text-black',
    },
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-[var(--font-family-display)]">
            Comprehensive Support Ecosystem
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Beyond text conversion, we provide a complete ecosystem of tools and resources 
            to support visually impaired students throughout their educational journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className={`impact-card group relative overflow-hidden border-0 shadow-xl animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-90`}></div>
              
              <CardHeader className="relative z-10 text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-spring">
                  <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
                </div>
                <CardTitle className="text-2xl font-bold text-white font-[var(--font-family-display)]">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="relative z-10 text-center text-white px-6 pb-8">
                <p className="text-white/90 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                
                <Button 
                  variant="outline" 
                  className="border-white text-black hover:bg-white hover:text-foreground group-hover:scale-105 transition-spring"
                >
                  {feature.cta}
                </Button>
              </CardContent>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 opacity-30">
                <div className="braille-dots">
                  <div className="braille-dot bg-white"></div>
                  <div className="braille-dot bg-white"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Button variant="cta" size="xl">
            Explore All Features
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SecondaryFeatures;