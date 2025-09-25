import { getCurrentDate, getDayOfTheWeekNumber, getNoOfDaysInAMonth, getFullDate, getCurrentMonthYearString } from "./utils/dates.js";
import { getUser, saveDailyQuota } from "./data/user-data.js";

let timeout;
function renderDashboard() {
    renderDetails();

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

    renderCalendarDashboard();

    // ---- journal portion functionalities ----
    // close button functionality
    const closeButton = document.querySelector('.js-journal-close-button');
    closeButton.addEventListener('click', () => toggleOverlay('js-journal-overlay', false));

    // open the daily quota nav if from signup
    const params = new URLSearchParams(window.location.search);
    if(params.get('from') === 'signup'){
        toggleOverlay('js-daily-quota-overlay', true);
        
        document.querySelector('.js-set-to-default')
        .addEventListener('click', () => {
            if(window.confirm('Are you sure you wish to proceed?')) {
                const usernameFromParams = params.get('uname');
                saveDailyQuota(usernameFromParams, 5);
                toggleOverlay('js-daily-quota-overlay', false);
                history.replaceState({}, '', `Dashboard.html?uname=${encodeURIComponent(username)}`);
                renderDetails();
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
                toggleOverlay('js-daily-quota-overlay', false);
                history.replaceState({}, '', `Dashboard.html?uname=${encodeURIComponent(username)}`);
                renderDetails();
            }
        });
    }

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
renderDashboard();

// render details from the dashboard like user 
function renderDetails() {
    let currentMonthYear = getCurrentMonthYearString();
    document.querySelector('.js-month').innerHTML = currentMonthYear;

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

function renderCalendarDashboard() {
    // rendering the calendar (html)
    let { month, date, year } = getCurrentDate();
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
        dayCell.addEventListener('click', (event) => {
            event.stopPropagation(); // stops the event from propagating
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
            toggleOverlay('js-journal-overlay', true);
        });
    });
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

// open any overlay based on classname
function toggleOverlay(className, show){
    const backgroundFade = document.querySelector('.js-background-fade');
    backgroundFade.classList.toggle('display-content', show);
    const overlayDiv = document.querySelector(`.${className}`);
    overlayDiv.classList.toggle('display-content', show);
}




