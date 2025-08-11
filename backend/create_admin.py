from app import app, db
from models import User

with app.app_context():
    
    admin = User.query.filter_by(username="admin").first()
    if not admin:
        admin = User(
            username="admin",
            email="admin@example.com",
            phone="0700000000",
            role="admin"
        )
        admin.set_password("AdminPass123")  
        db.session.add(admin)
        db.session.commit()
        print("✅ Admin user created successfully.")
    else:
        print("⚠️ Admin user already exists.")
