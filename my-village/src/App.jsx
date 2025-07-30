import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserDashboard from "./dashboard/UserDashboard";
import ComplaintForm from "./components/ComplaintForm";
import MyComplaints from "./components/MyComplaints";
import AdminDashboard from "./dashboard/AdminDashboard";
import AllComplaints from "./components/AllComplaints";
import UserManagement from "./components/UserManagement";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} setAdmin={setAdmin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/dashboard" element={user ? <UserDashboard user={user} /> : <Navigate to="/" />} />
        <Route path="/admin/dashboard" element={admin ? <AdminDashboard admin={admin} /> : <Navigate to="/" />} />
        {/* Example: add more protected routes for user/admin as needed */}
        <Route path="/complaint-form" element={user ? <ComplaintForm /> : <Navigate to="/" />} />
        <Route path="/my-complaints" element={user ? <MyComplaints /> : <Navigate to="/" />} />
        <Route path="/all-complaints" element={admin ? <AllComplaints /> : <Navigate to="/" />} />
        <Route path="/user-management" element={admin ? <UserManagement /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
