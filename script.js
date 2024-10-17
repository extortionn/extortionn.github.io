fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('ip-address').textContent = `Your IP: ${data.ip}`;

        // Send the IP address to the Zapier webhook
        fetch('https://hooks.zapier.com/hooks/catch/14191160/21fguqr/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ip: data.ip })
        })
        .then(response => {
            if (response.ok) {
                console.log('IP address sent to Zapier successfully');
            } else {
                console.error('Error sending IP address to Zapier:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error sending IP address to Zapier:', error);
        });
    })
    .catch(error => {
        console.error('Error fetching IP address:', error);
        document.getElementById('ip-address').textContent = 'Unable to fetch IP address';
    });