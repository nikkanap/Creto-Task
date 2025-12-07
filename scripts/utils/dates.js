import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'

export function getCurrentDate() {
    const fullDate = dayjs();
    const month = fullDate.month() + 1;
    const year = fullDate.year();
    const date = fullDate.date();
    return { month, date, year };
}

export function getMonth(direction, prevNumMonth) {
    const today = dayjs();
    let wordMonth = "";
    let numMonth = 0;
    console.log("direction = " + direction);

    wordMonth = today.add(direction, 'month').format('MMMM');
    numMonth = today.add(direction, 'month').month() + 1;
    
    return { wordMonth, numMonth };
}

export function getYear(direction) {
    const today = dayjs();
    let wordYear = "";
    let numYear = 0
    
    wordYear = today.add(direction, 'year').format('YYYY');
    numYear = today.add(direction, 'year').year();
    
    return { wordYear, numYear };
}


export function getDayOfTheWeekNumber(day, month, year) {
    let selectedDate = dayjs(`${month} ${day}, ${year}`, 'MMMM D, YYYY');
    return Number(selectedDate.format('d'));
}

export function getNoOfDaysInAMonth(month, year) {
    let selectedMonth = dayjs(`${month}-${year}`, 'MMMM YYYY');
    return selectedMonth.daysInMonth();
}

export function getFullDate(month, day, year) {
    let selectedDate = dayjs(`${month} ${day}, ${year}`, 'MMMM D, YYYY');
    return selectedDate.format('dddd - MMMM D, YYYY');
}

export function getCurrentDateString(){
    return dayjs().format('MMMM D, YYYY');
}

export function getShortDateString(month, day, year) {
    let selectedDate = dayjs(`${month} ${day}, ${year}`, 'MMMM D, YYYY');
    return selectedDate.format('MM/DD/YYYY');
}

export function getShortDate(date) {
    let selectedDate = dayjs(date, 'MMMM D, YYYY');
    return selectedDate.format('MM/DD/YYYY');
}

export function getCurrentMonthYearString() {
    return dayjs().format('MMMM - YYYY');
}