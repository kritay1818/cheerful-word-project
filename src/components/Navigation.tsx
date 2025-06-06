
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ClayButton from './ClayButton';
import { LogIn, UserPlus } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const hasSignupData = localStorage.getItem('tempSignupData');

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentClient');
    localStorage.removeItem('userData'); // Keep for backward compatibility
    localStorage.removeItem('tempSignupData'); // Clean up any temporary data
    window.location.href = '/';
  };

  return (
    <nav className="bg-gradient-to-r from-purple-100 via-blue-100 to-green-100 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.1)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
          <img src="/lovable-uploads/048c0e4e-7629-4fdf-ae3a-1d432ec83916.png" alt="snipost logo" className="w-10 h-10 object-contain" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            snipost
          </h1>
        </Link>

        {/* Navigation Links for Front Page - Centered */}
        {location.pathname === '/' && !isLoggedIn && (
          <div className="hidden lg:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
            <a href="#features" className="text-slate-700 hover:text-purple-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-white/30">
              מאפיינים
            </a>
            <a href="#how-it-works" className="text-slate-700 hover:text-purple-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-white/30">
              איך זה עובד
            </a>
            <a href="#pricing" className="text-slate-700 hover:text-purple-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-white/30">
              תמחור
            </a>
            <a href="#faq" className="text-slate-700 hover:text-purple-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-white/30">
              שאלות נפוצות
            </a>
          </div>
        )}
        
        {/* Action Buttons - Right Side */}
        <div className="flex items-center space-x-3 flex-shrink-0">
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
              {location.pathname === '/register' && hasSignupData ? (
                <Link to="/signup">
                  <ClayButton variant="secondary" size="sm">
                    חזור להרשמה
                  </ClayButton>
                </Link>
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
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
