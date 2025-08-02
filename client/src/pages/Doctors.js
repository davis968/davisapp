import React, { useEffect, useState } from 'react';
import api from '../api';


function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/doctors')
      .then(res => setDoctors(res.data))
      .catch(() => alert('Failed to load doctors.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading doctors...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Our Doctors</h2>
      <div className="row">
        {doctors.map((doctor) => (
          <div className="col-md-4 mb-4" key={doctor.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{doctor.name}</h5>
                <p className="card-text"><strong>Speciality:</strong> {doctor.speciality}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Doctors;
