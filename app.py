from flask import Flask, request, jsonify
from sensorsync.routes import configure_routes

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config') # get configuration details
    configure_routes(app) # get the routes
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host="0.0.0.0", port = 5001, debug=True)
