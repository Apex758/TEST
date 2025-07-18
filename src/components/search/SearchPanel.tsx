import React from 'react';
import { SearchResults } from './SearchResults';
import { SuggestedQueries } from './SuggestedQueries';
import { Clock, Zap } from 'lucide-react';

interface SearchPanelProps {
  searchQuery: string;
  onResultSelect: (result: any) => void;
  onSuggestionSelect: (suggestion: any) => void;
  onClose: () => void;
}

export const SearchPanel: React.FC<SearchPanelProps> = ({
  searchQuery,
  onResultSelect,
  onSuggestionSelect,
  onClose
}) => {
  return (
    <div className="absolute top-14 left-0 right-0 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl shadow-black/10 z-50 overflow-hidden animate-in fade-in-0 slide-in-from-top-4 duration-300">
      
      {/* Search Results */}
      <SearchResults 
        searchQuery={searchQuery}
        onResultSelect={onResultSelect}
      />

      {/* Suggested Queries */}
      <SuggestedQueries
        searchQuery={searchQuery}
        onSuggestionSelect={onSuggestionSelect}
      />

      {/* Footer */}
      <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200/50">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <kbd className="px-2 py-1 bg-white border border-gray-200 rounded text-xs mr-1 shadow-sm">↵</kbd>
              Search
            </span>
            <span className="flex items-center">
              <kbd className="px-2 py-1 bg-white border border-gray-200 rounded text-xs mr-1 shadow-sm">Esc</kbd>
              Close
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap size={10} className="text-blue-500" />
            <span>AI-powered search</span>
          </div>
        </div>
      </div>
    </div>
  );
};