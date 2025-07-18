// src/components/ExpandableSearch.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ArrowRight, Book, Wrench, Users, TrendingUp, Clock, Star } from 'lucide-react';

interface ExpandableSearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

interface SearchResult {
  id: string;
  title: string;
  type: 'lesson' | 'tool' | 'resource' | 'course' | 'discussion';
  category: string;
  description: string;
  icon: React.ReactNode;
  path: string;
}

interface SuggestedQuery {
  id: string;
  query: string;
  category: string;
  popularity: number;
  icon: React.ReactNode;
}

const ExpandableSearch: React.FC<ExpandableSearchProps> = ({ 
  placeholder = "Search lessons, tools, resources...",
  onSearch 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPanel, setShowPanel] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock data for search results
  const searchResults: SearchResult[] = [
    {
      id: '1',
      title: 'Grade 3 Math: Addition and Subtraction',
      type: 'lesson',
      category: 'Mathematics',
      description: 'Interactive lesson plan with games and activities',
      icon: <Book className="text-primary-600" size={16} />,
      path: '/curriculum/math/grade3'
    },
    {
      id: '2',
      title: 'AI Lesson Planner Tool',
      type: 'tool',
      category: 'AI Tools',
      description: 'Generate lesson plans instantly with AI',
      icon: <Wrench className="text-secondary-600" size={16} />,
      path: '/tools/lesson-planner'
    },
    {
      id: '3',
      title: 'Reading Comprehension Strategies',
      type: 'resource',
      category: 'Language Arts',
      description: 'Downloadable worksheets and guides',
      icon: <Book className="text-accent-600" size={16} />,
      path: '/resources/reading'
    },
    {
      id: '4',
      title: 'Science Experiment: Volcano',
      type: 'lesson',
      category: 'Science',
      description: 'Step-by-step volcano experiment for grades 2-4',
      icon: <Book className="text-warm-600" size={16} />,
      path: '/curriculum/science/experiments'
    },
    {
      id: '5',
      title: 'Digital Citizenship Course',
      type: 'course',
      category: 'Professional Development',
      description: 'Learn to teach digital safety to students',
      icon: <TrendingUp className="text-earth-600" size={16} />,
      path: '/grow/digital-citizenship'
    },
    {
      id: '6',
      title: 'Math Games Discussion',
      type: 'discussion',
      category: 'Community',
      description: 'Teachers sharing favorite math games',
      icon: <Users className="text-primary-600" size={16} />,
      path: '/connect/discussions/math-games'
    }
  ];

  // Mock data for suggested queries
  const suggestedQueries: SuggestedQuery[] = [
    {
      id: '1',
      query: 'Grade 3 math activities',
      category: 'Mathematics',
      popularity: 95,
      icon: <TrendingUp className="text-primary-600" size={14} />
    },
    {
      id: '2',
      query: 'Science experiments grade 2',
      category: 'Science',
      popularity: 87,
      icon: <Star className="text-secondary-600" size={14} />
    },
    {
      id: '3',
      query: 'AI lesson plan generator',
      category: 'AI Tools',
      popularity: 82,
      icon: <Wrench className="text-accent-600" size={14} />
    },
    {
      id: '4',
      query: 'Reading comprehension worksheets',
      category: 'Language Arts',
      popularity: 78,
      icon: <Book className="text-warm-600" size={14} />
    },
    {
      id: '5',
      query: 'Digital whiteboard templates',
      category: 'Tools',
      popularity: 71,
      icon: <Wrench className="text-earth-600" size={14} />
    },
    {
      id: '6',
      query: 'Assessment rubrics',
      category: 'Assessment',
      popularity: 69,
      icon: <Star className="text-primary-600" size={14} />
    }
  ];

  // Filter results based on search query
  const filteredResults = searchResults.filter(result =>
    result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter suggested queries based on search query
  const filteredSuggestions = suggestedQueries.filter(suggestion =>
    searchQuery === '' || 
    suggestion.query.toLowerCase().includes(searchQuery.toLowerCase()) ||
    suggestion.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
        setIsFocused(false);
        setShowPanel(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isExpanded]);

  const handleExpand = () => {
    setIsExpanded(true);
    setIsFocused(true);
    setShowPanel(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    setIsFocused(false);
    setShowPanel(false);
    setSearchQuery('');
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    setShowPanel(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
      if (searchQuery === '') {
        setShowPanel(false);
      }
    }, 150);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    setSearchQuery(result.title);
    setShowPanel(false);
    console.log('Navigate to:', result.path);
    if (onSearch) {
      onSearch(result.title);
    }
  };

  const handleSuggestionClick = (suggestion: SuggestedQuery) => {
    setSearchQuery(suggestion.query);
    setShowPanel(false);
    if (onSearch) {
      onSearch(suggestion.query);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lesson': return 'bg-primary-50 text-primary-700';
      case 'tool': return 'bg-secondary-50 text-secondary-700';
      case 'resource': return 'bg-accent-50 text-accent-700';
      case 'course': return 'bg-warm-50 text-warm-700';
      case 'discussion': return 'bg-earth-50 text-earth-700';
      default: return 'bg-sage-50 text-sage-700';
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Container */}
      <div 
        className={`
          flex items-center transition-all duration-500 ease-out
          ${isExpanded ? 'w-80 md:w-96' : 'w-12'} 
          h-12 bg-white border-2 rounded-full shadow-sm
          ${isFocused 
            ? 'border-primary-400 shadow-lg scale-105 bg-white' 
            : 'border-sage-200 hover:border-sage-300 hover:shadow-md'
          }
          ${isExpanded ? 'animate-expandBounce' : 'animate-collapseBounce'}
        `}
      >
        {/* Search Icon Button */}
        <button
          onClick={isExpanded ? handleCollapse : handleExpand}
          className={`
            flex-shrink-0 w-12 h-12 flex items-center justify-center
            text-sage-500 hover:text-primary-600 transition-all duration-300
            ${isExpanded ? 'hover:scale-110' : 'hover:scale-125'}
            rounded-full hover:bg-sage-50
          `}
          aria-label={isExpanded ? "Close search" : "Open search"}
        >
          <Search 
            size={20} 
            className={`
              transition-all duration-300 
              ${isExpanded ? 'rotate-90 scale-110' : 'rotate-0 scale-100'}
            `} 
          />
        </button>

        {/* Search Input */}
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(searchQuery);
              setShowPanel(false);
            }
            if (e.key === 'Escape') {
              handleCollapse();
            }
          }}
          placeholder={placeholder}
          className={`
            flex-1 bg-transparent border-none outline-none text-gray-700 
            placeholder-sage-400 text-sm font-medium
            transition-all duration-500 transform
            ${isExpanded 
              ? 'opacity-100 translate-x-0 pr-12' 
              : 'opacity-0 -translate-x-4 w-0 pr-0'
            }
          `}
        />

        {/* Clear Button */}
        {isExpanded && searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('');
              inputRef.current?.focus();
            }}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-sage-400 hover:text-sage-600 transition-colors rounded-full hover:bg-sage-100 mr-2 animate-fadeIn"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Search Results Panel */}
      {isExpanded && showPanel && (
        <div className="absolute top-14 left-0 right-0 bg-white border border-sage-200 rounded-xl shadow-xl z-50 overflow-hidden animate-dropdownBounce max-h-96 overflow-y-auto">
          
          {/* Search Results Section */}
          {searchQuery && filteredResults.length > 0 && (
            <div className="border-b border-sage-200">
              <div className="px-4 py-3 bg-primary-50 border-b border-primary-100">
                <div className="flex items-center text-sm text-primary-700 font-semibold">
                  <Search size={14} className="mr-2" />
                  Search Results ({filteredResults.length})
                </div>
              </div>
              
              <div className="max-h-64 overflow-y-auto">
                {filteredResults.slice(0, 6).map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className="w-full text-left px-4 py-3 hover:bg-sage-50 transition-colors border-b border-sage-100 last:border-b-0 group"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {result.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-sm font-medium text-gray-800 group-hover:text-primary-600 transition-colors truncate">
                            {result.title}
                          </h4>
                          <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${getTypeColor(result.type)}`}>
                            {result.type}
                          </span>
                        </div>
                        <p className="text-xs text-sage-600 mb-1">{result.category}</p>
                        <p className="text-xs text-sage-500 truncate">{result.description}</p>
                      </div>
                      <ArrowRight size={14} className="text-sage-300 group-hover:text-primary-400 transition-all group-hover:translate-x-1 flex-shrink-0 mt-1" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No Results Message */}
          {searchQuery && filteredResults.length === 0 && (
            <div className="px-4 py-8 text-center border-b border-sage-200">
              <Search size={32} className="mx-auto mb-3 text-sage-300" />
              <h4 className="text-sm font-medium text-gray-800 mb-1">No results found</h4>
              <p className="text-xs text-sage-500">Try different keywords or browse suggestions below</p>
            </div>
          )}

          {/* Suggested Queries Section */}
          <div>
            <div className="px-4 py-3 bg-secondary-50 border-b border-secondary-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-secondary-700 font-semibold">
                  <Star size={14} className="mr-2" />
                  {searchQuery ? 'Related Suggestions' : 'Popular Searches'}
                </div>
                {!searchQuery && (
                  <div className="text-xs text-secondary-600 flex items-center">
                    <TrendingUp size={12} className="mr-1" />
                    Trending
                  </div>
                )}
              </div>
            </div>
            
            <div className="max-h-48 overflow-y-auto">
              {filteredSuggestions.slice(0, 6).map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-4 py-3 hover:bg-sage-50 transition-colors border-b border-sage-100 last:border-b-0 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {suggestion.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 group-hover:text-primary-600 transition-colors">
                          {suggestion.query}
                        </span>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <span className="text-xs text-sage-500">{suggestion.category}</span>
                          {suggestion.popularity > 80 && (
                            <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                    <ArrowRight size={12} className="text-sage-300 group-hover:text-primary-400 transition-all group-hover:translate-x-1 flex-shrink-0" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions Footer */}
          <div className="px-4 py-3 bg-sage-50 border-t border-sage-200">
            <div className="flex items-center justify-between text-xs text-sage-600">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <kbd className="px-2 py-1 bg-white border border-sage-300 rounded text-xs mr-1">↵</kbd>
                  Search
                </span>
                <span className="flex items-center">
                  <kbd className="px-2 py-1 bg-white border border-sage-300 rounded text-xs mr-1">Esc</kbd>
                  Close
                </span>
              </div>
              <div className="flex items-center">
                <Clock size={10} className="mr-1" />
                Recent searches saved
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcut Hint */}
      {!isExpanded && (
        <div className="absolute -bottom-6 left-0 text-xs text-sage-400 whitespace-nowrap animate-fadeIn">
          Press Ctrl+K
        </div>
      )}
    </div>
  );
};

export default ExpandableSearch;