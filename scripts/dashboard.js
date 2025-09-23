const date = document.querySelector('.js-23');
date.addEventListener('click', () => {
    console.log('this is the 23rd of september');
})

const closeButton = document.querySelector('.js-journal-close-button');
closeButton.addEventListener('click', () => {
    console.log('closing the overlay');
});