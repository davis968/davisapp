import React from 'react';

const About = () => {
  return (
    <main className="container-fluid py-5 bg-light" style={{ minHeight: '100vh' }}>
      <div className="container">
        <article className="bg-white p-5 rounded shadow-sm">

          
        <div className="position-relative text-center mb-4">
  <img
    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=853&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt="Clinic exterior"
    className="img-fluid rounded shadow-sm"
    style={{ maxHeight: '300px', objectFit: 'cover', width: '100%' }}
  />
  <h2 className="position-absolute top-50 start-50 translate-middle text-black fw-bold fs-1">
    AFYA+ CLINIC
  </h2>
</div>


          <h1 className="text-primary mb-4 text-center">About Our Clinic</h1>

          <section className="mb-4 d-flex flex-column flex-md-row align-items-center gap-4">
            <div className="flex-fill">
              <p className="lead text-dark fs-5">
                Welcome to our clinic, where your health is our top priority. Our team of medical professionals
                is committed to delivering personalized, high-quality healthcare in a warm and supportive environment.
              </p>
            </div>
            
          </section>

          <section className="mb-4">
            <h3 className="text-info">Our Mission</h3>
            <div className="d-flex flex-column flex-md-row align-items-center gap-4">
              <p className="fs-6 flex-fill">
                To provide affordable, accessible, and comprehensive healthcare to individuals and families.
                We focus on prevention, early intervention, and compassionate treatment.
              </p>
              
            </div>
          </section>

          <section className="mb-4">
            <h3 className="text-info">Our Vision</h3>
            <div className="d-flex flex-column flex-md-row align-items-center gap-4">
              <p className="fs-6 flex-fill">
                To become the most trusted healthcare provider in the region by offering exceptional care
                and fostering long-term health and wellness.
              </p>
              
            </div>
          </section>

          <section className="mb-4">
            <h3 className="text-info">Core Values</h3>
            <ul className="text-dark fs-6">
              <li><strong>Compassion:</strong> We care deeply for each patient and their journey.</li>
              <li><strong>Integrity:</strong> We uphold honesty and transparency in everything we do.</li>
              <li><strong>Excellence:</strong> We strive for top-tier service and medical care.</li>
              <li><strong>Teamwork:</strong> We collaborate to ensure seamless, holistic care.</li>
            </ul>
            <div className="text-center mt-3">
              
            </div>
          </section>

          <section className="mb-4">
            <h3 className="text-info">Why Choose Us?</h3>
            <ul className="text-dark fs-6">
              <li>Experienced, friendly medical staff</li>
              <li>Modern equipment and clean facilities</li>
              <li>Wide range of general and specialist services</li>
              <li>Affordable rates and convenient appointment scheduling</li>
            </ul>
            <div className="text-center mt-3">
              
            </div>
          </section>

          <section className="text-center mt-5">
            <p className="fs-5 mb-3">Ready to take control of your health?</p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <a href="/appointments" className="btn btn-outline-primary">Book an Appointment</a>
              <a href="/contact" className="btn btn-outline-primary">Contact Us</a>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
};

export default About;
