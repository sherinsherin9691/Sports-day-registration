from flask import Blueprint, jsonify, request, current_app
from bson.objectid import ObjectId

api_bp = Blueprint('api', __name__)


@api_bp.route('/status', methods=['GET'])
def get_status():
    try:
        # simple ping to check MongoDB connectivity
        current_app.mongo_client.admin.command('ping')
        db_status = "Connected"
    except Exception:
        db_status = "Disconnected"

    return jsonify({"status": "Backend is running!", "database": db_status}), 200


@api_bp.route('/items', methods=['GET'])
def get_items():
    try:
        items = []
        collection = current_app.db.get_collection('items')
        for item in collection.find():
            items.append({
                "id": str(item.get("_id")),
                "name": item.get("name"),
                "description": item.get("description")
            })
        return jsonify(items), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api_bp.route('/items', methods=['POST'])
def add_item():
    try:
        data = request.get_json(force=True)
        if not data or 'name' not in data:
            return jsonify({"error": "Missing required field 'name'"}), 400

        new_item = {
            "name": data['name'],
            "description": data.get('description', '')
        }

        result = current_app.db.get_collection('items').insert_one(new_item)
        return jsonify({"message": "Item added successfully", "id": str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500