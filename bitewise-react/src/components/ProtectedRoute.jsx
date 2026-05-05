import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="app-wrapper">
        <div className="loader-wrap visible">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};
