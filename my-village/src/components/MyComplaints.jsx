import React, { useState, useEffect } from 'react';
import { Search, Filter, Users, Bell, User as UserIcon, LogOut, Home } from 'lucide-react';

export default function MyComplaints({ user, isAdminView = false }) {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Mock data for complaints
  const mockComplaints = [
    {
      id: '1',
      title: 'Broken Street Light',
      description: 'Street light on Main Street is not working for the past 3 days',
      category: 'infrastructure',
      priority: 'medium',
      status: 'pending',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      location: { address: 'Main Street, Village Center' },
      photos: []
    },
    {
      id: '2',
      title: 'Water Supply Issue',
      description: 'No water supply in Block A for the last 2 days',
      category: 'water',
      priority: 'high',
      status: 'in-progress',
      createdAt: '2024-01-14T08:15:00Z',
      updatedAt: '2024-01-16T14:20:00Z',
      location: { address: 'Block A, Residential Area' },
      photos: []
    },
    {
      id: '3',
      title: 'Garbage Collection Problem',
      description: 'Garbage not being collected regularly in Sector 2',
      category: 'public-services',
      priority: 'low',
      status: 'resolved',
      createdAt: '2024-01-10T16:45:00Z',
      updatedAt: '2024-01-12T11:30:00Z',
      location: { address: 'Sector 2, Village' },
      photos: []
    },
    {
      id: '4',
      title: 'Electricity Outage',
      description: 'Complete power outage in the entire village since morning',
      category: 'electricity',
      priority: 'high',
      status: 'resolved',
      createdAt: '2024-01-13T06:00:00Z',
      updatedAt: '2024-01-13T18:00:00Z',
      location: { address: 'Entire Village' },
      photos: []
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setComplaints(mockComplaints);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterComplaints();
  }, [complaints, searchTerm, statusFilter, categoryFilter, priorityFilter]);

  const filterComplaints = () => {
    let filtered = [...complaints];

    if (searchTerm) {
      filtered = filtered.filter(complaint =>
        complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(complaint => complaint.status === statusFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(complaint => complaint.category === categoryFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(complaint => complaint.priority === priorityFilter);
    }

    setFilteredComplaints(filtered);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'infrastructure': return 'Infrastructure';
      case 'water': return 'Water Supply';
      case 'electricity': return 'Electricity';
      case 'public-services': return 'Public Services';
      default: return category;
    }
  };

  if (loading) {
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
                <a href="#" className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition">Submit Complaint</a>
                <a href="#" className="px-4 py-2 rounded-lg font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 transition">My Complaints</a>
              </div>
              {/* Right Side */}
              <div className="flex items-center space-x-4">
                <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
                  <Bell className="w-5 h-5 text-gray-500" />
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

        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

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
              <a href="#" className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition">Submit Complaint</a>
              <a href="#" className="px-4 py-2 rounded-lg font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 transition">My Complaints</a>
            </div>
            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
                <Bell className="w-5 h-5 text-gray-500" />
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

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isAdminView ? 'All Complaints' : 'My Complaints'}
            </h1>
            <p className="text-gray-600 mt-1">
              {isAdminView 
                ? 'Manage and track all village complaints'
                : 'Track the status of your submitted complaints'
              }
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>{filteredComplaints.length} complaints</span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search complaints..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="water">Water Supply</option>
              <option value="electricity">Electricity</option>
              <option value="public-services">Public Services</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
        </div>

        {/* Complaints Grid */}
        {filteredComplaints.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredComplaints.map((complaint) => (
              <div key={complaint.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{complaint.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{complaint.description}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{complaint.location.address}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                      {complaint.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <span className={`font-medium ${getPriorityColor(complaint.priority)}`}>
                      {complaint.priority} Priority
                    </span>
                    <span className="text-gray-500">
                      {getCategoryLabel(complaint.category)}
                    </span>
                  </div>
                  <div className="text-gray-500">
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center">
            <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Complaints Found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all' || priorityFilter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : isAdminView 
                  ? 'No complaints have been submitted yet.'
                  : 'You haven\'t submitted any complaints yet.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 