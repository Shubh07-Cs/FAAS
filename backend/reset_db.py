from database import SessionLocal, engine
import models
from sqlalchemy import text

def reset_db():
    db = SessionLocal()
    try:
        # Delete rows from child table first (Attendance) to avoid constraint issues if any (though usually fine with cascade, but explicit is safer)
        num_attendance = db.query(models.Attendance).delete()
        num_users = db.query(models.User).delete()
        db.commit()
        print(f"Cleared {num_attendance} attendance records and {num_users} users.")
    except Exception as e:
        print(f"Error clearing database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    reset_db()
