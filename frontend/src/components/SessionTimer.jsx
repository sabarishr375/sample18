import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const SessionTimer = () => {
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (!user || user.role === 'ADMIN') {
      return; // Don't show timer for admin
    }

    // Different timeouts for different roles
    const STUDENT_TIMEOUT = 10 * 60 * 1000; // 10 minutes for students
    const STAFF_TIMEOUT = 20 * 60 * 1000; // 20 minutes for staff
    const WARNING_TIME = 2 * 60 * 1000; // Show warning at 2 minutes
    
    const TIMEOUT = user.role === 'STUDENT' ? STUDENT_TIMEOUT : STAFF_TIMEOUT;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = TIMEOUT - elapsed;

      if (remaining <= 0) {
        setTimeLeft(0);
        clearInterval(interval);
      } else {
        setTimeLeft(remaining);
        
        // Show warning when 2 minutes or less remaining
        if (remaining <= WARNING_TIME && !showWarning) {
          setShowWarning(true);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [user]);

  if (!user || user.role === 'ADMIN' || timeLeft === null) {
    return null;
  }

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  return (
    <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg ${
      showWarning ? 'bg-red-500 text-white animate-pulse' : 'bg-blue-500 text-white'
    }`}>
      <div className="flex items-center space-x-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <span className="font-semibold">
            {user.role === 'STUDENT' ? 'Student' : 'Staff'} Session: {minutes}:{seconds.toString().padStart(2, '0')}
          </span>
          {showWarning && (
            <p className="text-xs mt-1">Session expiring soon!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionTimer;
