import os
import base64

import numpy as np

from io import BytesIO
from PIL import Image
from flask import Flask, request, jsonify


app = Flask(__name__)


if os.getenv('VCAP_APP_PORT'):
    # for PCF
    host = '0.0.0.0'
    port = int(os.getenv('VCAP_APP_PORT'))
else:
    # for localhost
    host = '0.0.0.0'
    port = 5000


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/recognize', methods=['POST'])
def recognize():
    if request.headers['Content-Type'] != 'application/json':
        print(request.headers['Content-Type'])
        return jsonify(res='error'), 400

    # decode base64 to image
    enc_data = request.json["base64"]
    dec_data = base64.b64decode(enc_data)
    img = Image.open(BytesIO(dec_data))
    x = np.asarray(img, dtype='uint8')

    # run something with 'x'

    return jsonify(result=str(x.shape))


if __name__ == '__main__':
    app.run(host=host, port=port)
