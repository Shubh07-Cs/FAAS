from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
import models, schemas, database, utils
import pickle

router = APIRouter(
    prefix="/attendance",
    tags=["attendance"]
)

@router.post("/mark", response_model=schemas.AttendanceResponse)
def mark_attendance(
    file: UploadFile = File(...),
    db: Session = Depends(database.get_db)
):
    content = file.file.read()
    
    # This is naive: we iterate through all users to find a match.
    # For a large system, we would need a vector database (reminiscent of Milvus/Pinecone)
    # but for a simple project, this list iteration is fine.
    
    users = db.query(models.User).all()
    detected_user = None
    
    # We first extract the encoding from the input image ONCE to save time
    # Instead of re-processing inside compare_faces every time.
    # But for simplicity, we'll reuse our util.
    # Optimization: Let's optimize the util later if needed.
    
    input_face_encoding = None
    # Quick hack: get encoding directly, similar to utils but we need it raw
    import face_recognition
    import numpy as np
    import cv2
    
    nparr = np.frombuffer(content, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    input_encodings = face_recognition.face_encodings(rgb_image)
    
    if not input_encodings:
        raise HTTPException(status_code=400, detail="No face detected")
        
    target_encoding = input_encodings[0]
    
    for user in users:
        if user.face_encoding:
            known_encoding = pickle.loads(user.face_encoding)
            match = face_recognition.compare_faces([known_encoding], target_encoding, tolerance=0.5)
            if match[0]:
                detected_user = user
                break
    
    if not detected_user:
        raise HTTPException(status_code=404, detail="User not recognized")
        
    # Mark attendance
    new_attendance = models.Attendance(
        user_id=detected_user.id,
        status="present"
    )
    db.add(new_attendance)
    db.commit()
    db.refresh(new_attendance)
    
    return new_attendance

@router.get("/", response_model=list[schemas.AttendanceResponse])
def read_attendance(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    logs = db.query(models.Attendance).offset(skip).limit(limit).all()
    return logs
