import os
import base64
import uuid
import sqlite3
from datetime import datetime
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="Technika 6.0 • Campus Lens Media API",
    description="Crowdsourced Student Photography & Media Vault API for ARKA JAIN University Annual Fest",
    version="1.0.0"
)

# Enable CORS for Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BASE_DIR)
DB_PATH = os.path.join(BASE_DIR, "technika.db")
UPLOADS_DIR = os.path.join(PROJECT_ROOT, "public", "uploads")

os.makedirs(UPLOADS_DIR, exist_ok=True)

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS campus_photos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            submission_id TEXT UNIQUE NOT NULL,
            student_name TEXT NOT NULL,
            enrollment_no TEXT NOT NULL,
            college_dept TEXT NOT NULL,
            category TEXT NOT NULL,
            caption TEXT,
            credit TEXT,
            image_url TEXT NOT NULL,
            upload_date TEXT NOT NULL,
            status TEXT DEFAULT 'Shortlisted for Press'
        );
    """)
    conn.commit()

    # Seed initial showcase records if empty
    cursor.execute("SELECT COUNT(*) FROM campus_photos")
    count = cursor.fetchone()[0]
    if count == 0:
        seed_items = [
            (
                "LENS-2026-8841",
                "Arjun Sharma",
                "AJU/24/BTECH/019",
                "School of Engineering & IT",
                "Robo Wars",
                "Flame-spitting battlebot clash inside the Technika arena cage!",
                "@arjun.lens",
                "/robo war pic/images.jpg",
                "15 Nov 2026",
                "Approved for Magazine"
            ),
            (
                "LENS-2026-9214",
                "Priya Kumari",
                "AJU/23/BCA/084",
                "Dept of Computer Applications",
                "Concerts & Stage",
                "Celebrity artist lighting up the auditorium with 10k+ crowd roaring",
                "@priya_clicks",
                "/concert/images (6).jpg",
                "15 Nov 2026",
                "Approved for Magazine"
            ),
            (
                "LENS-2026-6302",
                "Farhan Akhtar",
                "AJU/24/BBA/102",
                "School of Commerce & Mgmt",
                "Runway & Glamour",
                "Royal ethnic showstopper ramp walk under auditorium spotlights",
                "@farhan_raw",
                "/concert/images (1).jpg",
                "14 Nov 2026",
                "Shortlisted for Press"
            ),
            (
                "LENS-2026-4719",
                "Tanvi Mishra",
                "AJU/23/ENG/051",
                "School of Engineering & IT",
                "Campus Life & Sports",
                "High-voltage Tug of War knockout clash on university grounds!",
                "@tanvi_captures",
                "/runway/images (1).jpg",
                "14 Nov 2026",
                "Shortlisted for Press"
            )
        ]
        cursor.executemany("""
            INSERT INTO campus_photos (
                submission_id, student_name, enrollment_no, college_dept, 
                category, caption, credit, image_url, upload_date, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, seed_items)
        conn.commit()
    conn.close()

init_db()

class PhotoUploadRequest(BaseModel):
    student_name: str
    enrollment_no: str
    college_dept: str
    category: str
    caption: Optional[str] = ""
    credit: Optional[str] = ""
    image_base64: str

class StatusUpdateRequest(BaseModel):
    status: str

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "Technika 6.0 Campus Lens API",
        "swagger_docs": "/docs",
        "university": "ARKA JAIN University",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/photos")
def list_photos(category: Optional[str] = None):
    conn = get_db()
    cursor = conn.cursor()
    if category and category.lower() != "all":
        cursor.execute("SELECT * FROM campus_photos WHERE category = ? ORDER BY id DESC", (category,))
    else:
        cursor.execute("SELECT * FROM campus_photos ORDER BY id DESC")
    rows = cursor.fetchall()
    photos = [dict(row) for row in rows]
    conn.close()
    return {"photos": photos, "total": len(photos)}

@app.post("/api/photos/upload")
def upload_photo(payload: PhotoUploadRequest):
    if not payload.image_base64:
        raise HTTPException(status_code=400, detail="Image data is required")
    
    # Generate unique submission code
    random_code = str(uuid.uuid4())[:4].upper()
    submission_id = f"LENS-2026-{random_code}"
    
    # Process base64
    header = ""
    b64_data = payload.image_base64
    if "," in payload.image_base64:
        header, b64_data = payload.image_base64.split(",", 1)
    
    ext = "jpg"
    if "image/png" in header:
        ext = "png"
    elif "image/webp" in header:
        ext = "webp"
    
    filename = f"{submission_id}.{ext}"
    file_path = os.path.join(UPLOADS_DIR, filename)
    
    try:
        image_bytes = base64.b64decode(b64_data)
        with open(file_path, "wb") as f:
            f.write(image_bytes)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save image: {str(e)}")
    
    image_url = f"/uploads/{filename}"
    upload_date = datetime.now().strftime("%d %b %Y, %I:%M %p")
    
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO campus_photos (
            submission_id, student_name, enrollment_no, college_dept,
            category, caption, credit, image_url, upload_date, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        submission_id,
        payload.student_name,
        payload.enrollment_no,
        payload.college_dept,
        payload.category,
        payload.caption or "",
        payload.credit or "",
        image_url,
        upload_date,
        "Shortlisted for Press"
    ))
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    
    return {
        "success": True,
        "id": new_id,
        "submission_id": submission_id,
        "image_url": image_url,
        "message": "Photo successfully deposited into University Media Vault!"
    }

@app.patch("/api/photos/{photo_id}/status")
def update_photo_status(photo_id: int, payload: StatusUpdateRequest):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("UPDATE campus_photos SET status = ? WHERE id = ?", (payload.status, photo_id))
    conn.commit()
    conn.close()
    return {"success": True, "photo_id": photo_id, "new_status": payload.status}

@app.delete("/api/photos/{photo_id}")
def delete_photo(photo_id: int):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM campus_photos WHERE id = ?", (photo_id,))
    conn.commit()
    conn.close()
    return {"success": True, "deleted_id": photo_id}
