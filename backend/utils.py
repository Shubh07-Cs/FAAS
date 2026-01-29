import face_recognition
import numpy as np
import cv2
import pickle

def get_face_encoding_from_file(file_bytes):
    """
    Reads an image file (bytes), detects face, and returns the encoding.
    """
    # Convert bytes to numpy array
    nparr = np.frombuffer(file_bytes, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    # Convert from BGR (OpenCV) to RGB (face_recognition)
    rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    
    # Detect faces
    boxes = face_recognition.face_locations(rgb_image)
    if not boxes:
        return None
        
    # Get encoding for the first face found
    encodings = face_recognition.face_encodings(rgb_image, boxes)
    if not encodings:
        return None
        
    # Return the first encoding as bytes (via pickle)
    return pickle.dumps(encodings[0])

def compare_faces(known_encoding_bytes, file_bytes, tolerance=0.6):
    """
    Compares a widely known encoding with an input file_bytes.
    """
    known_encoding = pickle.loads(known_encoding_bytes)
    
    # Process input image
    nparr = np.frombuffer(file_bytes, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    
    # Get encodings in the input image
    input_encodings = face_recognition.face_encodings(rgb_image)
    
    if not input_encodings:
        return False
        
    # Compare against the known encoding
    # face_recognition.compare_faces returns a list of True/False
    results = face_recognition.compare_faces([known_encoding], input_encodings[0], tolerance=tolerance)
    
    return results[0]

def is_face_match(known_encoding_bytes, new_encoding_bytes, tolerance=0.6):
    """
    Compares two pickled encodings directly.
    """
    if not known_encoding_bytes or not new_encoding_bytes:
        return False
        
    known_encoding = pickle.loads(known_encoding_bytes)
    new_encoding = pickle.loads(new_encoding_bytes)
    
    results = face_recognition.compare_faces([known_encoding], new_encoding, tolerance=tolerance)
    return results[0]
