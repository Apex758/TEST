// pages/CurriculumPage.js
import React, { useState } from 'react';
import { Search, Play, BookOpen, ChevronRight } from 'lucide-react';

interface CurriculumPageProps {
  setCurrentPage?: (page: string) => void;
}

const CurriculumPage: React.FC<CurriculumPageProps> = ({ setCurrentPage }) => {
  const [selectedGrade, setSelectedGrade] = useState('3');
  const [selectedSubject, setSelectedSubject] = useState('mathematics');

  const subjects = [
    { 
      id: 'mathematics', 
      name: 'MATHEMATICS', 
      icon: '📊',
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
      activeColor: 'bg-blue-100 text-blue-800 border-blue-300'
    },
    { 
      id: 'science', 
      name: 'SCIENCE', 
      icon: '🧪',
      color: 'bg-green-50 hover:bg-green-100 border-green-200',
      activeColor: 'bg-green-100 text-green-800 border-green-300'
    },
    { 
      id: 'language', 
      name: 'LANGUAGE ARTS', 
      icon: '📝',
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
      activeColor: 'bg-purple-100 text-purple-800 border-purple-300'
    },
    { 
      id: 'social', 
      name: 'SOCIAL STUDIES', 
      icon: '🌍',
      color: 'bg-orange-50 hover:bg-orange-100 border-orange-200',
      activeColor: 'bg-orange-100 text-orange-800 border-orange-300'
    }
  ];

  const mathTopics = [
    { name: '📊 Numbers & Operations', activities: 12, assessments: 5, id: 'numbers-operations' },
    { name: '📐 Geometry', activities: 8, assessments: 3, id: 'geometry' },
    { name: '📈 Measurement', activities: 10, assessments: 4, id: 'measurement' },
    { name: '🔢 Algebra & Patterns', activities: 6, assessments: 2, id: 'algebra-patterns' },
    { name: '📋 Data Analysis', activities: 7, assessments: 3, id: 'data-analysis' },
    { name: '🧮 Problem Solving', activities: 9, assessments: 4, id: 'problem-solving' }
  ];

  const activities = [
    { 
      name: 'Place Value Fun', 
      type: 'Interactive Game',
      duration: '30 min',
      difficulty: 'Beginner',
      description: 'Help students understand place value with engaging visual activities.',
      id: 'place-value-fun'
    },
    { 
      name: 'Addition Games', 
      type: 'Digital Activity',
      duration: '45 min',
      difficulty: 'Intermediate',
      description: 'Interactive addition exercises with immediate feedback and rewards.',
      id: 'addition-games'
    },
    { 
      name: 'Word Problems', 
      type: 'Practice Set',
      duration: '25 min',
      difficulty: 'Advanced',
      description: 'Real-world math problems to develop critical thinking skills.',
      id: 'word-problems'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleTopicClick = (topicId: string) => {
    if (setCurrentPage) {
      setCurrentPage(`curriculum-${selectedSubject}-grade-${selectedGrade}-${topicId}`);
    }
  };

  const handleActivityClick = (activityId: string, action: string) => {
    if (setCurrentPage) {
      setCurrentPage(`${action}-${selectedSubject}-grade-${selectedGrade}-${activityId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6 flex items-center">
          <button 
            onClick={() => setCurrentPage && setCurrentPage('home')}
            className="hover:text-blue-600 cursor-pointer"
          >
            Home
          </button>
          <ChevronRight size={16} className="mx-2" />
          <button 
            onClick={() => setCurrentPage && setCurrentPage('curriculum')}
            className="hover:text-blue-600 cursor-pointer"
          >
            Curriculum
          </button>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-blue-600 font-semibold">
            {subjects.find(s => s.id === selectedSubject)?.name}
          </span>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-blue-600 font-semibold">Grade {selectedGrade}</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Curriculum Explorer
          </h1>
          <p className="text-xl text-gray-600">
            Discover comprehensive K-6 curriculum resources aligned with educational standards
          </p>
        </div>

        {/* Subject Selection */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Select Subject</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {subjects.map(subject => (
              <button
                key={subject.id}
                onClick={() => setSelectedSubject(subject.id)}
                className={`p-6 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                  selectedSubject === subject.id 
                    ? subject.activeColor
                    : subject.color
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-3">{subject.icon}</div>
                  <div className="font-semibold text-sm">{subject.name}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Grade and Topic Selection */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <span className="font-semibold text-gray-800">Grade Level:</span>
              <div className="flex space-x-2">
                {['K', '1', '2', '3', '4', '5', '6'].map(grade => (
                  <button
                    key={grade}
                    onClick={() => setSelectedGrade(grade)}
                    className={`px-4 py-2 rounded-md transition-all duration-200 font-semibold ${
                      selectedGrade === grade 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    {grade}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search topics..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button 
                onClick={() => setCurrentPage && setCurrentPage('my-saved-curriculum')}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                📁 My Saved
              </button>
            </div>
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mathTopics.map((topic, index) => (
              <div 
                key={index} 
                className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-300 hover:shadow-md group"
                onClick={() => handleTopicClick(topic.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {topic.name}
                  </h3>
                  <ChevronRight className="text-gray-400 group-hover:text-blue-600 transition-colors" size={20} />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{topic.activities} Activities</span>
                  <span>{topic.assessments} Assessments</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activities Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                NUMBERS & OPERATIONS - GRADE {selectedGrade}
              </h2>
              <p className="text-gray-600">Explore interactive activities and assessments</p>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              <button 
                onClick={() => setCurrentPage && setCurrentPage(`learning-outcomes-${selectedSubject}-grade-${selectedGrade}`)}
                className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
              >
                🎯 Learning Outcomes
              </button>
              <button 
                onClick={() => setCurrentPage && setCurrentPage(`activities-${selectedSubject}-grade-${selectedGrade}`)}
                className="px-4 py-2 bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors"
              >
                📋 Activities
              </button>
              <button 
                onClick={() => setCurrentPage && setCurrentPage(`assessments-${selectedSubject}-grade-${selectedGrade}`)}
                className="px-4 py-2 bg-purple-100 text-purple-800 rounded-md hover:bg-purple-200 transition-colors"
              >
                📊 Assessments
              </button>
              <button 
                onClick={() => setCurrentPage && setCurrentPage(`resources-${selectedSubject}-grade-${selectedGrade}`)}
                className="px-4 py-2 bg-orange-100 text-orange-800 rounded-md hover:bg-orange-200 transition-colors"
              >
                📚 Resources
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {activities.map((activity, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-all duration-300 hover:shadow-md"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Play className="text-blue-600" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Activity {index + 1}: {activity.name}
                      </h3>
                      <p className="text-gray-600 mb-3">{activity.description}</p>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                          📝 {activity.type}
                        </span>
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                          ⏱️ {activity.duration}
                        </span>
                        <span className={`px-3 py-1 rounded-full ${getDifficultyColor(activity.difficulty)}`}>
                          🎯 {activity.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => handleActivityClick(activity.id, 'preview')}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Preview
                    </button>
                    <button 
                      onClick={() => handleActivityClick(activity.id, 'use')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Use Now
                    </button>
                    <button 
                      onClick={() => handleActivityClick(activity.id, 'save')}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <button 
              onClick={() => setCurrentPage && setCurrentPage(`more-activities-${selectedSubject}-grade-${selectedGrade}`)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Load More Activities
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurriculumPage;