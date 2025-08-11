import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api';
import './AddAppointmentForm.css';

function AddAppointmentForm({ user }) {
  const location = useLocation();
  const prefillDescription = location.state?.prefillDescription || '';

  const [date, setDate] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [duration, setDuration] = useState('');
  const [impact, setImpact] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (new Date(date) < new Date().setHours(0, 0, 0, 0)) {
      setError('Please select a valid future date.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    const description = `
Service: ${prefillDescription || 'General Consultation'}
Symptoms: ${symptoms}
Duration: ${duration}
Impact: ${impact}
Preferred Time: ${timeOfDay}
    `;

    api.post('/appointments', {
      user_id: user.id,
      date,
      description,
      status: 'pending',
    })
      .then(() => {
        setSuccess('Appointment booked successfully!');
        setDate('');
        setSymptoms('');
        setDuration('');
        setImpact('');
        setTimeOfDay('');
      })
      .catch(() => {
        setError('Something went wrong. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="appointment-form">
      <h3>Book Appointment</h3>

      {prefillDescription && (
        <p className="message success">
          Booking for: <strong>{prefillDescription}</strong>
        </p>
      )}
      {success && <p className="message success">{success}</p>}
      {error && <p className="message error">{error}</p>}

      <label>Date</label>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        required
      />

      <label>Symptoms</label>
      <input
        type="text"
        value={symptoms}
        onChange={e => setSymptoms(e.target.value)}
        required
        placeholder="e.g. headache, fever"
      />

      <label>Duration</label>
      <input
        type="text"
        value={duration}
        onChange={e => setDuration(e.target.value)}
        required
        placeholder="e.g. 3 days"
      />

      <label>Impact</label>
      <input
        type="text"
        value={impact}
        onChange={e => setImpact(e.target.value)}
        required
        placeholder="e.g. can't sleep, low energy"
      />

      <label>Preferred Time of Day</label>
      <select
        value={timeOfDay}
        onChange={e => setTimeOfDay(e.target.value)}
        required
      >
        <option value="">Select...</option>
        <option>Morning</option>
        <option>Afternoon</option>
        <option>Evening</option>
      </select>

      <button
        type="submit"
        className="btn-submit"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}

export default AddAppointmentForm;
