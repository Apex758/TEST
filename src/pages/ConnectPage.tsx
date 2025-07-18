import React from 'react';
import { MessageSquare, Share2, Users, TrendingUp, Heart, MessageCircle, Eye, Plus, Search, Filter } from 'lucide-react';

const ConnectPage = () => {
  const navigationTabs = [
    { id: 'hub', name: '🏠 Community Hub', active: true },
    { id: 'discussions', name: '💬 Discussions', active: false },
    { id: 'resources', name: '📚 Shared Resources', active: false },
    { id: 'people', name: '👥 People', active: false }
  ];

  const trendingDiscussions = [
    {
      title: 'Math Manipulatives for Grade 2',
      author: 'Sarah Johnson',
      category: 'Mathematics',
      replies: 24,
      views: 156,
      lastActivity: '2 hours ago',
      excerpt: 'Looking for creative ways to teach fractions using hands-on materials...',
      tags: ['Grade 2', 'Math', 'Manipulatives'],
      isHot: true
    },
    {
      title: 'Science Fair Project Ideas',
      author: 'Michael Chen',
      category: 'Science',
      replies: 18,
      views: 203,
      lastActivity: '4 hours ago',
      excerpt: 'My students need inspiring science fair projects that are age-appropriate...',
      tags: ['Science Fair', 'Projects', 'K-6'],
      isHot: true
    },
    {
      title: 'Reading Comprehension Strategies',
      author: 'Emily Rodriguez',
      category: 'Language Arts',
      replies: 31,
      views: 298,
      lastActivity: '6 hours ago',
      excerpt: 'Share your best strategies for improving reading comprehension in elementary...',
      tags: ['Reading', 'Comprehension', 'Strategies'],
      isHot: false
    },
    {
      title: 'Digital Citizenship for Young Learners',
      author: 'David Park',
      category: 'Technology',
      replies: 15,
      views: 134,
      lastActivity: '8 hours ago',
      excerpt: 'How do you teach digital citizenship concepts to kindergarten students?',
      tags: ['Digital Citizenship', 'Technology', 'Safety'],
      isHot: false
    }
  ];

  const quickActions = [
    {
      title: 'Share Resource',
      description: 'Upload and share teaching materials with the community',
      icon: <Share2 className="text-blue-500" size={24} />,
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200'
    },
    {
      title: 'Start Discussion',
      description: 'Ask questions or share ideas with fellow educators',
      icon: <MessageSquare className="text-green-500" size={24} />,
      color: 'bg-green-50 hover:bg-green-100 border-green-200'
    },
    {
      title: 'Find Collaborators',
      description: 'Connect with teachers in your grade level or subject area',
      icon: <Users className="text-purple-500" size={24} />,
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200'
    }
  ];

  const browseOptions = [
    { name: 'Browse by Grade', count: '1.2K posts', color: 'bg-gray-100 hover:bg-gray-200' },
    { name: 'Browse by Subject', count: '850 discussions', color: 'bg-gray-100 hover:bg-gray-200' },
    { name: 'My Contributions', count: '12 posts', color: 'bg-gray-100 hover:bg-gray-200' }
  ];

  const communityStats = [
    { label: 'Active Members', value: '15.2K', icon: <Users className="text-blue-500" size={20} /> },
    { label: 'Discussions', value: '3.4K', icon: <MessageSquare className="text-green-500" size={20} /> },
    { label: 'Resources Shared', value: '8.7K', icon: <Share2 className="text-purple-500" size={20} /> },
    { label: 'Countries', value: '15+', icon: <TrendingUp className="text-orange-500" size={20} /> }
  ];

  const featuredMembers = [
    { name: 'Dr. Lisa Carter', role: 'Curriculum Specialist', posts: 89, followers: 234, badge: 'Expert' },
    { name: 'James Wilson', role: 'Grade 4 Teacher', posts: 56, followers: 167, badge: 'Mentor' },
    { name: 'Maria Santos', role: 'STEM Coordinator', posts: 71, followers: 198, badge: 'Innovator' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Educator Community</h1>
          <p className="text-xl text-gray-600">
            Connect, collaborate, and grow with educators from around the Caribbean region
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {navigationTabs.map((tab, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  tab.active 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search discussions, resources, people..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center">
              <Filter className="mr-2" size={16} />
              Filters
            </button>
          </div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {communityStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="flex justify-center mb-3">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Trending Discussions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">🔥 Trending Discussions</h2>
                <button className="text-blue-600 hover:text-blue-700 font-semibold">View All</button>
              </div>

              <div className="space-y-4">
                {trendingDiscussions.map((discussion, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                            {discussion.title}
                          </h3>
                          {discussion.isHot && (
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                              Hot
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <span>by {discussion.author}</span>
                          <span className="bg-gray-100 px-2 py-1 rounded">{discussion.category}</span>
                          <span>{discussion.lastActivity}</span>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3">{discussion.excerpt}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <MessageCircle size={14} className="mr-1" />
                            <span>{discussion.replies} replies</span>
                          </div>
                          <div className="flex items-center">
                            <Eye size={14} className="mr-1" />
                            <span>{discussion.views} views</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      {discussion.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">🎯 Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {quickActions.map((action, index) => (
                  <button 
                    key={index} 
                    className={`p-6 border-2 rounded-lg transition-all duration-300 hover:shadow-md transform hover:scale-105 ${action.color}`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      {action.icon}
                      <span className="font-semibold">{action.title}</span>
                    </div>
                    <p className="text-sm opacity-75 text-left">{action.description}</p>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {browseOptions.map((option, index) => (
                  <button 
                    key={index} 
                    className={`p-4 rounded-lg transition-colors ${option.color}`}
                  >
                    <div className="font-semibold text-gray-800 mb-1">{option.name}</div>
                    <div className="text-sm text-gray-600">{option.count}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Featured Members */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-gray-800 mb-4">⭐ Featured Members</h3>
              <div className="space-y-4">
                {featuredMembers.map((member, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-gray-800 text-sm">{member.name}</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                          {member.badge}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">{member.role}</div>
                      <div className="text-xs text-gray-500">
                        {member.posts} posts • {member.followers} followers
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Create Post CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl text-white p-6">
              <h3 className="font-bold mb-3">Start Contributing!</h3>
              <p className="text-blue-100 text-sm mb-4">
                Share your teaching experiences and learn from others in our community.
              </p>
              <button className="w-full bg-white text-blue-600 py-2 rounded-lg hover:bg-gray-100 transition-colors font-semibold flex items-center justify-center">
                <Plus className="mr-2" size={16} />
                Create Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectPage;