from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import users, attendance
from database import engine, Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Face Auth Attendance System")

# Helper routers
app.include_router(users.router)
app.include_router(attendance.router)

origins = [
    "http://localhost:5173",  # React default port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Face Auth Attendance System API"}
