
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-center items-center">
          <Link 
            to="/terms-of-service" 
            className="text-slate-500 hover:text-slate-700 text-sm transition-colors"
          >
            תנאי שימוש
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
