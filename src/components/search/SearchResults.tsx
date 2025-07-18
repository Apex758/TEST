import React from 'react';
import { SearchResultItem } from './SearchResultItem';
import { Book, Wrench, Users, TrendingUp } from 'lucide-react';

interface SearchResultsProps {
  searchQuery: string;
  onResultSelect: (result: any) => void;
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

export const SearchResults: React.FC<SearchResultsProps> = ({
  searchQuery,
  onResultSelect
}) => {
  // Mock data for search results
  const searchResults: SearchResult[] = [
    {
      id: '1',
      title: 'Grade 3 Math: Addition and Subtraction',
      type: 'lesson',
      category: 'Mathematics',
      description: 'Interactive lesson plan with games and activities',
      icon: <Book className="text-blue-600" size={16} />,
      path: '/curriculum/math/grade3'
    },
    {
      id: '2',
      title: 'AI Lesson Planner Tool',
      type: 'tool',
      category: 'AI Tools',
      description: 'Generate lesson plans instantly with AI',
      icon: <Wrench className="text-purple-600" size={16} />,
      path: '/tools/lesson-planner'
    },
    {
      id: '3',
      title: 'Reading Comprehension Strategies',
      type: 'resource',
      category: 'Language Arts',
      description: 'Downloadable worksheets and guides',
      icon: <Book className="text-green-600" size={16} />,
      path: '/resources/reading'
    },
    {
      id: '4',
      title: 'Science Experiment: Volcano',
      type: 'lesson',
      category: 'Science',
      description: 'Step-by-step volcano experiment for grades 2-4',
      icon: <Book className="text-orange-600" size={16} />,
      path: '/curriculum/science/experiments'
    },
    {
      id: '5',
      title: 'Digital Citizenship Course',
      type: 'course',
      category: 'Professional Development',
      description: 'Learn to teach digital safety to students',
      icon: <TrendingUp className="text-indigo-600" size={16} />,
      path: '/grow/digital-citizenship'
    },
    {
      id: '6',
      title: 'Math Games Discussion',
      type: 'discussion',
      category: 'Community',
      description: 'Teachers sharing favorite math games',
      icon: <Users className="text-pink-600" size={16} />,
      path: '/connect/discussions/math-games'
    }
  ];

  // Filter results based on search query
  const filteredResults = searchResults.filter(result =>
    result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!searchQuery) {
    return null;
  }

  if (filteredResults.length === 0) {
    return (
      <div className="px-4 py-8 text-center border-b border-gray-200">
        <div className="text-gray-400 mb-3">
          <Book size={32} className="mx-auto" />
        </div>
        <h4 className="text-sm font-medium text-gray-800 mb-1">No results found</h4>
        <p className="text-xs text-gray-500">Try different keywords or browse suggestions below</p>
      </div>
    );
  }

  return (
    <div className="border-b border-gray-200">
      <div className="px-4 py-3 bg-blue-50 border-b border-blue-100">
        <div className="flex items-center text-sm text-blue-700 font-semibold">
          <Book size={14} className="mr-2" />
          Results ({filteredResults.length})
        </div>
      </div>
      
      <div className="max-h-64 overflow-y-auto">
        {filteredResults.slice(0, 6).map((result) => (
          <SearchResultItem
            key={result.id}
            result={result}
            onSelect={onResultSelect}
          />
        ))}
      </div>
    </div>
  );
};