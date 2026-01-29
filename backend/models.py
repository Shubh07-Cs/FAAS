from sqlalchemy import Column, Integer, String, DateTime, LargeBinary
from sqlalchemy.sql import func
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    # Storing face encoding as bytes (or could use JSON string)
    # face_recognition library produces numpy arrays (128 floats)
    # We can pickle it or store as JSON string
    face_encoding = Column(LargeBinary) 
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    status = Column(String) # e.g., "present"
