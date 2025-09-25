import { users, userExists, validateLogin } from "./data/user-data.js";

const logInButton = document.querySelector('.js-log-in-button');
logInButton.addEventListener('click', () => {
    const username = document.querySelector('.username').value;
    const password = document.querySelector('.password').value;
    if(username.length === 0 || password.length === 0){
        displayInvalidLoginElement('Please fill in all the blanks.');
        return;
    }

    const doesUserExist = userExists(username);
    if(!doesUserExist) {
        displayInvalidLoginElement('Invalid Login.');
        return;
    } 
    console.log(`${username} exists!`);

    
    const validLogIn = validateLogin(username, password);

    if(validLogIn){
        console.log(`Valid login! Welcome, ${username}.`);
        window.location.href = "Dashboard.html";
        return;
    }
    displayInvalidLoginElement('Invalid Login.');
});

function displayInvalidLoginElement(content) {
    const invalidLoginElement = document.querySelector('.js-invalid-login');
    invalidLoginElement.innerHTML = content;
    invalidLoginElement.classList.add('display-content');
}