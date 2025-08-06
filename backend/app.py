from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import os

from models import db, User, Appointment, MedService, MedReport, Doctor, Contact

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


CORS(app, origins=[
    "http://localhost:3000",
    "https://davisapp-frontend.onrender.com"  
], supports_credentials=True)

db.init_app(app)
migrate = Migrate(app, db)

@app.route("/home", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to the Clinic API"}), 200

@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([{"id": u.id, "username": u.username} for u in users]), 200

@app.route("/users/<int:id>", methods=["GET"])
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "phone": user.phone
    }), 200

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    if User.query.filter_by(username=data["username"]).first():
        return jsonify({"error": "Username already exists"}), 409

    new_user = User(
        username=data["username"],
        email=data["email"],
        phone=data["phone"],
        password=generate_password_hash(data["password"])
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data["username"]).first()
    if user and check_password_hash(user.password, data["password"]):
        return jsonify({
            "message": "Login successful",
            "user": {"id": user.id, "username": user.username}
        }), 200
    return jsonify({"error": "Invalid credentials"}), 401

@app.route("/appointments", methods=["GET"])
def get_appointments():
    appointments = Appointment.query.all()
    return jsonify([{
        "id": a.id,
        "user_id": a.user_id,
        "date": a.date.isoformat(),
        "description": a.description,
        "status": a.status
    } for a in appointments]), 200

@app.route("/appointments", methods=["POST"])
def create_appointment():
    data = request.get_json()
    appointment = Appointment(
        user_id=data["user_id"],
        date=datetime.strptime(data["date"], "%Y-%m-%d"),
        description=data.get("description", ""),
        status=data.get("status", "pending")
    )
    db.session.add(appointment)
    db.session.commit()
    return jsonify({"message": "Appointment created"}), 201

@app.route("/appointments/user/<int:user_id>", methods=["GET"])
def get_user_appointments(user_id):
    appointments = Appointment.query.filter_by(user_id=user_id).all()
    return jsonify([{
        "id": a.id,
        "date": a.date.isoformat(),
        "description": a.description,
        "status": a.status
    } for a in appointments]), 200

@app.route("/appointments/<int:id>", methods=["PATCH"])
def update_appointment(id):
    appointment = Appointment.query.get_or_404(id)
    data = request.get_json()
    if "date" in data:
        appointment.date = datetime.strptime(data["date"], "%Y-%m-%d")
    if "description" in data:
        appointment.description = data["description"]
    if "status" in data:
        appointment.status = data["status"]
    db.session.commit()
    return jsonify({"message": "Appointment updated"}), 200

@app.route("/appointments/<int:id>", methods=["DELETE"])
def delete_appointment(id):
    appointment = Appointment.query.get_or_404(id)
    db.session.delete(appointment)
    db.session.commit()
    return jsonify({"message": "Appointment deleted"}), 200

@app.route("/services", methods=["GET"])
def get_services():
    services = MedService.query.all()
    return jsonify([{
        "id": s.id,
        "name": s.name,
        "description": s.description,
        "price": s.price
    } for s in services]), 200

@app.route("/doctors", methods=["GET"])
def get_doctors():
    doctors = Doctor.query.all()
    return jsonify([{
        "id": d.id,
        "name": d.name,
        "speciality": d.speciality
    } for d in doctors]), 200

@app.route("/reports/patient/<int:user_id>", methods=["GET"])
def get_patient_report(user_id):
    user = User.query.get_or_404(user_id)
    appointments = Appointment.query.filter_by(user_id=user_id).all()
    return jsonify({
        "user": user.to_dict(),
        "appointments": [{
            "date": a.date.isoformat(),
            "description": a.description,
            "status": a.status
        } for a in appointments]
    }), 200

@app.route("/contact", methods=["GET"])
def get_contact():
    contacts = Contact.query.all()
    return jsonify([{
        "id": c.id,
        "link": c.link,
        "slogan": c.slogan
    } for c in contacts]), 200

@app.route("/about", methods=["GET"])
def about():
    return jsonify({
        "vision": "Clinic management system for appointments, services, and reports.",
        "why": "Simple and efficient way to manage clinic operations."
    }), 200
@app.route('/init-db')
def init_db():
    from flask_migrate import upgrade
    upgrade()
    return "Database initialized and migrated!", 200


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
