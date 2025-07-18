import React from 'react';
import { Star, ArrowRight, TrendingUp, Book, Wrench, Users } from 'lucide-react';

interface SuggestedQuery {
  id: string;
  query: string;
  category: string;
  icon: React.ReactNode;
}

interface SuggestedQueriesProps {
  searchQuery: string;
  onSuggestionSelect: (suggestion: SuggestedQuery) => void;
}

export const SuggestedQueries: React.FC<SuggestedQueriesProps> = ({
  searchQuery,
  onSuggestionSelect
}) => {
  const suggestedQueries: SuggestedQuery[] = [
    {
      id: '1',
      query: 'Grade 3 math activities',
      category: 'Mathematics',
      icon: <Book className="text-blue-600" size={14} />
    },
    {
      id: '2',
      query: 'Science experiments grade 2',
      category: 'Science',
      icon: <TrendingUp className="text-green-600" size={14} />
    },
    {
      id: '3',
      query: 'AI lesson plan generator',
      category: 'AI Tools',
      icon: <Wrench className="text-purple-600" size={14} />
    },
    {
      id: '4',
      query: 'Reading comprehension worksheets',
      category: 'Language Arts',
      icon: <Book className="text-orange-600" size={14} />
    },
    {
      id: '5',
      query: 'Digital whiteboard templates',
      category: 'Tools',
      icon: <Wrench className="text-indigo-600" size={14} />
    },
    {
      id: '6',
      query: 'Assessment rubrics',
      category: 'Assessment',
      icon: <Star className="text-yellow-600" size={14} />
    }
  ];

  const filteredSuggestions = suggestedQueries.filter(suggestion =>
    searchQuery === '' || 
    suggestion.query.toLowerCase().includes(searchQuery.toLowerCase()) ||
    suggestion.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center text-sm text-gray-700 font-semibold">
          <Star size={14} className="mr-2" />
          {searchQuery ? 'Related Suggestions' : 'Popular Searches'}
        </div>
      </div>
      
      <div className="max-h-48 overflow-y-auto">
        {filteredSuggestions.slice(0, 6).map((suggestion) => (
          <button
            key={suggestion.id}
            onClick={() => onSuggestionSelect(suggestion)}
            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 group"
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {suggestion.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
                    {suggestion.query}
                  </span>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <span className="text-xs text-gray-500">{suggestion.category}</span>
                  </div>
                </div>
              </div>
              <ArrowRight size={12} className="text-gray-300 group-hover:text-blue-400 transition-all group-hover:translate-x-1 flex-shrink-0" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};