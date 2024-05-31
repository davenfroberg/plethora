"use strict";
function login() {
    var _a, _b;
    let username = (_a = document.querySelector('#username')) === null || _a === void 0 ? void 0 : _a.value;
    let password = (_b = document.querySelector('#password')) === null || _b === void 0 ? void 0 : _b.value;
    fetch('http://backend:3000/login', {
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
    var _a, _b, _c;
    let username = (_a = document.querySelector('#registerUsername')) === null || _a === void 0 ? void 0 : _a.value;
    let password = (_b = document.querySelector('#registerPassword')) === null || _b === void 0 ? void 0 : _b.value;
    let name = (_c = document.querySelector('#registerName')) === null || _c === void 0 ? void 0 : _c.value;
    fetch('http://backend:3000/register', {
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
