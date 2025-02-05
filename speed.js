document.addEventListener('DOMContentLoaded', () => {
    const statusElement = document.getElementById('status');
    const speedElement = document.getElementById('speed');
    const speedKmhElement = document.getElementById('speed-kmh');
    const needleElement = document.getElementById('needle');
    const marksElement = document.getElementById('marks');

    // Create speedometer marks
    for(let i = 0; i <= 180; i += 10) {
        const mark = document.createElement('div');
        mark.className = 'mark';
        mark.style.transform = `rotate(${i - 90}deg) translateY(10px)`;
        marksElement.appendChild(mark);
    }

    if ('geolocation' in navigator) {
        navigator.geolocation.watchPosition(position => {
            const speed = position.coords.speed || 0;
            const speedKmh = speed * 3.6;
            const rotation = Math.min((speedKmh / 180) * 180, 180) - 90;

            needleElement.style.transform = `rotate(${rotation}deg)`;
            speedElement.textContent = speed.toFixed(2);
            speedKmhElement.textContent = speedKmh.toFixed(2);
            
            statusElement.textContent = 'Tracking movement...';
            statusElement.style.color = '#00ff00';

            // Change needle color based on speed
            if(speedKmh > 120) needleElement.style.backgroundColor = '#ff0000';
            else if(speedKmh > 60) needleElement.style.backgroundColor = '#ffff00';
            else needleElement.style.backgroundColor = '#00ff00';

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
