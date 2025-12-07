import { setCurrentUser } from "./user-data.js";

const journalEntries = JSON.parse(localStorage.getItem('journal-entries')) || {
    'HY0rGRVqjFOFkIrKcFDS' : {
        '12/01/2025': 'This is my journal log from September 1, 2025. This is pretty cool! Hope it works out.',
        '12/02/2025': 'Had a busy day today, but I managed to finish most of my tasks. Feeling accomplished!',
        '12/03/2025': 'Today was a little slow. I spent time organizing my workspace and planning ahead.',
        '12/04/2025': 'Productive morning, lazy afternoon. Hoping to get back on track tomorrow.',
        '12/05/2025': 'Cooked dinner for the family. It was fun and everyone enjoyed the food.',
        '12/06/2025': 'Worked on some coding projects today. Learned a few new tricks!',
        '12/07/2025': 'Sunday rest day. Watched a movie and relaxed most of the time.',
        '12/08/2025': 'Back to work. Managed to complete a tough task today, feeling proud.',
        '12/09/2025': 'Caught up with an old friend. It was nice to reminisce about the past.',
        '12/10/2025': 'A stressful day, but I powered through. Small wins are still wins.',
        '12/11/2025': 'Did some cleaning and organizing. My room feels fresh and tidy now.',
        '12/12/2025': 'Tried cooking something new today. It didn’t turn out perfect, but I learned a lot.',
        '12/13/2025': 'Went for a walk in the evening. The weather was really pleasant.',
        '12/14/2025': 'Had some family time. We laughed a lot and enjoyed dinner together.',
        '12/15/2025': 'Felt a bit tired today, so I took things slow. Rest can be productive too.',
        '12/16/2025': 'Started reading a new book. The story is engaging so far.',
        '12/17/2025': 'Made progress on my project. Step by step, I’m getting there.',
        '12/18/2025': 'It rained a lot today. Stayed indoors and caught up on work.',
        '12/19/2025': 'Tried journaling more deeply today. It felt therapeutic.',
        '12/20/2025': 'Completed a task earlier than expected. Rewarded myself with a snack.',
        '12/21/2025': 'Spent most of the day learning something new online. Very productive!',
        '12/22/2025': 'Had a minor setback today, but I’m determined to bounce back tomorrow.',
        '12/23/2025': 'Did some creative work. I enjoyed experimenting with new ideas.',
        '12/24/2025': 'Felt grateful today. Wrote down a list of things I appreciate.',
        '12/25/2025': 'The month is moving quickly! Looking forward to what’s next.'
    }
};

export function getLogsFromUserId(userId) {
    return journalEntries[userId];
}

export function saveJournalLogToJournalEntries(userId, journalEntry, date) {
    const userLogs = getLogsFromUserId(userId);
    userLogs[date] = journalEntry;
    saveToLocalStorage();
    setCurrentUser(userId);
}

function saveToLocalStorage() {
    localStorage.setItem('journal-entries', JSON.stringify(journalEntries));
}

export function createEmptyJournalLogs(userId) {
    journalEntries[userId] = {};
    saveToLocalStorage();
    setCurrentUser(userId);
}