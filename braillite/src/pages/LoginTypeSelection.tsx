import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, User, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginTypeSelection = () => {
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
        <div className="w-full max-w-2xl">
          {/* Back to Home */}
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-smooth mb-8 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>

          {/* User Type Selection Card */}
          <Card className="shadow-hero backdrop-blur-sm bg-background/95 border-border/50 animate-fade-in-up">
            <CardHeader className="text-center space-y-4">
              {/* Logo */}
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="braille-dots">
                  <div className="braille-dot"></div>
                  <div className="braille-dot"></div>
                  <div className="braille-dot"></div>
                  <div className="braille-dot"></div>
                  <div className="braille-dot"></div>
                  <div className="braille-dot"></div>
                </div>
                <span className="text-2xl font-bold text-primary font-[var(--font-family-display)]">
                  Brailite
                </span>
              </div>
              
              <CardTitle className="text-3xl font-[var(--font-family-display)]">
                Welcome to Brailite
              </CardTitle>
              <CardDescription className="text-muted-foreground text-lg">
                Choose your account type to continue
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* User Login Option */}
                <Link to="/login/user">
                  <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-2 hover:border-primary animate-fade-in-up">
                    <CardContent className="p-8 text-center space-y-4">
                      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <User size={32} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold font-[var(--font-family-display)] mb-2">
                          User Login
                        </h3>
                        <p className="text-muted-foreground">
                          Access Braille conversion tools, learning resources, and personal features
                        </p>
                      </div>
                      <Button className="w-full mt-4">
                        Continue as User
                      </Button>
                    </CardContent>
                  </Card>
                </Link>

                {/* NGO Login Option */}
                <Link to="/login/ngo">
                  <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-2 hover:border-primary animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <CardContent className="p-8 text-center space-y-4">
                      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <Building2 size={32} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold font-[var(--font-family-display)] mb-2">
                          NGO Login
                        </h3>
                        <p className="text-muted-foreground">
                          Manage programs, track impact, and access organizational tools and resources
                        </p>
                      </div>
                      <Button variant="outline" className="w-full mt-4">
                        Continue as NGO
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </div>

              {/* Additional Info */}
              <div className="text-center pt-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <p className="text-sm text-muted-foreground">
                  🌐 Both login types are optimized for screen readers and accessibility tools
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginTypeSelection;