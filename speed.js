// Function to display the speed
function displaySpeed(position) {
    const speedElement = document.getElementById('speed');
    const statusElement = document.getElementById('status');
    
    if (position.coords.speed === null) {
        speedElement.innerHTML = 'N/A';
        statusElement.innerHTML = 'Speed data is not available.';
    } else {
        speedElement.innerHTML = `${(position.coords.speed * 3.6).toFixed(2)} km/h`; // Convert from m/s to km/h
        statusElement.innerHTML = 'Speed is being tracked.';
    }
}

// Function to handle errors
function handleError(error) {
    const statusElement = document.getElementById('status');
    switch(error.code) {
        case error.PERMISSION_DENIED:
            statusElement.innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            statusElement.innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            statusElement.innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            statusElement.innerHTML = "An unknown error occurred.";
            break;
    }
}

// Check if the Geolocation API is supported
if ('geolocation' in navigator) {
    navigator.geolocation.watchPosition(displaySpeed, handleError, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
    });
} else {
    document.getElementById('status').innerHTML = "Geolocation is not supported by this browser.";
}
