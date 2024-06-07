document.addEventListener('DOMContentLoaded', () => {
    const speedElement = document.getElementById('speed');

    if ('geolocation' in navigator) {
        navigator.geolocation.watchPosition(position => {
            const speed = position.coords.speed;
            if (speed !== null) {
                speedElement.textContent = speed.toFixed(2);
            } else {
                speedElement.textContent = '0.0';
            }
        }, error => {
            console.error('Error getting position:', error);
        }, {
            enableHighAccuracy: true,
            maximumAge: 1000,
            timeout: 27000
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
});
