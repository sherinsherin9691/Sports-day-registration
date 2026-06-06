# server/seed.py
import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

def seed_database():
    mongo_uri = os.getenv("MONGO_URI", "mongodb+srv://ssivaganesh246_db_user:lYMLNLJpj85VcPIP@cluster0.2ujd9cq.mongodb.net/?appName=Cluster0 ")
    client = MongoClient(mongo_uri)
    db = client.get_default_database()
    
    # Optional clear-out: drops existing collection so you don't duplicate records on run
    db.items.drop()
    
    sample_items = [
        {
            "name": "Project Dashboard Layout",
            "description": "Base grid layout structure fixing the alignment issues outlined in the layout todo document."
        },
        {
            "name": "Authentication Guard",
            "description": "Middleware to handle secure token handshakes between Vite dev client and Python runtime API."
        },
        {
            "name": "Database Driver Connection",
            "description": "PyMongo architecture layer interfacing with local cluster instance."
        }
    ]
    
    result = db.items.insert_many(sample_items)
    print(# # # Database Seeded Successfully! # # #")
    print(f"Inserted {len(result.inserted_ids)} records into the 'items' collection.")

if __name__ == '__main__':
    seed_database()