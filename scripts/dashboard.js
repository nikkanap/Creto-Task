import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'

function renderDashboard() {
    let { month, date, year } = getCurrentDate();
    document.querySelector('.js-month').innerHTML = `${month} - ${year}`;
    
    // setting up the dates in the calendar (rendering html)
    let calendarHTML = '';
    // weekdates
    const weekdates = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    calendarHTML += '<tr>'
    weekdates.forEach((date) => {
        calendarHTML += `<th class="table-header">${date}</th>`;
    });
    calendarHTML += '</tr>'
    
    // actual dates
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

    // calendar date functionalities
    const todayCell = document.querySelector('.js-today');
    todayCell.addEventListener('click', () => {
        openOverlays();
        makeTextAreaEditable();
        todayCell.classList.add('selected');
        
        const { day } = todayCell.dataset;
        renderJournalEntry(day, month, year);
    });

    document.querySelectorAll('.js-previous-days').forEach((prevDay) => {
        prevDay.addEventListener('click', () => {
            openOverlays();
            makeTextAreaReadOnly();
            prevDay.classList.add('selected');
            
            const { day } = prevDay.dataset;
            renderJournalEntry(day, month, year);
        });
    });

    // close button functionality
    const closeButton = document.querySelector('.js-journal-close-button');
    closeButton.addEventListener('click', () => {
        closeOverlays();
    });
}
renderDashboard();

function openOverlays() {
    console.log('opening the overlay');
    const backgroundFade = document.querySelector('.js-background-fade');
    backgroundFade.classList.add('display-content');
    console.log(backgroundFade);

    const overlayDiv = document.querySelector('.js-overlay-div');
    overlayDiv.classList.add('display-content');
    console.log(overlayDiv);
}

function closeOverlays() {
    console.log('closing the overlay');
    const backgroundFade = document.querySelector('.js-background-fade');
    backgroundFade.classList.remove('display-content');
    console.log(backgroundFade);

    const overlayDiv = document.querySelector('.js-overlay-div');
    overlayDiv.classList.remove('display-content');
    console.log(overlayDiv);
}

function makeTextAreaReadOnly() {
    document.querySelector('.journal-entry-field').readOnly = true;
}

function makeTextAreaEditable() {
    document.querySelector('.journal-entry-field').readOnly = false;
}

function renderJournalEntry(day, month, year) {
    let selectedDate = dayjs(`${month} ${day}, ${year}`, 'MMMM D, YYYY');
    let dateWithWeek = selectedDate.format('dddd - MMMM D, YYYY')
    console.log(dateWithWeek);
    document.querySelector('.js-journal-date').innerHTML = dateWithWeek;
}

function getCurrentDate() {
    const fullDate = dayjs();
    const month = fullDate.format('MMMM');
    const year = fullDate.format('YYYY');
    const date = fullDate.format('D');
    return { month, date, year };
}

function getDayOfTheWeekNumber(day, month, year) {
    let selectedDate = dayjs(`${month} ${day}, ${year}`, 'MMMM D, YYYY');
    return Number(selectedDate.format('d'));
}

function getNoOfDaysInAMonth(month, year) {
    let selectedMonth = dayjs(`${month}-${year}`, 'MMMM YYYY');
    return selectedMonth.daysInMonth();
}


