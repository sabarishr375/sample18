import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import api from '../config/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const logoutTimerRef = useRef(null);
  const lastActivityRef = useRef(Date.now());

  // Auto-logout timeout in milliseconds
  const STUDENT_TIMEOUT = 10 * 60 * 1000; // 10 minutes for students
  const STAFF_TIMEOUT = 20 * 60 * 1000; // 20 minutes for staff
  const ADMIN_TIMEOUT = 60 * 60 * 1000; // 60 minutes (1 hour)

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      startAutoLogoutTimer(userData.role);
    }
    setLoading(false);
  }, []);

  const startAutoLogoutTimer = (role) => {
    // Clear any existing timer
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
    }

    // Apply different timeouts based on role
    let timeout;
    if (role === 'STUDENT') {
      timeout = STUDENT_TIMEOUT;
    } else if (role === 'STAFF') {
      timeout = STAFF_TIMEOUT;
    } else {
      return; // No timeout for ADMIN
    }
    
    logoutTimerRef.current = setTimeout(() => {
      logout(true); // true indicates auto-logout
    }, timeout);
  };

  const resetAutoLogoutTimer = () => {
    if (user && (user.role === 'STUDENT' || user.role === 'STAFF')) {
      lastActivityRef.current = Date.now();
      startAutoLogoutTimer(user.role);
    }
  };

  // Track user activity
  useEffect(() => {
    if (!user) return;

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    
    const handleActivity = () => {
      resetAutoLogoutTimer();
    };

    // Add event listeners for user activity
    events.forEach(event => {
      document.addEventListener(event, handleActivity);
    });

    return () => {
      // Cleanup event listeners
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
      
      // Clear timer on unmount
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
      }
    };
  }, [user]);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { token, ...userData } = response.data;
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    
    // Start auto-logout timer for students and staff
    startAutoLogoutTimer(userData.role);
    
    return userData;
  };

  const register = async (data) => {
    // This function is kept for compatibility but should not be used
    // All user creation should go through admin panel
    throw new Error('Public registration is disabled. Contact administrator to create an account.');
  };

  const logout = (isAutoLogout = false) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    
    // Clear the timer
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
    }
    
    // Show alert if it's an auto-logout
    if (isAutoLogout) {
      alert('Your session has expired due to inactivity. Please login again.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
