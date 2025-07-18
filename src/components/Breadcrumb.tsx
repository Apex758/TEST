import React from 'react';
import { Home, ChevronRight, MapPin, Navigation } from 'lucide-react';

interface BreadcrumbProps {
  currentPage: string;
  currentSubPage?: string | null;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ currentPage, currentSubPage = null }) => {
  const getBreadcrumbs = () => {
    const breadcrumbs = [{ label: 'Home', page: 'home', icon: Home }];
    
    const pageMap = {
      curriculum: { label: 'Curriculum', icon: Home },
      tools: { label: 'AI Tools', icon: Home },
      grow: { label: 'Professional Growth', icon: Home },
      connect: { label: 'Community', icon: Home }
    };
    
    if (currentPage !== 'home' && pageMap[currentPage as keyof typeof pageMap]) {
      breadcrumbs.push(pageMap[currentPage as keyof typeof pageMap]);
    }
    
    if (currentSubPage) {
      breadcrumbs.push({ label: currentSubPage, page: null, icon: MapPin });
    }
    
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav className="flex items-center space-x-2 text-sm text-sage-600 mb-6 bg-white rounded-lg p-3 shadow-sm border border-sage-200">
      <Navigation size={16} className="text-primary-600" />
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight size={14} className="text-sage-400" />}
          <div className={`flex items-center space-x-1 ${
            index === breadcrumbs.length - 1 
              ? 'text-primary-600 font-semibold' 
              : 'hover:text-primary-600 cursor-pointer'
          }`}>
            <crumb.icon size={14} />
            <span>{crumb.label}</span>
          </div>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;