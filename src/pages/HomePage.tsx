// pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { Play, Book, Wrench, Star, ArrowRight, Zap, Users, Award, Globe } from 'lucide-react';

const HomePage = ({ setCurrentPage }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const quickAccessItems = [
    { 
      title: 'Find by Grade', 
      subtitle: 'K 1 2 3 4 5 6', 
      action: () => setCurrentPage('curriculum'),
      icon: '🎯',
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200'
    },
    { 
      title: 'Popular Tools', 
      subtitle: 'Lesson Plan Quiz Maker', 
      action: () => setCurrentPage('tools'),
      icon: '🔧',
      color: 'bg-green-50 hover:bg-green-100 border-green-200'
    },
    { 
      title: 'AI Preview', 
      subtitle: '▶️ Demo Videos', 
      action: () => setCurrentPage('ai-demo'),
      icon: '🤖',
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200'
    },
    { 
      title: 'Start Here', 
      subtitle: 'Getting Started', 
      action: () => setCurrentPage('getting-started'),
      icon: '🚀',
      color: 'bg-orange-50 hover:bg-orange-100 border-orange-200'
    }
  ];

  const marqueeCards = [
    {
      icon: <Zap className="text-yellow-500" size={32} />,
      title: "AI-Powered Tools",
      description: "Create lessons in minutes with our intelligent AI assistants",
      stat: "10x Faster",
      action: () => setCurrentPage('ai-tools-overview')
    },
    {
      icon: <Users className="text-blue-500" size={32} />,
      title: "Active Community",
      description: "Join 50,000+ educators sharing resources and ideas",
      stat: "50K+ Users",
      action: () => setCurrentPage('community')
    },
    {
      icon: <Award className="text-green-500" size={32} />,
      title: "Proven Results",
      description: "95% of teachers report improved student engagement",
      stat: "95% Success",
      action: () => setCurrentPage('success-stories')
    },
    {
      icon: <Globe className="text-purple-500" size={32} />,
      title: "Global Reach",
      description: "Supporting education across the Caribbean region",
      stat: "15+ Countries",
      action: () => setCurrentPage('global-impact')
    },
    {
      icon: <Book className="text-red-500" size={32} />,
      title: "Rich Content",
      description: "Access thousands of curriculum-aligned resources",
      stat: "10K+ Resources",
      action: () => setCurrentPage('content-library')
    },
    {
      icon: <Star className="text-indigo-500" size={32} />,
      title: "Expert Approved",
      description: "Content reviewed by educational specialists",
      stat: "Expert Verified",
      action: () => setCurrentPage('expert-reviews')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Parallax Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background with parallax effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-xl"
            style={{
              transform: `translate(${scrollY * 0.3}px, ${scrollY * 0.2}px)`,
            }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-2xl"
            style={{
              transform: `translate(${-scrollY * 0.2}px, ${scrollY * 0.4}px)`,
            }}
          />
          <div 
            className="absolute top-1/2 right-1/3 w-48 h-48 bg-white/5 rounded-full blur-xl"
            style={{
              transform: `translate(${scrollY * 0.4}px, ${-scrollY * 0.3}px)`,
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Your Complete
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              K-6 Teaching
            </span>
            <span className="block">Companion</span>
          </h1>
          
          <p className="text-xl sm:text-2xl md:text-3xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Empower your teaching with AI-driven tools, comprehensive curriculum, and a vibrant educator community
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              className="group bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
              onClick={() => setCurrentPage('platform-tour')}
            >
              <Play className="mr-2 group-hover:scale-110 transition-transform" size={20} />
              Take Platform Tour
            </button>
            <button 
              onClick={() => setCurrentPage('curriculum')}
              className="group bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
            >
              <Book className="mr-2 group-hover:scale-110 transition-transform" size={20} />
              Explore Curriculum
            </button>
            <button 
              onClick={() => setCurrentPage('tools')}
              className="group bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
            >
              <Wrench className="mr-2 group-hover:scale-110 transition-transform" size={20} />
              Try AI Tools
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="bg-white py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            Why Educators Choose OECS Learning Hub
          </h2>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            Join thousands of teachers transforming education with cutting-edge tools and resources
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative">
          <div className="flex animate-marquee space-x-8">
            {/* First set of cards */}
            {marqueeCards.map((card, index) => (
              <div 
                key={`first-${index}`}
                className="flex-shrink-0 w-80 bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={card.action}
              >
                <div className="flex items-center justify-between mb-4">
                  {card.icon}
                  <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {card.stat}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{card.title}</h3>
                <p className="text-gray-600 leading-relaxed">{card.description}</p>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {marqueeCards.map((card, index) => (
              <div 
                key={`second-${index}`}
                className="flex-shrink-0 w-80 bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={card.action}
              >
                <div className="flex items-center justify-between mb-4">
                  {card.icon}
                  <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {card.stat}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{card.title}</h3>
                <p className="text-gray-600 leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Get Started in Seconds</h2>
          <p className="text-xl text-gray-600">Choose your path to educational excellence</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {quickAccessItems.map((item, index) => (
            <div 
              key={index} 
              className={`${item.color} border-2 p-8 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg group`}
              onClick={item.action}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">{item.subtitle}</p>
                <div className="flex items-center justify-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                  Get Started <ArrowRight className="ml-2" size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div 
              className="cursor-pointer hover:scale-105 transition-transform" 
              onClick={() => setCurrentPage('teacher-stats')}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
              <div className="text-blue-200">Active Teachers</div>
            </div>
            <div 
              className="cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setCurrentPage('student-impact')}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">1M+</div>
              <div className="text-blue-200">Students Reached</div>
            </div>
            <div 
              className="cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setCurrentPage('resource-library')}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
              <div className="text-blue-200">Resources</div>
            </div>
            <div 
              className="cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setCurrentPage('global-reach')}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">15+</div>
              <div className="text-blue-200">Countries</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;