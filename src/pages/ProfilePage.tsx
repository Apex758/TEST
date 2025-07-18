// src/pages/ProfilePage.tsx
import React from 'react';
import PlaceholderPage from './PlaceholderPage';

interface ProfilePageProps {
  onGoBack: () => void;
  onGoHome: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onGoBack, onGoHome }) => {
  return (
    <PlaceholderPage 
      pageName="Profile"
      onGoBack={onGoBack}
      onGoHome={onGoHome}
    />
  );
};

export default ProfilePage;