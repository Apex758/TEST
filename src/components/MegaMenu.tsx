// src/components/MegaMenu.tsx
import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Book, BarChart3, Zap, Users, Target, Lightbulb, Brain, Wrench, TrendingUp, MessageSquare, Share2, Award, Calendar, BookOpen, Play, Star, HelpCircle, Library } from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuType: 'curriculum' | 'tools' | 'grow' | 'connect';
  setCurrentPage: (page: string) => void;
}

// Curriculum data structure
const curriculumData = {
  mathematics: {
    name: 'Mathematics',
    icon: <BarChart3 size={16} className="text-primary-600" />,
    grades: {
      'K': {
        name: 'Kindergarten',
        elos: [
          'Count to 20 by ones and tens',
          'Identify shapes in the environment',
          'Compare quantities using more, less, same',
          'Simple addition and subtraction to 5'
        ]
      },
      '1': {
        name: 'Grade 1',
        elos: [
          'Add and subtract within 20',
          'Count to 120 starting at any number',
          'Understand place value for two-digit numbers',
          'Measure lengths using non-standard units'
        ]
      },
      '2': {
        name: 'Grade 2',
        elos: [
          'Add and subtract within 100',
          'Work with equal groups to build multiplication',
          'Understand three-digit place value',
          'Measure and estimate lengths in standard units'
        ]
      },
      '3': {
        name: 'Grade 3',
        elos: [
          'Multiply and divide within 100',
          'Understand fractions as equal parts',
          'Solve two-step word problems',
          'Find area and perimeter of rectangles'
        ]
      },
      '4': {
        name: 'Grade 4',
        elos: [
          'Use four operations with whole numbers',
          'Understand fraction equivalence',
          'Convert measurements within a system',
          'Classify geometric figures by properties'
        ]
      },
      '5': {
        name: 'Grade 5',
        elos: [
          'Perform operations with multi-digit numbers',
          'Add and subtract fractions',
          'Understand concepts of volume',
          'Graph points on coordinate plane'
        ]
      },
      '6': {
        name: 'Grade 6',
        elos: [
          'Compute fluently with multi-digit numbers',
          'Apply understanding of multiplication and division of fractions',
          'Solve real-world problems involving area and volume',
          'Develop understanding of statistical thinking'
        ]
      }
    }
  },
  science: {
    name: 'Science',
    icon: <Zap size={16} className="text-secondary-600" />,
    grades: {
      'K': {
        name: 'Kindergarten',
        elos: [
          'Observe and describe properties of objects',
          'Identify basic needs of living things',
          'Explore weather patterns and seasons',
          'Investigate how things move'
        ]
      },
      '1': {
        name: 'Grade 1',
        elos: [
          'Understand light and sound properties',
          'Observe life cycles of plants and animals',
          'Investigate materials and their properties',
          'Explore space patterns like sun and moon'
        ]
      },
      '2': {
        name: 'Grade 2',
        elos: [
          'Investigate properties of materials',
          'Understand plant and animal diversity',
          'Explore Earth\'s surface features',
          'Study how materials interact'
        ]
      },
      '3': {
        name: 'Grade 3',
        elos: [
          'Understand forces and interactions',
          'Study life cycles and traits',
          'Investigate weather and climate',
          'Explore balanced and unbalanced forces'
        ]
      },
      '4': {
        name: 'Grade 4',
        elos: [
          'Study energy transfer and waves',
          'Understand structure and function of organisms',
          'Investigate Earth\'s features and processes',
          'Explore how energy moves through systems'
        ]
      },
      '5': {
        name: 'Grade 5',
        elos: [
          'Understand matter and its interactions',
          'Study ecosystems and environment',
          'Investigate Earth\'s systems',
          'Explore space systems and patterns'
        ]
      },
      '6': {
        name: 'Grade 6',
        elos: [
          'Study cell structure and function',
          'Understand energy in chemical processes',
          'Investigate plate tectonics',
          'Explore solar system and universe'
        ]
      }
    }
  },
  languageArts: {
    name: 'Language Arts',
    icon: <BookOpen size={16} className="text-accent-600" />,
    grades: {
      'K': {
        name: 'Kindergarten',
        elos: [
          'Recognize and name letters',
          'Understand print concepts',
          'Identify rhyming words',
          'Retell familiar stories'
        ]
      },
      '1': {
        name: 'Grade 1',
        elos: [
          'Read high-frequency words',
          'Use phonics to decode words',
          'Write simple sentences',
          'Ask and answer questions about texts'
        ]
      },
      '2': {
        name: 'Grade 2',
        elos: [
          'Read fluently with accuracy',
          'Use context clues for unknown words',
          'Write narratives and informative texts',
          'Compare and contrast stories'
        ]
      },
      '3': {
        name: 'Grade 3',
        elos: [
          'Read grade-level texts independently',
          'Determine meaning of words and phrases',
          'Write opinion and informative pieces',
          'Explain how texts connect to experiences'
        ]
      },
      '4': {
        name: 'Grade 4',
        elos: [
          'Read complex literature and informational texts',
          'Analyze character development',
          'Write clear explanatory texts',
          'Present knowledge and ideas clearly'
        ]
      },
      '5': {
        name: 'Grade 5',
        elos: [
          'Quote accurately when explaining texts',
          'Analyze themes and main ideas',
          'Write persuasive and research-based texts',
          'Engage in collaborative discussions'
        ]
      },
      '6': {
        name: 'Grade 6',
        elos: [
          'Analyze how authors develop themes',
          'Evaluate arguments and claims',
          'Write arguments with clear reasoning',
          'Present claims with relevant evidence'
        ]
      }
    }
  },
  socialStudies: {
    name: 'Social Studies',
    icon: <Users size={16} className="text-warm-600" />,
    grades: {
      'K': {
        name: 'Kindergarten',
        elos: [
          'Understand family and community roles',
          'Identify basic needs and wants',
          'Recognize symbols and traditions',
          'Learn about maps and globes'
        ]
      },
      '1': {
        name: 'Grade 1',
        elos: [
          'Understand community helpers and roles',
          'Learn about past and present',
          'Identify geographic features',
          'Explore cultural traditions'
        ]
      },
      '2': {
        name: 'Grade 2',
        elos: [
          'Study local history and change over time',
          'Understand goods and services',
          'Explore different communities',
          'Learn about citizenship and rules'
        ]
      },
      '3': {
        name: 'Grade 3',
        elos: [
          'Study community development over time',
          'Understand economic concepts',
          'Explore geographic regions',
          'Learn about government and civic ideals'
        ]
      },
      '4': {
        name: 'Grade 4',
        elos: [
          'Study state and regional history',
          'Understand economic systems',
          'Explore physical and human geography',
          'Learn about democratic principles'
        ]
      },
      '5': {
        name: 'Grade 5',
        elos: [
          'Study early American history',
          'Understand colonial and revolutionary periods',
          'Explore westward expansion',
          'Learn about constitutional principles'
        ]
      },
      '6': {
        name: 'Grade 6',
        elos: [
          'Study ancient civilizations',
          'Understand cultural development',
          'Explore global geography',
          'Learn about world religions and beliefs'
        ]
      }
    }
  }
};

// Tools data
const toolsData = [
  {
    category: 'AI Teaching Tools',
    icon: <Wrench className="text-primary-600" size={16} />,
    items: [
      { name: 'AI Lesson Planner', description: 'Generate comprehensive lesson plans', isNew: true },
      { name: 'Assessment Analytics', description: 'Track student progress', isPro: true },
      { name: 'Quiz Maker', description: 'Create interactive assessments', isNew: false },
      { name: 'Educational Whiteboard', description: 'Digital teaching board', isNew: true }
    ]
  },
  {
    category: 'Content Creation',
    icon: <BookOpen className="text-secondary-600" size={16} />,
    items: [
      { name: 'Digital Library', description: 'Access teaching resources', isNew: false },
      { name: 'Worksheet Generator', description: 'Create custom worksheets', isPro: true },
      { name: 'Video Lessons', description: 'Record and share lessons', isNew: true },
      { name: 'Interactive Games', description: 'Educational game builder', isNew: false }
    ]
  },
  {
    category: 'Classroom Management',
    icon: <Target className="text-accent-600" size={16} />,
    items: [
      { name: 'Behavior Tracker', description: 'Monitor student behavior', isNew: false },
      { name: 'Attendance System', description: 'Digital attendance tracking', isPro: true },
      { name: 'Parent Communication', description: 'Connect with families', isNew: false },
      { name: 'Grade Book', description: 'Manage student grades', isNew: false }
    ]
  }
];

// Professional Development data
const growData = [
  {
    category: 'OECS MyPD Platform',
    icon: <TrendingUp className="text-primary-600" size={16} />,
    featured: true,
    items: [
      { name: 'AI in Education Course', hours: 8, level: 'Intermediate', isNew: true },
      { name: 'Differentiated Instruction', hours: 6, level: 'Advanced', isNew: false },
      { name: 'Digital Assessment', hours: 4, level: 'Beginner', isNew: false },
      { name: 'Classroom Technology', hours: 5, level: 'Intermediate', isNew: true }
    ]
  },
  {
    category: 'Certifications',
    icon: <Award className="text-secondary-600" size={16} />,
    items: [
      { name: 'Digital Educator Certificate', hours: 20, level: 'Professional', isNew: false },
      { name: 'AI Teaching Specialist', hours: 16, level: 'Expert', isNew: true },
      { name: 'Curriculum Developer', hours: 24, level: 'Advanced', isNew: false },
      { name: 'EdTech Leader', hours: 12, level: 'Professional', isNew: false }
    ]
  },
  {
    category: 'Live Training',
    icon: <Calendar className="text-accent-600" size={16} />,
    items: [
      { name: 'Weekly Webinars', hours: 1, level: 'All Levels', isNew: false },
      { name: 'Monthly Workshops', hours: 3, level: 'Various', isNew: false },
      { name: 'Quarterly Conferences', hours: 8, level: 'All Levels', isNew: true },
      { name: 'Summer Institute', hours: 40, level: 'Intensive', isNew: true }
    ]
  }
];

// Connect/Community data
const connectData = [
  {
    category: 'OECS MAKER Studio',
    icon: <Users className="text-primary-600" size={16} />,
    featured: true,
    items: [
      { name: 'Collaborative Projects', members: '2.3K', isNew: true },
      { name: 'Resource Sharing', members: '5.1K', isNew: false },
      { name: 'Peer Reviews', members: '1.8K', isNew: false },
      { name: 'Innovation Labs', members: '890', isNew: true }
    ]
  },
  {
    category: 'Discussion Forums',
    icon: <MessageSquare className="text-secondary-600" size={16} />,
    items: [
      { name: 'Grade-Level Groups', members: '8.2K', isNew: false },
      { name: 'Subject Communities', members: '6.7K', isNew: false },
      { name: 'Technology Help', members: '3.4K', isNew: false },
      { name: 'Success Stories', members: '4.1K', isNew: true }
    ]
  },
  {
    category: 'Events & Networking',
    icon: <Calendar className="text-accent-600" size={16} />,
    items: [
      { name: 'Virtual Meetups', members: '2.9K', isNew: false },
      { name: 'Regional Conferences', members: '1.5K', isNew: true },
      { name: 'Mentorship Program', members: '780', isNew: true },
      { name: 'Expert Office Hours', members: '1.2K', isNew: false }
    ]
  }
];

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose, menuType, setCurrentPage }) => {
  const [hoveredSubject, setHoveredSubject] = useState<string | null>(null);
  const [hoveredGrade, setHoveredGrade] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const renderCurriculumMenu = () => (
    <div className="grid grid-cols-12 gap-0 h-96">
      {/* Subjects Column - Thin */}
      <div className="col-span-3 bg-sage-50 border-r border-sage-200">
        <div className="p-4 border-b border-sage-200">
          <h3 className="font-semibold text-gray-800 text-sm">Subjects</h3>
        </div>
        <div className="py-2">
          {Object.entries(curriculumData).map(([key, subject]) => (
            <button
              key={key}
              onMouseEnter={() => setHoveredSubject(key)}
              className={`w-full text-left px-4 py-3 transition-all duration-200 flex items-center group ${
                hoveredSubject === key 
                  ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-500' 
                  : 'hover:bg-sage-100'
              }`}
            >
              {subject.icon}
              <span className="ml-3 text-sm font-medium">{subject.name}</span>
              <ChevronRight size={14} className={`ml-auto transition-transform ${hoveredSubject === key ? 'rotate-90' : ''}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Grades Column - Thin */}
      <div className="col-span-3 bg-white border-r border-sage-200">
        {hoveredSubject && (
          <div className="animate-fadeIn">
            <div className="p-4 border-b border-sage-200">
              <h3 className="font-semibold text-gray-800 text-sm">Grade Levels</h3>
            </div>
            <div className="py-2">
              {Object.entries(curriculumData[hoveredSubject as keyof typeof curriculumData].grades).map(([gradeKey, grade]) => (
                <button
                  key={gradeKey}
                  onMouseEnter={() => setHoveredGrade(gradeKey)}
                  className={`w-full text-left px-4 py-3 transition-all duration-200 flex items-center justify-between group ${
                    hoveredGrade === gradeKey 
                      ? 'bg-secondary-100 text-secondary-700 border-r-2 border-secondary-500' 
                      : 'hover:bg-sage-50'
                  }`}
                >
                  <div>
                    <div className="font-medium text-sm">{grade.name}</div>
                    <div className="text-xs text-sage-600">Grade {gradeKey}</div>
                  </div>
                  <ChevronRight size={12} className={`transition-transform ${hoveredGrade === gradeKey ? 'rotate-90' : ''}`} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Learning Objectives Column - Wide */}
      <div className="col-span-6 bg-white">
        {hoveredSubject && hoveredGrade && (
          <div className="animate-fadeIn h-full">
            <div className="p-4 border-b border-sage-200">
              <h3 className="font-semibold text-gray-800 text-sm">
                Learning Objectives - {curriculumData[hoveredSubject as keyof typeof curriculumData].grades[hoveredGrade as keyof typeof curriculumData.mathematics.grades].name}
              </h3>
              <p className="text-xs text-sage-600 mt-1">
                {curriculumData[hoveredSubject as keyof typeof curriculumData].name}
              </p>
            </div>
            <div className="p-4 space-y-3 overflow-y-auto h-80">
              {curriculumData[hoveredSubject as keyof typeof curriculumData].grades[hoveredGrade as keyof typeof curriculumData.mathematics.grades].elos.map((elo, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-sage-50 transition-colors">
                    <div className="flex-shrink-0 w-6 h-6 bg-accent-100 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-xs font-semibold text-accent-700">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 group-hover:text-gray-900 leading-relaxed">
                        {elo}
                      </p>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity bg-primary-100 hover:bg-primary-200 p-1 rounded">
                      <Play size={12} className="text-primary-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {(!hoveredSubject || !hoveredGrade) && (
          <div className="flex items-center justify-center h-full text-sage-500">
            <div className="text-center">
              <Book size={48} className="mx-auto mb-4 opacity-30" />
              <p className="text-sm">Hover over a subject and grade to see learning objectives</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderToolsMenu = () => (
    <div className="grid grid-cols-3 gap-6 p-6">
      {toolsData.map((category, index) => (
        <div key={index} className="animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
          <div className="flex items-center space-x-2 mb-4">
            {category.icon}
            <h3 className="font-semibold text-gray-800">{category.category}</h3>
          </div>
          <div className="space-y-2">
            {category.items.map((item, itemIndex) => (
              <button
                key={itemIndex}
                onClick={() => {
                  setCurrentPage('tools');
                  onClose();
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-sage-50 transition-colors group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-800 group-hover:text-primary-600">{item.name}</span>
                  <div className="flex space-x-1">
                    {item.isNew && <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">New</span>}
                    {item.isPro && <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">Pro</span>}
                  </div>
                </div>
                <p className="text-xs text-sage-600">{item.description}</p>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderGrowMenu = () => (
    <div className="grid grid-cols-3 gap-6 p-6">
      {growData.map((category, index) => (
        <div key={index} className="animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
          <div className="flex items-center space-x-2 mb-4">
            {category.icon}
            <h3 className="font-semibold text-gray-800">{category.category}</h3>
            {category.featured && <span className="bg-primary-100 text-primary-700 text-xs px-2 py-0.5 rounded-full">Featured</span>}
          </div>
          <div className="space-y-2">
            {category.items.map((item, itemIndex) => (
              <button
                key={itemIndex}
                onClick={() => {
                  setCurrentPage('grow');
                  onClose();
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-sage-50 transition-colors group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-800 group-hover:text-primary-600">{item.name}</span>
                  {item.isNew && <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">New</span>}
                </div>
                <div className="flex items-center space-x-3 text-xs text-sage-600">
                  <span>{item.hours} hours</span>
                  <span>•</span>
                  <span>{item.level}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderConnectMenu = () => (
    <div className="grid grid-cols-3 gap-6 p-6">
      {connectData.map((category, index) => (
        <div key={index} className="animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
          <div className="flex items-center space-x-2 mb-4">
            {category.icon}
            <h3 className="font-semibold text-gray-800">{category.category}</h3>
            {category.featured && <span className="bg-secondary-100 text-secondary-700 text-xs px-2 py-0.5 rounded-full">Featured</span>}
          </div>
          <div className="space-y-2">
            {category.items.map((item, itemIndex) => (
              <button
                key={itemIndex}
                onClick={() => {
                  setCurrentPage('connect');
                  onClose();
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-sage-50 transition-colors group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-800 group-hover:text-primary-600">{item.name}</span>
                  {item.isNew && <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">New</span>}
                </div>
                <div className="flex items-center space-x-2 text-xs text-sage-600">
                  <Users size={10} />
                  <span>{item.members} members</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderMenuContent = () => {
    switch (menuType) {
      case 'curriculum':
        return renderCurriculumMenu();
      case 'tools':
        return renderToolsMenu();
      case 'grow':
        return renderGrowMenu();
      case 'connect':
        return renderConnectMenu();
      default:
        return null;
    }
  };

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-sage-200 rounded-b-xl shadow-2xl z-40 animate-megaMenuFadeIn">
      <div ref={menuRef} className="max-w-7xl mx-auto">
        {renderMenuContent()}
      </div>
    </div>
  );
};

export default MegaMenu;