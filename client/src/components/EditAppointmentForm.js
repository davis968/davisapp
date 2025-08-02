import React, { useState } from 'react';
import api from '../api';

function EditAppointmentForm({ appointment, onSuccess, onCancel }) {
  const [date, setDate] = useState(appointment.date);
  const [description, setDescription] = useState(appointment.description);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    api.patch(`/appointments/${appointment.id}`, {
      date,
      description
    })
      .then(() => {
        alert('Appointment updated successfully!');
        onSuccess(); 
      })
      .catch(() => alert('Failed to update appointment.'))
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
      <div style={{ marginBottom: '10px' }}>
        <label>Date: </label><br />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Description: </label><br />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows="3"
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </button>
      <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>
        Cancel
      </button>
    </form>
  );
}

export default EditAppointmentForm;
