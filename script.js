async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const hashedPassword = await hashPassword(password);

    const storedUsername = 'hexx';
    const storedPasswordHash = 'abc0e2f36d8b6b2ebcaef835b092cd7797bfd1f5defd191b044c2a501f2818db'; 

    if (username === storedUsername && hashedPassword === storedPasswordHash) {
        document.getElementById('login-result').textContent = 'Login successful';
        
        localStorage.setItem('isLoggedIn', 'true');
        
        window.location.href = '/home.html';
    } else {
        document.getElementById('login-result').textContent = 'Invalid credentials';
    }
}

function lookupIP() {
    const ip = document.getElementById('ip-input').value;
    fetch(`https://ipapi.co/${ip}/json/`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('ip-result').textContent = `Location: ${data.city}, ${data.region}, ${data.country_name}`;
        })
        .catch(error => {
            document.getElementById('ip-result').textContent = 'Error fetching IP information';
        });
}

function dnsLookup() {
    const domain = document.getElementById('dns-input').value;
    fetch(`https://dns.google/resolve?name=${domain}`)
        .then(response => response.json())
        .then(data => {
            const records = data.Answer ? data.Answer.map(record => `${record.name} - ${record.type} - ${record.data}`).join(', ') : 'No records found';
            document.getElementById('dns-result').textContent = `DNS Records: ${records}`;
        })
        .catch(error => {
            document.getElementById('dns-result').textContent = 'Error performing DNS lookup';
        });
}

function resolveWebsite() {
    const website = document.getElementById('website-input').value;
    fetch(`https://dns.google/resolve?name=${website}`)
        .then(response => response.json())
        .then(data => {
            const ip = data.Answer ? data.Answer[0].data : 'No IP found';
            document.getElementById('website-result').textContent = `Resolved IP: ${ip}`;
        })
        .catch(error => {
            document.getElementById('website-result').textContent = 'Error resolving website';
        });
}