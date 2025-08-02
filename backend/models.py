from flask_sqlalchemy import SQLAlchemy
from datetime import date
import json

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    phone = db.Column(db.String(20))
    password = db.Column(db.String(100), nullable=False)

    appointments = db.relationship('Appointment', backref='user', lazy=True)
    medical_reports = db.relationship('MedReport', backref='patient', lazy=True)

    
    role = db.Column(db.String(20), default='user') 

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "phone": self.phone,
            "role": self.role
        }


class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    description = db.Column(db.String(255))
    status = db.Column(db.String(50))

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "date": self.date.isoformat(),
            "description": self.description,
            "status": self.status
        }

class MedService(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(200))
    price = db.Column(db.Integer)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price
        }

class MedReport(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    files = db.Column(db.Text) 

    def to_dict(self):
        return {
            "id": self.id,
            "patient_id": self.patient_id,
            "files": json.loads(self.files or '[]')
        }

class Doctor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    specialty = db.Column(db.String(100), nullable=False)
    photo_url = db.Column(db.String(255))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "specialty": self.specialty,
            "photo_url": self.photo_url
        }

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    links = db.Column(db.String(255))
    slogan = db.Column(db.String(255))

    def to_dict(self):
        return {
            "id": self.id,
            "links": self.links,
            "slogan": self.slogan
        }
