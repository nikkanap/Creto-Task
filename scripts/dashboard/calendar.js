import { getCurrentDate, getDayOfTheWeekNumber, getNoOfDaysInAMonth, getFullDate, getShortDateString } from "../utils/dates.js";
import { toggleOverlay } from "./toggle-overlay.js";
import { loadTasksToOverlay } from "./tasks.js";
import { getNumberOfTasks } from "../data/user-tasks.js";
import { getUserId } from "../data/user-data.js";

export function renderCalendarDashboard() {
    // rendering the calendar (html)
    let { month, date, year } = getCurrentDate();
    document.querySelector('.js-month').innerHTML = `${month} - ${year}`;

    const params = new URLSearchParams(window.location.search);
    const usernameFromParams = params.get('uname');
    const userId = getUserId(usernameFromParams);

    let calendarHTML = '';
    // weekdates
    const weekdates = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    calendarHTML += '<tr>'
    weekdates.forEach((date) => {
        calendarHTML += `<th> ${date}</th>`;
    });
    calendarHTML += '</tr>'
    
    // rendering the actual dates
    const numberOfTasks = getNumberOfTasks(userId);
    let day = 1;
    for(let i = 1; i <= 5; i++) {
        calendarHTML += '<tr>';
        for(let j = 0; j < 7; j++){
            if(getDayOfTheWeekNumber(day, month, year) != j || day > getNoOfDaysInAMonth(month, year)){
                calendarHTML += '<td></td>';
                continue;
            } 

            const shortFullDate = getShortDateString(month, day, year);
            calendarHTML += `
            <td class="
                filled-cell
                ${(day === Number(date)) ? 'today js-today' : ''}
                ${(day < Number(date)) ? 'js-previous-days' : ''}
            " data-day="${day}">
                ${(day > getNoOfDaysInAMonth(month, year)) ? '' : `
                    ${day} <br> Tasks Finished: 
                    ${(numberOfTasks.hasOwnProperty(shortFullDate)) ? numberOfTasks[shortFullDate] : 'N/A'}
                `}
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
            if(dayCell.classList.length === 1){
                return;
            }

            const isToday = dayCell.classList.contains('js-today');
            dayCell.classList.add('selected');
            document.querySelector('.journal-entry-field')
            .readOnly = (isToday) ? false : true;

            const { day } = dayCell.dataset;
            let dateWithWeek = getFullDate(month, day, year);

            if(dayCell.classList.contains('js-today')) {
                dateWithWeek += ' (Today)';
            }
            document.querySelector('.js-journal-date').innerHTML = dateWithWeek;

            const shortFullDate = getShortDateString(month, day, year);
            loadTasksToOverlay(isToday, shortFullDate);

            toggleOverlay('js-journal-overlay', true);
        });
    });
}

