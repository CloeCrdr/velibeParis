console.log(L)
var map = L.map('map').setView([48.866667, 2.333333], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.Routing.control({
    waypoints: [
      L.latLng(48.83,  2.33),
      L.latLng(48.85,  2.34),
      L.latLng(48.85,  2.38)
    ]
  }).addTo(map);
  
  let roadmap = document.getElementsByClassName('leaflet-right')
  console.log(roadmap);
  roadmap[0].style.background = "white";