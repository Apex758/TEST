// src/components/Header.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, User, ChevronDown, Home, Book, Wrench, TrendingUp, Users, BarChart3, BookOpen, Keyboard, Search, HelpCircle } from 'lucide-react';
import ExpandableSearch from './ExpandableSearch';
import LoginModal from './LoginModal';
import MegaMenu from './MegaMenu';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to false to test login flow
  const [activeMegaMenu, setActiveMegaMenu] = useState<'curriculum' | 'tools' | 'grow' | 'connect' | null>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navItems = [
    { id: 'home', label: 'HOME', icon: Home, hasMegaMenu: false },
    { id: 'curriculum', label: 'CURRICULUM', icon: Book, hasMegaMenu: true },
    { id: 'tools', label: 'TOOLS', icon: Wrench, hasMegaMenu: true },
    { id: 'grow', label: 'GROW', icon: TrendingUp, hasMegaMenu: true },
    { id: 'connect', label: 'CONNECT', icon: Users, hasMegaMenu: true }
  ];

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case '1':
            event.preventDefault();
            setCurrentPage('home');
            break;
          case '2':
            event.preventDefault();
            setCurrentPage('curriculum');
            break;
          case '3':
            event.preventDefault();
            setCurrentPage('tools');
            break;
          case '4':
            event.preventDefault();
            setCurrentPage('grow');
            break;
          case '5':
            event.preventDefault();
            setCurrentPage('connect');
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [setCurrentPage]);

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Implement search functionality here
  };

  const handleLogin = (email: string, password: string) => {
    console.log('Login attempt:', email);
    // Here you would typically make an API call to authenticate
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserMenuOpen(false);
  };

  const handleProtectedAction = (action: () => void) => {
    if (isLoggedIn) {
      action();
    } else {
      setShowLoginModal(true);
    }
  };

  // Mega menu handlers
  const handleNavHover = (itemId: string) => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
    }

    if (['curriculum', 'tools', 'grow', 'connect'].includes(itemId)) {
      setActiveMegaMenu(itemId as 'curriculum' | 'tools' | 'grow' | 'connect');
    } else {
      setActiveMegaMenu(null);
    }
  };

  const handleNavLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 150); // Small delay to allow moving to mega menu
  };

  const handleMegaMenuEnter = () => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
    }
  };

  const handleMegaMenuLeave = () => {
    setActiveMegaMenu(null);
  };

  // Close mega menu when clicking elsewhere
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMegaMenu(null);
      }
    };

    if (activeMegaMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeMegaMenu]);

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-lg z-50"
      >
        Skip to main content
      </a>
      
      <header className="bg-white/95 backdrop-blur-md border-b border-sage-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button 
                className="md:hidden mr-3 p-2 hover:bg-sage-100 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div 
                className="text-xl font-bold text-primary-600 cursor-pointer hover:text-primary-700 transition-colors" 
                onClick={() => setCurrentPage('home')}
              >
                OECS Learning Hub
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav 
              ref={navRef}
              className="hidden md:flex space-x-8 relative" 
              role="navigation"
              onMouseLeave={handleNavLeave}
            >
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  onMouseEnter={() => handleNavHover(item.id)}
                  className={`nav-item-hover px-3 py-2 text-sm font-medium transition-all duration-200 flex items-center ${
                    currentPage === item.id 
                      ? 'text-primary-600' 
                      : 'text-gray-700'
                  } ${activeMegaMenu === item.id ? 'text-primary-600' : ''}`}
                  title={`${item.label} (Ctrl+${index + 1})`}
                >
                  <item.icon className="mr-1" size={16} />
                  {item.label}
                  {item.hasMegaMenu && (
                    <ChevronDown 
                      size={14} 
                      className={`ml-1 transition-transform duration-200 ${
                        activeMegaMenu === item.id ? 'rotate-180' : ''
                      }`} 
                    />
                  )}
                </button>
              ))}

              {/* Mega Menu */}
              {activeMegaMenu && (
                <div 
                  className="absolute top-full left-0 right-0"
                  onMouseEnter={handleMegaMenuEnter}
                  onMouseLeave={handleMegaMenuLeave}
                >
                  <MegaMenu
                    isOpen={!!activeMegaMenu}
                    onClose={() => setActiveMegaMenu(null)}
                    menuType={activeMegaMenu}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              )}
            </nav>

            {/* Search and User Section */}
            <div className="flex items-center space-x-6">
              {/* Desktop Expandable Search */}
              <div className="hidden sm:block">
                <ExpandableSearch 
                  placeholder="Search lessons, tools, resources..."
                  onSearch={handleSearch}
                />
              </div>
              
              {/* User Menu */}
              <div className="relative" ref={userMenuRef}>
                {isLoggedIn ? (
                  // Logged In User Menu
                  <>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-all duration-200 p-2 rounded-lg hover:bg-sage-100 group"
                      aria-label="User menu"
                    >
                      <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                        <User size={18} className="text-white" />
                      </div>
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    
                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl py-2 z-50 border border-sage-200 animate-dropdownBounce">
                        {/* User Profile Section */}
                        <div className="px-4 py-3 border-b border-sage-200">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full flex items-center justify-center">
                              <User size={20} className="text-white" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-800">John Educator</div>
                              <div className="text-xs text-sage-600">Grade 4 Teacher • Verified</div>
                              <div className="text-xs text-primary-600 font-medium">Premium Member</div>
                            </div>
                          </div>
                        </div>

                        {/* Premium Platforms Section */}
                        <div className="px-2 py-2">
                          <div className="px-2 py-1 text-xs font-semibold text-sage-600 uppercase tracking-wide">
                            Your Platforms
                          </div>
                          
                          {/* OECS MyPD */}
                          <button 
                            onClick={() => setCurrentPage('grow')}
                            className="w-full text-left p-3 rounded-lg hover:bg-primary-50 transition-all duration-200 group border border-transparent hover:border-primary-200 mb-2"
                          >
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                                <TrendingUp size={18} className="text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h3 className="text-sm font-semibold text-gray-800 group-hover:text-primary-700">OECS MyPD</h3>
                                  <span className="bg-primary-100 text-primary-700 text-xs px-2 py-0.5 rounded-full">Active</span>
                                </div>
                                <p className="text-xs text-sage-600 leading-relaxed">
                                  Embark on a journey of continuous learning and professional growth with our comprehensive development platform.
                                </p>
                              </div>
                            </div>
                          </button>

                          {/* OECS MAKER Studio */}
                          <button 
                            onClick={() => setCurrentPage('connect')}
                            className="w-full text-left p-3 rounded-lg hover:bg-secondary-50 transition-all duration-200 group border border-transparent hover:border-secondary-200"
                          >
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                                <Users size={18} className="text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h3 className="text-sm font-semibold text-gray-800 group-hover:text-secondary-700">OECS MAKER Studio</h3>
                                  <span className="bg-secondary-100 text-secondary-700 text-xs px-2 py-0.5 rounded-full">New</span>
                                </div>
                                <p className="text-xs text-sage-600 leading-relaxed">
                                  Join our collaborative platform where educators share ideas and co-create innovative content for students.
                                </p>
                              </div>
                            </div>
                          </button>
                        </div>

                        <hr className="my-2 border-sage-200" />
                        
                        {/* Quick Access Menu */}
                        <div className="px-2 py-1">
                          <div className="px-2 py-1 text-xs font-semibold text-sage-600 uppercase tracking-wide mb-1">
                            Quick Access
                          </div>
                          <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-sage-50 transition-colors rounded-lg">
                            <User size={16} className="mr-3" /> My Profile
                          </a>
                          <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-sage-50 transition-colors rounded-lg">
                            <BarChart3 size={16} className="mr-3" /> My Dashboard
                          </a>
                          <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-sage-50 transition-colors rounded-lg">
                            <BookOpen size={16} className="mr-3" /> My Resources
                          </a>
                        </div>
                        
                        <hr className="my-2 border-sage-200" />
                        
                        {/* Settings & Help */}
                        <div className="px-2 py-1">
                          <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-sage-50 transition-colors rounded-lg">
                            <Keyboard size={16} className="mr-3" /> 
                            <span>Keyboard Shortcuts</span>
                            <span className="ml-auto text-xs bg-sage-100 text-sage-600 px-2 py-1 rounded">Ctrl+K</span>
                          </a>
                          <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-sage-50 transition-colors rounded-lg">
                            <HelpCircle size={16} className="mr-3" /> Help & Support
                          </a>
                          <button 
                            onClick={handleLogout}
                            className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-lg"
                          >
                            <X size={16} className="mr-3" /> Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  // Not Logged In - Login Button
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-all duration-200 font-semibold transform hover:scale-105 shadow-lg flex items-center"
                  >
                    <User size={16} className="mr-2" />
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-sage-200 animate-slideDown">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <div className="px-3 py-2 mb-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-3 border border-sage-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-sage-50"
                  />
                </div>
              </div>

              {/* Mobile Navigation */}
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors flex items-center ${
                    currentPage === item.id 
                      ? 'text-primary-600 bg-primary-50' 
                      : 'text-gray-700 hover:text-primary-600 hover:bg-sage-50'
                  }`}
                >
                  <item.icon className="mr-3" size={18} />
                  {item.label}
                </button>
              ))}

              {/* Mobile Login/User Section */}
              <div className="pt-3 border-t border-sage-200 mt-3">
                {isLoggedIn ? (
                  <>
                    <div className="px-3 py-2 text-sm text-sage-600 font-medium">
                      Signed in as John Educator
                    </div>
                    <button 
                      onClick={() => {
                        setCurrentPage('grow');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-base font-medium rounded-md text-gray-700 hover:text-primary-600 hover:bg-sage-50 transition-colors flex items-center"
                    >
                      <TrendingUp className="mr-3" size={18} />
                      OECS MyPD
                    </button>
                    <button 
                      onClick={() => {
                        setCurrentPage('connect');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-base font-medium rounded-md text-gray-700 hover:text-primary-600 hover:bg-sage-50 transition-colors flex items-center"
                    >
                      <Users className="mr-3" size={18} />
                      OECS MAKER Studio
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-base font-medium rounded-md text-red-600 hover:bg-red-50 transition-colors flex items-center"
                    >
                      <X className="mr-3" size={18} />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => {
                      setShowLoginModal(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold flex items-center justify-center"
                  >
                    <User className="mr-2" size={18} />
                    Sign In to Access Premium Features
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
    </>
  );
};

export default Header;