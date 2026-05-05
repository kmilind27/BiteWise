import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export const Landing = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="landing-page">
      {/* Top Navigation */}
      <nav className="landing-nav">
        <div className="landing-nav-content">
          <div className="landing-logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="logo-icon">
              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
              <path d="M7 2v20"/>
              <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
            </svg>
            <span className="gradient-text">BiteWise</span>
          </div>
          
          <div className="landing-nav-actions">
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
            
            <button className="btn-nav" onClick={() => navigate('/login')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
              Sign In
            </button>
            
            <button className="btn-nav btn-nav-primary" onClick={() => navigate('/signup')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <line x1="19" y1="8" x2="19" y2="14"/>
                <line x1="22" y1="11" x2="16" y2="11"/>
              </svg>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            AI-Powered Food Tracking
          </div>
          
          <h1 className="hero-title">
            Track Your Meals,
            <br />
            <span className="gradient-text">Achieve Your Goals</span>
          </h1>
          
          <p className="hero-description">
            Smart food tracking with AI-powered macro estimation, personalized recipe suggestions, 
            and comprehensive meal history. Your journey to better nutrition starts here.
          </p>

          <div className="hero-buttons">
            <button className="btn btn-primary btn-large" onClick={() => navigate('/signup')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <line x1="19" y1="8" x2="19" y2="14"/>
                <line x1="22" y1="11" x2="16" y2="11"/>
              </svg>
              Start Tracking Now
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-icon">🎯</div>
              <div className="stat-value">AI-Powered</div>
              <div className="stat-label">Macro Estimation</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🥗</div>
              <div className="stat-value">Smart</div>
              <div className="stat-label">Recipe Suggestions</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">📊</div>
              <div className="stat-value">Complete</div>
              <div className="stat-label">Meal Tracking</div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-card card-1">
            <div className="card-icon">🍎</div>
            <div className="card-content">
              <div className="card-title">Breakfast</div>
              <div className="card-value">450 kcal</div>
            </div>
          </div>
          <div className="floating-card card-2">
            <div className="card-icon">🥗</div>
            <div className="card-content">
              <div className="card-title">Lunch</div>
              <div className="card-value">620 kcal</div>
            </div>
          </div>
          <div className="floating-card card-3">
            <div className="card-icon">🍗</div>
            <div className="card-content">
              <div className="card-title">Dinner</div>
              <div className="card-value">580 kcal</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">Everything You Need</h2>
          <p className="section-subtitle">Powerful features to help you achieve your nutrition goals</p>
        </div>

        <div className="features-grid">
          <div className="feature-card" data-aos="fade-up" data-aos-delay="0">
            <div className="feature-icon feature-icon-purple">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </div>
            <h3 className="feature-title">Easy Meal Logging</h3>
            <p className="feature-description">
              Quickly log your meals with our intuitive interface. Add descriptions, photos, and nutritional info in seconds.
            </p>
            <button className="feature-btn" onClick={() => navigate('/signup')}>
              Start Logging
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>

          <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
            <div className="feature-icon feature-icon-cyan">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </div>
            <h3 className="feature-title">AI Macro Estimation</h3>
            <p className="feature-description">
              Let AI estimate calories, protein, carbs, and fats from your meal descriptions. Powered by Google Gemini.
            </p>
            <button className="feature-btn" onClick={() => navigate('/signup')}>
              Try AI Now
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>

          <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
            <div className="feature-icon feature-icon-green">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <h3 className="feature-title">Recipe Suggestions</h3>
            <p className="feature-description">
              Get personalized recipe ideas based on ingredients you have. Never wonder what to cook again.
            </p>
            <button className="feature-btn" onClick={() => navigate('/signup')}>
              Get Recipes
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>

          <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
            <div className="feature-icon feature-icon-orange">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20v-6M6 20V10M18 20V4"/>
              </svg>
            </div>
            <h3 className="feature-title">Track Progress</h3>
            <p className="feature-description">
              View your meal history, daily totals, and nutrition trends. Stay on top of your goals with detailed insights.
            </p>
            <button className="feature-btn" onClick={() => navigate('/signup')}>
              View Dashboard
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>

          <div className="feature-card" data-aos="fade-up" data-aos-delay="400">
            <div className="feature-icon feature-icon-pink">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="22"/>
              </svg>
            </div>
            <h3 className="feature-title">Voice Input</h3>
            <p className="feature-description">
              Use voice commands to log meals hands-free. Perfect for when you're cooking or on the go.
            </p>
            <button className="feature-btn" onClick={() => navigate('/signup')}>
              Try Voice
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>

          <div className="feature-card" data-aos="fade-up" data-aos-delay="500">
            <div className="feature-icon feature-icon-indigo">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            </div>
            <h3 className="feature-title">Dark Mode</h3>
            <p className="feature-description">
              Easy on the eyes with beautiful dark mode. Switch themes anytime to match your preference.
            </p>
            <button className="feature-btn" onClick={toggleTheme}>
              Toggle Theme
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Start Your Journey?</h2>
          <p className="cta-description">
            Join thousands of users tracking their nutrition and achieving their health goals with BiteWise.
          </p>
          <div className="cta-buttons">
            <button className="btn btn-primary btn-large" onClick={() => navigate('/signup')}>
              Create Free Account
            </button>
            <button className="btn btn-ghost btn-large" onClick={() => navigate('/login')}>
              Already have an account?
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-grid">
            {/* Brand Section */}
            <div className="footer-section">
              <h3 className="footer-brand">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="logo-icon">
                  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
                  <path d="M7 2v20"/>
                  <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
                </svg>
                <span className="gradient-text">BiteWise</span>
              </h3>
              <p className="footer-tagline">
                Smart food tracking with AI-powered features. Your journey to better nutrition starts here.
              </p>
              <div className="footer-social">
                <a href="https://github.com/kmilind27" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/kumar-milind" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="mailto:contact@bitewise.app" aria-label="Email">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div className="footer-section">
              <h4 className="footer-title">Product</h4>
              <ul className="footer-links">
                <li><a href="#features">Features</a></li>
                <li><a onClick={() => navigate('/signup')}>Get Started</a></li>
                <li><a onClick={() => navigate('/login')}>Sign In</a></li>
                <li><a href="#pricing">Pricing</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="footer-section">
              <h4 className="footer-title">Resources</h4>
              <ul className="footer-links">
                <li><a href="#documentation">Documentation</a></li>
                <li><a href="#api">API Reference</a></li>
                <li><a href="#support">Support</a></li>
                <li><a href="#blog">Blog</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="footer-section">
              <h4 className="footer-title">Legal</h4>
              <ul className="footer-links">
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#cookies">Cookie Policy</a></li>
                <li><a href="#license">License</a></li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-copyright">
              <p>© {new Date().getFullYear()} BiteWise. All rights reserved.</p>
              <p className="footer-dev">
                Developed with 💜 by <a href="https://github.com/kmilind27" target="_blank" rel="noopener noreferrer">Kumar Milind</a>
              </p>
            </div>
            <div className="footer-badges">
              <span className="footer-badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                Secure
              </span>
              <span className="footer-badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Verified
              </span>
              <span className="footer-badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                </svg>
                AI-Powered
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
