import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Baby } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-2xl font-bold hover:opacity-90 transition-opacity"
            aria-label="ChildMinderConnect Home"
          >
            <Baby className="h-8 w-8 text-purple-600" />
            <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              ChildMinderConnect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-gray-700 hover:text-purple-400 transition-colors ${
                isActive('/') ? 'text-purple-400' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/find"
              className={`text-gray-700 hover:text-purple-400 transition-colors ${
                isActive('/find') ? 'text-purple-400' : ''
              }`}
            >
              Find Childminders
            </Link>
            <Link
              to="/about"
              className={`text-gray-700 hover:text-purple-400 transition-colors ${
                isActive('/about') ? 'text-purple-400' : ''
              }`}
            >
              About Us
            </Link>
            <Link
              to="/login"
              className={`text-gray-700 hover:text-purple-400 transition-colors ${
                isActive('/login') ? 'text-purple-400' : ''
              }`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition-colors"
            >
              Register
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-purple-400"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className={`text-gray-700 hover:text-purple-400 transition-colors ${
                  isActive('/') ? 'text-purple-400' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/find"
                className={`text-gray-700 hover:text-purple-400 transition-colors ${
                  isActive('/find') ? 'text-purple-400' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Find Childminders
              </Link>
              <Link
                to="/about"
                className={`text-gray-700 hover:text-purple-400 transition-colors ${
                  isActive('/about') ? 'text-purple-400' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/login"
                className={`text-gray-700 hover:text-purple-400 transition-colors ${
                  isActive('/login') ? 'text-purple-400' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition-colors inline-block text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;