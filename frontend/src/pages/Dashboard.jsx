import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user?.name}!</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/resources" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Browse Resources</h3>
            <p className="text-gray-600">View and book available labs, halls, and classrooms</p>
          </Link>
          
          <Link to="/my-bookings" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">My Bookings</h3>
            <p className="text-gray-600">View your booking history and status</p>
          </Link>
          
          {user?.role === 'ADMIN' && (
            <Link to="/admin" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Admin Panel</h3>
              <p className="text-gray-600">Manage bookings and users</p>
            </Link>
          )}
        </div>
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">8</p>
              <p className="text-gray-600">Labs</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">4</p>
              <p className="text-gray-600">Event Halls</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">10</p>
              <p className="text-gray-600">Smart Classrooms</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
