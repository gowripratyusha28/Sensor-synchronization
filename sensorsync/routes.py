from flask import request, jsonify
import time

sensor_data = {}

def configure_routes(app):
    @app.route('/')
    def hello():
        return jsonify(message="Hello, World!")
