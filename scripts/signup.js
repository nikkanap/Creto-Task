import { userExists, saveNewAccount } from "./data/user-data.js";

let timeout;
const logInButton = document.querySelector('.js-sign-up-button');
logInButton.addEventListener('click', () => {
    const username = document.querySelector('.js-username').value;
    const email = document.querySelector('.js-email').value;
    const password = document.querySelector('.js-password').value;

    if(username.length === 0 || email.length === 0 || password.length === 0){
        displayInvalidSignupElement('Please fill in all the blanks.');
        return;
    }

    const doesUserExist = userExists(username);
    if(doesUserExist) {
        displayInvalidSignupElement('Username is already taken.');
        return;
    } 

    const trimmedEmail = email.trim();
    const hasValidEmail = trimmedEmail.includes('@gmail.com') || trimmedEmail.includes('@yahoo.com');
    if(!hasValidEmail){
        displayInvalidSignupElement('Please enter a valid email.');
        return;
    }

    const textToReplaceFrom = '@';
    const removedAtFromEmail = trimmedEmail.replace(new RegExp(textToReplaceFrom + ".*"), '');
    if(removedAtFromEmail.length < 5){
        displayInvalidSignupElement('Email address must be longer before the @.');
        return;
    }
    
    if(password.length < 8){
        displayInvalidSignupElement('Password must have at least 8 characters.');
        return;
    }

    saveNewAccount(username, email, password);
    window.location.href = "Dashboard.html?from=signup";
});

function displayInvalidSignupElement(content) {
    clearTimeout(timeout); // clear the timeout
    const invalidSignupElement = document.querySelector('.js-invalid-signup');
    invalidSignupElement.innerHTML = content;
    invalidSignupElement.classList.add('display-content');
    timeout = setTimeout(() => {
        invalidSignupElement.classList.remove('display-content');
    }, 3000);
}