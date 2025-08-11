import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <>
      <main className="container-fluid py-5 bg-light" style={{ minHeight: '100vh' }}>
        <div className="container">
          <article className="bg-white p-5 rounded shadow-sm">

           
            <div className="position-relative text-center mb-5">
              <div style={{ position: 'relative' }}>
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=853&auto=format&fit=crop"
                  alt="Clinic exterior"
                  className="img-fluid rounded shadow-sm w-100"
                  style={{ maxHeight: '300px', objectFit: 'cover' }}
                />
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 rounded" />
                <h2 className="position-absolute top-50 start-50 translate-middle text-white fw-bold display-5">
                  HEALTH+ CLINIC
                </h2>
              </div>
            </div>

            <h1 className="text-primary mb-4 text-center fw-semibold">About Our Clinic</h1>

            <section className="mb-5">
              <p className="lead text-secondary text-center">
                Welcome to <strong>HEALTH+ Clinic</strong>, where your well-being is our mission. We offer modern,
                compassionate healthcare in a clean, welcoming environment.
              </p>
            </section>

            <section className="mb-5">
              <h3 className="text-info mb-3">🎯 Our Mission</h3>
              <p className="text-muted fs-6">
                To provide affordable, accessible, and comprehensive healthcare with a focus on prevention,
                early diagnosis, and long-term care.
              </p>
            </section>

            <section className="mb-5">
              <h3 className="text-info mb-3">🌟 Our Vision</h3>
              <p className="text-muted fs-6">
                To be the most trusted and innovative health provider in the region — committed to improving lives
                through exceptional care.
              </p>
            </section>

            
            <section className="mb-5">
              <h3 className="text-info mb-3">💡 Core Values</h3>
              <ul className="list-unstyled text-muted fs-6">
                <li>❤️ <strong>Compassion:</strong> We treat every patient with kindness and respect.</li>
                <li>🔍 <strong>Integrity:</strong> Honesty and ethics guide our actions.</li>
                <li>🏆 <strong>Excellence:</strong> We strive for the highest standards in all we do.</li>
                <li>🤝 <strong>Teamwork:</strong> Collaboration powers our patient-centered care.</li>
              </ul>
            </section>

           
            <section className="mb-5">
              <h3 className="text-info mb-3">👍 Why Choose Us?</h3>
              <ul className="list-unstyled text-muted fs-6">
                <li>✔️ Skilled and compassionate medical staff</li>
                <li>✔️ Modern equipment and clean facilities</li>
                <li>✔️ Broad range of general and specialist services</li>
                <li>✔️ Affordable rates and flexible scheduling</li>
              </ul>
            </section>

            
            <section className="text-center mt-5">
              <p className="fs-5 mb-3 text-dark">Ready to take the first step toward better health?</p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Link to="/appointments" className="btn btn-primary px-4">Book Appointment</Link>
                <Link to="/contact" className="btn btn-outline-info px-4">Contact Us</Link>
              </div>
            </section>
          </article>
        </div>
      </main>

    
      <footer className="text-center py-4 bg-white border-top">
        <p className="mb-1 text-muted">&copy; {new Date().getFullYear()} <strong>HEALTH+ Clinic</strong></p>
        <p className="mb-0">
          <Link to="/home" className="text-decoration-none text-info mx-2">Home</Link> |
          <Link to="/services" className="text-decoration-none text-info mx-2">Services</Link> |
          <Link to="/contact" className="text-decoration-none text-info mx-2">Contact</Link>
        </p>
      </footer>
    </>
  );
};

export default About;
