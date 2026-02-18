import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const location = useLocation();
  const isAdminLogin = location.pathname === '/admin-login';
  
  const [selectedRole, setSelectedRole] = useState('STUDENT');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length === 0) {
      setPasswordError('');
      return true;
    }
    
    const minLength = password.length >= 8;
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[@$!%*#?&+\-_=]/.test(password);
    
    if (!minLength || !hasLetter || !hasNumber || !hasSpecial) {
      const errors = [];
      if (!minLength) errors.push('At least 8 characters');
      if (!hasLetter) errors.push('One letter');
      if (!hasNumber) errors.push('One number');
      if (!hasSpecial) errors.push('One special character (@$!%*#?&+-_=)');
      
      setPasswordError('Missing: ' + errors.join(', '));
      return false;
    } else {
      setPasswordError('');
      return true;
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
    
    try {
      const userData = await login(formData.email, formData.password);
      
      // Validate role based on login type
      if (isAdminLogin && userData.role !== 'ADMIN') {
        setError('Access denied. Admin credentials required.');
        return;
      }
      
      if (!isAdminLogin && userData.role === 'ADMIN') {
        setError('Please use the Admin Login link below.');
        return;
      }
      
      // For student/staff login, validate selected role matches
      if (!isAdminLogin && userData.role !== selectedRole) {
        setError(`You selected ${selectedRole} but your account is ${userData.role}. Please select the correct role.`);
        return;
      }
      
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {isAdminLogin ? 'Admin Access' : 'Welcome Back'}
          </h1>
          <p className="text-gray-500 text-lg">
            {isAdminLogin ? 'Administrator Login Portal' : 'Sign in to Campus Resource Management'}
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Role Selection - Only for Student/Staff Login */}
          {!isAdminLogin && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Select Your Role</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Student Button */}
                <button
                  type="button"
                  onClick={() => setSelectedRole('STUDENT')}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    selectedRole === 'STUDENT'
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-blue-300'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-4xl mb-2">🎓</span>
                    <span className="font-semibold text-lg">Student</span>
                  </div>
                </button>

                {/* Staff Button */}
                <button
                  type="button"
                  onClick={() => setSelectedRole('STAFF')}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    selectedRole === 'STAFF'
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-blue-300'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-4xl mb-2">👨‍🏫</span>
                    <span className="font-semibold text-lg">Staff</span>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Email Address */}
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                passwordError
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
              }`}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handlePasswordChange}
              required
            />
            {passwordError && (
              <div className="mt-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded p-2">
                <p>{passwordError}</p>
              </div>
            )}
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold text-white text-lg transition-colors ${
              isAdminLogin
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-2">
            Don't have an account? Contact your administrator.
          </p>
          {!isAdminLogin ? (
            <Link
              to="/admin-login"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Admin Login
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              ← Back to Student/Staff Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
