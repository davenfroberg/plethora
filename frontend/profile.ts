window.onload = function () {
    getProfile();
};

function getProfile() {
    const token = localStorage.getItem('token');
    fetch('/api/profile/', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => {
            if (!response.ok) {
                window.location.href = '/';
                throw new Error("Not logged in.");
            }
            return response.json();
        })
        .then(data => {
            let profileName = document.querySelector('#profileName');
            if (profileName && data.name) {
                profileName.innerHTML = 'Name: ' + data.name;
            }
        })
        .catch((error) => {
        });
}

function upload() {
    const token = localStorage.getItem('token');
    const filename: string = (document.querySelector('#filename') as HTMLInputElement)?.value;
    const filepath: string = (document.querySelector('#filepath') as HTMLInputElement)?.value;
    const size: number = parseInt((document.querySelector('#size') as HTMLInputElement)?.value);

    fetch('/api/upload/', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            filename: filename,
            filepath: filepath,
            size: size
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Upload failed.");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch((error) => {
        });
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
}