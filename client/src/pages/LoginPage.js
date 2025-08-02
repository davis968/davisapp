import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function LoginPage({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    api.post('/login', { username, password })
      .then(res => {
        const user = res.data.user;

        
        if (user.role === 'admin') {
          setError('Admins must log in from the admin login page.');
          return;
        }

        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', res.data.token);

        if (user.role === 'doctor') {
          navigate('/upload-report');
        } else {
          navigate('/appointments');
        }
      })
      .catch(() => {
        setError('Invalid username or password');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1701679745692-3715eeefa614?q=80&w=1332&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 0,
        }}
      />

      <div className="card p-4 shadow" style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 400 }}>
        <h3 className="text-center mb-3 text-primary">User Login</h3>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
