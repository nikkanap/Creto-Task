import { renderCalendarDashboard } from "./dashboard/calendar.js";
import { toggleOverlay } from "./dashboard/toggle-overlay.js";
import { renderDailyQuota } from "./dashboard/daily-quota.js";
import { renderDetails } from "./dashboard/details.js";

function renderDashboard() {
    // rendering dashboard content
    renderDetails();
    renderCalendarDashboard();

    // open the daily quota nav if from signup
    const params = new URLSearchParams(window.location.search);
    if(params.get('from') === 'signup'){
        renderDailyQuota();
    }
    
    addElementEvents();
    addOutOfFocusEvents();
}
renderDashboard();


function addOutOfFocusEvents() {
    // out of focus click events
    document.addEventListener('click', (event) => {
        const accountSettingsOverlay = document.querySelector('.js-account-settings-overlay');
        if(accountSettingsOverlay.classList.contains('display-content') && !accountSettingsOverlay.contains(event.target)) {
            toggleOverlay('js-account-settings-overlay', false);
        }

        const journalOverlay = document.querySelector('.js-journal-overlay');
        if(journalOverlay.classList.contains('display-content') && !journalOverlay.contains(event.target)) {
            toggleOverlay('js-journal-overlay', false);
        }
    });
}

function addElementEvents() {
    // Adding username on DB functionality
    document.querySelector('.js-username-link')
    .addEventListener('click', (event) => {
        event.stopPropagation(); // stops the event from propagating
        toggleOverlay('js-account-settings-overlay', true);
    });
    
    // Adding account settings logout button functionality
    document.querySelector('.js-log-out')
    .addEventListener('click', () => {
        window.location.href = "Home.html";
    });

    // ---- journal portion functionalities ----
    // close button functionality
    document.querySelector('.js-journal-close-button')
    .addEventListener('click', () => toggleOverlay('js-journal-overlay', false));
}




