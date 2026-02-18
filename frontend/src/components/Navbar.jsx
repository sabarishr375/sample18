import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SessionTimer from './SessionTimer';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link to="/dashboard" className="text-xl font-bold">
              Campus Resource Booking
            </Link>
            
            <div className="flex items-center space-x-6">
              <Link to="/dashboard" className="hover:text-blue-200">Dashboard</Link>
              <Link to="/resources" className="hover:text-blue-200">Resources</Link>
              <Link to="/my-bookings" className="hover:text-blue-200">My Bookings</Link>
              {user?.role === 'ADMIN' && (
                <Link to="/admin" className="hover:text-blue-200">Admin Panel</Link>
              )}
              
              <div className="flex items-center space-x-4">
                <span className="text-sm">
                  {user?.name} ({user?.role})
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <SessionTimer />
    </>
  );
};

export default Navbar;
