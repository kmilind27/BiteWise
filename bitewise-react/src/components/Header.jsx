import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../hooks/useAuth';
import { useUserProfile } from '../hooks/useUserProfile';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { profile } = useUserProfile(user?.uid);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getInitials = () => {
    if (profile?.name) {
      const names = profile.name.split(' ');
      if (names.length >= 2) {
        return (names[0][0] + names[names.length - 1][0]).toUpperCase();
      }
      return names[0][0].toUpperCase();
    }
    return user?.email ? user.email.charAt(0).toUpperCase() : 'U';
  };

  const getDisplayName = () => {
    return profile?.name || user?.email || 'User';
  };

  return (
    <header className="app-header">
      <h1>BiteWise</h1>
      <p>Your smart food and recipe assistant.</p>
      
      <div className="header-actions">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          )}
        </button>

        {user && (
          <div className="hamburger-menu" ref={menuRef}>
            <button 
              className="hamburger-btn" 
              onClick={() => setShowMenu(!showMenu)}
              aria-label="Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            
            {showMenu && (
              <div className="hamburger-dropdown">
                <div className="hamburger-header">
                  <div className="user-avatar-small">
                    {getInitials()}
                  </div>
                  <div className="user-info">
                    <div className="user-name">{getDisplayName()}</div>
                    <div className="user-email">{user.email}</div>
                  </div>
                </div>

                <div className="hamburger-divider"></div>

                <button className="hamburger-item" onClick={() => { navigate('/dashboard'); setShowMenu(false); }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"/>
                    <rect x="14" y="3" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/>
                    <rect x="3" y="14" width="7" height="7"/>
                  </svg>
                  Dashboard
                </button>

                <button className="hamburger-item" onClick={() => { setShowMenu(false); }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  Profile
                </button>

                <button className="hamburger-item" onClick={() => { setShowMenu(false); }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v6m0 6v6"/>
                    <path d="m4.93 4.93 4.24 4.24m5.66 5.66 4.24 4.24"/>
                    <path d="M1 12h6m6 0h6"/>
                    <path d="m4.93 19.07 4.24-4.24m5.66-5.66 4.24-4.24"/>
                  </svg>
                  Settings
                </button>

                <button className="hamburger-item" onClick={() => { setShowMenu(false); }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 16v-4"/>
                    <path d="M12 8h.01"/>
                  </svg>
                  Help & Support
                </button>

                <div className="hamburger-divider"></div>

                <button className="hamburger-item danger" onClick={handleLogout}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
