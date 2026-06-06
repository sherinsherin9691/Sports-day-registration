import os
from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv


def create_app():
    """Flask application factory.

    - Loads environment variables
    - Configures CORS for the Vite frontend at http://localhost:5173
    - Initializes a PyMongo MongoClient and attaches `mongo_client` and `db` to the app
    """
    load_dotenv()

    app = Flask(__name__)
    app.config['MONGO_URI'] = os.getenv('MONGO_URI', 'mongodb+srv://ssivaganesh246_db_user:lYMLNLJpj85VcPIP@cluster0.2ujd9cq.mongodb.net/?appName=Cluster0')

    # Enable CORS for frontend requests (Vite defaults to port 5173)
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

    # Initialize MongoDB client and attach to app
    mongo_client = MongoClient(app.config['MONGO_URI'])
    # Try to use the database specified in the URI, otherwise fallback to MONGO_DB or 'sportsday'
    db = mongo_client.get_default_database()
    if db is None:
        db_name = os.getenv('MONGO_DB', 'sportsday')
        db = mongo_client[db_name]

    app.mongo_client = mongo_client
    app.db = db

    @app.teardown_appcontext
    def _close_db(exception=None):
        try:
            # Close the underlying client on app teardown
            app.mongo_client.close()
        except Exception:
            pass

    # Register API blueprint
    from .routes import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    return app