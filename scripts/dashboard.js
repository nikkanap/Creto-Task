import { getCurrentDate, getDayOfTheWeekNumber, getNoOfDaysInAMonth, getFullDate } from "./utils/dates.js";
import { getUser, saveDailyQuota } from "./data/user-data.js";

let timeout;
function renderDashboard() {
    let { month, date, year } = getCurrentDate();
    document.querySelector('.js-month').innerHTML = `${month} - ${year}`;

    document.querySelector('.js-username-link')
    .addEventListener('click', (event) => {
        event.stopPropagation(); // stops the event from propagating
        openAccountSettingsOverlay();
    });
    renderUserDetails();

    document.querySelector('.js-log-out')
    .addEventListener('click', () => {
        window.location.href = "Home.html";
    });

    // rendering the calendar (html)
    let calendarHTML = '';
    // weekdates
    const weekdates = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    calendarHTML += '<tr>'
    weekdates.forEach((date) => {
        calendarHTML += `<th> ${date}</th>`;
    });
    calendarHTML += '</tr>'
    
    // rendering the actual dates
    let day = 1;
    for(let i = 1; i <= 5; i++) {
        calendarHTML += '<tr>';
        for(let j = 0; j < 7; j++){
            if(getDayOfTheWeekNumber(day, month, year) != j || day > getNoOfDaysInAMonth(month, year)){
                calendarHTML += '<td></td>';
                continue;
            } 
            calendarHTML += `
            <td class="
                filled-cell
                ${(day === Number(date)) ? 'today js-today' : ''}
                ${(day < Number(date)) ? 'js-previous-days' : ''}
            " data-day="${day}">
                ${(day > getNoOfDaysInAMonth(month, year)) ? '' : `${day} <br> Tasks Finished: N/A`}
            </td>`;
            day++;
        }
        calendarHTML += '</tr>';
    }
    document.querySelector('.js-calendar').innerHTML = calendarHTML;

    document.querySelectorAll('.calendar td').forEach((dayCell) => {
        dayCell.addEventListener('click', () => {
            // refuse opening the overlays for any invalid cells
            if(dayCell.classList.length === 0){
                return;
            }

            dayCell.classList.add('selected');
            document.querySelector('.journal-entry-field')
            .readOnly = (dayCell.classList.contains('js-today')) ? false : true;

            const { day } = dayCell.dataset;
            let dateWithWeek = getFullDate(month, day, year);
            if(dayCell.classList.contains('js-today')) {
                dateWithWeek += ' (Today)';
            }
            document.querySelector('.js-journal-date').innerHTML = dateWithWeek;
            openJournalOverlay();
        });
    });

    // ---- journal portion functionalities ----
    // close button functionality
    const closeButton = document.querySelector('.js-journal-close-button');
    closeButton.addEventListener('click', () => closeJournalOverlay());

    // open the daily quota nav if from signup
    const params = new URLSearchParams(window.location.search);
    if(params.get('from') === 'signup'){
        openQuotaOverlay();
        
        document.querySelector('.js-set-to-default')
        .addEventListener('click', () => {
            if(window.confirm('Are you sure you wish to proceed?')) {
                const usernameFromParams = params.get('uname');
                saveDailyQuota(usernameFromParams, 5);
                closeQuotaOverlay(usernameFromParams);
                renderUserDetails();
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
                const usernameFromParams = params.get('uname');
                saveDailyQuota(usernameFromParams, Number(dailyQuota));
                closeQuotaOverlay(usernameFromParams);
                renderUserDetails();
            }
        });
    }

    const overlay = document.querySelector('.js-account-settings-overlay');
    document.addEventListener('click', (event) => {
        if(overlay.classList.contains('display-content') && !overlay.contains(event.target)) {
            closeAccountSettingsOverlay();
        }
    });
}
renderDashboard();

function displayInputError(content) {
    clearTimeout(timeout); // clear the timeout
    const inputError = document.querySelector('.js-input-error');
    inputError.innerHTML = content;
    inputError.classList.add('display-content');
    timeout = setTimeout(() => {
        inputError.classList.remove('display-content');
    }, 3000);
}

function openJournalOverlay() {
    openFade();
    const overlayDiv = document.querySelector('.js-overlay-div');
    overlayDiv.classList.add('display-content');
}

function closeJournalOverlay() {
    closeFade();
    const overlayDiv = document.querySelector('.js-overlay-div');
    overlayDiv.classList.remove('display-content');
}

function openQuotaOverlay() {
    openFade();
    const overlayDiv = document.querySelector('.js-daily-quota-div');
    overlayDiv.classList.add('display-content');
}

function closeQuotaOverlay(username) {
    closeFade();
    const overlayDiv = document.querySelector('.js-daily-quota-div');
    overlayDiv.classList.remove('display-content');

    // changes the state of the URL
    history.replaceState({}, '', `Dashboard.html?uname=${encodeURIComponent(username)}`);
}

function openAccountSettingsOverlay() {
    openFade();
    const overlayDiv = document.querySelector('.js-account-settings-overlay');
    overlayDiv.classList.add('display-content');
}

function closeAccountSettingsOverlay() {
    closeFade();
    const overlayDiv = document.querySelector('.js-account-settings-overlay');
    overlayDiv.classList.remove('display-content');
}

function closeFade() {
    const backgroundFade = document.querySelector('.js-background-fade');
    backgroundFade.classList.remove('display-content');
}

function openFade() {
    const backgroundFade = document.querySelector('.js-background-fade');
    backgroundFade.classList.add('display-content');
}

function renderUserDetails() {
    const params = new URLSearchParams(window.location.search);
    const usernameFromParams = params.get('uname');
    document.querySelectorAll('.js-username').forEach((username) => {
        username.innerHTML = usernameFromParams;
    });

    const user = getUser(usernameFromParams);
    document.querySelector('.js-email').innerHTML = user.email;
    document.querySelector('.js-date-joined').innerHTML = user.dateJoined;
    document.querySelector('.js-daily-quota-display').innerHTML = `${user.dailyQuota} tasks per day`;
}




