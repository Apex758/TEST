// pages/ToolsPage.js
import React from 'react';
import { Play, Zap, BarChart3, PenTool, Library, Shield, ArrowRight } from 'lucide-react';

const ToolsPage = () => {
  const tools = [
    {
      title: '🤖 AI LESSON PLANNER',
      subtitle: 'Create lessons in minutes',
      description: 'AI-powered lesson planning tool that generates comprehensive lesson plans based on your curriculum standards and learning objectives.',
      icon: <Zap className="text-yellow-500" size={32} />,
      features: ['Curriculum-aligned', 'Auto-generated objectives', 'Time estimates', 'Resource suggestions'],
      demoTime: '2 min demo'
    },
    {
      title: '📊 ASSESSMENT ANALYTICS',
      subtitle: 'Track student progress',
      description: 'Advanced analytics dashboard to monitor student performance, identify learning gaps, and track progress over time.',
      icon: <BarChart3 className="text-blue-500" size={32} />,
      features: ['Real-time insights', 'Performance tracking', 'Gap analysis', 'Progress reports'],
      demoTime: '3 min demo'
    },
    {
      title: '📝 QUIZ MAKER',
      subtitle: 'Interactive quizzes',
      description: 'Create engaging quizzes and assessments with multiple question types, instant feedback, and automated grading.',
      icon: <PenTool className="text-green-500" size={32} />,
      features: ['Multiple question types', 'Instant feedback', 'Auto-grading', 'Export options'],
      demoTime: '2 min demo'
    },
    {
      title: '📚 DIGITAL LIBRARY',
      subtitle: 'Curated resources',
      description: 'Access thousands of educational resources, worksheets, multimedia content, and teaching materials.',
      icon: <Library className="text-purple-500" size={32} />,
      features: ['10K+ resources', 'Grade filtered', 'Subject organized', 'Download ready'],
      demoTime: '1 min demo'
    },
    {
      title: '🛡️ DIGITAL SAFETY',
      subtitle: 'Teach digital literacy',
      description: 'Comprehensive digital citizenship and online safety curriculum designed specifically for K-6 students.',
      icon: <Shield className="text-red-500" size={32} />,
      features: ['Age-appropriate', 'Interactive lessons', 'Parent resources', 'Assessment tools'],
      demoTime: '4 min demo'
    }
  ];

  const upcomingTools = [
    { name: 'AI Writing Assistant', status: 'Coming Soon', eta: 'Q2 2024' },
    { name: 'Virtual Classroom', status: 'In Development', eta: 'Q3 2024' },
    { name: 'Parent Portal', status: 'Planning', eta: 'Q4 2024' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            AI Teaching Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Supercharge your teaching with intelligent tools designed to save time and enhance student learning
          </p>
          
          {/* CTA Banner */}
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-xl p-6 mb-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-left mb-4 md:mb-0">
                <h3 className="text-lg font-bold text-blue-800 mb-2">
                  🎯 New to AI tools? Start here!
                </h3>
                <p className="text-blue-700">
                  Take our guided tour to see how AI can transform your teaching
                </p>
              </div>
              <div className="flex space-x-3">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center">
                  <Play className="mr-2" size={16} />
                  Take the Tour
                </button>
                <button className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {tools.map((tool, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-102 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      {tool.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{tool.title}</h3>
                      <p className="text-blue-600 font-semibold">"{tool.subtitle}"</p>
                    </div>
                  </div>
                  <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                    {tool.demoTime}
                  </span>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">{tool.description}</p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Key Features:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {tool.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold flex items-center justify-center">
                    <Play className="mr-2" size={16} />
                    Try Demo
                  </button>
                  <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center">
                    Start Using
                    <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🔧 More Tools Coming Soon</h2>
            <p className="text-gray-600">
              We're constantly developing new AI-powered tools to make teaching easier and more effective
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingTools.map((tool, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 text-center">
                <h3 className="font-semibold text-gray-800 mb-2">{tool.name}</h3>
                <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                  {tool.status}
                </span>
                <p className="text-gray-600 text-sm">Expected: {tool.eta}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl text-white p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Transform Your Teaching?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of educators who are already using AI to create better learning experiences for their students
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
              Start Free Trial
            </button>
            <button className="px-8 py-3 bg-blue-700 text-white border border-blue-500 rounded-lg hover:bg-blue-800 transition-colors font-semibold">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;