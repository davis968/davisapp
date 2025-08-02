import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import 'bootstrap/dist/css/bootstrap.min.css';


import LoginPage from './pages/LoginPage';
import UsersPage from './pages/UsersPage';
import AppointmentsPage from './pages/AppointmentsPage';
import ServicesPage from './pages/ServicesPage';
import Home from './pages/Home';
import AddUserForm from './components/AddUserForm';
import About from './pages/About';
import Doctors from './pages/Doctors';
import Contact from './pages/Contact';
import PrivateRoute from './components/PrivateRoute';
import MedicalReport from './pages/MedicalReport';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';

function App() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedAdmin = localStorage.getItem('admin');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setAdmin(null);
  };

  return (
    <Router>
      
      {!admin && (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 py-3 border-bottom shadow-sm">
          <Link className="navbar-brand text-primary fw-bold" to="/">HEALTH+</Link>
          <div className="ms-auto d-flex align-items-center gap-3">
            

            {user ? (
              <>
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/appointments">Appointments</Link>
                <Link className="nav-link" to="/about">About</Link>
                <Link className="nav-link" to="/reports">Reports</Link>
                <span className="text-muted">Welcome, {user.username}</span>
                <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
                <Link to="/signup" className="btn btn-outline-primary btn-sm">Sign Up</Link>
                <Link to="/admin-login" className="btn btn-outline-danger btn-sm">Admin</Link>
              </>
            )}
          </div>
        </nav>
      )}

      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<ServicesPage user={user} />} />

       
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage setUser={setUser} />} />
        <Route path="/signup" element={user ? <Navigate to="/" replace /> : <AddUserForm />} />

       
        <Route path="/admin-login" element={admin ? <Navigate to="/admin-dashboard" replace /> : <AdminLogin setAdmin={setAdmin} />} />
        <Route path="/admin-dashboard" element={admin ? <AdminDashboard admin={admin} onLogout={handleLogout} /> : <Navigate to="/admin-login" />} />

       
        <Route path="/reports" element={<PrivateRoute><MedicalReport user={user} /></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute><UsersPage user={user} /></PrivateRoute>} />
        <Route path="/appointments" element={<PrivateRoute><AppointmentsPage user={user} /></PrivateRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
