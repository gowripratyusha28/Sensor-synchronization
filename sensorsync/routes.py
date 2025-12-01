from flask import render_template, request
import time

sid_to_sensor = {}

def configure_routes(app, socketio):
    @app.route('/')
    def home():
        server_time_ms = int(time.time() * 1000)
        return render_template("home.html", server_time_ms=server_time_ms)

    @socketio.on("connect")
    def handle_connect():
        sid = request.sid
        print(f"[WS] New connection: sid={sid}")

    @socketio.on("register")
    def handle_register(data):
        """
        Expected payload from agent:
        {
            "sensor_id": "...",   # hostname-based ID from the Pi
            "sensor_type": "...", # optional for now
            "meta": {...}         # optional
        }
        """
        sid = request.sid
        sensor_id = data.get("sensor_id")

        if not sensor_id:
            print(f"[WS] Register missing sensor_id from sid={sid}")
            return

        sid_to_sensor[sid] = sensor_id

        print(f"[WS] Sensor registered: sid={sid}, sensor_id={sensor_id}")

        # emit to browser
        socketio.emit(
            "sensor_registered",
            {
                "sensor_id": sensor_id,
                "meta": data.get("meta", {})
            }
        )

    @socketio.on("get_sensors")
    def handle_get_sensors():
        sensors = list(sid_to_sensor.values())
        print(f"[WS] get_sensors requested, returning {sensors}")
        socketio.emit("sensor_list", {"sensors": sensors}, to=request.sid)