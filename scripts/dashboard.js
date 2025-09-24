import { getCurrentDate, getDayOfTheWeekNumber, getNoOfDaysInAMonth, getFullDate } from "./utils/dates.js";

function renderDashboard() {
    let { month, date, year } = getCurrentDate();
    document.querySelector('.js-month').innerHTML = `${month} - ${year}`;
    
    // rendering the calendar (html)
    let calendarHTML = '';
    // weekdates
    const weekdates = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    calendarHTML += '<tr>'
    weekdates.forEach((date) => {
        calendarHTML += `
            <th class="table-header">
                ${date}
            </th>
        `;
    });
    calendarHTML += '</tr>'
    
    // rendering the actual dates
    let day = 1;
    for(let i = 1; i <= 5; i++) {
        calendarHTML += '<tr>';
        for(let j = 0; j < 7; j++){
            // we have to start from 1 to arrange things
            if(getDayOfTheWeekNumber(day, month, year) != j){
                calendarHTML += '<td></td>';
            } else {
                calendarHTML += `
                <td class="
                    ${(day === Number(date)) ? 'today js-today' : ''}
                    ${(day < Number(date)) ? 'js-previous-days' : ''}
                " data-day="${day}">
                    ${(day > getNoOfDaysInAMonth(month, year)) ? '' : `${day} <br> Tasks Finished: N/A`}
                </td>`;
                day++;
            }
        }
        calendarHTML += '</tr>';
    }
    console.log(calendarHTML);
    document.querySelector('.js-calendar').innerHTML = calendarHTML;

    document.querySelectorAll('td').forEach((dayCell) => {
        dayCell.addEventListener('click', () => {
            // refuse opening the overlays for any invalid cells
            if(dayCell.classList.length === 0){
                return;
            }

            dayCell.classList.add('selected');
            openOverlays();
            document.querySelector('.journal-entry-field')
            .readOnly = (dayCell.classList.contains('js-today')) ? false : true;

            const { day } = dayCell.dataset;
            renderJournalEntry(day, month, year);
        });
    });

    // ---- journal portion functionalities ----
    // close button functionality
    const closeButton = document.querySelector('.js-journal-close-button');
    closeButton.addEventListener('click', () => {
        closeOverlays();
    });
}
renderDashboard();

function openOverlays() {
    const backgroundFade = document.querySelector('.js-background-fade');
    backgroundFade.classList.add('display-content');

    const overlayDiv = document.querySelector('.js-overlay-div');
    overlayDiv.classList.add('display-content');
}

function closeOverlays() {
    const backgroundFade = document.querySelector('.js-background-fade');
    backgroundFade.classList.remove('display-content');

    const overlayDiv = document.querySelector('.js-overlay-div');
    overlayDiv.classList.remove('display-content');
}

function renderJournalEntry(day, month, year) {
    let dateWithWeek = getFullDate(month, day, year);
    document.querySelector('.js-journal-date').innerHTML = dateWithWeek;
}



