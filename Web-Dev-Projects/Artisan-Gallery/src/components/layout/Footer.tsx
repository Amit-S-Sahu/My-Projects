import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import { useThemeStore } from '../../store/theme';

const Footer = () => {
  const { isDark } = useThemeStore();

  return (
    <footer className={`${isDark ? 'bg-dark-lighter' : 'bg-dark'} text-white pt-16 pb-8`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-display text-xl mb-4">Artisan Gallery</h3>
            <p className="text-gray-300 mb-6 max-w-xs">
              Showcasing extraordinary art from emerging and established artists around the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors duration-300">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-display text-lg mb-4">Navigate</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300">Home</Link>
              <Link to="/gallery" className="text-gray-300 hover:text-white transition-colors duration-300">Gallery</Link>
              <Link to="/collections" className="text-gray-300 hover:text-white transition-colors duration-300">Collections</Link>
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-300">About</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-300">Contact</Link>
            </nav>
          </div>
          
          <div>
            <h4 className="font-display text-lg mb-4">Visit Us</h4>
            <address className="text-gray-300 not-italic">
              UPES, Bidholi<br />
              Dehradun, Uttarakhand 248007<br />
              <a href="tel:+919868619498" className="hover:text-white transition-colors duration-300">+91 9868619498</a><br />
              <a href="mailto:amitssahu199@gmail.com" className="hover:text-white transition-colors duration-300">amitssahu199@gmail.com</a>
            </address>
            <p className="mt-4 text-gray-300">
              Open Tuesday–Sunday<br />
              10:00 AM – 6:00 PM
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Artisan Gallery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;