from app import app
from models import db, User
from werkzeug.security import generate_password_hash

with app.app_context():
    admin = User(
        username='admin',
        email='admin@gmail.com',
        phone='0712345678',
        password=generate_password_hash('admin123'),
        role=True
    )
    db.session.add(admin)
    db.session.commit()
    print("Admin user created.")
