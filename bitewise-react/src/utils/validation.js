export const validateEmail = (email) => {
  const errors = [];
  
  if (!email) {
    errors.push('Email is required');
    return errors;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push('Please enter a valid email address');
  }

  if (email.length > 254) {
    errors.push('Email is too long');
  }

  return errors;
};

export const validatePassword = (password) => {
  const errors = [];
  
  if (!password) {
    errors.push('Password is required');
    return errors;
  }

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }

  if (password.length > 128) {
    errors.push('Password is too long (max 128 characters)');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return errors;
};

export const validateName = (name) => {
  const errors = [];
  
  if (!name || !name.trim()) {
    errors.push('Name is required');
    return errors;
  }

  if (name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  if (name.trim().length > 50) {
    errors.push('Name is too long (max 50 characters)');
  }

  if (!/^[a-zA-Z\s'-]+$/.test(name.trim())) {
    errors.push('Name can only contain letters, spaces, hyphens, and apostrophes');
  }

  return errors;
};

export const getPasswordStrength = (password) => {
  if (!password) return { strength: 0, label: '', color: '' };

  let strength = 0;
  
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

  if (strength <= 2) {
    return { strength: 1, label: 'Weak', color: 'var(--error)' };
  } else if (strength <= 4) {
    return { strength: 2, label: 'Fair', color: 'var(--warning)' };
  } else if (strength <= 5) {
    return { strength: 3, label: 'Good', color: 'var(--secondary)' };
  } else {
    return { strength: 4, label: 'Strong', color: 'var(--success)' };
  }
};
