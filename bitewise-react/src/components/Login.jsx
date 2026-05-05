import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { validateEmail } from '../utils/validation';
import { getFirebaseErrorMessage } from '../utils/errorHandler';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { showError } = useToast();
  const navigate = useNavigate();

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validateField(field);
  };

  const validateField = (field) => {
    const newErrors = { ...errors };

    if (field === 'email') {
      const emailErrors = validateEmail(email);
      if (emailErrors.length > 0) {
        newErrors.email = emailErrors[0];
      } else {
        delete newErrors.email;
      }
    }

    if (field === 'password') {
      if (!password) {
        newErrors.password = 'Password is required';
      } else {
        delete newErrors.password;
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({ email: true, password: true });

    const emailErrors = validateEmail(email);
    const allErrors = {};

    if (emailErrors.length > 0) allErrors.email = emailErrors[0];
    if (!password) allErrors.password = 'Password is required';

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      showError(getFirebaseErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <button 
        className="theme-toggle" 
        onClick={toggleTheme} 
        style={{ position: 'absolute', top: '2rem', right: '2rem' }}
        aria-label="Toggle theme"
      >
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

      <div className="auth-card">
        <div className="auth-header">
          <h1>BiteWise</h1>
          <p>Welcome back! Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur('email')}
              className={touched.email && errors.email ? 'error' : ''}
              required
            />
            {touched.email && errors.email && (
              <div className="field-error">{errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur('password')}
                className={touched.password && errors.password ? 'error' : ''}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
            {touched.password && errors.password && (
              <div className="field-error">{errors.password}</div>
            )}
            <div className="forgot-password-link">
              <a 
                href="/forgot-password"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/forgot-password');
                }}
              >
                Forgot password?
              </a>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? <div className="loader-sm" /> : 'Sign In'}
          </button>
        </form>

        <div className="auth-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  );
};
