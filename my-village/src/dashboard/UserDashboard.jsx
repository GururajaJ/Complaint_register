import React, { useState } from 'react';
import { BarChart3, FileText, Clock, CheckCircle, AlertTriangle, Bell, User as UserIcon, LogOut, Home } from 'lucide-react';

export default function UserDashboard({ user }) {
  // Mock complaints data
  const [complaints] = useState([
    {
      id: 1,
      title: 'fr',
      category: 'Water',
      status: 'resolved',
      createdAt: '2025-07-28T10:00:00Z',
    },
    {
      id: 2,
      title: 'Water Supply Issues',
      category: 'Water',
      status: 'pending',
      createdAt: '2025-07-26T12:00:00Z',
    },
    {
      id: 3,
      title: 'Street Light Not Working',
      category: 'Electricity',
      status: 'in progress',
      createdAt: '2025-07-25T09:00:00Z',
    },
  ]);

  const stats = {
    total: complaints.length,
    pending: complaints.filter(c => c.status === 'pending').length,
    inProgress: complaints.filter(c => c.status === 'in progress').length,
    resolved: complaints.filter(c => c.status === 'resolved').length
  };

  const recentComplaints = complaints.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className=" px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo and Title */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                <Home className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="font-bold text-xl text-gray-900 leading-tight">Village Portal</div>
                <div className="text-xs text-gray-500 leading-none">Complaint Management System</div>
              </div>
            </div>
            {/* Navigation Links */}
            <div className="hidden md:flex space-x-2 ml-10">
              <a href="#" className="px-4 py-2 rounded-lg font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 transition">Dashboard</a>
              <a href="#" className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition">Submit Complaint</a>
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
                  <div className="font-semibold text-gray-900 text-sm leading-tight">{user.name}</div>
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

      {/* Dashboard Content */}
      <div className="max-w-8xl mx-auto space-y-8 p-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 mt-4">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">Here's an overview of your complaints and their status.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Complaints</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {recentComplaints.length > 0 && (
          <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Complaints</h2>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {recentComplaints.map((complaint) => (
                <div key={complaint.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{complaint.title}</h3>
                    <p className="text-sm text-gray-600 capitalize">{complaint.category.replace('-', ' ')}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      complaint.status === 'resolved' ? 'bg-green-100 text-green-800' :
                      complaint.status === 'in progress' ? 'bg-blue-100 text-blue-800' :
                      complaint.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {complaint.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {complaints.length === 0 && (
          <div className="bg-white rounded-xl shadow border border-gray-200 p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Complaints Yet</h3>
            <p className="text-gray-600 mb-6">
              You haven't submitted any complaints yet. Click "Submit Complaint" to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 