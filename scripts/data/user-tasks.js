const userTasks = {
    'HY0rGRVqjFOFkIrKcFDS' : [
        {
            taskDescription: 'Cook dinner before mom comes home',
            deadline: 'Friday - 09/12/2025',
            dateCompleted: 'N/A',
            completed: false,
            archived: false
        },
        {
            taskDescription: 'Program something in FlutterFlow',
            deadline: 'Friday - 10/01/2025',
            dateCompleted: 'N/A',
            completed: false,
            archived: true
        },
        {
            taskDescription: 'This is a test item',
            deadline: 'Friday - 09/25/2025',
            dateCompleted: '09/20/2025',
            completed: true,
            archived: false
        },
        {
            taskDescription: 'Review math notes for upcoming exam',
            deadline: 'Monday - 09/24/2025',
            dateCompleted: '09/24/2025',
            completed: true,
            archived: false
        },
        {
            taskDescription: 'Clean and organize study desk',
            deadline: 'Sunday - 09/28/2025',
            dateCompleted: '09/25/2025',
            completed: true,
            archived: false
        },
        {
            taskDescription: 'Buy groceries (milk, eggs, bread)',
            deadline: 'Saturday - 09/27/2025',
            dateCompleted: '09/24/2025',
            completed: true,
            archived: false
        },
        {
            taskDescription: 'Finish reading assigned literature chapter',
            deadline: 'Wednesday - 10/01/2025',
            dateCompleted: 'N/A',
            completed: false,
            archived: false
        },
        {
            taskDescription: 'Pay electricity bill online',
            deadline: 'Tuesday - 09/30/2025',
            dateCompleted: '09/03/2025',
            completed: true,
            archived: false
        },
        {
            taskDescription: 'Prepare slides for group project presentation',
            deadline: 'Friday - 10/03/2025',
            dateCompleted: 'N/A',
            completed: false,
            archived: false
        },
        {
            taskDescription: 'Water the plants in the backyard',
            deadline: 'Thursday - 09/25/2025',
            dateCompleted: '09/25/2025',
            completed: true,
            archived: true
        },
        {
            taskDescription: 'Write journal entry about today’s events',
            deadline: 'Thursday - 09/25/2025',
            dateCompleted: '09/24/2025',
            completed: true,
            archived: false
        },
        {
            taskDescription: 'Update resume and LinkedIn profile',
            deadline: 'Saturday - 10/04/2025',
            dateCompleted: 'N/A',
            completed: false,
            archived: false
        },
        {
            taskDescription: 'Schedule dentist appointment',
            deadline: 'Monday - 10/06/2025',
            dateCompleted: 'N/A',
            completed: false,
            archived: true
        }

    ] 
};

export function getUserTasks(userId) {
    return userTasks[userId];
}

