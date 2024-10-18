document.getElementById('whois-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const domain = document.getElementById('domain').value;
    const resultDiv = document.getElementById('whois-result');
    resultDiv.textContent = 'Fetching WHOIS data...';

    fetch(`https://api.whoxy.com/?key=036bde20ce5dbf2e566157d9946c3511b&whois=${domain}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                resultDiv.textContent = JSON.stringify(data, null, 2);
            } else {
                resultDiv.textContent = 'Error fetching WHOIS data.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.textContent = 'Error fetching WHOIS data.';
        });
});