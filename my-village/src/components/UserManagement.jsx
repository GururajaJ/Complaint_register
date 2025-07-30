import React, { useState } from 'react';
import { Shield, Bell, User as UserIcon, LogOut, Eye } from 'lucide-react';

export default function UserManagement() {
  // Mock admin for navbar
  const admin = { name: 'Admin User' };

  // Mock users data
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', complaints: 3 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active', complaints: 2 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'active', complaints: 1 },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', status: 'inactive', complaints: 0 },
    { id: 5, name: 'David Brown', email: 'david@example.com', status: 'active', complaints: 2 }
  ]);

  // Handler to change user status
  const handleStatusChange = (id, newStatus) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === id ? { ...user, status: newStatus } : user
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navbar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo and Title */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="font-bold text-xl text-gray-900 leading-tight">Village Portal</div>
                <div className="text-xs text-gray-500 leading-none">User Management</div>
              </div>
            </div>
            {/* Navigation Links */}
            <div className="hidden md:flex space-x-2 ml-10">
              <a href="#" className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition">Dashboard</a>
              <a href="#" className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition">All Complaints</a>
              <a href="#" className="px-4 py-2 rounded-lg font-medium text-purple-700 bg-purple-100 hover:bg-purple-200 transition">User Management</a>
            </div>
            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
                <Bell className="w-5 h-5 text-gray-500" />
                {/* Notification dot */}
                <span className="absolute top-1 right-1 block w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2 bg-purple-100 px-3 py-1 rounded-lg">
                <UserIcon className="w-6 h-6 text-purple-600" />
                <div className="text-right">
                  <div className="font-semibold text-gray-900 text-sm leading-tight">{admin.name}</div>
                  <div className="text-xs text-purple-600 leading-none">Administrator</div>
                </div>
              </div>
              <button className="p-2 rounded-full hover:bg-gray-100 transition">
                <LogOut className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Users Table */}
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 mt-4">User Management</h1>
        <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complaints</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <select
                      className={`px-2 py-1 rounded-full text-xs font-medium border focus:outline-none focus:ring ${
                        user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}
                      value={user.status}
                      onChange={e => handleStatusChange(user.id, e.target.value)}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.complaints}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                      <Eye className="w-4 h-4 mr-1" />
                      <span>View Complaints</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <div className="p-8 text-center text-gray-500">No users found.</div>
          )}
        </div>
      </div>
    </div>
  );
}