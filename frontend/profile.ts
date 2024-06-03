window.onload = function() {
    getProfile();
};

function getProfile() {
    const token = localStorage.getItem('token');
    fetch('/api/profile/', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(data => {
            let profileName = document.querySelector('#profileName');
            let profileUsername = document.querySelector('#profileUsername');
            if (profileName && profileUsername) {
                profileName.innerHTML = 'Name: ' + data.name;
                profileUsername.innerHTML = 'Username: ' + data.username;
            }
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
}