const date = document.querySelector('.js-23');
date.addEventListener('click', () => {
    console.log('this is the 23rd of september');
    console.log('opening the overlay');
    const backgroundFade = document.querySelector('.js-background-fade');
    backgroundFade.classList.add('display-content');
    console.log(backgroundFade);

    const overlayDiv = document.querySelector('.js-overlay-div');
    overlayDiv.classList.add('display-content');
    console.log(overlayDiv);
});

const closeButton = document.querySelector('.js-journal-close-button');
closeButton.addEventListener('click', () => {
    console.log('closing the overlay');
    const backgroundFade = document.querySelector('.js-background-fade');
    backgroundFade.classList.remove('display-content');
    console.log(backgroundFade);

    const overlayDiv = document.querySelector('.js-overlay-div');
    overlayDiv.classList.remove('display-content');
    console.log(overlayDiv);
});