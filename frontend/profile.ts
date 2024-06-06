getProfile(); //check for redirect

function getProfile() {
    const token = localStorage.getItem('token');
    fetch('/api/profile/', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => {
            if (!response.ok) {
                window.location.replace('/');
                throw new Error("Not logged in.");
            }
            return response.json();
        })
        .then(data => {
            const body: HTMLElement | null = document.querySelector('body');
            if (body) {
                body.style.display = 'flex';
            }
            let profileName = document.querySelector('#profileName');
            if (profileName && data.name) {
                profileName.innerHTML = 'Name: ' + data.name;
            }
        })
        .catch((error) => {
            throw new Error("Not logged in.");
        });
}

function upload() {
    const token = localStorage.getItem('token');
    const fileInput: HTMLInputElement = (document.querySelector('#file') as HTMLInputElement)
    let file: File | null = null;

    if (fileInput && fileInput.files) {
        file = fileInput.files[0];
    }


    fetch('/api/upload/', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            "Content-Type": "multipart/form-data"
        },
        body: file
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