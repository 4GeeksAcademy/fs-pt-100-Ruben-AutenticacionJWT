"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select, or_
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def register():
    try:
        data = request.get_json()

        if not data["email"] or not data["password"]:
            raise Exception({"error": "missing data"})

        stmt = select(User).where(User.email == data["email"])
        existing_user = db.session.execute(stmt).scalar_one_or_none()

        if existing_user:
            raise Exception({"error": "Email existing, try to login"})
        
        hashed_password = generate_password_hash(data["password"])

        new_user = User(
            email=data["email"],
            password=hashed_password,
            username=data.get("username", None),
            firstname=data.get("firstname", None),
            lastname=data.get("lastname", None),
            dateofbirth=data.get("dateofbirth", None),
            phone=data.get("phone", None),
            is_active=True
        )

        db.session.add(new_user)
        db.session.commit()

        # token = create_access_token(identity=str(new_user.id))

        

        return jsonify({"msg": "register OK", "success": True}), 201

    except Exception as e:
        print(e)

        db.session.rollback()
        return jsonify({"error": "somthing went wrong"}), 400

@api.route('/signin', methods=['POST'])
def login():
    try:
        data = request.get_json()

        if not data.get("email") or not data.get("password"):
            return jsonify({"error": "missing data"})

        stmt = select(User).where(User.email == data["email"] )
        user = db.session.execute(stmt).scalar_one_or_none()


        if not user:
            raise Exception({"error": "Email/Username not found"})
        
        if not check_password_hash(user.password, data["password"]):
            return({"success": False, "error": "wrong email/password"})


        token = create_access_token(identity=str(user.id))

        return jsonify({"msg": "login OK", "token": token, "success": True}), 201

    except Exception as e:
        print(e)

        db.session.rollback()
        return jsonify({"error": "somthing went wrong"}), 400
    
@api.route('/private', methods=['GET'])
@jwt_required()
def get_user_info():
    try:

        id = get_jwt_identity()

        stmt = select(User).where(User.id == id)
        user = db.session.execute(stmt).scalar_one_or_none()

        if not user:
            return jsonify({"msg": "what is happening?"})
        
        return jsonify(user.serialize()), 200
    
    except Exception as e:
        print(e)
        return jsonify({"error": "somthing went wrong"})
