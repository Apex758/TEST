// src/pages/DashboardPage.tsx
import React from 'react';
import PlaceholderPage from './PlaceholderPage';

interface DashboardPageProps {
  onGoBack: () => void;
  onGoHome: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onGoBack, onGoHome }) => {
  return (
    <PlaceholderPage 
      pageName="Dashboard"
      onGoBack={onGoBack}
      onGoHome={onGoHome}
    />
  );
};

export default DashboardPage;