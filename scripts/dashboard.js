import { clearIsTodayAndShortFullDate, renderCalendarDashboard, shortFullDate } from "./dashboard/calendar.js";
import { toggleOverlay } from "./dashboard/toggle-overlay.js";
import { renderDailyQuota } from "./dashboard/daily-quota.js";
import { renderDetails } from "./dashboard/details.js";
import { saveJournalLog } from "./dashboard/journal-logs.js";
import { getCurrentUser, removeCurrentUser } from "./data/user-data.js";
import { toggleAddTasks } from "./dashboard/tasks.js";
import { addNewTask } from "./data/user-tasks.js";

function renderDashboard() {
    // rendering dashboard content
    renderDetails();
    renderCalendarDashboard(0);

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

    // Changing the daily task quota in settings button functionality
    document.querySelector('.js-change-quota')
    .addEventListener('click', () => {
        toggleOverlay('js-account-settings-overlay', false);
        renderDailyQuota();
    });
    
    // Adding account settings logout button functionality
    document.querySelector('.js-log-out')
    .addEventListener('click', () => {
        window.location.href = "Home.html";
        removeCurrentUser();
    });

    // ---- journal portion functionalities ----
    // close button functionality
    document.querySelector('.js-journal-close-button')
    .addEventListener('click', () => {
        toggleOverlay('js-journal-overlay', false);
        clearIsTodayAndShortFullDate();
    });

    // out of focus functionality
    document.querySelector('.js-journal-entry-field')
    .addEventListener('focusout', () => {
        const userId = getCurrentUser().userId;
        saveJournalLog(userId, shortFullDate);
    });
    
    // ---- task portion functionalities ----
    document.querySelector('.js-portion-add-task')
    .addEventListener('click', () => {
        toggleAddTasks(true);
    });

    document.querySelector('.js-close-add-task-button')
    .addEventListener('click', () => {
        toggleAddTasks(false);
    });

    document.querySelector('.js-save-task-button')
    .addEventListener('click', () => {
        const currentUser = getCurrentUser();
        const userId = currentUser.userId;
        const taskDescription = document.querySelector('.js-task-description').value;
        const taskDeadline = document.querySelector('.js-date-input').value;

        addNewTask(userId, taskDescription, taskDeadline);
        toggleAddTasks(false);
    });
}




