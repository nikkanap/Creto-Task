import { saveDailyQuota } from "../data/user-data.js";
import { toggleOverlay } from "./toggle-overlay.js";
import { renderDetails } from "./details.js";

let timeout;
export function renderDailyQuota() {
    const params = new URLSearchParams(window.location.search);
    const usernameFromParams = params.get('uname');
    toggleOverlay('js-daily-quota-overlay', true);
    
    document.querySelector('.js-set-to-default')
    .addEventListener('click', () => {
        if(window.confirm('Are you sure you wish to proceed?')) {
            closeDailyQuota(usernameFromParams, 5);
        }
    });

    document.querySelector('.js-proceed')
    .addEventListener('click', () => {
        const dailyQuota = document.querySelector('.js-daily-quota').value;
        if(dailyQuota.length === 0){
            displayInputError('Please enter a number before proceeding.');
            return;
        }

        if(isNaN(dailyQuota)){
            displayInputError('Please enter a valid number.');
            return;
        }

        if(window.confirm('Are you sure?')){
            closeDailyQuota(usernameFromParams, Number(dailyQuota));
        }
    });
}

function closeDailyQuota(username, dailyQuota) {
    saveDailyQuota(username, dailyQuota);
    toggleOverlay('js-daily-quota-overlay', false);
    history.replaceState({}, '', `Dashboard.html?uname=${encodeURIComponent(username)}`);
    renderDetails();
}

// render the display input error 
function displayInputError(content) {
    clearTimeout(timeout); // clear the timeout
    const inputError = document.querySelector('.js-input-error');
    inputError.innerHTML = content;
    inputError.classList.add('display-content');
    timeout = setTimeout(() => {
        inputError.classList.remove('display-content');
    }, 3000);
}