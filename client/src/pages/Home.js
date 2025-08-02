import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './Facilities.css';

function Home() {
  return (
    <div>
      
      <div className="container-fluid p-0">
        <div
          id="clinicCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="3000"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://images.unsplash.com/photo-1666886573553-6548db92db79?q=80&w=870&auto=format&fit=crop"
                alt="Modern hospital lobby"
                className="d-block w-100"
                style={{ height: '75vh', objectFit: 'cover' }}
              />
              <div className="carousel-caption d-flex justify-content-center align-items-center h-100">
                <h2 className="text-white fw-bold ">Your Health, Our Priority</h2>
              </div>
            </div>

            <div className="carousel-item">
              <img
                src="https://plus.unsplash.com/premium_photo-1681966826227-d008a1cfe9c7?q=80&w=870&auto=format&fit=crop"
                alt="Doctor consulting a patient"
                className="d-block w-100"
                style={{ height: '75vh', objectFit: 'cover' }}
              />
              <div className="carousel-caption d-flex justify-content-center align-items-center h-100">
                <h2 className="text-white fw-bold ">Meet Our Experts</h2>
              </div>
            </div>

            <div className="carousel-item">
              <img
                src="https://plus.unsplash.com/premium_photo-1661766456250-bbde7dd079de?w=400&auto=format&fit=crop"
                alt="Pharmacy and medication services"
                className="d-block w-100"
                style={{ height: '75vh', objectFit: 'cover' }}
              />
              <div className="carousel-caption d-flex justify-content-center align-items-center h-100">
                <h2 className="text-white fw-bold ">Everything in One Place</h2>
              </div>
            </div>
          </div>

         
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#clinicCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#clinicCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      
      <div className="container my-5">
        <h3 className="text-center mb-4">Our Facilities</h3>
        <div className="row g-4">
          <div className="col-md-4 text-center">
            <Link to="/doctors" className="facility-link">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=870&auto=format&fit=crop"
                alt="Smiling doctors"
                className="img-fluid rounded shadow facility-img"
              />
              <p className="facility-text mt-3">Our Doctors</p>
            </Link>
          </div>

          <div className="col-md-4 text-center">
            <Link to="/services" className="facility-link">
              <img
                src="https://plus.unsplash.com/premium_photo-1661767897334-bbfbdfdc4d1a?w=400&auto=format&fit=crop"
                alt="Clinic services"
                className="img-fluid rounded shadow facility-img"
              />
              <p className="facility-text mt-3">Our Services</p>
            </Link>
          </div>

          <div className="col-md-4 text-center">
            <Link to="/appointments" className="facility-link">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=870&auto=format&fit=crop"
                alt="Booking appointments"
                className="img-fluid rounded shadow facility-img"
              />
              <p className="facility-text mt-3">Appointments</p>
            </Link>
          </div>
        </div>
      </div>

    
      <footer className="footer-custom text-center py-4 bg-light">
        <p className="mb-1">&copy; {new Date().getFullYear()} HEALTH+ Clinic</p>
        <p>
          <Link to="/about" className="footer-link mx-2">About</Link> |{' '}
          <Link to="/services" className="footer-link mx-2">Services</Link> |{' '}
          <Link to="/contact" className="footer-link mx-2">Contact</Link>
        </p>
      </footer>
    </div>
  );
}

export default Home;
