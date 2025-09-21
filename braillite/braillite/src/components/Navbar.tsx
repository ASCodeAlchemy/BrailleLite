import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/features', label: 'Features' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/donate', label: 'Donate' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-lg border-b border-border' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={`font-medium transition-smooth hover:text-primary ${
                  isScrolled ? 'text-foreground' : 'text-white'
                }`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className={isScrolled ? '' : 'text-white hover:text-primary'}
              onClick={() => window.location.href = '/login'}
            >
              Login
            </Button>
            <Button 
              variant={isScrolled ? "default" : "hero"} 
              size="sm"
              onClick={() => window.location.href = '/register'}
            >
              Register 
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${isScrolled ? '' : 'text-white hover:text-primary'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-background/95 backdrop-blur-md rounded-lg border border-border shadow-lg animate-fade-in-up">
            <div className="flex flex-col space-y-4 px-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-medium text-foreground transition-smooth hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => window.location.href = '/login'}
                >
                  Login
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => window.location.href = '/register'}
                >
                  Register
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;