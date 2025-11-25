import { getLogsFromUserId, saveJournalLogToJournalEntries } from "../data/user-journal-entries.js"

export function loadJournalLog(userId, shortFullDate) {
    const journalLogs = getLogsFromUserId(userId);
    let journalLogString = "Empty.";
    if(journalLogs !== undefined) {
        journalLogString = (!journalLogs[shortFullDate]) ? journalLogString : journalLogs[shortFullDate];
    } 
    document.querySelector('.js-journal-entry-field').value = journalLogString;
}

export function saveJournalLog(userId, shortFullDate) {
    const journalEntry = document.querySelector('.js-journal-entry-field').value;
    
    console.log(userId);
    console.log(shortFullDate);
    console.log(journalEntry);
    saveJournalLogToJournalEntries(userId, journalEntry, shortFullDate);
}