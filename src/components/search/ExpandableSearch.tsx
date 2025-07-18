import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { SearchPanel } from './SearchPanel';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useKeyboard } from '../../hooks/useKeyboard';

interface ExpandableSearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

const ExpandableSearch: React.FC<ExpandableSearchProps> = ({ 
  placeholder = "Search lessons, tools, resources...",
  onSearch,
  className = ""
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPanel, setShowPanel] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleExpand = () => {
    setIsExpanded(true);
    setShowPanel(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    setShowPanel(false);
    setSearchQuery('');
    setIsFocused(false);
  };

  // Custom hooks for better organization
  useClickOutside(searchRef, () => {
    handleCollapse();
  });

  useKeyboard({
    'Escape': handleCollapse,
    'Control+k': (e) => {
      e.preventDefault();
      handleExpand();
    }
  });

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [isExpanded]);

  const handleInputFocus = () => {
    setIsFocused(true);
    setShowPanel(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim()) {
      setShowPanel(true);
    }
  };

  const handleSearch = (query: string) => {
    if (onSearch) {
      onSearch(query);
    }
    setShowPanel(false);
  };

  const handleClear = () => {
    setSearchQuery('');
    inputRef.current?.focus();
  };

  const handleResultSelect = (result: any) => {
    setSearchQuery(result.title);
    setShowPanel(false);
    if (onSearch) {
      onSearch(result.title);
    }
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      {/* Search Container */}
      <div 
        className={`
          group relative flex items-center transition-all duration-700 ease-out
          ${isExpanded ? 'w-80 md:w-96' : 'w-12'} 
          h-12 bg-white/95 backdrop-blur-sm border-2 rounded-2xl
          ${isFocused 
            ? 'border-blue-400 shadow-lg shadow-blue-500/20 scale-[1.02]' 
            : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
          }
          ${isExpanded ? 'pr-2' : ''}
        `}
      >
        {/* Search Icon Button */}
        <button
          onClick={isExpanded ? handleCollapse : handleExpand}
          className={`
            relative flex-shrink-0 w-12 h-12 flex items-center justify-center
            text-gray-500 hover:text-blue-600 transition-all duration-300
            rounded-2xl hover:bg-blue-50 group
            ${isExpanded ? 'hover:scale-105' : 'hover:scale-110'}
          `}
          aria-label={isExpanded ? "Close search" : "Open search"}
        >
          <Search 
            size={20} 
            className={`
              transition-all duration-500 
              ${isExpanded ? 'rotate-90 scale-110' : 'rotate-0 scale-100'}
              group-hover:scale-125
            `} 
          />
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
        </button>

        {/* Search Input */}
        <div className={`
          flex-1 relative overflow-hidden
          ${isExpanded ? 'opacity-100' : 'opacity-0'}
          transition-all duration-500 delay-200
        `}>
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(searchQuery);
              }
            }}
            placeholder={placeholder}
            className={`
              w-full bg-transparent border-none outline-none text-gray-700 
              placeholder-gray-400 text-sm font-medium pr-2
              transition-all duration-300
            `}
          />
        </div>

        {/* Clear Button */}
        {isExpanded && searchQuery && (
          <button
            onClick={handleClear}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all duration-200 rounded-full hover:bg-gray-100 animate-in fade-in-0 zoom-in-95 duration-200"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Search Panel */}
      {isExpanded && showPanel && (
        <SearchPanel
          searchQuery={searchQuery}
          onResultSelect={handleResultSelect}
          onSuggestionSelect={(suggestion) => {
            setSearchQuery(suggestion.query);
            setShowPanel(false);
            if (onSearch) {
              onSearch(suggestion.query);
            }
          }}
          onClose={() => setShowPanel(false)}
        />
      )}

      {/* Keyboard Shortcut Hint */}
      {!isExpanded && (
        <div className="absolute -bottom-8 left-0 flex items-center text-xs text-gray-400 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
          <kbd className="px-2 py-1 bg-white border border-gray-200 rounded text-xs mr-2 shadow-sm">
            ⌘K
          </kbd>
          <span>Search</span>
        </div>
      )}
    </div>
  );
};

export default ExpandableSearch;