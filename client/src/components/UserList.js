import React, { useEffect, useState } from 'react';
import api from '../api';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/users')
      .then((res) => setUsers(res.data))
      .catch(() => alert('Failed to load users.'));
  }, []);

  if (users.length === 0) return <p>No users found.</p>;

  return (
    <div>
      <h3>All Users</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map((user) => (
          <li key={user.id} style={{
            padding: '10px',
            borderBottom: '1px solid #ddd'
          }}>
            <strong>{user.username}</strong> ({user.role})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
