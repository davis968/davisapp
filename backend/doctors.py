
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
    {"name": "Dr. Queen Atuma", "specialty": "Gastroenterologist"}
 
    
]


with app.app_context():
    for doc in doctors_data:
        doctor = Doctor(name=doc["name"], specialty=doc["specialty"])
        db.session.add(doctor)
    
    db.session.commit()
    print("doctors added successfully.")
