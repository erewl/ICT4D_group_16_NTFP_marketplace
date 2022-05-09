
   
import os
from site import USER_BASE

from flask import Flask, request, render_template, jsonify, Response
from sqlalchemy import create_engine, text, select, join, update
from sqlalchemy.orm import Session
from sqlalchemy.orm.exc import NoResultFound, MultipleResultsFound
from flask_cors import CORS
from postgresql.schemas import Offers, Users

# TODO export to DatabaseConfig class or so
USER = os.getenv('DB_USER')
PWD = os.getenv('DB_PWD')
DATABASE = os.getenv('DATABASE')
HOST = os.getenv('HOST')

engine = create_engine(f'postgresql+psycopg2://{USER}:{PWD}@{HOST}/{DATABASE}')
conn = engine.connect()
# session = Session(engine)


if os.environ['ENV'] and os.environ['ENV'] == 'prod':
    app = Flask(__name__, static_url_path='/build/')
    app = Flask(__name__, static_folder="build/static", template_folder="build")

    @app.route("/", methods=['GET'])
    def hello():
        return render_template('index.html')
else: 
    app = Flask(__name__)
    CORS(app)

@app.route('/api/v1/offers', methods=['POST'])
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

@app.route('/api/v1/users', methods=['GET'])
def get_users():
    with Session(engine) as session:
        query = text("SELECT * FROM users")
        users = engine.execute(query)
    return {}

@app.route('/api/v1/offers/<offerId>', methods=['PUT'])
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
        session.flush()
        return {'message': "Successful update!"}

@app.route('/api/v1/offers', methods=['GET'])
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

@app.route('/api/v1/bids', methods=['GET'])
def get_bids():
    query = text("SELECT * FROM bids")
    bids = engine.execute(query)
    return {}

if __name__ == '__main__':
    if os.environ['ENV'] and os.environ['ENV'] == 'prod':
        app.run(debug=True)
    else:
        host = "localhost"
        port = 5000
        debug = True
        options = {}
        app.run(host, port, debug, options)