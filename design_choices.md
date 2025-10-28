## Goal
Collect data from sensors time synchronously
Build a flask web interface for it and to display the data on UI(for now)


### Approach A
1. Config file which consists of all the IPs of the clients
2. Flask server will initiate SSH connections to the clients
3. Server will send a timestamp(T0), Δ [T0 - which the start of data collection]
4. Process starts on the client at T0
5. Server reads out the stdout data every T0, T0 + Δ, T0 + 2Δ,... 

Cons: heavier per connection, reconnection complex


### Approach B
1. Each sensor runs from agent that connects to the Flask server over a websocket
2. Sensor sends hello (sensor ID)
3. Servers send T0, Δ
4. Sensor sends periodic data frames(T0, T0 + Δ, T0 + 2Δ,... )

Cons: Requires code deployment on sensors, listening socket on server


For synchronization: For timebeing can use NTP, can switch to PTP later(reference given by Edwin)
Δ - For the initial basic, I will make it large.. once it works will reduce it
ε - acceptance tolerance around each timestamp