import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/doctors')

      .then(res => {
        setDoctors(res.data);
      })
      .catch(err => {
        console.error('Failed to fetch doctors:', err);
      });
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Meet Our Doctors</h2>
      <div className="row g-4">
        {doctors.map((doctor) => (
          <div className="col-md-4" key={doctor.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={doctor.photo_url || 'https://via.placeholder.com/300x200?text=Doctor'}
                className="card-img-top"
                alt={doctor.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{doctor.name}</h5>
                <p className="card-text text-muted">{doctor.specialty}</p>
              </div>
            </div>
          </div>
        ))}
        {doctors.length === 0 && (
          <div className="text-center">
            <p>No doctors available.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorsPage;
