// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // DEV MODE Configuration
  const DEV_MODE = import.meta.env.VITE_DEV_MODE === 'true';
  const DEFAULT_DEV_ROLE = 'student'; // Change this manually to test different roles: 'student', 'club', 'admin'

  useEffect(() => {
    if (DEV_MODE) {
      // DEV MODE: Auto-login with specified role
      console.warn('🔧 DEV MODE: Using mock authentication');
      const mockUser = {
        id: 'dev-123',
        name: 'Dev User',
        email: 'dev@kec.edu',
        role: DEFAULT_DEV_ROLE,
        avatar: null,
        createdAt: new Date().toISOString(),
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      setLoading(false);
      return;
    }

    // Production behavior
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken();
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async () => {
    try {
      // In production, this would verify with backend
      const token = localStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    if (DEV_MODE) {
      // DEV MODE: Auto login with role detection from email
      const role = email.includes('club') ? 'club' : email.includes('admin') ? 'admin' : 'student';
      const mockUser = {
        id: 'dev-' + Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email: email,
        role: role,
        avatar: null,
        createdAt: new Date().toISOString(),
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      return { success: true, user: mockUser };
    }

    // Production login logic would go here
    try {
      // Simulate API call
      return { success: true, user: { email, role: 'student' } };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const signup = async (userData) => {
    if (DEV_MODE) {
      // DEV MODE: Auto signup
      const mockUser = {
        id: 'dev-' + Math.random().toString(36).substr(2, 9),
        name: userData.name,
        email: userData.email,
        role: userData.role || 'student',
        avatar: null,
        createdAt: new Date().toISOString(),
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      return { success: true, user: mockUser };
    }

    // Production signup logic would go here
    return { success: true, user: userData };
  };

  const logout = () => {
    if (!DEV_MODE) {
      localStorage.removeItem('token');
    }
    setUser(null);
    setIsAuthenticated(false);
  };

  // DEV MODE: Method to switch roles easily
  const switchRole = (newRole) => {
    if (DEV_MODE && user) {
      const updatedUser = {
        ...user,
        role: newRole
      };
      setUser(updatedUser);
      console.log(`🔧 DEV MODE: Switched to ${newRole} role`);
    }
  };

  const value = {
    // State
    user,
    isAuthenticated,
    loading,
    
    // Actions
    login,
    signup,
    logout,
    
    // DEV MODE Features
    devMode: DEV_MODE,
    switchRole,
    
    // Utility methods
    hasRole: (role) => user?.role === role,
    isStudent: () => user?.role === 'student',
    isClub: () => user?.role === 'club',
    isAdmin: () => user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};