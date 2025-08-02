import React, { useEffect, useState } from 'react';
import api from '../api';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId, role) => {
    if (role === 'admin') {
      alert("You cannot delete another admin.");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      await api.delete(`/admin/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>

      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2 capitalize">{user.role}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(user.id, user.role)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminDashboard;
