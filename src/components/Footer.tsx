// components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4 text-lg">QUICK ACCESS</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-blue-300 transition-colors">• Curriculum</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">• AI Tools</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">• Professional Development</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">• Getting Started</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-lg">SUPPORT</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-blue-300 transition-colors">• Help Center</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">• Video Guides</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">• Contact Us</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">• Live Chat</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">• Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-lg">CONNECT</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-blue-300 transition-colors">• Community</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">• Share Ideas</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">• Collaborate</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">• Follow Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-lg">LEGAL</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-blue-300 transition-colors">• Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">• Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">• Accessibility</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm mb-2">📧 support@oecslearninghub.org | 💬 Live Chat (Mon-Fri 9-5)</p>
            <p className="text-sm">🌐 help.oecslearninghub.org</p>
          </div>
          <p className="text-sm">© 2024 OECS Learning Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;