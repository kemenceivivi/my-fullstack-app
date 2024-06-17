import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import RegistrationPage from "./pages/RegistrationPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { verifySession } from './services/authService';
import Header from './components/Header';
import LoginPage from "./pages/LoginPage";
import {ReactNode, useEffect, useState} from "react";

const App = () => {
  return (
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
  );
};

const AppRoutes = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await verifySession();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [setIsAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <Router>
        <Header />
        <Routes>
          <Route path="/register" element={
            <ProtectedRoute type="guest">
              <RegistrationPage />
            </ProtectedRoute>
          } />
          <Route path="/login" element={
            <ProtectedRoute type="guest">
              <LoginPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute type="private">
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/" element={<Navigate replace to="/dashboard" />} />
        </Routes>
      </Router>
  );
};

const ProtectedRoute = ({ children, type }: { children:ReactNode, type: "private" | "guest" }) => {
  const { isAuthenticated } = useAuth();

  if (type === "private" && !isAuthenticated) {
    return <Navigate replace to="/login" />;
  } else if (type === "guest" && isAuthenticated) {
    return <Navigate replace to="/dashboard" />;
  }

  return <>{children}</>;
};

export default App;
