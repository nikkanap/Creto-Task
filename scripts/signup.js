const logInButton = document.querySelector('.js-sign-up-button');
logInButton.addEventListener('click', () => {
    window.location.href = "Dashboard.html?from=signup";
});