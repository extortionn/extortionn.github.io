document.getElementById('whois-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const domain = document.getElementById('domain').value;
    const resultDiv = document.getElementById('whois-result');
    resultDiv.textContent = 'Fetching WHOIS data...';

    fetch(`https://api.apilayer.com/whois/query?domain=${domain}`, {
        method: 'GET',
        headers: {
            'apikey': 'RG2DKYp9LAMum4Uwp4MoA4b9M7r7YCE7'
        }
    })
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