// components/Footer.js
import React from 'react';

const Footer = ({ setCurrentPage }) => {
  const quickAccessLinks = [
    { name: 'Curriculum', page: 'curriculum' },
    { name: 'AI Tools', page: 'tools' },
    { name: 'Professional Development', page: 'grow' },
    { name: 'Getting Started', page: 'getting-started' }
  ];

  const supportLinks = [
    { name: 'Help Center', page: 'help-center' },
    { name: 'Video Guides', page: 'video-guides' },
    { name: 'Contact Us', page: 'contact' },
    { name: 'Live Chat', page: 'live-chat' },
    { name: 'Documentation', page: 'documentation' }
  ];

  const connectLinks = [
    { name: 'Community', page: 'connect' },
    { name: 'Share Ideas', page: 'share-ideas' },
    { name: 'Collaborate', page: 'collaborate' },
    { name: 'Follow Us', page: 'social-media' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', page: 'privacy-policy' },
    { name: 'Terms of Service', page: 'terms-of-service' },
    { name: 'Accessibility', page: 'accessibility' }
  ];

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4 text-lg">QUICK ACCESS</h3>
            <ul className="space-y-3 text-sm">
              {quickAccessLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => setCurrentPage && setCurrentPage(link.page)}
                    className="hover:text-blue-300 transition-colors text-left"
                  >
                    • {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-lg">SUPPORT</h3>
            <ul className="space-y-3 text-sm">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => setCurrentPage && setCurrentPage(link.page)}
                    className="hover:text-blue-300 transition-colors text-left"
                  >
                    • {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-lg">CONNECT</h3>
            <ul className="space-y-3 text-sm">
              {connectLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => setCurrentPage && setCurrentPage(link.page)}
                    className="hover:text-blue-300 transition-colors text-left"
                  >
                    • {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-lg">LEGAL</h3>
            <ul className="space-y-3 text-sm">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => setCurrentPage && setCurrentPage(link.page)}
                    className="hover:text-blue-300 transition-colors text-left"
                  >
                    • {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <button 
              onClick={() => setCurrentPage && setCurrentPage('contact')}
              className="text-sm mb-2 hover:text-blue-300 transition-colors block"
            >
              📧 support@oecslearninghub.org | 💬 Live Chat (Mon-Fri 9-5)
            </button>
            <button 
              onClick={() => setCurrentPage && setCurrentPage('help-center')}
              className="text-sm hover:text-blue-300 transition-colors block"
            >
              🌐 help.oecslearninghub.org
            </button>
          </div>
          <p className="text-sm">© 2024 OECS Learning Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;