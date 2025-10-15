import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, BookOpen, Zap, Award, Globe } from 'lucide-react';

const ImpactSection = () => {
  const impactStats = [
    { icon: BookOpen, number: '2,500+', label: 'Braille Books Printed', color: 'text-accent' },
    { icon: Users, number: '150+', label: 'Schools Supported', color: 'text-primary' },
    { icon: Award, number: '300+', label: 'Volunteers Trained', color: 'text-success' },
    { icon: Globe, number: '50+', label: 'Communities Reached', color: 'text-accent' },
    { icon: Zap, number: '10,000+', label: 'Documents Converted', color: 'text-primary' },
    { icon: Heart, number: '5,000+', label: 'Lives Impacted', color: 'text-success' },
  ];

  return (
    <section id="impact" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Main Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
          {/* NGO Partnership Card */}
          <Card className="impact-card group relative overflow-hidden border-0 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark opacity-95"></div>
            <CardContent className="relative z-10 p-8 text-center text-white">
              <div className="mb-6">
                <Users className="h-16 w-16 mx-auto mb-4 text-accent" />
                <h3 className="text-3xl font-bold mb-3 font-[var(--font-family-display)]">
                  NGO Partnership
                </h3>
                <p className="text-lg opacity-90 leading-relaxed">
                  Partner with us to build an accessible future. Together, we can create 
                  meaningful change in the lives of visually impaired students.
                </p>
              </div>
              <Button variant="hero" size="lg" className="group-hover:scale-105 transition-spring">
                Join Now
              </Button>
            </CardContent>
          </Card>

          {/* Donation Card */}
          <Card className="impact-card group relative overflow-hidden border-0 shadow-xl">
            <div className="absolute inset-0 bg-gradient-accent opacity-95"></div>
            <CardContent className="relative z-10 p-8 text-center text-white">
              <div className="mb-6">
                <Heart className="h-16 w-16 mx-auto mb-4 text-white" />
                <h3 className="text-3xl font-bold mb-3 font-[var(--font-family-display)]">
                  Make a Donation
                </h3>
                <p className="text-lg opacity-90 leading-relaxed">
                  Your support turns books into Braille for students. Every contribution 
                  directly impacts accessibility and education.
                </p>
              </div>
              <Button variant="outline" size="lg" className="border-white text-black hover:bg-white hover:text-accent-dark group-hover:scale-105 transition-spring">
                Donate Now
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Impact Statistics */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-[var(--font-family-display)]">
            Your Impact in Numbers
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how our community's collective efforts are transforming lives and creating 
            accessible learning opportunities worldwide.
          </p>
        </div>

        {/* Animated Stats Grid */}
        <div className="relative overflow-hidden">
          <div className="animate-scroll-x flex space-x-8 w-max">
            {/* First set of stats */}
            {impactStats.map((stat, index) => (
              <Card key={`stat-1-${index}`} className="flex-shrink-0 w-64 impact-card border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <stat.icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
            
            {/* Duplicate set for continuous scroll */}
            {impactStats.map((stat, index) => (
              <Card key={`stat-2-${index}`} className="flex-shrink-0 w-64 impact-card border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <stat.icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;