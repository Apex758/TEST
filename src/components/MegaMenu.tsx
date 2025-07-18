// src/components/MegaMenu.tsx
import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Book, BarChart3, BookOpen, Users, Play } from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuType: 'curriculum' | 'tools' | 'grow' | 'connect';
  setCurrentPage: (page: string) => void;
}

const toolsData = {
  aiTools: {
    name: 'AI Teaching Tools',
    icon: <BarChart3 size={16} className="text-purple-600" />,
    subcategories: {
      'lesson-planning': {
        name: 'Lesson Planning',
        tools: [
          { name: 'AI Lesson Planner', description: 'Generate comprehensive lesson plans', isNew: true },
          { name: 'Curriculum Mapper', description: 'Map lessons to standards', isPro: true },
          { name: 'Activity Generator', description: 'Create engaging activities', isNew: false },
          { name: 'Assessment Builder', description: 'Build custom assessments', isNew: true }
        ]
      },
      'grading': {
        name: 'Grading & Assessment',
        tools: [
          { name: 'Auto Grader', description: 'Automatically grade assignments', isPro: true },
          { name: 'Rubric Generator', description: 'Create detailed rubrics', isNew: false },
          { name: 'Progress Tracker', description: 'Track student progress', isNew: true },
          { name: 'Report Generator', description: 'Generate progress reports', isPro: true }
        ]
      }
    }
  },
  contentTools: {
    name: 'Content Creation',
    icon: <BookOpen size={16} className="text-green-600" />,
    subcategories: {
      'worksheets': {
        name: 'Worksheets & Materials',
        tools: [
          { name: 'Worksheet Generator', description: 'Create custom worksheets', isPro: true },
          { name: 'Quiz Maker', description: 'Build interactive quizzes', isNew: false },
          { name: 'Flashcard Creator', description: 'Design digital flashcards', isNew: true },
          { name: 'Poster Maker', description: 'Create educational posters', isNew: false }
        ]
      },
      'multimedia': {
        name: 'Multimedia Content',
        tools: [
          { name: 'Video Recorder', description: 'Record lesson videos', isNew: true },
          { name: 'Interactive Presentations', description: 'Build engaging slideshows', isPro: true },
          { name: 'Audio Tools', description: 'Create audio content', isNew: false },
          { name: 'Animation Studio', description: 'Create educational animations', isPro: true }
        ]
      }
    }
  },
  classroomTools: {
    name: 'Classroom Management',
    icon: <Users size={16} className="text-blue-600" />,
    subcategories: {
      'organization': {
        name: 'Organization',
        tools: [
          { name: 'Digital Gradebook', description: 'Manage student grades', isNew: false },
          { name: 'Attendance Tracker', description: 'Track student attendance', isPro: true },
          { name: 'Behavior Monitor', description: 'Monitor student behavior', isNew: true },
          { name: 'Parent Communication', description: 'Communicate with parents', isNew: false }
        ]
      },
      'engagement': {
        name: 'Student Engagement',
        tools: [
          { name: 'Poll Creator', description: 'Create live polls', isNew: true },
          { name: 'Game Builder', description: 'Build educational games', isPro: true },
          { name: 'Discussion Board', description: 'Facilitate discussions', isNew: false },
          { name: 'Reward System', description: 'Gamify learning', isNew: true }
        ]
      }
    }
  }
};

const curriculumData = {
  mathematics: {
    name: 'Mathematics',
    icon: <BarChart3 size={16} className="text-blue-600" />,
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
      }
    }
  },
  science: {
    name: 'Science',
    icon: <Book size={16} className="text-green-600" />,
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
      }
    }
  },
  languageArts: {
    name: 'Language Arts',
    icon: <BookOpen size={16} className="text-purple-600" />,
    grades: {
      'K': {
        name: 'Kindergarten',
        elos: [
          'Recognize and name letters',
          'Understand print concepts',
          'Identify rhyming words',
          'Retell familiar stories'
        ]
      }
    }
  },
  socialStudies: {
    name: 'Social Studies',
    icon: <Users size={16} className="text-orange-600" />,
    grades: {
      'K': {
        name: 'Kindergarten',
        elos: [
          'Understand family and community roles',
          'Identify basic needs and wants',
          'Recognize symbols and traditions',
          'Learn about maps and globes'
        ]
      }
    }
  }
};

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose, menuType, setCurrentPage }) => {
  const [hoveredSubject, setHoveredSubject] = useState<string | null>(null);
  const [hoveredGrade, setHoveredGrade] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState<string | null>(null);
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

  if (menuType === 'tools') {
    return (
      <div 
        ref={menuRef}
        style={{
          position: 'fixed',
          top: '64px',
          left: 0,
          right: 0,
          height: '400px',
          backgroundColor: 'white',
          borderBottom: '1px solid #e5e7eb',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          zIndex: 90,
          display: 'flex'
        }}
      >
        {/* Column 1: Tool Categories */}
        <div style={{ 
          width: '200px', 
          backgroundColor: '#f9fafb', 
          borderRight: '1px solid #e5e7eb',
          height: '100%'
        }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#374151' }}>Tool Categories</h3>
          </div>
          <div>
            {Object.entries(toolsData).map(([key, category]) => (
              <button
                key={key}
                onMouseEnter={() => setHoveredCategory(key)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  textAlign: 'left',
                  border: 'none',
                  backgroundColor: hoveredCategory === key ? '#dbeafe' : 'transparent',
                  color: hoveredCategory === key ? '#1d4ed8' : '#374151',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {category.icon}
                <span style={{ marginLeft: '8px', fontSize: '14px' }}>{category.name}</span>
                <ChevronRight size={14} style={{ marginLeft: 'auto' }} />
              </button>
            ))}
          </div>
        </div>

        {/* Column 2: Subcategories */}
        <div style={{ 
          width: '200px', 
          backgroundColor: 'white', 
          borderRight: '1px solid #e5e7eb',
          height: '100%'
        }}>
          {hoveredCategory && (
            <>
              <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#374151' }}>Subcategories</h3>
              </div>
              <div>
                {hoveredCategory && Object.entries(toolsData[hoveredCategory as keyof typeof toolsData]?.subcategories || {}).map(([subKey, subcategory]) => (
                  <button
                    key={subKey}
                    onMouseEnter={() => setHoveredSubcategory(subKey)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      textAlign: 'left',
                      border: 'none',
                      backgroundColor: hoveredSubcategory === subKey ? '#fef3c7' : 'transparent',
                      color: hoveredSubcategory === subKey ? '#92400e' : '#374151',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{subcategory?.name}</div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>{subcategory?.tools?.length || 0} tools</div>
                    </div>
                    <ChevronRight size={12} />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Column 3: Tools */}
        <div style={{ 
          flex: 1, 
          backgroundColor: 'white',
          height: '100%'
        }}>
          {hoveredCategory && hoveredSubcategory ? (
            <>
              <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#374151' }}>
                  {hoveredCategory && hoveredSubcategory && toolsData[hoveredCategory as keyof typeof toolsData]?.subcategories?.[hoveredSubcategory]?.name} Tools
                </h3>
                <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                  {hoveredCategory && toolsData[hoveredCategory as keyof typeof toolsData]?.name}
                </p>
              </div>
              <div style={{ padding: '16px', height: '320px', overflowY: 'auto' }}>
                {hoveredCategory && hoveredSubcategory && toolsData[hoveredCategory as keyof typeof toolsData]?.subcategories?.[hoveredSubcategory]?.tools?.map((tool, index) => (
                  <div 
                    key={index} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '12px', 
                      padding: '12px',
                      marginBottom: '8px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      border: '1px solid #f3f4f6'
                    }}
                    onMouseEnter={(e) => {
                      const target = e.target as HTMLElement;
                      if (target) target.style.backgroundColor = '#f9fafb';
                    }}
                    onMouseLeave={(e) => {
                      const target = e.target as HTMLElement;
                      if (target) target.style.backgroundColor = 'transparent';
                    }}
                    onClick={() => {
                      setCurrentPage('tools');
                      onClose();
                    }}
                  >
                    <div style={{ 
                      width: '32px', 
                      height: '32px', 
                      backgroundColor: '#dbeafe', 
                      borderRadius: '8px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Play size={16} style={{ color: '#2563eb' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                          {tool?.name}
                        </h4>
                        {tool?.isNew && (
                          <span style={{ 
                            backgroundColor: '#dcfce7', 
                            color: '#166534', 
                            fontSize: '10px', 
                            padding: '2px 6px', 
                            borderRadius: '12px',
                            fontWeight: 'bold'
                          }}>
                            New
                          </span>
                        )}
                        {tool?.isPro && (
                          <span style={{ 
                            backgroundColor: '#f3e8ff', 
                            color: '#7c3aed', 
                            fontSize: '10px', 
                            padding: '2px 6px', 
                            borderRadius: '12px',
                            fontWeight: 'bold'
                          }}>
                            Pro
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.4' }}>
                        {tool?.description}
                      </p>
                    </div>
                    <button style={{ 
                      padding: '6px 12px', 
                      backgroundColor: '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}>
                      Try Now
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100%',
              flexDirection: 'column',
              color: '#6b7280'
            }}>
              <BarChart3 size={48} style={{ marginBottom: '16px', opacity: 0.3 }} />
              <p style={{ fontSize: '14px' }}>Hover over a category and subcategory to see tools</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (menuType !== 'curriculum') return null;

  return (
    <div 
      ref={menuRef}
      style={{
        position: 'fixed',
        top: '64px',
        left: 0,
        right: 0,
        height: '400px',
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        zIndex: 90,
        display: 'flex'
      }}
    >
      {/* Column 1: Subjects */}
      <div style={{ 
        width: '200px', 
        backgroundColor: '#f9fafb', 
        borderRight: '1px solid #e5e7eb',
        height: '100%'
      }}>
        <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#374151' }}>Subjects</h3>
        </div>
        <div>
          {Object.entries(curriculumData).map(([key, subject]) => (
            <button
              key={key}
              onMouseEnter={() => setHoveredSubject(key)}
              style={{
                width: '100%',
                padding: '12px 16px',
                textAlign: 'left',
                border: 'none',
                backgroundColor: hoveredSubject === key ? '#dbeafe' : 'transparent',
                color: hoveredSubject === key ? '#1d4ed8' : '#374151',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {subject.icon}
              <span style={{ marginLeft: '8px', fontSize: '14px' }}>{subject.name}</span>
              <ChevronRight size={14} style={{ marginLeft: 'auto' }} />
            </button>
          ))}
        </div>
      </div>

      {/* Column 2: Grades */}
      <div style={{ 
        width: '200px', 
        backgroundColor: 'white', 
        borderRight: '1px solid #e5e7eb',
        height: '100%'
      }}>
        {hoveredSubject && (
          <>
            <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#374151' }}>Grade Levels</h3>
            </div>
            <div>
              {Object.entries(curriculumData[hoveredSubject as keyof typeof curriculumData].grades).map(([gradeKey, grade]) => (
                <button
                  key={gradeKey}
                  onMouseEnter={() => setHoveredGrade(gradeKey)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    textAlign: 'left',
                    border: 'none',
                    backgroundColor: hoveredGrade === gradeKey ? '#fef3c7' : 'transparent',
                    color: hoveredGrade === gradeKey ? '#92400e' : '#374151',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '500' }}>{grade.name}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Grade {gradeKey}</div>
                  </div>
                  <ChevronRight size={12} />
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Column 3: Learning Objectives */}
      <div style={{ 
        flex: 1, 
        backgroundColor: 'white',
        height: '100%'
      }}>
        {hoveredSubject && hoveredGrade ? (
          <>
            <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#374151' }}>
                Learning Objectives - {curriculumData[hoveredSubject as keyof typeof curriculumData].grades[hoveredGrade as keyof typeof curriculumData.mathematics.grades].name}
              </h3>
              <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                {curriculumData[hoveredSubject as keyof typeof curriculumData].name}
              </p>
            </div>
            <div style={{ padding: '16px', height: '320px', overflowY: 'auto' }}>
              {curriculumData[hoveredSubject as keyof typeof curriculumData].grades[hoveredGrade as keyof typeof curriculumData.mathematics.grades].elos.map((elo, index) => (
                <div 
                  key={index} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: '12px', 
                    padding: '12px',
                    marginBottom: '8px',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLElement;
                    if (target) target.style.backgroundColor = '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLElement;
                    if (target) target.style.backgroundColor = 'transparent';
                  }}
                >
                  <div style={{ 
                    width: '24px', 
                    height: '24px', 
                    backgroundColor: '#fef3c7', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#92400e' }}>
                      {index + 1}
                    </span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.5' }}>
                      {elo}
                    </p>
                  </div>
                  <button style={{ 
                    padding: '4px', 
                    backgroundColor: '#dbeafe',
                    border: 'none',
                    borderRadius: '4px',
                    opacity: 0,
                    cursor: 'pointer'
                  }}>
                    <Play size={12} style={{ color: '#2563eb' }} />
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%',
            flexDirection: 'column',
            color: '#6b7280'
          }}>
            <Book size={48} style={{ marginBottom: '16px', opacity: 0.3 }} />
            <p style={{ fontSize: '14px' }}>Hover over a subject and grade to see learning objectives</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MegaMenu;