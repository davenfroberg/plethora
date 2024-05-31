
function login() {
    let username = (document.querySelector('#username') as HTMLInputElement)?.value;
    let password = (document.querySelector('#password') as HTMLInputElement)?.value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password
        }),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => {
            console.error('Error:', error);
        });
}

function register() {
    let username: string = (document.querySelector('#registerUsername') as HTMLInputElement)?.value;
    let password: string = (document.querySelector('#registerPassword') as HTMLInputElement)?.value;
    let name: string = (document.querySelector('#registerName') as HTMLInputElement)?.value;

    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            username: username,
            password: password
        }),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => {
            console.error('Error:', error);
        });
}
