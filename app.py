from flask import Flask, request, jsonify
from flask_socketio import SocketIO
from sensorsync.routes import configure_routes

socketio = SocketIO(cors_allowed_origins="*")

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config') # get configuration details
    configure_routes(app, socketio) # get the routes
    socketio.init_app(app)
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host="0.0.0.0", port = 5001, debug=True)
