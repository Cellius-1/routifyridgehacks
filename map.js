// map.js

let mapInitialized = false;
let busMarker;
let routeCoordinates = [
  [40.592003, -74.626640],
  [40.590819, -74.629155],
  [40.589075, -74.630882],
  [40.587142, -74.632470],
  [40.585417, -74.632778],
  [40.583742, -74.632900]
];
let currentIndex = 0;
let map;
let intervalId;

function moveBus() {
  currentIndex = (currentIndex + 1) % routeCoordinates.length;
  busMarker.setLatLng(routeCoordinates[currentIndex]);
  map.panTo(routeCoordinates[currentIndex]);
}

/**
 * showDashboard-style toggle for each child-card.
 * startLat/startLng default to Tharun’s home if not passed.
 */
function toggleMap(mapId, driverId, startLat = 40.585417, startLng = -74.632778) {
  const mapContainer = document.getElementById(mapId);
  const driverCard   = document.getElementById(driverId);

  if (mapContainer.style.display === "none") {
    mapContainer.style.display = "block";
    driverCard.style.display   = "block";

    // initialize fresh map
    map = L.map(mapId).setView([startLat, startLng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const busIcon = L.icon({
      iconUrl: 'bus-marker.png',
      iconSize: [32, 37],
      iconAnchor: [16, 37],
    });

    // put marker at your start coords
    busMarker = L.marker([startLat, startLng], { icon: busIcon }).addTo(map);

    // draw the same route
    L.polyline(routeCoordinates, { color: 'blue' }).addTo(map);

    // animate it
    intervalId = setInterval(moveBus, 2000);

    // show driver info; if you want Thulasi’s name here, you could detect driverId==='driver2'
    const name = driverId === 'driver2' ? 'Thulasi N.' : 'Tharun N.';
    driverCard.innerHTML = `
      <div class="driver-card card mt-3">
        <div class="card-body d-flex align-items-center">
          <img src="default-profile.jpg" class="driver-profile-pic me-3">
          <div>
            <div class="driver-name">${name}</div>
            <div class="text-muted">Last updated: Just now</div>
          </div>
        </div>
      </div>`;
  } else {
    // hide and clean up
    mapContainer.style.display = "none";
    driverCard.style.display   = "none";
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
}
