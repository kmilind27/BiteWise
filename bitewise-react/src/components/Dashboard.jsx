import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useUserProfile } from '../hooks/useUserProfile';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Header } from './Header';
import { MealLogger } from './MealLogger';
import { IngredientInventory } from './IngredientInventory';
import { MealSuggestions } from './MealSuggestions';
import { MealHistory } from './MealHistory';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const { profile } = useUserProfile(user?.uid);
  const [activeFeature, setActiveFeature] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

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
      setShowMenu(false);
      await logout();
      window.location.href = '/';
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

  if (!user) {
    return (
      <div className="app-wrapper">
        <div className="loader-wrap visible">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getFirstName = () => {
    if (profile?.name) {
      return profile.name.split(' ')[0];
    }
    return user?.email?.split('@')[0] || 'there';
  };

  const FeatureNavigation = ({ current }) => {
    const features = [
      { id: 'meal-logger', name: 'Meal Logger', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> },
      { id: 'ingredients', name: 'Inventory', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3z"/><path d="M3 9h18"/><path d="M9 21V9"/></svg> },
      { id: 'suggestions', name: 'Recipes', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
      { id: 'history', name: 'History', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-6M6 20V10M18 20V4"/></svg> }
    ];

    return (
      <div className="feature-navigation">
        <button className="btn btn-outline" onClick={() => setActiveFeature(null)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          Dashboard
        </button>
        <div className="feature-nav-tabs">
          {features.map(feature => (
            <button
              key={feature.id}
              className={`feature-nav-tab ${current === feature.id ? 'active' : ''}`}
              onClick={() => setActiveFeature(feature.id)}
            >
              {feature.icon}
              {feature.name}
            </button>
          ))}
        </div>
      </div>
    );
  };

  if (activeFeature === 'meal-logger') {
    return (
      <div className="app-wrapper">
        <Header />
        <main>
          <FeatureNavigation current="meal-logger" />
          <MealLogger userId={user.uid} />
        </main>
      </div>
    );
  }

  if (activeFeature === 'ingredients') {
    return (
      <div className="app-wrapper">
        <Header />
        <main>
          <FeatureNavigation current="ingredients" />
          <IngredientInventory userId={user.uid} />
        </main>
      </div>
    );
  }

  if (activeFeature === 'suggestions') {
    return (
      <div className="app-wrapper">
        <Header />
        <main>
          <FeatureNavigation current="suggestions" />
          <MealSuggestions userId={user.uid} />
        </main>
      </div>
    );
  }

  if (activeFeature === 'history') {
    return (
      <div className="app-wrapper">
        <Header />
        <main>
          <FeatureNavigation current="history" />
          <MealHistory userId={user.uid} />
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      {/* Dashboard Header */}
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-logo" onClick={() => navigate('/dashboard')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="logo-icon">
              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
              <path d="M7 2v20"/>
              <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
            </svg>
            <span className="gradient-text">BiteWise</span>
          </div>
          
          <div className="dashboard-header-actions">
            <button 
              className="theme-toggle" 
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
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
        </div>
      </header>

      {/* Hero Section */}
      <section className="dashboard-hero">
        <div className="dashboard-hero-content">
          <div className="hero-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            Welcome Back!
          </div>
          
          <h1 className="hero-title">
            {getGreeting()}, <span className="gradient-text">{getFirstName()}</span>
          </h1>
          
          <p className="hero-description">
            Track your meals, monitor your nutrition, and achieve your health goals with ease. Our AI-powered platform makes healthy eating simple and sustainable.
          </p>

          <div className="dashboard-stats">
            <div className="stat-item">
              <div className="stat-icon">🍽️</div>
              <div className="stat-value">Track</div>
              <div className="stat-label">Your Meals</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🤖</div>
              <div className="stat-value">AI-Powered</div>
              <div className="stat-label">Insights</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">📊</div>
              <div className="stat-value">Monitor</div>
              <div className="stat-label">Progress</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="dashboard-features">
        <div className="section-header">
          <h2 className="section-title">Your Features</h2>
          <p className="section-subtitle">Click on any feature to get started</p>
        </div>

        <div className="features-grid">
          <div className="feature-card" onClick={() => setActiveFeature('meal-logger')}>
            <div className="feature-icon feature-icon-green">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </div>
            <h3 className="feature-title">Meal Logger</h3>
            <p className="feature-description">
              Log your meals with AI-powered macro estimation. Track calories, protein, carbs, and fats automatically.
            </p>
            <button className="feature-btn">
              Start Logging
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>

          <div className="feature-card" onClick={() => setActiveFeature('ingredients')}>
            <div className="feature-icon feature-icon-cyan">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3h18v18H3z"/>
                <path d="M3 9h18"/>
                <path d="M9 21V9"/>
              </svg>
            </div>
            <h3 className="feature-title">Ingredient Inventory</h3>
            <p className="feature-description">
              Manage your pantry and keep track of ingredients you have on hand for meal planning.
            </p>
            <button className="feature-btn">
              Manage Inventory
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>

          <div className="feature-card" onClick={() => setActiveFeature('suggestions')}>
            <div className="feature-icon feature-icon-orange">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <h3 className="feature-title">Recipe Suggestions</h3>
            <p className="feature-description">
              Get AI-powered recipe ideas based on your ingredients and dietary preferences.
            </p>
            <button className="feature-btn">
              Get Recipes
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>

          <div className="feature-card" onClick={() => setActiveFeature('history')}>
            <div className="feature-icon feature-icon-pink">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20v-6M6 20V10M18 20V4"/>
              </svg>
            </div>
            <h3 className="feature-title">Meal History</h3>
            <p className="feature-description">
              View your complete meal history with daily totals and nutrition trends over time.
            </p>
            <button className="feature-btn">
              View History
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="dashboard-footer-content">
          <div className="footer-main">
            <div className="footer-brand-section">
              <h3 className="footer-brand-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="logo-icon">
                  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
                  <path d="M7 2v20"/>
                  <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
                </svg>
                <span className="gradient-text">BiteWise</span>
              </h3>
              <p className="footer-tagline">
                Your smart food and recipe assistant
              </p>
            </div>

            <div className="footer-links-section">
              <div className="footer-link-group">
                <h4 className="footer-link-title">Quick Links</h4>
                <a onClick={() => navigate('/dashboard')} className="footer-link">Dashboard</a>
                <a href="#" className="footer-link">Profile</a>
                <a href="#" className="footer-link">Settings</a>
              </div>

              <div className="footer-link-group">
                <h4 className="footer-link-title">Resources</h4>
                <a href="#" className="footer-link">Help Center</a>
                <a href="#" className="footer-link">Documentation</a>
                <a href="#" className="footer-link">API</a>
              </div>

              <div className="footer-link-group">
                <h4 className="footer-link-title">Legal</h4>
                <a href="#" className="footer-link">Privacy Policy</a>
                <a href="#" className="footer-link">Terms of Service</a>
                <a href="#" className="footer-link">Cookies</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom-section">
            <div className="footer-copyright">
              <p>© {new Date().getFullYear()} BiteWise. All rights reserved.</p>
              <p className="footer-dev">
                Developed with 💚 by <a href="https://github.com/kmilind27" target="_blank" rel="noopener noreferrer">Kumar Milind</a>
              </p>
            </div>
            
            <div className="footer-social-links">
              <a href="https://github.com/kmilind27" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="footer-social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/in/kumar-milind" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="mailto:contact@bitewise.app" aria-label="Email" className="footer-social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
