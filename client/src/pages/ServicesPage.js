import React from 'react';
import ServiceList from '../components/ServiceList';

function ServicesPage() {
  return (
    <div className="d-flex flex-column min-vh-100">
     
      <main className="container py-5 flex-grow-1">
        <h2 className="text-primary text-center mb-4">
          HEALTH+ Clinic Offers the Following Services
        </h2>
        <ServiceList />
      </main>

    
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <div>© {new Date().getFullYear()} HEALTH+ Clinic. All rights reserved.</div>
        <div>To book an Appointment</div>
        <div>Contact: info@healthplus.com | +123 456 7890</div>
      </footer>
    </div>
  );
}

export default ServicesPage;
