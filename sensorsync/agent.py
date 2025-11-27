import socket
import argparse
import time

import socketio

def get_sensor_id() -> str:
    return socket.gethostname()

def main():
    parser = argparse.ArgumentParser(description="SensorSync Agent")
    parser.add_argument(
        "--server-url",
        type=str,
        default="http://localhost:5001",
        help="URL of the SensorSync server",
    )
    parser.add_argument(
        "--sensor-type",
        default="simulated",
        help="Optional description of the sensor type",
    )
    args = parser.parse_args()

    sensor_id = get_sensor_id()
    sio = socketio.Client()

    @sio.event
    def connect():
        print("[Agent] Connected to server")
        payload = {
            "sensor_id": sensor_id,
            "sensor_type": args.sensor_type,
            "meta": {
                "hostname": sensor_id
            },
        }
        sio.emit("register", payload)

    @sio.event
    def disconnect():
        print("[Agent] Disconnected from server")

    sio.connect(args.server_url)

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("Shutting down agent...")
    finally:
        sio.disconnect()

if __name__ == "__main__":
    main()