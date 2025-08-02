import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Admin({ setAdmin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); 
    setError('');

    api.post('/login', { username, password }, { withCredentials: true })
      .then(res => {
        const user = res.data.user;

        if (user.role !== 'admin') {
          setError('Access denied: Not an admin.');
          return;
        }

        setAdmin(user);
        localStorage.setItem("admin", JSON.stringify(user));
        localStorage.setItem("token", res.data.token);
        navigate('/admin-dashboard');
      })
      .catch(() => {
        setError('Invalid admin credentials');
      });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2 className="text-center mb-4">Admin Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login Admin
        </button>
      </form>
    </div>
  );
}

export default Admin;
