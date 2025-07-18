// src/pages/SettingsPage.tsx
import React from 'react';
import PlaceholderPage from './PlaceholderPage';

interface SettingsPageProps {
  onGoBack: () => void;
  onGoHome: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onGoBack, onGoHome }) => {
  return (
    <PlaceholderPage 
      pageName="Settings"
      onGoBack={onGoBack}
      onGoHome={onGoHome}
    />
  );
};

export default SettingsPage;