import React, { useState } from 'react';
import { Shield, Bell, User as UserIcon, LogOut, X } from 'lucide-react';

export default function AllComplaints() {
  // Mock admin for navbar
  const admin = { name: 'Admin User' };

  // Editable complaints state
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      title: 'Water Supply Issues',
      category: 'Water',
      status: 'resolved',
      createdAt: '2025-07-28T10:00:00Z',
      user: 'John Doe',
      priority: 'high',
      description: 'There is no water supply in my area for 2 days.',
      message: ''
    },
    {
      id: 2,
      title: 'Street Light Not Working',
      category: 'Electricity',
      status: 'pending',
      createdAt: '2025-07-26T12:00:00Z',
      user: 'Jane Smith',
      priority: 'medium',
      description: 'The street light in front of my house is not working.',
      message: ''
    },
    {
      id: 3,
      title: 'Garbage Collection Delayed',
      category: 'Sanitation',
      status: 'in progress',
      createdAt: '2025-07-25T09:00:00Z',
      user: 'Mike Johnson',
      priority: 'low',
      description: 'Garbage has not been collected for a week.',
      message: ''
    },
    {
      id: 4,
      title: 'Road Potholes',
      category: 'Infrastructure',
      status: 'pending',
      createdAt: '2025-07-24T14:00:00Z',
      user: 'Sarah Wilson',
      priority: 'high',
      description: 'There are many potholes on the main road.',
      message: ''
    },
    {
      id: 5,
      title: 'Drainage Problem',
      category: 'Water',
      status: 'resolved',
      createdAt: '2025-07-23T11:00:00Z',
      user: 'David Brown',
      priority: 'medium',
      description: 'Drainage is blocked and causing water logging.',
      message: ''
    }
  ]);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [modalStatus, setModalStatus] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  // Open modal and set selected complaint
  const handleView = (complaint) => {
    setSelectedComplaint(complaint);
    setModalStatus(complaint.status);
    setModalMessage(complaint.message || '');
    setShowModal(true);
  };

  // Save status and message
  const handleSave = () => {
    setComplaints(prevComplaints =>
      prevComplaints.map(c =>
        c.id === selectedComplaint.id
          ? { ...c, status: modalStatus, message: modalMessage }
          : c
      )
    );
    setShowModal(false);
  };

  // Close modal
  const handleClose = () => {
    setShowModal(false);
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
                <div className="text-xs text-gray-500 leading-none">All Complaints</div>
              </div>
            </div>
            {/* Navigation Links */}
            <div className="hidden md:flex space-x-2 ml-10">
              <a href="#" className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition">Dashboard</a>
              <a href="#" className="px-4 py-2 rounded-lg font-medium text-purple-700 bg-purple-100 hover:bg-purple-200 transition">All Complaints</a>
              <a href="#" className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition">User Management</a>
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

      {/* Complaints Table */}
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 mt-4">All Complaints</h1>
        <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {complaints.map((complaint) => (
                <tr key={complaint.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{complaint.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{complaint.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{complaint.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{complaint.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      complaint.status === 'resolved' ? 'bg-green-100 text-green-800' :
                      complaint.status === 'in progress' ? 'bg-blue-100 text-blue-800' :
                      complaint.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {complaint.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      complaint.priority === 'high' ? 'bg-red-100 text-red-800' :
                      complaint.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {complaint.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(complaint.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      onClick={() => handleView(complaint)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {complaints.length === 0 && (
            <div className="p-8 text-center text-gray-500">No complaints found.</div>
          )}
        </div>
      </div>

      {/* Modal for viewing/updating complaint */}
      {showModal && selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={handleClose}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4">Complaint Details</h2>
            <div className="mb-2"><span className="font-semibold">ID:</span> {selectedComplaint.id}</div>
            <div className="mb-2"><span className="font-semibold">Title:</span> {selectedComplaint.title}</div>
            <div className="mb-2"><span className="font-semibold">Category:</span> {selectedComplaint.category}</div>
            <div className="mb-2"><span className="font-semibold">User:</span> {selectedComplaint.user}</div>
            <div className="mb-2"><span className="font-semibold">Priority:</span> {selectedComplaint.priority}</div>
            <div className="mb-2"><span className="font-semibold">Created At:</span> {new Date(selectedComplaint.createdAt).toLocaleDateString()}</div>
            <div className="mb-4"><span className="font-semibold">Description:</span> {selectedComplaint.description}</div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Status</label>
              <select
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
                value={modalStatus}
                onChange={e => setModalStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Message to Complainant</label>
              <textarea
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
                rows={3}
                value={modalMessage}
                onChange={e => setModalMessage(e.target.value)}
                placeholder="Write a message..."
              />
            </div>
            <button
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}