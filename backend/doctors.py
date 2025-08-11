from app import app
from models import db, Doctor

doctors_data = [
    {"name": "Dr. Alice Mwangi", "specialty": "Cardiologist"},
    {"name": "Dr. Brian Otieno", "specialty": "Pediatrician"},
    {"name": "Dr. Cynthia Kariuki", "specialty": "Dermatologist"},
    {"name": "Dr. David Kimani", "specialty": "Orthopedic Surgeon"},
    {"name": "Dr. Esther Wambui", "specialty": "Neurologist"},
    {"name": "Dr. Felix Njoroge", "specialty": "Ophthalmologist"},
    {"name": "Dr. Grace Achieng", "specialty": "Gynecologist"},
    {"name": "Dr. Henry Maina", "specialty": "General Surgeon"},
    {"name": "Dr. Irene Muthoni", "specialty": "Psychiatrist"},
    {"name": "Dr. John Ouma", "specialty": "Oncologist"},
    {"name": "Dr. Kate Nyambura", "specialty": "Radiologist"},
    {"name": "Dr. Louis Mutua", "specialty": "ENT Specialist"},
    {"name": "Dr. Mary Wanja", "specialty": "Urologist"},
    {"name": "Dr. Nick Ruto", "specialty": "Endocrinologist"},
    {"name": "Dr. Olivia Naliaka", "specialty": "Pathologist"},
    {"name": "Dr. Peter Karanja", "specialty": "Pulmonologist"},
    {"name": "Dr. Queen Atuma", "specialty": "Gastroenterologist"},
]

placeholder_image = "https://via.placeholder.com/300x200?text=Doctor"

with app.app_context():
    added = 0
    for doc in doctors_data:
        if not Doctor.query.filter_by(name=doc["name"]).first():
            doctor = Doctor(
                name=doc["name"],
                specialty=doc["specialty"],
                photo_url=placeholder_image
            )
            db.session.add(doctor)
            added += 1

    db.session.commit()
    print(f"{added} new doctors added successfully.")
