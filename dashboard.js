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

    vanholtenTable.style.display = 'table';
    milltownTable.style.display = 'none'
    
    if (schoolDisplayed == "vanholten") {
        vanholtenTable.style.display = 'table';
        milltownTable.style.display = 'none';
    } else {
        vanholtenTable.style.display = 'none';
        milltownTable.style.display = 'table';
    }
}
