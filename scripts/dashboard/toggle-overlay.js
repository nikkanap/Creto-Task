// open any overlay based on classname
export function toggleOverlay(className, show){
    document.querySelector('.js-background-fade')
    .classList.toggle('display-content', show);

    console.log(document.querySelector('.js-background-fade')
    .classList.toggle('display-content', show));
    
    document.querySelector(`.${className}`)
    .classList.toggle('display-content', show);

    if(className === 'js-journal-overlay' && !show){
        document.querySelector('.js-journal-entry-field').innerHTML = '';
    }
}
