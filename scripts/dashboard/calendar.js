import { getCurrentDate, getDayOfTheWeekNumber, getNoOfDaysInAMonth, getFullDate, getShortDateString, getYear, getMonth } from "../utils/dates.js";
import { toggleOverlay } from "./toggle-overlay.js";
import { loadJournalLog } from "./journal-logs.js";
import { loadTasksToOverlay } from "./tasks.js";
import { getDateCompleted, getNumberOfTasksCompleted, getUserTasks } from "../data/user-tasks.js";
import { getCurrentUser } from "../data/user-data.js";

export let isToday, shortFullDate;

export function renderCalendarDashboard() {
    // rendering the calendar (html)
    let { month, date, year } = getCurrentDate();
    let monthCount = 0, yearCount = 0;
    let { wordMonth, numMonth } = getMonth(0);
    let { wordYear, numYear } = getYear(0);
    console.log(wordMonth);
    console.log(wordYear);

    // FIX THE NEXT/PREV MONTHS AND YEARS THNX
    document.querySelector('.js-month').innerHTML = `${wordMonth} - ${wordYear}`;
    document.querySelector('.js-next-month').addEventListener('click', (event) => {
        console.log("Going to next month");

        // if num
        monthCount = monthCount+1;
        if(numMonth === 12) {
            yearCount += 1;
        }

        ({wordMonth, numMonth} = getMonth(monthCount));
        ({wordYear, numYear} = getYear(yearCount));
        
        console.log("wordMonth: " + wordMonth);
        console.log("numWord: " + numMonth);

        document.querySelector('.js-month').innerHTML = `${wordMonth} - ${wordYear}`;
        renderDates(date, wordMonth, numMonth, month, wordYear, numYear, year, currentUser);
    });

    document.querySelector('.js-prev-month').addEventListener('click', (event) => {
        console.log("Going to prev month");
        monthCount = monthCount-1;

        if(numMonth === 1) {
            yearCount -= 1;
        }
        
        ({wordMonth, numMonth} = getMonth(monthCount));
        ({wordYear, numYear} = getYear(yearCount));
        
        console.log("wordMonth: " + wordMonth);
        console.log("numWord: " + numMonth);
        document.querySelector('.js-month').innerHTML = `${wordMonth} - ${wordYear}`;
        renderDates(date, wordMonth, numMonth, month, wordYear, numYear, year, currentUser);
    });

    const currentUser = getCurrentUser();
    const userId = currentUser.userId;

    renderDates(date, wordMonth, numMonth, month, wordYear, numYear, year, currentUser);

    document.querySelectorAll('.calendar td').forEach((dayCell) => {
        const isNextDays = dayCell.classList.contains('js-next-days');
        if(isNextDays) return;
        
        dayCell.addEventListener('click', (event) => {
            event.stopPropagation(); // stops the event from propagating
            // refuse opening the overlays for any invalid cells
            if(dayCell.classList.length === 1){
                return;
            }

            isToday = dayCell.classList.contains('js-today');
            dayCell.classList.add('selected');
            document.querySelector('.journal-entry-field')
            .readOnly = (isToday) ? false : true;

            const { day } = dayCell.dataset;
            let dateWithWeek = getFullDate(wordMonth, day, wordYear);

            if(dayCell.classList.contains('js-today')) {
                dateWithWeek += ' (Today)';
            }
            document.querySelector('.js-journal-date').innerHTML = dateWithWeek;

            shortFullDate = getShortDateString(wordMonth, day, wordYear);
            loadTasksToOverlay();
            loadJournalLog(userId, shortFullDate);

            toggleOverlay('js-journal-overlay', true);
        });
    });
}

export function clearIsTodayAndShortFullDate() {
    isToday = null;
    shortFullDate = null;
}

function renderDates(date, wordMonth, numMonth, month, wordYear, numYear, year, currentUser) {
    // Rendering the calendar in the dashboard
    let calendarHTML = '';

    // weekdates
    const weekdates = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    calendarHTML += '<tr>'
    weekdates.forEach((wd) => {
        calendarHTML += `<th> ${wd}</th>`;
    });
    calendarHTML += '</tr>'
    
    // actual dates
    const dailyQuota = currentUser.dailyQuota;

    const tasksFinishedCount = getNumberOfTasksCompleted(currentUser.userId);
    let day = 1;
    for(let i = 1; i <= 5; i++) {
        calendarHTML += '<tr>';
        for(let j = 0; j < 7; j++){
            if(getDayOfTheWeekNumber(day, wordMonth, wordYear) != j || day > getNoOfDaysInAMonth(wordMonth, wordYear)){
                calendarHTML += '<td></td>';
                continue;
            } 

            // get the shortFullDate of the corresponding day in the cell
            const shortFullDate = getShortDateString(wordMonth, day, wordYear);

            let numberOfTasks;
            let taskNum = 0;
            
            if(tasksFinishedCount.hasOwnProperty(shortFullDate)){
                numberOfTasks = taskNum = tasksFinishedCount[shortFullDate];
            } else {
                numberOfTasks = (day > Number(date)) ? 'N/A' : 'None';
                taskNum = 0;
            }

            const result = taskNum / dailyQuota;
            let heatMap = "";
            if(result >= 1) heatMap = "quota-reached";
            else if (result >= 2/3 * dailyQuota) heatMap = "multiple-tasks-completed" ;
            else if (result >= 1/3 * dailyQuota) heatMap = "moderate-tasks-completed";
            else if (result > 0) heatMap = "minimal-tasks-completed";

            const isPreviousDate = numYear < year || (numMonth < month && numYear === year)  || (numMonth === month && numYear === year && day < Number(date));
            const isCurrentDate = numMonth === month && numYear === year && day === Number(date);

            calendarHTML += `
            <td class="
                filled-cell
                ${(isCurrentDate) ? 'today js-today' : (isPreviousDate) ? 'js-previous-days' : 'js-next-days next-days' }
                ${heatMap}
            " data-day="${day}">
                ${(day > getNoOfDaysInAMonth(wordMonth, wordYear)) ? '' : `
                    ${day} <br> Tasks Finished: ${numberOfTasks}
                `}
            </td>`;
            day++;
        }
        calendarHTML += '</tr>';
    }
    
    document.querySelector('.js-calendar').innerHTML = calendarHTML;
    document.querySelectorAll('.calendar td').forEach((dayCell) => {
        const isNextDays = dayCell.classList.contains('js-next-days');
        if(isNextDays) return;
        
        dayCell.addEventListener('click', (event) => {
            event.stopPropagation(); // stops the event from propagating
            // refuse opening the overlays for any invalid cells
            if(dayCell.classList.length === 1){
                return;
            }

            isToday = dayCell.classList.contains('js-today');
            dayCell.classList.add('selected');
            document.querySelector('.journal-entry-field')
            .readOnly = (isToday) ? false : true;

            const { day } = dayCell.dataset;
            let dateWithWeek = getFullDate(wordMonth, day, wordYear);

            if(dayCell.classList.contains('js-today')) {
                dateWithWeek += ' (Today)';
            }
            document.querySelector('.js-journal-date').innerHTML = dateWithWeek;

            shortFullDate = getShortDateString(wordMonth, day, wordYear);

            loadTasksToOverlay();
            loadJournalLog(currentUser.userId, shortFullDate);

            toggleOverlay('js-journal-overlay', true);
        });
    });
}
