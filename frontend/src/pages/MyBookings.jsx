import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../config/axios';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/bookings/my');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'APPROVED': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
        
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : bookings.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-600">No bookings found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{booking.resourceName}</h3>
                    <p className="text-gray-600">Date: {booking.bookingDate}</p>
                    <p className="text-gray-600">Time: {booking.startTime} - {booking.endTime}</p>
                    <p className="text-gray-600 text-sm mt-2">
                      Booked on: {new Date(booking.createdAt).toLocaleString()}
                    </p>
                    {booking.rejectionReason && (
                      <p className="text-red-600 mt-2">
                        Reason: {booking.rejectionReason}
                      </p>
                    )}
                  </div>
                  
                  <span className={`px-4 py-2 rounded ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
