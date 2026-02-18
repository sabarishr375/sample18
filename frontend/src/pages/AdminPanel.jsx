import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../config/axios';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [pendingBookings, setPendingBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    if (activeTab === 'bookings') {
      fetchPendingBookings();
    } else {
      fetchUsers();
    }
  }, [activeTab]);

  const fetchPendingBookings = async () => {
    try {
      const response = await api.get('/bookings/pending');
      setPendingBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleApprove = async (bookingId) => {
    try {
      await api.put(`/bookings/${bookingId}/approve`);
      fetchPendingBookings();
    } catch (error) {
      alert('Error approving booking');
    }
  };

  const handleRejectClick = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleRejectSubmit = async () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }

    try {
      await api.put(`/bookings/${selectedBooking.id}/reject`, {
        reason: rejectionReason
      });
      setShowModal(false);
      setRejectionReason('');
      setSelectedBooking(null);
      fetchPendingBookings();
    } catch (error) {
      alert('Error rejecting booking');
    }
  };

  const handleUserStatusToggle = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    try {
      await api.put(`/users/${userId}/status`, { status: newStatus });
      fetchUsers();
    } catch (error) {
      alert('Error updating user status');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <div className="flex space-x-3">
            <button
              onClick={() => window.location.href = '/admin/add-resource'}
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
            >
              + Add Resource
            </button>
            <button
              onClick={() => window.location.href = '/admin/create-user'}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              + Create User
            </button>
          </div>
        </div>
        
        <div className="mb-6 flex space-x-4">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-6 py-2 rounded ${activeTab === 'bookings' ? 'bg-blue-600 text-white' : 'bg-white'}`}
          >
            Pending Bookings
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-2 rounded ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'bg-white'}`}
          >
            Users
          </button>
        </div>
        
        {activeTab === 'bookings' ? (
          <div className="space-y-4">
            {pendingBookings.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <p className="text-gray-600">No pending bookings</p>
              </div>
            ) : (
              pendingBookings.map((booking) => (
                <div key={booking.id} className="bg-white p-6 rounded-lg shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{booking.resourceName}</h3>
                      <p className="text-gray-600">User: {booking.userName}</p>
                      <p className="text-gray-600">Date: {booking.bookingDate}</p>
                      <p className="text-gray-600">Time: {booking.startTime} - {booking.endTime}</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApprove(booking.id)}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectClick(booking)}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded text-sm ${
                        user.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleUserStatusToggle(user.id, user.status)}
                        className="text-blue-600 hover:underline"
                      >
                        Toggle Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Reject Booking</h2>
            <p className="mb-4 text-gray-600">
              Please provide a reason for rejecting this booking:
            </p>
            <textarea
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              rows="4"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter rejection reason..."
            />
            <div className="flex space-x-4">
              <button
                onClick={handleRejectSubmit}
                className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
              >
                Confirm Reject
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setRejectionReason('');
                  setSelectedBooking(null);
                }}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
