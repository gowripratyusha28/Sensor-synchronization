from flask import render_template, request, jsonify
import time

sensor_data = {}

def configure_routes(app):
    @app.route('/')
    def home():
        server_time_ms = int(time.time() * 1000)
        return render_template("home.html", server_time_ms=server_time_ms)
