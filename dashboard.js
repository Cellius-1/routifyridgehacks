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

// Add function to get parent's code from localStorage (set during login)
function getParentCode() {
    return localStorage.getItem('parentCode') || '';
}

async function fetchStudents() {
    try {
        const response = await fetch('https://voltschool.vercel.app/api/students?code=572394');
        return await response.json();
    } catch (error) {
        console.error('Error fetching students:', error);
        return [];
    }
}

async function fetchBuses() {
    try {
        const response = await fetch('https://voltschool.vercel.app/api/buses?code=572394');
        return await response.json();
    } catch (error) {
        console.error('Error fetching buses:', error);
        return [];
    }
}

// Update the showDashboard function to use real data
async function showDashboard() {
    const students = await fetchStudents();
    const buses = await fetchBuses();

    // Populate student cards
    const container = document.querySelector('.container.mt-3');
    container.innerHTML = ''; // Clear existing cards

    students.forEach(student => {
        const bus = buses.find(b => b.id === student.busId);
        const studentCard = `
            <div class="child-card p-3 mb-3 d-flex justify-content-between align-items-center">
                <div class="child-info d-flex align-items-center">
                    <img src="tharun.png" alt="Profile Picture" class="profile-pic me-3">
                    <div>
                        <div class="child-name">${student.firstName} ${student.lastName}</div>
                        <div class="bus-info">Bus: ${student.busId}</div>
                        <div class="school-info">${student.school}</div>
                    </div>
                </div>
                <div class="status-box ${bus?.status === 'active' ? 'status-ontime' : 'status-delayed'}">
                    ${bus?.status === 'active' ? 'ON TIME' : 'DELAYED'}
                </div>
                <div class="view-map-icon" onclick="toggleMap('map-${student.id}', 'driver-${student.id}')">
                    <i class="fas fa-map-marker-alt"></i>
                </div>
            </div>
            <div id="map-${student.id}" class="child-map" style="display:none; height: 300px;"></div>
            <div id="driver-${student.id}" class="driver-card" style="display:none;"></div>
        `;
        container.innerHTML += studentCard;
    });

    // Update bus status table
    const busTable = document.querySelector('#busTable tbody');
    busTable.innerHTML = '';

    buses.forEach(bus => {
        const busRow = `
            <tr>
                <td>${bus.number}</td>
                <td><span class="status-tag ${bus.status === 'active' ? 'ontime' : 'delayed'}">${bus.status.toUpperCase()}</span></td>
                <td><span class="driver-tag">${bus.driver.name}</span></td>
            </tr>
        `;
        busTable.innerHTML += busRow;
    });
}

// Helper functions
function getBusStatus(busId, buses) {
    const bus = buses.find(b => b.id === busId);
    return bus?.status === 'active' ? 'status-ontime' : 'status-delayed';
}

function getStatusText(busId, buses) {
    const bus = buses.find(b => b.id === busId);
    return bus?.status === 'active' ? 'ON TIME' : 'DELAYED';
}

function getDriverInfo(busId, buses) {
    const bus = buses.find(b => b.id === busId);
    if (!bus) return 'Driver information not available';
    return `
        <div class="driver-info p-3">
            <h5>Driver Information</h5>
            <p><strong>Name:</strong> ${bus.driver.name}</p>
            <p><strong>Phone:</strong> ${bus.driver.phone}</p>
            <p><strong>Route:</strong> ${bus.route.description}</p>
        </div>
    `;
}

function toggleDropdown() {
    const profileInfo = document.querySelector('.profile-info');
    profileInfo.classList.toggle('active');
}

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', () => {
    showDashboard();
    // Refresh data every 30 seconds
    setInterval(showDashboard, 30000);
});