function toggleDashboard() {
    const dashboard = document.getElementById('update-dashboard');
    const arrow = document.querySelector('.toggle-arrow');

    if (dashboard.classList.contains('show')) {
        dashboard.classList.remove('show');
        arrow.style.transform = 'rotate(0deg)'; 
    } else {
        dashboard.classList.add('show');
        arrow.style.transform = 'rotate(180deg)'; 
    }
}


function showDashboard() {
    var schoolDisplayed = documnt.getElementById('school-select').value;
    var vanholtenTable = document.getElementById('vanholten-table');
    var milltownTable = document.getElementById('milltown-table');

    if (schoolDisplayed == "vanholten") {
        vanholtenTable.style.display = 'table';
        milltownTable.style.display = 'none';
    } else {
        vanholtenTable.style.display = 'none';
        milltownTable.style.display = 'table';
    }
}

let movingMarker;

function toggleMap(mapId, driverId) {
    const mapCountainer = document.getElementById(mapId);
    const driverCard = document.getElementById(driverId);
    if (mapContainer.style.display === "none") {
        mapContainer.style.display = "block";
        driverCard.style.display = "block";

        const map = L.map(mapId).setView([40.585417, -74.632778], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        const busIcon = L.icon({
            iconUrl: 'bus-marker.png',
            iconSize: [32, 37],
            iconAnchor: [16, 37],
        });

        
        let lat = 40.585417;
        let lng = -74.632778;
        movingMarker = L.marker([lat, lng], { icon: busIcon }).addTo(map);

        
        let moveInterval = setInterval(() => {
            lat += 0.0001; 
            lng += 0.0001; 

            movingMarker.setLatLng([lat, lng]);
        }, 2000); 
        

        // Show driver info
        driverCard.innerHTML = `
            <div class="driver-card card mt-3">
                <div class="card-body d-flex align-items-center">
                    <img src="default-profile.jpg" alt="Driver Profile Picture" class="driver-profile-pic me-3">
                    <div>
                        <div class="driver-name">Tharun N.</div>
                        <div class="text-muted">Last updated: just now</div>
                    </div>
                </div>
            </div>`;
    } else {
        mapContainer.style.display = "none";
        driverCard.style.display = "none";
    }
}
