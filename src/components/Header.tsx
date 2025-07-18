// src/components/Header.tsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  User, 
  ChevronDown, 
  Home, 
  Book, 
  Wrench, 
  TrendingUp, 
  Users,
  Search,
  LogOut,
  Settings,
  HelpCircle
} from 'lucide-react';
import MegaMenu from './MegaMenu'; // Add this import

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  // Add these new state variables for MegaMenu
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [megaMenuType, setMegaMenuType] = useState<'curriculum' | 'tools' | 'grow' | 'connect' | null>(null);
  
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'curriculum', label: 'Curriculum', icon: Book },
    { id: 'tools', label: 'Tools', icon: Wrench },
    { id: 'grow', label: 'Grow', icon: TrendingUp },
    { id: 'connect', label: 'Connect', icon: Users }
  ];

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
      // Add this line to close mega menu
      setMegaMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when page changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPage]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const searchPageName = `search-results-${searchQuery.toLowerCase().replace(/\s+/g, '-')}`;
      setCurrentPage(searchPageName);
      setSearchOpen(false);
    }
  };

  // Add this function to handle navigation clicks
  const handleNavClick = (itemId: string) => {
    if (itemId === 'curriculum' || itemId === 'tools' || itemId === 'grow' || itemId === 'connect') {
      // Open mega menu for these items
      setMegaMenuType(itemId as 'curriculum' | 'tools' | 'grow' | 'connect');
      setMegaMenuOpen(true);
    } else {
      // Navigate normally for other items
      setCurrentPage(itemId);
      setMegaMenuOpen(false);
    }
  };

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-[9999]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex items-center">
              <button 
                className="md:hidden mr-3 p-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              
              <button 
                className="text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors" 
                onClick={() => {
                  setCurrentPage('home');
                  setMegaMenuOpen(false); // Close mega menu when going home
                }}
              >
                OECS Learning Hub
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)} // Use the new handler
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                    currentPage === item.id 
                      ? 'text-primary-600 bg-primary-50' 
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  } ${
                    megaMenuOpen && megaMenuType === item.id
                      ? 'text-primary-600 bg-primary-50'
                      : ''
                  }`}
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Search and User Section */}
            <div className="flex items-center space-x-4">
              
              {/* Search */}
              <div className="relative" ref={searchRef}>
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
                
                {searchOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 p-4 animate-slide-down">
                    <form onSubmit={handleSearch}>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search lessons, tools, resources..."
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          autoFocus
                        />
                      </div>
                      
                      {/* Quick suggestions */}
                      <div className="mt-3 space-y-2">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Quick searches</p>
                        {['Grade 3 math', 'Science experiments', 'AI lesson planner', 'Reading comprehension'].map((suggestion, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              const searchPageName = `search-${suggestion.toLowerCase().replace(/\s+/g, '-')}`;
                              setCurrentPage(searchPageName);
                              setSearchOpen(false);
                            }}
                            className="block w-full text-left text-sm text-gray-700 hover:text-primary-600 hover:bg-gray-50 px-2 py-1 rounded transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </form>
                  </div>
                )}
              </div>
              
              {/* User Menu */}
              <div className="relative" ref={userMenuRef}>
                {isLoggedIn ? (
                  <>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
                      aria-label="User menu"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                        <User size={16} className="text-white" />
                      </div>
                      <ChevronDown size={16} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 animate-slide-down">
                        
                        {/* User Profile */}
                        <div className="px-4 py-3 border-b border-gray-200">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                              <User size={18} className="text-white" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-800">John Educator</div>
                              <div className="text-xs text-gray-500">Grade 4 Teacher</div>
                            </div>
                          </div>
                        </div>

                        {/* Platform Access */}
                        <div className="px-2 py-2">
                          <button 
                            onClick={() => {
                              setCurrentPage('oecs-mypd');
                              setUserMenuOpen(false);
                            }}
                            className="w-full text-left p-3 rounded-lg hover:bg-primary-50 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                                <TrendingUp size={16} className="text-primary-600" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-800">OECS MyPD</div>
                                <div className="text-xs text-gray-500">Professional Development</div>
                              </div>
                            </div>
                          </button>

                          <button 
                            onClick={() => {
                              setCurrentPage('oecs-maker-studio');
                              setUserMenuOpen(false);
                            }}
                            className="w-full text-left p-3 rounded-lg hover:bg-secondary-50 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center">
                                <Users size={16} className="text-secondary-600" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-800">OECS MAKER Studio</div>
                                <div className="text-xs text-gray-500">Collaborative Platform</div>
                              </div>
                            </div>
                          </button>
                        </div>
                        
                        <hr className="my-2 border-gray-200" />
                        
                        {/* Menu Items */}
                        <div className="px-2">
                          <button 
                            onClick={() => {
                              setCurrentPage('settings');
                              setUserMenuOpen(false);
                            }}
                            className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors rounded-lg"
                          >
                            <Settings size={16} className="mr-3" />
                            Settings
                          </button>
                          <button 
                            onClick={() => {
                              setCurrentPage('help-support');
                              setUserMenuOpen(false);
                            }}
                            className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors rounded-lg"
                          >
                            <HelpCircle size={16} className="mr-3" />
                            Help & Support
                          </button>
                          <button 
                            onClick={handleLogout}
                            className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-lg"
                          >
                            <LogOut size={16} className="mr-3" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setCurrentPage('sign-in');
                    }}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center space-x-2"
                  >
                    <User size={16} />
                    <span>Sign In</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 animate-slide-down">
            <div className="px-4 pt-2 pb-3 space-y-1">
              
              {/* Mobile Search */}
              <div className="mb-4">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    const searchPageName = `mobile-search-${searchQuery.toLowerCase().replace(/\s+/g, '-')}`;
                    setCurrentPage(searchPageName);
                    setMobileMenuOpen(false);
                  }
                }}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50"
                    />
                  </div>
                </form>
              </div>

              {/* Mobile Navigation */}
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)} // Use the same handler
                  className={`w-full text-left px-3 py-3 text-base font-medium rounded-lg transition-colors flex items-center space-x-3 ${
                    currentPage === item.id 
                      ? 'text-primary-600 bg-primary-50' 
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </button>
              ))}

              {/* Mobile User Section */}
              {isLoggedIn && (
                <div className="pt-4 border-t border-gray-200 mt-4">
                  <div className="px-3 py-2 text-sm text-gray-600 font-medium">
                    Signed in as John Educator
                  </div>
                  <button 
                    onClick={() => {
                      setCurrentPage('oecs-mypd');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-3 text-base font-medium rounded-lg text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors flex items-center space-x-3"
                  >
                    <TrendingUp size={18} />
                    <span>OECS MyPD</span>
                  </button>
                  <button 
                    onClick={() => {
                      setCurrentPage('oecs-maker-studio');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-3 text-base font-medium rounded-lg text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors flex items-center space-x-3"
                  >
                    <Users size={18} />
                    <span>OECS MAKER Studio</span>
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-3 text-base font-medium rounded-lg text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-3"
                  >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Add the MegaMenu component here */}
      <div className="relative">
        {megaMenuOpen && megaMenuType && (
          <MegaMenu
            isOpen={megaMenuOpen}
            onClose={() => setMegaMenuOpen(false)}
            menuType={megaMenuType}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </>
  );
};

export default Header;