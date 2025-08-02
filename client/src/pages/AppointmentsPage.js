import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddAppointmentForm from '../components/AddAppointmentForm';
import AppointmentList from '../components/AppointmentList';

function AppointmentsPage({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const containerStyle = {
    
    borderRadius: '10px',
    backgroundColor: '#f2f2f2',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const headingStyle = {
    fontSize: '26px',
    marginBottom: '10px',
    color: '#333',
    textAlign: 'center',
  };

  const subheadingStyle = {
    fontSize: '16px',
    marginBottom: '30px',
    color: '#666',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Appointments</h2>
      <h4 style={subheadingStyle}>Welcome to Health+ Clinic</h4>

      <AddAppointmentForm user={user} />
      <AppointmentList user={user} />
    </div>
  );
}

export default AppointmentsPage;
