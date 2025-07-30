import React, { useState } from 'react';
import { Upload, MapPin, AlertCircle, Camera, Bell, User as UserIcon, LogOut, Home } from 'lucide-react';

export default function ComplaintForm({ onSubmit, userId, loading, user }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'infrastructure',
    priority: 'medium',
    location: {
      lat: 28.6139,
      lng: 77.2090,
      address: ''
    }
  });
  const [photos, setPhotos] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await onSubmit({
      ...formData,
      userId,
      status: 'pending',
      photos
    });

    // Reset form
    setFormData({
      title: '',
      description: '',
      category: 'infrastructure',
      priority: 'medium',
      location: {
        lat: 28.6139,
        lng: 77.2090,
        address: ''
      }
    });
    setPhotos([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'address') {
      setFormData(prev => ({
        ...prev,
        location: { ...prev.location, address: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setPhotos(prev => [...prev, event.target.result]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            location: {
              ...prev.location,
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const categoryOptions = [
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'water', label: 'Water Supply' },
    { value: 'electricity', label: 'Electricity' },
    { value: 'public-services', label: 'Public Services' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low', color: 'text-green-600' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
    { value: 'high', label: 'High', color: 'text-red-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                <Home className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="font-bold text-xl text-gray-900 leading-tight">Village Portal</div>
                <div className="text-xs text-gray-500 leading-none">Complaint Management System</div>
              </div>
            </div>
            {/* Navigation Links */}
            <div className="hidden md:flex space-x-12 ml-10">
              <a href="#" className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition">Dashboard</a>
              <a href="#" className="px-4 py-2 rounded-lg font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 transition">Submit Complaint</a>
              <a href="#" className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition">My Complaints</a>
            </div>
            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
                <Bell className="w-5 h-5 text-gray-500" />
                {/* Notification dot */}
                <span className="absolute top-1 right-1 block w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-lg">
                <UserIcon className="w-6 h-6 text-gray-500" />
                <div className="text-right">
                  <div className="font-semibold text-gray-900 text-sm leading-tight">{user?.name || 'User'}</div>
                  <div className="text-xs text-gray-500 leading-none">User</div>
                </div>
              </div>
              <button className="p-2 rounded-full hover:bg-gray-100 transition">
                <LogOut className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Form Content */}
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Submit New Complaint</h2>
            <p className="text-gray-600">Describe your issue and we'll work to resolve it promptly.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Complaint Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of the issue"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  {categoryOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                  Priority *
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  {priorityOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Provide detailed information about the issue..."
                required
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Location Address
              </label>
              <div className="flex space-x-2">
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.location.address}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter location address"
                />
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="px-4 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  title="Get current location"
                >
                  <MapPin className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Photos (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Click to upload photos</p>
                  <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                </label>
              </div>
              
              {photos.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={photo}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setPhotos(prev => prev.filter((_, i) => i !== index))}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-start space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Important Information:</p>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>You will receive email/SMS updates on your complaint status</li>
                  <li>Please provide accurate location and contact information</li>
                  <li>High priority complaints will be reviewed within 24 hours</li>
                </ul>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Submitting Complaint...' : 'Submit Complaint'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 