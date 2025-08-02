import React from 'react';
import './contact.css';

import { Link } from 'react-router-dom';


const Contact = () => {
    return (
        <div className="container my-5">
            <h1 className="text-primary text-center mb-4">Contact Us</h1>
            <p className="text-center text-primary ">
                Health+ is always available to reach and offer services and assistance to our patients.
            </p>
            <div className="row mt-4 justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4 shadow-sm">
                        <h5>Get in Touch</h5>
                        <p><strong>Phone:</strong> +254 791595636</p>
                        <p><strong>Email:</strong> support@healthplus.com</p>
                        <p><strong>Address:</strong> 314 Karen, Nairobi, Kenya</p>
                        <p><strong>Working Hours:</strong> Mon - Sat: 8am - 6pm</p>

                        <h6 className="mt-4">Follow us on:</h6>
                        <ul className="list-unstyled">
                            <li><a href="https://www.facebook.com/healthplus" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                            <li><a href="https://www.twitter.com/healthplus" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                            <li><a href="https://www.instagram.com/healthplus" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <footer className="bg-blue text-black py-4 mt-5">
          <div className="container text-center">
            <p className="mb-1">&copy; {new Date().getFullYear()} HEALTH+ Clinic. All rights reserved.</p>
            <p className="mb-0">
              <Link to="/home" className="text-black me-3 text-decoration-underline">Home</Link>
              <Link to="/services" className="text-black me-3 text-decoration-underline">Services</Link>
              <Link to="/about" className="text-black text-decoration-underline">About</Link>
            </p>
          </div>
        </footer>
        </div>
        
        
    );
};

export default Contact;
