import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'

export function getCurrentDate() {
    const fullDate = dayjs();
    const month = fullDate.format('MMMM');
    const year = fullDate.format('YYYY');
    const date = fullDate.format('D');
    return { month, date, year };
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
    const fullDate = dayjs();
    return fullDate.format('MMMM D, YYYY');
}