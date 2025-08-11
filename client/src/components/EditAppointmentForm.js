import React, { useState } from 'react';
import api from '../api';
import './EditAppointmentForm.css';

function EditAppointmentForm({ appointment, onSuccess, onCancel }) {
  const [date, setDate] = useState(appointment.date);
  const [description, setDescription] = useState(appointment.description);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    api.patch(`/appointments/${appointment.id}`, { date, description })
      .then(() => {
        alert('Appointment updated successfully!');
        onSuccess();
      })
      .catch(() => alert('Failed to update appointment.'))
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit} className="edit-appointment-form">
      <label htmlFor="date">Date</label>
      <input
        id="date"
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows="4"
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="cancel-btn"
        disabled={loading}
      >
        Cancel
      </button>
    </form>
  );
}

export default EditAppointmentForm;
