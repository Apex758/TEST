// src/App.tsx
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CurriculumPage from './pages/CurriculumPage';
import ToolsPage from './pages/ToolsPage';
import GrowPage from './pages/GrowPage';
import ConnectPage from './pages/ConnectPage';
import './index.css';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'curriculum':
        return <CurriculumPage />;
      case 'tools':
        return <ToolsPage />;
      case 'grow':
        return <GrowPage />;
      case 'connect':
        return <ConnectPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-sage-50">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderCurrentPage()}
      <Footer />
    </div>
  );
};

export default App;