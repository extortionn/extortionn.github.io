fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('ip-address').textContent = `Your IP: ${data.ip}`;

        // Send the IP address to the Google Apps Script
        fetch('https://script.google.com/macros/s/AKfycbynK0NTfcEI75mac8G7W4dOWYOtl8Bs7I-uYx0QhgJC8DZX899TZkojFPzo7W4rf4C5lg/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ip: data.ip })
        });
    })
    .catch(error => {
        console.error('Error fetching IP address:', error);
        document.getElementById('ip-address').textContent = 'Unable to fetch IP address';
    });
