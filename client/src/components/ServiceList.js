import React from 'react';
import { Link } from 'react-router-dom';

function ServiceList() {
  const hardcodedSections = [
    {
      title: "General Medical Services",
      items: [
        "General health check-ups and physical exams",
        "Diagnosis and treatment of common illnesses (cold, flu, infections)",
        "Management of chronic diseases (diabetes, hypertension, asthma)",
        "Immunizations and vaccinations",
      ],
    },
    {
      title: "Diagnostic Services",
      items: [
        "Imaging services (X-rays, MRIs, CT scans)",
        "Laboratory tests (blood tests, urinalysis)",
        "Cardiovascular diagnostics (ECG, echocardiograms)",
        "Preventive screenings (cholesterol, cancer screenings)",
      ],
    },
    {
      title: "Specialist Consultation",
      items: [
        "Pediatrics (child healthcare)",
        "Gynecology and obstetrics",
        "Dermatology (skin care)",
        "Orthopedics (bones and joints)",
        "ENT (ear, nose, throat)",
      ],
    },
    {
      title: "Additional Services",
      items: [
        "Nutrition counseling",
        "Physical therapy",
        "Mental health services",
      ],
    },
    {
      title: "Preventive Care",
      items: [
        "Health screenings (blood pressure, cholesterol, cancer screenings)",
        "Nutritional counseling",
        "Smoking cessation programs",
        "Weight management and fitness advice",
      ],
    },
    {
      title: "Minor Procedures and Treatments",
      items: [
        "Wound care and suturing",
        "Removal of minor skin lesions",
        "Injections (e.g., vaccines, steroids)",
        "Allergy testing and treatment",
      ],
    },
    {
      title: "Women’s Health Services",
      items: [
        "Prenatal and postnatal care",
        "Family planning and contraception advice",
        "Pap smears and cervical cancer screening",
      ],
    },
    {
      title: "Men’s Health Services",
      items: [
        "Prostate health screenings",
        "Erectile dysfunction treatment",
        "Testosterone therapy",
      ],
    },
    {
      title: "Geriatric Care",
      items: [
        "Comprehensive geriatric assessments",
        "Management of age-related conditions (dementia, arthritis)",
        "Palliative and end-of-life care",
      ],
    },
    {
      title: "Travel Health Services",
      items: [
        "Travel vaccinations and health advice",
        "Pre-travel consultations",
        "Post-travel health assessments",
      ],
    },
  ];

  const bgColors = [
    'bg-light',
    'bg-secondary text-white',
    'bg-warning',
    'bg-success text-white',
    'bg-info text-white',
    'bg-danger text-white',
    'bg-primary text-white',
    'bg-dark text-white',
    'bg-white border',
  ];

  return (
    <div className="container my-5">
      <h2 className="text-center text-primary mb-4">Our Medical Services</h2>
      <div className="row g-4">
        {hardcodedSections.map((section, index) => (
          <div className="col-md-6" key={index}>
            <div className={`card h-100 shadow-sm ${bgColors[index % bgColors.length]}`}>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{section.title}</h5>
                <ul className="list-unstyled flex-grow-1">
                  {section.items.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
                <Link
  to="/appointments"
  state={{ prefillDescription: section.title }}
  className="btn btn-outline-dark mt-3 align-self-start"
>
  Book Now
</Link>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceList;
