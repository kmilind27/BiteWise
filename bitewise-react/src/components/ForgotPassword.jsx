import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useTheme } from '../context/ThemeContext';
import { validateEmail } from '../utils/validation';
import { getFirebaseErrorMessage } from '../utils/errorHandler';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const emailErrors = validateEmail(email);
    if (emailErrors.length > 0) {
      setError(emailErrors[0]);
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (err) {
      setError(getFirebaseErrorMessage(err));
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
          <p>Reset your password</p>
        </div>

        {success ? (
          <div className="success-message">
            <div className="success-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h3>Check your email</h3>
            <p>We've sent a password reset link to <strong>{email}</strong></p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Didn't receive the email? Check your spam folder or try again.
            </p>
            <button 
              className="btn btn-outline" 
              onClick={() => navigate('/login')}
              style={{ marginTop: '1.5rem' }}
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Enter your email address and we'll send you a link to reset your password.
            </p>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={error ? 'error' : ''}
                required
              />
              {error && (
                <div className="field-error">{error}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <div className="loader-sm" /> : 'Send Reset Link'}
            </button>

            <button 
              type="button"
              className="btn btn-ghost" 
              onClick={() => navigate('/login')}
              style={{ marginTop: '0.5rem' }}
            >
              Back to Sign In
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
