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
    var schoolDisplayed = document.getElementById('school-select').value;
    var vanholtenTable = document.getElementById('vanholten');
    var milltownTable = document.getElementById('milltown');
    var eisenhowerTable = document.getElementById('eisenhower');

    vanholtenTable.style.display = 'table';
    milltownTable.style.display = 'none';
    eisenhowerTable.style.display = 'none';
    
    if (schoolDisplayed == "vanholten") {
        vanholtenTable.style.display = 'table';
        milltownTable.style.display = 'none';
        eisenhowerTable.style.display = 'none';
    } else if (schoolDisplayed == "milltown") {
        vanholtenTable.style.display = 'none';
        milltownTable.style.display = 'table';
        eisenhowerTable.style.display = 'none';   
    }  else if (schoolDisplayed == "eisenhower") {
        vanholtenTable.style.display = 'none';
        milltownTable.style.display = 'none';
        eisenhowerTable.style.display = 'table';  
}
}
