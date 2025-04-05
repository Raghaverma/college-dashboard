import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Layout from './components/Layout';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import { auth, users } from './services/api';

// Create light theme instance
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

// Create dark theme instance
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

// Google OAuth Callback component
function GoogleCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (!token) {
          console.error('No token received from OAuth callback');
          setError('Authentication failed');
          navigate('/login');
          return;
        }

        // Store the token
        localStorage.setItem('token', token);

        // Verify the token by getting the current user
        const user = await users.getCurrentUser();
        console.log('Successfully authenticated:', user);
        
        // Navigate to home page
        navigate('/', { replace: true });
      } catch (err: any) {
        console.error('Google callback error:', err);
        setError(err.message || 'Authentication failed');
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
      }
    };

    handleCallback();
  }, [location, navigate]);

  if (error) {
    return <div>Authentication failed: {error}</div>;
  }

  return <div>Loading...</div>;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await users.getCurrentUser();
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Auth check error:', error);
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Root path redirects to dashboard if authenticated, login if not */}
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
          
          {/* Login route */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          
          {/* Signup route */}
          <Route
            path="/signup"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Signup onSignup={handleLogin} />
              )
            }
          />
          
          {/* Google OAuth callback route */}
          <Route
            path="/auth/google/callback"
            element={<GoogleCallback />}
          />
          
          {/* Protected dashboard routes */}
          <Route
            path="/dashboard/*"
            element={
              isAuthenticated ? (
                <Layout mode={mode} onThemeToggle={toggleTheme} onLogout={handleLogout}>
                  <Routes>
                    <Route
                      path="/"
                      element={<div>Welcome to College Dashboard</div>}
                    />
                  </Routes>
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          
          {/* Catch all other routes and redirect to login if not authenticated */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
