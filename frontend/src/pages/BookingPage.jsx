import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import api from '../config/axios';

const BookingPage = () => {
  const { resourceId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [resource, setResource] = useState(null);
  const [formData, setFormData] = useState({
    bookingDate: '',
    startTime: '',
    endTime: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [availability, setAvailability] = useState(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);

  useEffect(() => {
    fetchResource();
  }, [resourceId]);

  const fetchResource = async () => {
    try {
      const response = await api.get('/resources');
      const found = response.data.find(r => r.id === resourceId);
      setResource(found);
    } catch (error) {
      console.error('Error fetching resource:', error);
    }
  };
  
  const checkAvailability = async () => {
    if (!formData.bookingDate || !formData.startTime || !formData.endTime) {
      return;
    }
    
    setCheckingAvailability(true);
    try {
      const response = await api.get('/bookings/check-availability', {
        params: {
          resourceId,
          date: formData.bookingDate,
          startTime: formData.startTime,
          endTime: formData.endTime
        }
      });
      setAvailability(response.data.available);
    } catch (error) {
      console.error('Error checking availability:', error);
    } finally {
      setCheckingAvailability(false);
    }
  };
  
  const validateTimeSlot = () => {
    if (!formData.startTime || !formData.endTime) {
      return null;
    }
    
    const start = new Date(`2000-01-01T${formData.startTime}`);
    const end = new Date(`2000-01-01T${formData.endTime}`);
    const durationHours = (end - start) / (1000 * 60 * 60);
    
    if (durationHours <= 0) {
      return 'End time must be after start time';
    }
    
    if (user?.role === 'STUDENT' && durationHours > 1) {
      return 'Students can only book for maximum 1 hour';
    }
    
    if (user?.role === 'STAFF' && durationHours > 3) {
      return 'Staff can only book for maximum 3 hours';
    }
    
    return null;
  };
  
  useEffect(() => {
    if (formData.bookingDate && formData.startTime && formData.endTime) {
      checkAvailability();
    }
  }, [formData.bookingDate, formData.startTime, formData.endTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    const timeError = validateTimeSlot();
    if (timeError) {
      setError(timeError);
      return;
    }
    
    if (availability === false) {
      setError('This time slot is not available. Please choose another time.');
      return;
    }

    try {
      await api.post('/bookings', {
        resourceId,
        ...formData
      });
      setSuccess('Booking request submitted successfully! Waiting for admin approval.');
      setTimeout(() => navigate('/my-bookings'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    }
  };

  if (!resource) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-6">Book {resource.name}</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}
          
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
            <h3 className="font-semibold text-blue-800 mb-2">Booking Duration Limits:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Students: Maximum 1 hour per booking</li>
              <li>• Staff: Maximum 3 hours per booking</li>
              <li>• Weekly Limits: Students (3 bookings), Staff (5 bookings)</li>
            </ul>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Booking Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.bookingDate}
                onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Start Time</label>
              <input
                type="time"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">End Time</label>
              <input
                type="time"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                required
              />
              {validateTimeSlot() && (
                <p className="text-red-600 text-sm mt-1">{validateTimeSlot()}</p>
              )}
            </div>
            
            {checkingAvailability && (
              <div className="mb-4 p-3 bg-gray-100 rounded text-center">
                Checking availability...
              </div>
            )}
            
            {availability !== null && !checkingAvailability && (
              <div className={`mb-4 p-3 rounded ${availability ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {availability ? '✓ Time slot is available' : '✗ Time slot is not available'}
              </div>
            )}
            
            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Submit Booking
              </button>
              <button
                type="button"
                onClick={() => navigate('/resources')}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
