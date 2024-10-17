fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('ip-address').textContent = `Your IP: ${data.ip}`;

        // Send the IP address to the Integromat webhook
        fetch('https://hook.eu2.make.com/hv1joh6an1325u0kzyw7v9p1wm28pgbf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ip: data.ip })
        })
        .then(response => {
            if (response.ok) {
                console.log('IP address sent to Integromat successfully');
            } else {
                console.error('Error sending IP address to Integromat:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error sending IP address to Integromat:', error);
        });
    })
    .catch(error => {
        console.error('Error fetching IP address:', error);
        document.getElementById('ip-address').textContent = 'Unable to fetch IP address';
    });