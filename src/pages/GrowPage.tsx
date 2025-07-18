// pages/GrowPage.js
import React from 'react';
import { TrendingUp, User, Calendar, Award, Target, BookOpen, Users, Lightbulb, Laptop, BarChart3, Brain, Star } from 'lucide-react';

const GrowPage = () => {
  const dashboardStats = [
    { icon: <TrendingUp className="text-blue-500" size={24} />, title: 'My Progress', value: '78%', subtitle: 'Course Completion' },
    { icon: <Calendar className="text-green-500" size={24} />, title: 'My Courses', value: '5', subtitle: 'Active Enrollments' },
    { icon: <Award className="text-purple-500" size={24} />, title: 'Certifications', value: '3', subtitle: 'Completed' },
    { icon: <Target className="text-orange-500" size={24} />, title: 'Goals', value: '2/4', subtitle: 'This Quarter' }
  ];

  const recommendedCourses = [
    {
      title: 'Advanced AI Tools Workshop',
      category: 'Technology',
      duration: '4 hours',
      rating: 4.8,
      students: 1250,
      level: 'Intermediate',
      description: 'Master AI-powered teaching tools to enhance your classroom effectiveness.',
      instructor: 'Dr. Sarah Johnson',
      badge: 'Trending'
    },
    {
      title: 'Differentiated Instruction Strategies',
      category: 'Teaching Methods',
      duration: '6 hours',
      rating: 4.9,
      students: 980,
      level: 'Advanced',
      description: 'Learn to adapt your teaching to meet diverse student learning needs.',
      instructor: 'Prof. Michael Chen',
      badge: 'Popular'
    },
    {
      title: 'Digital Assessment Best Practices',
      category: 'Assessment',
      duration: '3 hours',
      rating: 4.7,
      students: 760,
      level: 'Beginner',
      description: 'Implement effective digital assessment strategies in your classroom.',
      instructor: 'Dr. Emily Rodriguez',
      badge: 'New'
    }
  ];

  const categories = [
    { name: 'Teaching Strategies', icon: <BookOpen size={20} />, count: 24, color: 'bg-blue-50 text-blue-600 border-blue-200' },
    { name: 'Technology Integration', icon: <Laptop size={20} />, count: 18, color: 'bg-green-50 text-green-600 border-green-200' },
    { name: 'Assessment & Analytics', icon: <BarChart3 size={20} />, count: 15, color: 'bg-purple-50 text-purple-600 border-purple-200' },
    { name: 'Leadership & Management', icon: <Users size={20} />, count: 12, color: 'bg-orange-50 text-orange-600 border-orange-200' },
    { name: 'Curriculum Design', icon: <Brain size={20} />, count: 20, color: 'bg-red-50 text-red-600 border-red-200' },
    { name: 'Special Needs Education', icon: <Lightbulb size={20} />, count: 16, color: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
    { name: 'Classroom Management', icon: <Target size={20} />, count: 22, color: 'bg-pink-50 text-pink-600 border-pink-200' }
  ];

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Trending': return 'bg-blue-100 text-blue-800';
      case 'Popular': return 'bg-green-100 text-green-800';
      case 'New': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Professional Growth</h1>
          <p className="text-xl text-gray-600">
            Advance your teaching career with expert-led courses and certifications
          </p>
        </div>

        {/* Dashboard Stats */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Your Learning Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardStats.map((stat, index) => (
              <div key={index} className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  {stat.icon}
                  <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{stat.title}</h3>
                <p className="text-sm text-gray-600">{stat.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Courses */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">🌟 Recommended for You</h2>
            <button className="text-blue-600 hover:text-blue-700 font-semibold">View All</button>
          </div>
          
          <div className="space-y-6">
            {recommendedCourses.map((course, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-all duration-300 hover:shadow-md">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1 mb-4 lg:mb-0 lg:pr-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
                          {course.badge && (
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor(course.badge)}`}>
                              {course.badge}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <span className="bg-gray-100 px-2 py-1 rounded">{course.category}</span>
                          <span>⏱️ {course.duration}</span>
                          <span className={`px-2 py-1 rounded ${getLevelColor(course.level)}`}>
                            {course.level}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{course.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Star className="text-yellow-500 mr-1" size={14} />
                        <span>{course.rating}</span>
                      </div>
                      <span>👥 {course.students.toLocaleString()} students</span>
                      <span>👨‍🏫 {course.instructor}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 lg:flex-col lg:space-x-0 lg:space-y-2">
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors font-semibold">
                      Preview
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Categories */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">📚 Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <button 
                key={index} 
                className={`p-4 border-2 rounded-lg transition-all duration-300 hover:shadow-md transform hover:scale-105 ${category.color}`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  {category.icon}
                  <span className="font-semibold">{category.name}</span>
                </div>
                <p className="text-sm opacity-75">{category.count} courses available</p>
              </button>
            ))}
          </div>
        </div>

        {/* Learning Path CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Level Up Your Teaching?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Create a personalized learning path based on your goals and get expert recommendations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
              Create Learning Path
            </button>
            <button className="px-8 py-3 bg-blue-700 text-white border border-blue-500 rounded-lg hover:bg-blue-800 transition-colors font-semibold">
              Explore All Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowPage;