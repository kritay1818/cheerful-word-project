
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ClayButton from './ClayButton';
import { LogIn, UserPlus, User } from 'lucide-react';

interface NavigationProps {
  userSession?: any;
  onPersonalAreaClick?: () => void;
}

const Navigation = ({ userSession, onPersonalAreaClick }: NavigationProps) => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('userSession') || userSession;

  const handleLogout = () => {
    localStorage.removeItem('userSession');
    localStorage.removeItem('userData');
    localStorage.removeItem('tempSignupData');
    window.location.href = '/';
  };

  return (
    <nav className="bg-gradient-to-r from-purple-100 via-blue-100 to-green-100 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.1)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="/lovable-uploads/248b6086-71d7-4951-9099-120e5eb66c07.png" alt="snipost logo" className="w-16 h-16 object-contain" />
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
              {onPersonalAreaClick && (
                <ClayButton variant="secondary" size="sm" onClick={onPersonalAreaClick}>
                  <User className="w-4 h-4 ml-2" />
                  אזור אישי
                </ClayButton>
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
