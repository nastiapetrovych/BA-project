const map = L.map('map').setView([outlets[0].Lat, outlets[0].Lon], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
  const div = L.DomUtil.create('div', 'legend');
  const colors = ['red', 'darkgreen', 'orange', 'lightgreen', 'yellow'];
  const labels = ['< 0.2', '0.2 - 0.4', '0.4 - 0.6', '0.6 - 0.8', '0.8 - 1'];

  div.innerHTML = '<b>Success probability:</b><br>';
  for (let i = 0; i < colors.length; i++) {
    div.innerHTML +=
      '<i style="background:' +
      colors[i] +
      '"></i> ' +
      labels[i] +
      '<br>';
  }

  return div;
};

legend.addTo(map);
outlets.forEach(outlet => {
  const markerColor = outlet.predicted_has_combo > 0.8 ? 'yellow' :
                      outlet.predicted_has_combo > 0.6 ? 'lightgreen' :
                      outlet.predicted_has_combo > 0.4 ? 'orange' :
                      outlet.predicted_has_combo > 0.2 ? 'darkgreen' : 'red';

  const markerIcon = L.icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  const marker = L.marker([outlet.Lat, outlet.Lon], {icon: markerIcon}).addTo(map);
  marker.bindPopup(`<b>${outlet.Outlet_Name}</b><br>Success probability: ${outlet.predicted_has_combo}`);
});