import React, { useEffect, useState } from 'react';
import api from '../api';
import EditAppointmentForm from './EditAppointmentForm';

function AppointmentList({ user }) {
  const [appointments, setAppointments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const fetchAppointments = () => {
      setLoading(true);
      api.get(`/appointments/user/${user.id}`)
        .then(res => setAppointments(res.data))
        .catch(() => alert('Failed to load appointments.'))
        .finally(() => setLoading(false));
    };

    fetchAppointments();
  }, [user?.id]); // ✅ clean dependency

  const handleEditClick = (id) => {
    setEditingId(id);
  };

  const handleEditSuccess = () => {
    setEditingId(null);

    // Re-fetch appointments after edit
    if (user?.id) {
      api.get(`/appointments/user/${user.id}`)
        .then(res => setAppointments(res.data))
        .catch(() => alert('Failed to reload appointments.'));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      api.delete(`/appointments/${id}`)
        .then(() => {
          alert('Appointment deleted');
          if (user?.id) {
            api.get(`/appointments/user/${user.id}`)
              .then(res => setAppointments(res.data));
          }
        })
        .catch(() => alert('Failed to delete appointment.'));
    }
  };

  if (loading) return <p>Loading appointments...</p>;

  if (appointments.length === 0) return <p>No appointments found.</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {appointments.map(appt => (
        <li key={appt.id} style={{
          marginBottom: '15px',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#f7f7f7',
          textAlign: 'left'
        }}>
          {editingId === appt.id ? (
            <EditAppointmentForm
              appointment={appt}
              onSuccess={handleEditSuccess}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <>
              <p><strong>Date:</strong> {appt.date}</p>
              <p><strong>Status:</strong> {appt.status}</p>
              <p><strong>Description:</strong><br />{appt.description}</p>
              <button
                onClick={() => handleEditClick(appt.id)}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginRight: '10px'
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(appt.id)}
                style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default AppointmentList;
