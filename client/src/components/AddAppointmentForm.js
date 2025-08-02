import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api';

function AddAppointmentForm({ user }) {
  const location = useLocation();
  const prefillDescription = location.state?.prefillDescription || '';

  const [date, setDate] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [duration, setDuration] = useState('');
  const [impact, setImpact] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (new Date(date) < new Date().setHours(0, 0, 0, 0)) {
      alert('Please select a valid future date.');
      return;
    }

    setLoading(true);

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
        alert('Appointment booked!');
        setDate('');
        setSymptoms('');
        setDuration('');
        setImpact('');
        setTimeOfDay('');
      })
      .catch(() => {
        alert('Error. Try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const formStyle = {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial, sans-serif'
  };

  const labelStyle = {
    display: 'block',
    marginTop: '10px',
    fontWeight: 'bold'
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const buttonDisabledStyle = {
    ...buttonStyle,
    backgroundColor: '#aaa',
    cursor: 'not-allowed'
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h3 style={{ textAlign: 'center' }}>Book Appointment</h3>

      {prefillDescription && (
        <p style={{ color: 'green', textAlign: 'center', marginBottom: '15px' }}>
          Booking for: <strong>{prefillDescription}</strong>
        </p>
      )}

      <label style={labelStyle}>Date</label>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        required
        style={inputStyle}
      />

      <label style={labelStyle}>Symptoms</label>
      <input
        type="text"
        value={symptoms}
        onChange={e => setSymptoms(e.target.value)}
        required
        placeholder="e.g. headache, fever"
        style={inputStyle}
      />

      <label style={labelStyle}>Duration</label>
      <input
        type="text"
        value={duration}
        onChange={e => setDuration(e.target.value)}
        required
        placeholder="e.g. 3 days"
        style={inputStyle}
      />

      <label style={labelStyle}>Impact</label>
      <input
        type="text"
        value={impact}
        onChange={e => setImpact(e.target.value)}
        required
        placeholder="e.g. can't sleep, low energy"
        style={inputStyle}
      />

      <label style={labelStyle}>Preferred Time of Day</label>
      <select
        value={timeOfDay}
        onChange={e => setTimeOfDay(e.target.value)}
        required
        style={inputStyle}
      >
        <option value="">Select...</option>
        <option>Morning</option>
        <option>Afternoon</option>
        <option>Evening</option>
      </select>

      <button
        type="submit"
        style={loading ? buttonDisabledStyle : buttonStyle}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}

export default AddAppointmentForm;
