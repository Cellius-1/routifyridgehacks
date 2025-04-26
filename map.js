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

document.getElementById('toggle-button').addEventListener('click', function(e) {
    e.preventDefault();
    const mapContainer = document.getElementById('map-container');
    const driverInfo = document.getElementById('driver-info');

    if (mapContainer.style.display === "none") {
        mapContainer.style.display = "block";
        driverInfo.style.display = "block";

        if (!mapInitialized) {
            map = L.map('map').setView(routeCoordinates[0], 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            const busIcon = L.icon({
                iconUrl: 'bus-marker.png',
                iconSize: [32, 37],
                iconAnchor: [16, 37]
            });

            busMarker = L.marker(routeCoordinates[0], { icon: busIcon }).addTo(map)
                .bindPopup('Bus Location')
                .openPopup();

            L.polyline(routeCoordinates, { color: 'blue' }).addTo(map);

            intervalId = setInterval(moveBus, 2000);
            mapInitialized = true;
        }

        driverInfo.innerHTML = `
            <div class="driver-card card mt-3">
                <div class="card-body d-flex align-items-center">
                    <img src="default-profile.jpg" alt="Driver Profile Picture" class="driver-profile-pic me-3">
                    <div>
                        <div class="driver-name">Tharun N.</div>
                        <div class="text-muted">Last updated: Just now</div>
                    </div>
                </div>
            </div>`;
    } else {
        mapContainer.style.display = "none";
        driverInfo.style.display = "none";

        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }
});

function moveBus() {
    currentIndex++;
    if (currentIndex >= routeCoordinates.length) {
        currentIndex = 0;
    }
    busMarker.setLatLng(routeCoordinates[currentIndex]);
    map.panTo(routeCoordinates[currentIndex]);
}

function toggleMap(mapId, driverId) {
    const mapContainer = document.getElementById(mapId);
    const driverCard = document.getElementById(driverId);

    if (mapContainer.style.display === "none") {
        mapContainer.style.display = "block";
        driverCard.style.display = "block";
        
        map = L.map(mapId).setView([40.585417, -74.632778], 13); 
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const busIcon = L.icon({
            iconUrl: 'bus-marker.png',
            iconSize: [32, 37],
            iconAnchor: [16, 37],
        });

        busMarker = L.marker(routeCoordinates[0], { icon: busIcon }).addTo(map);
    
        setInterval(moveBus, 2000);
        driverCard.innerHTML = `
            <div class="driver-card card mt-3">
                <div class="card-body d-flex align-items-center">
                    <img src="default-profile.jpg" alt="Driver Profile Picture" class="driver-profile-pic me-3">
                    <div>
                        <div class="driver-name">Tharun N.</div>
                        <div class="text-muted">Last updated: 42 seconds ago</div>
                    </div>
                </div>
            </div>`;
    } else {
        mapContainer.style.display = "none";
        driverCard.style.display = "none";
    }
}
