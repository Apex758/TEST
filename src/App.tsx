// src/App.tsx
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CurriculumPage from './pages/CurriculumPage';
import ToolsPage from './pages/ToolsPage';
import GrowPage from './pages/GrowPage';
import ConnectPage from './pages/ConnectPage';
import PlaceholderPage from './pages/PlaceholderPage';
import './index.css';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [previousPage, setPreviousPage] = useState('home');

  // Define which pages actually exist
  const existingPages = ['home', 'curriculum', 'tools', 'grow', 'connect'];

  const handlePageChange = (page: string) => {
    setPreviousPage(currentPage);
    setCurrentPage(page);
  };

  const handleGoBack = () => {
    setCurrentPage(previousPage);
  };

  const handleGoHome = () => {
    setCurrentPage('home');
  };

  const formatPageName = (page: string) => {
    return page
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={handlePageChange} />;
      case 'curriculum':
        return <CurriculumPage setCurrentPage={handlePageChange} />;
      case 'tools':
        return <ToolsPage setCurrentPage={handlePageChange} />;
      case 'grow':
        return <GrowPage setCurrentPage={handlePageChange} />;
      case 'connect':
        return <ConnectPage setCurrentPage={handlePageChange} />;
      default:
        // For any page that doesn't exist, show placeholder
        return (
          <PlaceholderPage 
            pageName={formatPageName(currentPage)}
            onGoBack={handleGoBack}
            onGoHome={handleGoHome}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-sage-50">
      <Header currentPage={currentPage} setCurrentPage={handlePageChange} />
      {renderCurrentPage()}
      <Footer setCurrentPage={handlePageChange} />
    </div>
  );
};

export default App;