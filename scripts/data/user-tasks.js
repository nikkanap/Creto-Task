const userTasks = {
    'HY0rGRVqjFOFkIrKcFDS' : [
        {
            taskDescription: 'Cook dinner before mom comes home',
            deadline: '09/12/2025',
            dateCompleted: 'N/A',
            completed: false,
            archived: false
        },
        {
            taskDescription: 'Program something in FlutterFlow',
            deadline: '10/01/2025',
            dateCompleted: 'N/A',
            completed: false,
            archived: true
        },
        {
            taskDescription: 'This is a test item',
            deadline: '09/25/2025',
            dateCompleted: '09/20/2025',
            completed: true,
            archived: false
        },
        {
            taskDescription: 'Review math notes for upcoming exam',
            deadline: '09/24/2025',
            dateCompleted: '09/24/2025',
            completed: true,
            archived: false
        },
        {
            taskDescription: 'Clean and organize study desk',
            deadline: '09/28/2025',
            dateCompleted: '09/25/2025',
            completed: true,
            archived: false
        },
        {
            taskDescription: 'Buy groceries (milk, eggs, bread)',
            deadline: '09/27/2025',
            dateCompleted: '09/24/2025',
            completed: true,
            archived: false
        },
        {
            taskDescription: 'Finish reading assigned literature chapter',
            deadline: '10/01/2025',
            dateCompleted: 'N/A',
            completed: false,
            archived: false
        },
        {
            taskDescription: 'Pay electricity bill online',
            deadline: '09/30/2025',
            dateCompleted: '09/03/2025',
            completed: true,
            archived: false
        },
        {
            taskDescription: 'Prepare slides for group project presentation',
            deadline: '10/03/2025',
            dateCompleted: 'N/A',
            completed: false,
            archived: false
        },
        {
            taskDescription: 'Water the plants in the backyard',
            deadline: '09/25/2025',
            dateCompleted: '09/25/2025',
            completed: true,
            archived: true
        },
        {
            taskDescription: 'Write journal entry about today’s events',
            deadline: '09/25/2025',
            dateCompleted: '09/24/2025',
            completed: true,
            archived: false
        },
        {
            taskDescription: 'Update resume and LinkedIn profile',
            deadline: '10/04/2025',
            dateCompleted: 'N/A',
            completed: false,
            archived: false
        },
        {
            taskDescription: 'Schedule dentist appointment',
            deadline: '10/06/2025',
            dateCompleted: 'N/A',
            completed: false,
            archived: true
        }
    ] 
};

function saveToLocalStorage() {
    localStorage.setItem('user-tasks', JSON.stringify(userTasks));
}

export function createEmptyTasks(userId) {
    userTasks[userId] = [];
    saveToLocalStorage();
}

export function getUserTasks(userId) {
    return userTasks[userId];
}

export function getNumberOfTasksCompleted(userId) {
    const userTasksCount = {};

    if(userTasks[userId])
    userTasks[userId].forEach((task) => {
        if (userTasksCount.hasOwnProperty(task.dateCompleted)){
            userTasksCount[task.dateCompleted] += 1;
        } else {
            userTasksCount[task.dateCompleted] = 1;
        }
    });
    return userTasksCount;
}

export function getDateCompleted(userId) {
    let dateCompleted;
    userTasks[userId].forEach((task) => {
        task
    });
    return dateCompleted;
}

