import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'

function renderDashboard() {
    const today = dayjs();
    let date = today.format('D');
    console.log(date);

    let calendarHTML = '';
    let days = 1;
    for(let i = 1; i <= 5; i++) {
        calendarHTML += '<tr>';
        for(let j = 0; j < 7; j++){
            calendarHTML += `
            <td class="
            ${(days > 31) ? 'none' : `js-${days}`} 
            ${(days === date) ? 'today' : ''}
            ${(days < date) ? 'previous-days' : ''}
            ">
                ${(days > 31) ? '' : days++}
            </td>`;
        }
        calendarHTML += '</tr>';
    }
    document.querySelector('.js-calendar').innerHTML = calendarHTML;

    const todayCell = document.querySelector('.js-23');
    todayCell.addEventListener('click', () => {
        console.log('this is the 23rd of september');
        openOverlays();
        makeTextAreaEditable();
    });

    document.querySelectorAll('.previous-days').forEach((prevDay) => {
        prevDay.addEventListener('click', () => {
            openOverlays();
            makeTextAreaReadOnly();
        });
    });

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