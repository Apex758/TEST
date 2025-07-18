import React from 'react';
import { ArrowRight } from 'lucide-react';

export interface SearchResult {
  id: string;
  title: string;
  type: 'lesson' | 'tool' | 'resource' | 'course' | 'discussion';
  category: string;
  description: string;
  icon: React.ReactNode;
  path: string;
}

interface SearchResultItemProps {
  result: SearchResult;
  onSelect: (result: SearchResult) => void;
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({ result, onSelect }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lesson': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'tool': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'resource': return 'bg-green-50 text-green-700 border-green-200';
      case 'course': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'discussion': return 'bg-pink-50 text-pink-700 border-pink-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <button
      onClick={() => onSelect(result)}
      className="w-full text-left p-4 hover:bg-gray-50 transition-all duration-200 border-b border-gray-100 last:border-b-0 group"
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-1">
          {result.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors truncate">
              {result.title}
            </h4>
            <span className={`text-xs px-2 py-1 rounded-full border flex-shrink-0 ${getTypeColor(result.type)}`}>
              {result.type}
            </span>
          </div>
          <p className="text-xs text-gray-600 mb-1">{result.category}</p>
          <p className="text-xs text-gray-500 truncate">{result.description}</p>
        </div>
        <ArrowRight size={14} className="text-gray-300 group-hover:text-blue-400 transition-all group-hover:translate-x-1 flex-shrink-0 mt-1" />
      </div>
    </button>
  );
};