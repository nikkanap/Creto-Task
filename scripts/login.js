import { userExists, validateLogin } from "./data/user-data.js";

let timeout;
const logInButton = document.querySelector('.js-log-in-button');
logInButton.addEventListener('click', () => {
    const username = document.querySelector('.js-username').value;
    const password = document.querySelector('.js-password').value;
    if(username.length === 0 || password.length === 0){
        displayInvalidLoginElement('Please fill in all the blanks.');
        return;
    }

    const doesUserExist = userExists(username);
    if(!doesUserExist) {
        displayInvalidLoginElement('Invalid Login.');
        return;
    } 

    const validLogIn = validateLogin(username, password);
    if(validLogIn){
        console.log(`Valid login! Welcome, ${username}.`);
        window.location.href = "Dashboard.html";
        return;
    }
    displayInvalidLoginElement('Invalid Login.');
});

function displayInvalidLoginElement(content) {
    clearTimeout(timeout); // clear the timeout
    const invalidLoginElement = document.querySelector('.js-invalid-login');
    invalidLoginElement.innerHTML = content;
    invalidLoginElement.classList.add('display-content');
    timeout = setTimeout(() => {
        invalidLoginElement.classList.remove('display-content');
    }, 3000);
}