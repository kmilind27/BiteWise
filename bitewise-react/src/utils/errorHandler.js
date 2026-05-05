export const getFirebaseErrorMessage = (error) => {
  const errorCode = error.code;
  
  switch (errorCode) {
    // Auth errors
    case 'auth/email-already-in-use':
      return 'This email is already registered. Please sign in instead.';
    
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    
    case 'auth/operation-not-allowed':
      return 'Email/password sign-in is not enabled. Please contact support.';
    
    case 'auth/weak-password':
      return 'Password is too weak. Please use a stronger password.';
    
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    
    case 'auth/user-not-found':
      return 'No account found with this email. Please sign up first.';
    
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please check your credentials.';
    
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed. Please try again.';
    
    case 'auth/requires-recent-login':
      return 'Please sign in again to continue.';
    
    // Firestore errors
    case 'permission-denied':
      return 'You do not have permission to perform this action.';
    
    case 'unavailable':
      return 'Service temporarily unavailable. Please try again.';
    
    case 'not-found':
      return 'The requested data was not found.';
    
    case 'already-exists':
      return 'This data already exists.';
    
    case 'resource-exhausted':
      return 'Too many requests. Please try again later.';
    
    case 'cancelled':
      return 'Operation was cancelled.';
    
    case 'data-loss':
      return 'Data loss occurred. Please contact support.';
    
    case 'unauthenticated':
      return 'Please sign in to continue.';
    
    case 'invalid-argument':
      return 'Invalid data provided. Please check your input.';
    
    case 'deadline-exceeded':
      return 'Request timeout. Please try again.';
    
    case 'failed-precondition':
      return 'Operation cannot be performed in the current state.';
    
    case 'aborted':
      return 'Operation was aborted. Please try again.';
    
    case 'out-of-range':
      return 'Value is out of valid range.';
    
    case 'unimplemented':
      return 'This feature is not yet implemented.';
    
    case 'internal':
      return 'Internal error occurred. Please try again.';
    
    default:
      return error.message || 'An unexpected error occurred. Please try again.';
  }
};
