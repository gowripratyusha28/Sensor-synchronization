window.addEventListener('DOMContentLoaded', () => {
    const sensorListElem = document.getElementById('sensor-list');
    const syncListElem   = document.getElementById('recent-syncs');
  
    // Example placeholder sensors
    const dummySensors = ['sensorA', 'sensorB', 'sensorC'];
    dummySensors.forEach(id => {
      const li = document.createElement('li');
      li.textContent = `${id} — offset: unknown`;
      sensorListElem.appendChild(li);
    });
  
    // Example placeholder recent sync events
    const dummySyncs = ['sensorA synced at 15:20:10', 'sensorB synced at 15:18:45'];
    dummySyncs.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      syncListElem.appendChild(li);
    });
  });
  