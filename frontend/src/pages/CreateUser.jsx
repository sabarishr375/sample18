import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../config/axios';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'STUDENT'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length === 0) {
      setPasswordError('');
      return;
    }
    
    const minLength = password.length >= 8;
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[@$!%*#?&+\-_=]/.test(password);
    
    if (!minLength || !hasLetter || !hasNumber || !hasSpecial) {
      const errors = [];
      if (!minLength) errors.push('At least 8 characters long');
      if (!hasLetter) errors.push('At least one letter (A-Z or a-z)');
      if (!hasNumber) errors.push('At least one number (0-9)');
      if (!hasSpecial) errors.push('At least one special character (@$!%*#?&+-_=)');
      
      setPasswordError(errors.join(', '));
    } else {
      setPasswordError('');
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setFormData({ ...formData, password: newPassword });
    validatePassword(newPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (passwordError) {
      setError('Please fix password errors before submitting');
      return;
    }

    try {
      await api.post('/users/create', formData);
      setSuccess(`${formData.role} account created successfully!`);
      setFormData({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: 'STUDENT'
      });
      
      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create user');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow">
            <h1 className="text-3xl font-bold mb-6">Create User Account</h1>
            
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-6 text-sm">
              <p className="font-semibold">Admin Only</p>
              <p>Use this form to create Student, Staff, or Admin accounts. All users must be created by an administrator.</p>
            </div>

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

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Role</label>
                <select
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                >
                  <option value="STUDENT">Student</option>
                  <option value="STAFF">Staff</option>
                  <option value="ADMIN">Admin</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Select the role for this user</p>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                    passwordError ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                  }`}
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handlePasswordChange}
                  required
                />
                {passwordError && (
                  <div className="mt-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded p-2">
                    <p className="font-semibold mb-1">Password must have:</p>
                    <p>{passwordError}</p>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  disabled={!!passwordError}
                >
                  Create {formData.role} Account
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/admin')}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
