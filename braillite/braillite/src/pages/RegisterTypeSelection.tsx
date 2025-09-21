import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Building2, UserPlus, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const RegisterTypeSelection = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-overlay"></div>
      
      {/* Floating Braille Dots */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="braille-dots">
          <div className="braille-dot"></div>
          <div className="braille-dot"></div>
          <div className="braille-dot"></div>
        </div>
      </div>
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <div className="braille-dots">
          <div className="braille-dot"></div>
          <div className="braille-dot"></div>
        </div>
      </div>
      <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '2s' }}>
        <div className="braille-dots">
          <div className="braille-dot"></div>
          <div className="braille-dot"></div>
          <div className="braille-dot"></div>
          <div className="braille-dot"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {/* Back to Home */}
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-smooth mb-8 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>

          {/* Registration Type Selection */}
          <div className="text-center mb-12 animate-fade-in-up">
            {/* Logo */}
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="braille-dots">
                <div className="braille-dot"></div>
                <div className="braille-dot"></div>
                <div className="braille-dot"></div>
                <div className="braille-dot"></div>
                <div className="braille-dot"></div>
                <div className="braille-dot"></div>
              </div>
              <span className="text-3xl font-bold text-white font-[var(--font-family-display)]">
                Brailite
              </span>
            </div>
            
            <div className="flex items-center justify-center space-x-2 text-white/90 mb-4">
              <UserPlus size={28} />
              <span className="text-xl font-medium">Create Account</span>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4 font-[var(--font-family-display)]">
              Join Our Community
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Choose your account type to get started with Brailite's accessibility tools and resources
            </p>
          </div>

          {/* Registration Options */}
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* User Registration */}
            <Card className="shadow-hero backdrop-blur-sm bg-background/95 border-border/50 hover:shadow-2xl transition-spring hover:scale-[1.02] animate-fade-in-up group">
              <CardHeader className="text-center space-y-4 pb-4">
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto group-hover:bg-primary/20 transition-smooth">
                  <User size={32} className="text-primary" />
                </div>
                <CardTitle className="text-2xl font-[var(--font-family-display)]">
                  Register as User
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Individual account for personal use of Braille conversion tools and accessibility resources
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Convert text to Braille instantly</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Access learning resources</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Personal document management</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Free accessibility tools</span>
                  </div>
                </div>
                
                <Link to="/register/user" className="block">
                  <Button className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-spring">
                    <User size={20} className="mr-2" />
                    Register as User
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* NGO Registration */}
            <Card className="shadow-hero backdrop-blur-sm bg-background/95 border-border/50 hover:shadow-2xl transition-spring hover:scale-[1.02] animate-fade-in-up group" style={{ animationDelay: '0.1s' }}>
              <CardHeader className="text-center space-y-4 pb-4">
                <div className="flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mx-auto group-hover:bg-secondary/20 transition-smooth">
                  <Building2 size={32} className="text-secondary" />
                </div>
                <CardTitle className="text-2xl font-[var(--font-family-display)]">
                  Register as NGO
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Organization account for NGOs working in accessibility and disability support
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>Bulk text conversion tools</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>Organization dashboard</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>Resource sharing platform</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>Community collaboration</span>
                  </div>
                </div>
                
                <Link to="/register/ngo" className="block">
                  <Button variant="secondary" className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-spring">
                    <Building2 size={20} className="mr-2" />
                    Register as NGO
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Already have account */}
          <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <p className="text-white/80">
              Already have an account?
              <Link 
                to="/login" 
                className="ml-2 text-white hover:text-white/80 font-medium transition-smooth underline decoration-white/30 hover:decoration-white/60"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterTypeSelection;