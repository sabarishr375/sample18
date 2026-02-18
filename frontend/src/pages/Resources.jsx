import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../config/axios';

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await api.get('/resources');
      setResources(response.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredResources = filter === 'ALL' 
    ? resources 
    : resources.filter(r => r.type === filter);

  const getTypeColor = (type) => {
    switch (type) {
      case 'LAB': return 'bg-blue-100 text-blue-800';
      case 'EVENT_HALL': return 'bg-green-100 text-green-800';
      case 'SMART_CLASSROOM': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Available Resources</h1>
        
        <div className="mb-6 flex space-x-4">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-4 py-2 rounded ${filter === 'ALL' ? 'bg-blue-600 text-white' : 'bg-white'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('LAB')}
            className={`px-4 py-2 rounded ${filter === 'LAB' ? 'bg-blue-600 text-white' : 'bg-white'}`}
          >
            Labs
          </button>
          <button
            onClick={() => setFilter('EVENT_HALL')}
            className={`px-4 py-2 rounded ${filter === 'EVENT_HALL' ? 'bg-blue-600 text-white' : 'bg-white'}`}
          >
            Event Halls
          </button>
          <button
            onClick={() => setFilter('SMART_CLASSROOM')}
            className={`px-4 py-2 rounded ${filter === 'SMART_CLASSROOM' ? 'bg-blue-600 text-white' : 'bg-white'}`}
          >
            Smart Classrooms
          </button>
        </div>
        
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{resource.name}</h3>
                  <span className={`px-3 py-1 rounded text-sm ${getTypeColor(resource.type)}`}>
                    {resource.type.replace('_', ' ')}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">Capacity: {resource.capacity}</p>
                
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded text-sm ${
                    resource.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {resource.status}
                  </span>
                  
                  {resource.status === 'ACTIVE' && (
                    <button
                      onClick={() => navigate(`/book/${resource.id}`)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Book Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;
