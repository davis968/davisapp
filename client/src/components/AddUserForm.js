import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './AddUserForm.css';

function AddUserForm({ setUser }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');  

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      username,
      email,
      phone,
      password,
      role 
    };

    api.post('/signup', newUser)
      .then(() => api.post('/login', { username, password }))
      .then((res) => {
        console.log("Login success:", res.data);
        localStorage.setItem('token', res.data.token);
        if (typeof setUser === 'function') {
          setUser(res.data.user);
        }
        navigate('/');
      })
      .catch((err) => {
        console.error('Signup or login failed:', err);
        alert('Signup failed. Please try again.');
      });
  };

  return (
    <div className="signup-bg d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center text-primary mb-4">Create Your Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-primary">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-primary">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-primary">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-primary">Phone</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          
          <div className="mb-4">
            <label className="form-label text-primary">Role</label>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          <button className="btn btn-primary w-100" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUserForm;
