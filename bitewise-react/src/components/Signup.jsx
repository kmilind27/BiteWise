import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { db, APP_ID } from '../config/firebase';
import { validateEmail, validatePassword, validateName, getPasswordStrength } from '../utils/validation';
import { getFirebaseErrorMessage } from '../utils/errorHandler';

export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { showError, showSuccess } = useToast();
  const navigate = useNavigate();

  const passwordStrength = getPasswordStrength(password);

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validateField(field);
  };

  const validateField = (field) => {
    const newErrors = { ...errors };

    switch (field) {
      case 'name':
        const nameErrors = validateName(name);
        if (nameErrors.length > 0) {
          newErrors.name = nameErrors[0];
        } else {
          delete newErrors.name;
        }
        break;

      case 'email':
        const emailErrors = validateEmail(email);
        if (emailErrors.length > 0) {
          newErrors.email = emailErrors[0];
        } else {
          delete newErrors.email;
        }
        break;

      case 'password':
        const passwordErrors = validatePassword(password);
        if (passwordErrors.length > 0) {
          newErrors.password = passwordErrors;
        } else {
          delete newErrors.password;
        }
        break;

      case 'confirmPassword':
        if (password !== confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        } else {
          delete newErrors.confirmPassword;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({ name: true, email: true, password: true, confirmPassword: true });

    const nameErrors = validateName(name);
    const emailErrors = validateEmail(email);
    const passwordErrors = validatePassword(password);
    const allErrors = {};

    if (nameErrors.length > 0) allErrors.name = nameErrors[0];
    if (emailErrors.length > 0) allErrors.email = emailErrors[0];
    if (passwordErrors.length > 0) allErrors.password = passwordErrors;
    if (password !== confirmPassword) allErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signup(email, password);
      const userId = userCredential.user.uid;

      await setDoc(doc(db, 'artifacts', APP_ID, 'users', userId, 'profile', 'info'), {
        name: name.trim(),
        email: email,
        createdAt: new Date().toISOString()
      });

      showSuccess('Account created successfully! Welcome to BiteWise.');
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
          <p>Create your account to get started</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => handleBlur('name')}
              className={touched.name && errors.name ? 'error' : ''}
              required
            />
            {touched.name && errors.name && (
              <div className="field-error">{errors.name}</div>
            )}
          </div>

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
            {password && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div 
                    className="strength-fill" 
                    style={{ 
                      width: `${(passwordStrength.strength / 4) * 100}%`,
                      backgroundColor: passwordStrength.color
                    }}
                  />
                </div>
                <span style={{ color: passwordStrength.color, fontSize: '0.8rem', fontWeight: 500 }}>
                  {passwordStrength.label}
                </span>
              </div>
            )}
            {touched.password && errors.password && (
              <div className="field-error-list">
                {errors.password.map((err, idx) => (
                  <div key={idx} className="field-error">• {err}</div>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirm-password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => handleBlur('confirmPassword')}
                className={touched.confirmPassword && errors.confirmPassword ? 'error' : ''}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? (
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
            {touched.confirmPassword && errors.confirmPassword && (
              <div className="field-error">{errors.confirmPassword}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? <div className="loader-sm" /> : 'Create Account'}
          </button>
        </form>

        <div className="auth-link">
          Already have an account? <a href="/login">Sign in</a>
        </div>
      </div>
    </div>
  );
};
