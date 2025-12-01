window.addEventListener('DOMContentLoaded', () => {
    const sensorListElem = document.getElementById('sensor-list');
    // const syncListElem   = document.getElementById('recent-syncs');

    //const sensorRows = new Map();

    const socket = io(); 

    socket.on('connect', () => {
      console.log('[UI] Connected to Socket.IO as', socket.id);
      socket.emit('get_sensors');
    });

    socket.on("sensor_list", (data) => {
      console.log('[UI] Received sensor list:', data.sensors);
      sensorListElem.innerHTML = "";
      data.sensors.forEach(sensorId => {
        const li = document.createElement("li");
        li.setAttribute("data-sensor-id", sensorId);
        li.textContent = sensorId + " — waiting for data…";
        sensorListElem.appendChild(li);
      });
    });

    socket.on('sensor_registered', (data) => {
      const sensorId = data.sensor_id;
      console.log('[UI] Sensor registered:', sensorId);

      if (!document.querySelector(`li[data-sensor-id="${sensorId}"]`)) {
        const li = document.createElement("li");
        li.setAttribute("data-sensor-id", sensorId);
        li.textContent = sensorId + " — waiting for data…";
        sensorListElem.appendChild(li);
      }
    });
  
    // Example placeholder sensors
    // const dummySensors = ['sensorA', 'sensorB', 'sensorC'];
    // dummySensors.forEach(id => {
    //   const li = document.createElement('li');
    //   li.textContent = `${id} — offset: unknown`;
    //   sensorListElem.appendChild(li);
    // });
  
    // Example placeholder recent sync events
    // const dummySyncs = ['sensorA synced at 15:20:10', 'sensorB synced at 15:18:45'];
    // dummySyncs.forEach(item => {
    //   const li = document.createElement('li');
    //   li.textContent = item;
    //   syncListElem.appendChild(li);
    // });
  });
  