// open any overlay based on classname
export function toggleOverlay(className, show){
    document.querySelector('.js-background-fade')
    .classList.toggle('display-content', show);
    
    document.querySelector(`.${className}`)
    .classList.toggle('display-content', show);
}