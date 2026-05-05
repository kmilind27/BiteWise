import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Landing } from './components/Landing';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { ForgotPassword } from './components/ForgotPassword';
import { Dashboard } from './components/Dashboard';
import { useAuth } from './hooks/useAuth';
import './styles/global.css';

function App() {
  const basename = import.meta.env.PROD ? '/BiteWise' : '';
  
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter basename={basename}>
          <AppRoutes />
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}

function AppRoutes() {
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

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Landing />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <Signup />} />
      <Route path="/forgot-password" element={user ? <Navigate to="/dashboard" /> : <ForgotPassword />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
