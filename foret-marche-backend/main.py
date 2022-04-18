
   
import os

from flask import Flask, jsonify, request, render_template, Response
from flask_cors import CORS

app = Flask(__name__, static_url_path='/build/')
# app = Flask(__name__)
# CORS(app)

app = Flask(__name__, static_folder="build/static", template_folder="build")

data = [] # TODO replace with database at some point

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

    xmlResponse = """
    <?xml version="1.0"?>
        <response>
            <returncode>200</returncode>
            <message>Successful submitted!</message>
        </response>
    """

    return Response(xmlResponse, mimetype='text/xml')

if __name__ == '__main__':
    if os.environ['ENV'] and os.environ['ENV'] == 'prod':
        app.run()
    else:
        host = "localhost"
        port = 8082
        debug = True
        options = {}
        app.run(host, port, debug, options)