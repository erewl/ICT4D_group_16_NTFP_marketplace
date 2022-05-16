
   
import os
from site import USER_BASE

from flask import Flask, request, jsonify, render_template, Response
from sqlalchemy import create_engine, text, select, join, update
from sqlalchemy.orm import Session
from sqlalchemy.orm.util import aliased
from sqlalchemy.orm.exc import NoResultFound, MultipleResultsFound
from flask_cors import CORS
from postgresql.schemas import Offers, Users, Bids
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager


# TODO export to DatabaseConfig class or so
USER = os.getenv('DB_USER')
PWD = os.getenv('DB_PWD')
DATABASE = os.getenv('DATABASE')
HOST = os.getenv('HOST')

engine = create_engine(f'postgresql+psycopg2://{USER}:{PWD}@{HOST}/{DATABASE}')
conn = engine.connect()

api_prefix = '/api/v1/'

if os.environ['ENV'] and os.environ['ENV'] == 'prod':
    app = Flask(__name__, static_url_path='/build/')
    app = Flask(__name__, static_folder="build/static", template_folder="build")

    @app.route("/", methods=['GET'])
    def hello():
        return render_template('index.html')
else: 
    app = Flask(__name__)
    CORS(app)

@app.route(f'{api_prefix}offers', methods=['POST'])
def post_offers():
    body = request.form
    entry = dict(body)
    print("Data from form: ", entry)

    with Session(engine) as session:
        callerId = entry['session.callerid']
        userId = 1 # base init
        findUserByPhoneNumber = select(Users).where(Users.phone_number == callerId)
        try:
            userResult = session.scalars(findUserByPhoneNumber).one()
            userId = userResult.user_id
            print('Found user under id: ', userId, " in the database")
        except NoResultFound:
            print('Adding new user to the database')
            newUser = Users(
                phone_number = callerId
            )
            session.add(newUser)
            session.commit()
            userId = newUser.user_id

        newOffer = Offers(
            seller_id = userId,
            product_name = entry['product'],
            price = entry['price'],
            quantity = entry['quantity'],
            unit = entry['units']
        )

        session.add(newOffer)
        session.commit()

    xmlResponse = """<?xml version="1.0"?>
        <response>
            <returncode>200</returncode>
            <message>Successful submitted!</message>
        </response>"""

    return Response(xmlResponse, mimetype='application/xml')

@app.route(f'{api_prefix}users', methods=['GET'])
@jwt_required()
def get_users():
    with Session(engine) as session:
        query = text("SELECT * FROM users")
        users = engine.execute(query)
    return {}

@app.route(f'{api_prefix}offers/<offerId>', methods=['PUT'])
def update_offer(offerId):
    with Session(engine) as session:
        offer = request.json
        stmt = update(Offers).where(Offers.offer_id == offerId)
        if(offer['unit']):
            stmt = stmt.values(unit= offer['unit'])
        if(offer['price']):
            stmt = stmt.values(price= offer['price'])
        if(offer['quantity']):
            stmt = stmt.values(quantity= offer['quantity'])

        result = session.execute(
            stmt.execution_options(synchronize_session="fetch")
        )
        print(result.rowcount)
        session.commit()
        return {'message': "Successful update!"}

@app.route(f'{api_prefix}offers', methods=['GET'])
def get_offers():
    with Session(engine) as session:
        offers = []
        allOffers = session.query(Offers, Users).join(Users, Offers.seller_id == Users.user_id).all()
        for offerResult, userResult in allOffers:
            offers.append({
                'id': offerResult.offer_id,
                'sellerNumber': userResult.phone_number,
                'product': offerResult.product_name,
                'quantity': offerResult.quantity,
                'price': offerResult.price,
                'unit': offerResult.unit,
            })
    return jsonify({'data': offers})

@app.route(f'{api_prefix}bids', methods=['GET'])
def get_bids():
    with Session(engine) as session:
        bids = []
        buyer = aliased(Users)
        seller = aliased(Users)
        allBids = session.query(Bids, buyer, seller, Offers)\
            .join(buyer, Bids.buyer_id == buyer.user_id)\
            .join(seller, Bids.seller_id == seller.user_id)\
            .join(Offers, Bids.offer_id == Offers.offer_id)\
            .all()
        for bidResult, buyerResult, sellerResult, offerResult in allBids:
            bids.append({
                'offerId': bidResult.offer_id,
                'product': offerResult.product_name,
                'buyer': buyerResult.phone_number,
                'seller': sellerResult.phone_number,
                'quantity': bidResult.quantity,
            })
    return jsonify({'data': bids})


app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
jwt = JWTManager(app)

@app.route(f'{api_prefix}auth/login', methods=["POST"])
def create_token():
    user = request.json.get("user", None)
    password = request.json.get("password", None)
    if user != "admin" or password != "admin":
        return {"msg": "Unknown user or wrong password"}, 401

    access_token = create_access_token(identity=user)
    response = {"access_token":access_token}
    return response

@app.route(f'{api_prefix}auth/logout', methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

if __name__ == '__main__':
    if os.environ['ENV'] and os.environ['ENV'] == 'prod':
        app.run(debug=False)
    else:
        host = "localhost"
        port = 5000
        debug = True
        options = {}
        app.run(host, port, debug, options)