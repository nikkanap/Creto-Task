const logInButton = document.querySelector('.js-log-in-button');
logInButton.addEventListener('click', () => {
    console.log('logging in');
    window.location.href='LogIn.html';
});

const signUpButton = document.querySelector('.js-sign-up-button');
signUpButton.addEventListener('click', () => {
    console.log('signing up');
    window.location.href='SignUp.html';
});
