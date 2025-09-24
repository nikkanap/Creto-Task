import { users, userExists, validateLogin } from "./data/user-data.js";

const logInButton = document.querySelector('.js-log-in-button');
logInButton.addEventListener('click', () => {
    const username = document.querySelector('.username').value;

    const doesUserExist = userExists(username);
    if(!doesUserExist) {
        console.log('No user exists with that username.');
        return;
    } 
    console.log(`${username} exists!`);

    const password = document.querySelector('.password').value;
    const validLogIn = validateLogin(username, password);

    if(validLogIn){
        console.log(`Valid login! Welcome, ${username}.`);
        window.location.href = "Dashboard.html";
        return;
    }
    console.log(`Invalid Login!`);
});