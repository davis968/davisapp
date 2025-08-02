from app import app
from models import db, Doctor  

with app.app_context():
    db.create_all()

    if Doctor.query.count() == 0:
        doctors = [
            Doctor(name="Alice Kimani", specialty="Pediatrics", photo_url="/static/images/alice.png"),
            Doctor(name="Brian Otieno", specialty="Cardiology", photo_url="/static/images/otieno.png"),
            Doctor(name="Catherine Njeri", specialty="Dermatology", photo_url="/static/images/cate.png")
        ]
        db.session.add_all(doctors)
        db.session.commit()
        print("✅ Sample doctors with local images added!")
    else:
        print("⚠️ Doctors already seeded.")
