document.addEventListener('DOMContentLoaded', () => {
    const statusElement = document.getElementById('status');
    const speedElement = document.getElementById('speed');
    const speedKmhElement = document.getElementById('speed-kmh');

    if ('geolocation' in navigator) {
        navigator.geolocation.watchPosition(position => {
            const speed = position.coords.speed || 0;
            const speedKmh = speed * 3.6;

            speedElement.textContent = speed.toFixed(2);
            speedKmhElement.textContent = speedKmh.toFixed(2);

            statusElement.textContent = 'Tracking movement...';
            statusElement.style.color = '#00ff00';

        }, error => {
            statusElement.textContent = 'Error getting position!';
            statusElement.style.color = '#ff0000';
            console.error('Error:', error);
        }, {
            enableHighAccuracy: true,
            maximumAge: 1000,
            timeout: 27000
        });
    } else {
        statusElement.textContent = 'Geolocation not supported!';
        statusElement.style.color = '#ff0000';
    }
});
