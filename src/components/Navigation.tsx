
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ClayButton from './ClayButton';
import { Target, LogIn, UserPlus } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userData');
    window.location.href = '/';
  };

  return (
    <nav className="bg-gradient-to-r from-purple-100 via-blue-100 to-green-100 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.1)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-300 to-blue-300 flex items-center justify-center shadow-[inset_0_2px_8px_rgba(255,255,255,0.3),0_4px_12px_rgba(0,0,0,0.15)]">
            <Target className="w-6 h-6 text-purple-700" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            LeadFinder
          </h1>
        </Link>

        <div className="flex items-center space-x-4">
          {location.pathname !== '/' && (
            <Link to="/">
              <ClayButton variant="secondary" size="sm">
                בית
              </ClayButton>
            </Link>
          )}
          
          {isLoggedIn ? (
            <>
              {location.pathname !== '/dashboard' && (
                <Link to="/dashboard">
                  <ClayButton variant="accent" size="sm">
                    דאשבורד
                  </ClayButton>
                </Link>
              )}
              <ClayButton variant="secondary" size="sm" onClick={handleLogout}>
                התנתק
              </ClayButton>
            </>
          ) : (
            <>
              {location.pathname !== '/login' && (
                <Link to="/login">
                  <ClayButton variant="secondary" size="sm">
                    <LogIn className="w-4 h-4 ml-2" />
                    התחבר
                  </ClayButton>
                </Link>
              )}
              {location.pathname !== '/signup' && (
                <Link to="/signup">
                  <ClayButton variant="primary" size="sm">
                    <UserPlus className="w-4 h-4 ml-2" />
                    הירשם
                  </ClayButton>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
