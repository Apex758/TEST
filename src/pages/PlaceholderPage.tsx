// src/pages/PlaceholderPage.tsx
import React from 'react';
import { Construction, ArrowLeft, Home } from 'lucide-react';

interface PlaceholderPageProps {
  pageName: string;
  onGoBack: () => void;
  onGoHome: () => void;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ pageName, onGoBack, onGoHome }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto text-center">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Icon */}
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Construction size={32} className="text-yellow-600" />
          </div>
          
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {pageName} Page
          </h1>
          
          {/* Description */}
          <p className="text-gray-600 mb-8">
            This page is currently under construction. We're working hard to bring you an amazing experience!
          </p>
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onGoBack}
              className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              <ArrowLeft size={16} className="mr-2" />
              Go Back
            </button>
            
            <button
              onClick={onGoHome}
              className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
            >
              <Home size={16} className="mr-2" />
              Go Home
            </button>
          </div>
        </div>
        
        {/* Footer Note */}
        <p className="text-sm text-gray-500 mt-6">
          Expected completion: Coming soon
        </p>
      </div>
    </div>
  );
};

export default PlaceholderPage;