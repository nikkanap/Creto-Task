import { getCurrentDate, getDayOfTheWeekNumber, getNoOfDaysInAMonth, getFullDate } from "./utils/dates.js";

function renderDashboard() {
    let { month, date, year } = getCurrentDate();
    document.querySelector('.js-month').innerHTML = `${month} - ${year}`;
    
    document.querySelector('.js-username')
    .addEventListener('click', (event) => {
        event.stopPropagation(); // stops the event from propagating
        openAccountSettingsOverlay();
    });

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

    document.querySelectorAll('td').forEach((dayCell) => {
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
        .addEventListener('click', () => closeQuotaOverlay());

        document.querySelector('.js-proceed')
        .addEventListener('click', () => closeQuotaOverlay());
    }

    const overlay = document.querySelector('.js-account-settings-overlay');
    document.addEventListener('click', (event) => {
        if(overlay.classList.contains('display-content') && !overlay.contains(event.target)) {
            closeAccountSettingsOverlay();
        }
    });
}
renderDashboard();

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

function closeQuotaOverlay() {
    closeFade();
    const overlayDiv = document.querySelector('.js-daily-quota-div');
    overlayDiv.classList.remove('display-content');

    // changes the state of the URL
    history.replaceState({}, '', 'Dashboard.html');
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




