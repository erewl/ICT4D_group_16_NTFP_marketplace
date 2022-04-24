
   
import os
from site import USER_BASE

from flask import Flask, request, render_template, jsonify, Response
from sqlalchemy import create_engine, text, insert


# TODO export to DatabaseConfig class or so
USER = os.getenv('DB_USER')
PWD = os.getenv('DB_PWD')
DATABASE = os.getenv('DATABASE')
HOST = os.getenv('HOST')

engine = create_engine(f'postgresql+psycopg2://{USER}:{PWD}@{HOST}/{DATABASE}')
conn = engine.connect()

app = Flask(__name__, static_url_path='/build/')
app = Flask(__name__, static_folder="build/static", template_folder="build")


@app.route("/", methods=['GET'])
def hello():
    return render_template('index.html')

@app.route('/api/v1/offers', methods=['POST'])
def analysis():
    body = request.form
    print("Args: ", request.args)
    print("Data: ", request.data)
    print("Form: ", request.form)
    print("Json: ", request.json)
    print("Values: ", request.values)

    xmlResponse = """<?xml version="1.0"?>
        <response>
            <returncode>200</returncode>
            <message>Successful submitted!</message>
        </response>"""

    return Response(xmlResponse, mimetype='application/xml')

@app.route('/api/v1/users', methods=['GET'])
def get_users():
    query = text("SELECT * FROM users")
    users = engine.execute(query)
    return {}

@app.route('/api/v1/offers', methods=['GET'])
def get_offers():
    query = text("SELECT * FROM offers")
    offersQuery = engine.execute(query)
    offers = []
    for result in offersQuery:
        (id, user_id, product, quantity, price) = result
        offers.append({
            'id': id,
            'user_id': user_id,
            'product': product,
            'quantity': quantity,
            'price': price
        })
    return jsonify({'data': offers})

@app.route('/api/v1/bids', methods=['GET'])
def get_bids():
    query = text("SELECT * FROM bids")
    bids = engine.execute(query)
    return {}

if __name__ == '__main__':
    if os.environ['ENV'] and os.environ['ENV'] == 'prod':
        app.run()
    else:
        host = "localhost"
        port = 8082
        debug = True
        options = {}
        app.run(host, port, debug, options)