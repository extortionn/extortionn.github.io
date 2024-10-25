document.getElementById('whois-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const domain = document.getElementById('domain').value;
    const resultDiv = document.getElementById('whois-result');
    resultDiv.textContent = 'Fetching WHOIS data...';

    fetch(`https://who-dat.as93.net/${domain}`)
    .then(response => response.json())
    .then(data => {
        if (data.domain) {
            const domainInfo = `
                <strong>Domain:</strong> ${data.domain.domain}<br>
                <strong>Punycode:</strong> ${data.domain.punycode}<br>
                <strong>Name:</strong> ${data.domain.name}<br>
                <strong>Extension:</strong> ${data.domain.extension}<br>
                <strong>Status:</strong> ${data.domain.status.join(', ')}<br>
                <strong>Name Servers:</strong> ${data.domain.name_servers.join(', ')}<br>
                <strong>Created Date:</strong> ${data.domain.created_date}<br>
            `;
            const registrarInfo = `
                <strong>Registrar:</strong> ${data.registrar.name}<br>
            `;
            const registrantInfo = `
                <strong>Registrant Organization:</strong> ${data.registrant.organization}<br>
                <strong>Address:</strong> ${data.registrant.street}<br>
            `;
            resultDiv.innerHTML = domainInfo + registrarInfo + registrantInfo;
        } else {
            resultDiv.textContent = 'Error fetching WHOIS data.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        resultDiv.textContent = 'Error fetching WHOIS data.';
    });
});