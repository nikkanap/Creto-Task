import { getLogsFromUserId } from "../data/user-journal-entries.js"

export function loadJournalLog(userId, shortFullDate) {
    const journalLogs = getLogsFromUserId(userId);

    document.querySelector('.js-journal-entry-field').value = journalLogs[shortFullDate];
}