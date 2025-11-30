window.addEventListener('DOMContentLoaded', () => {
    const sensorListElem = document.getElementById('sensor-list');
    const syncListElem   = document.getElementById('recent-syncs');

    const sensorRows = new Map();

    const socket = io(); 

    socket.on('connect', () => {
      console.log('[UI] Connected to Socket.IO as', socket.id);
    });

    socket.on('sensor_registered', (data) => {
      const sensorId = data.sensor_id;
      console.log('[UI] Sensor registered:', sensorId);

      if (sensorRows.has(sensorId)) return;

      const li = document.createElement('li');
      li.textContent = `${sensorId} — waiting for data...`;
      sensorListElem.appendChild(li);
      sensorRows.set(sensorId, li);
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
  