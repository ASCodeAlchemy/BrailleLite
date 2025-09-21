import { Facebook, Instagram, Linkedin, Youtube, Heart } from 'lucide-react';

const Footer = () => {
  const footerLinks = [
    { href: '#about', label: 'About Us' },
    { href: '#contact', label: 'Contact Us' },
    { href: '#privacy', label: 'Privacy Policy' },
    { href: '#refund', label: 'Refund Policy' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <section id="contact" className="bg-accent text-primary-foreground py-12">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="braille-dots">
                <div className="braille-dot bg-accent"></div>
                <div className="braille-dot bg-accent"></div>
                <div className="braille-dot bg-accent"></div>
                <div className="braille-dot bg-accent"></div>
                <div className="braille-dot bg-accent"></div>
                <div className="braille-dot bg-accent"></div>
              </div>
              <span className="text-2xl font-bold font-[var(--font-family-display)]">
                Brailite
              </span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Empowering visually impaired students through accessible education technology. 
              Building bridges to knowledge, one Braille character at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 font-[var(--font-family-display)]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-accent transition-smooth"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4 font-[var(--font-family-display)]">
              Connect With Us
            </h3>
            <div className="flex space-x-4 mb-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent hover:scale-110 transition-spring"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <p className="text-primary-foreground/80 text-sm">
              <strong>Email:</strong> admin@brailite.org<br />
              <strong>Phone:</strong> +99 60(441)96257567
            </p>
          </div>
        </div>

        {/* Accessibility Notice */}
        <div className="border-t border-primary-foreground/20 pt-8 mb-6">
          <div className="bg-accent/10 rounded-lg p-4 text-center">
            <p className="text-primary-foreground/90 font-medium">
              <Heart className="inline h-4 w-4 mr-2 text-accent" />
              Designed for inclusivity – optimized for screen readers & voice navigation
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-primary-foreground/60 text-sm">
          <p>© 2025 Brailite. All rights reserved. | Making education accessible for everyone.</p>
        </div>
      </div>
      </section> 
    </footer>
  );
};

export default Footer;