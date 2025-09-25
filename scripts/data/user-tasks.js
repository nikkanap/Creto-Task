const userTasks = {
    'HY0rGRVqjFOFkIrKcFDS' : [
        {
            taskDescription: 'Cook dinner before mom comes home',
            deadline: 'Friday - 09/12/2025',
            dateCompleted: 'N/A',
            completed: false
        },
        {
            taskDescription: 'Program something in FlutterFlow',
            deadline: 'Friday - 10/01/2025',
            dateCompleted: 'N/A',
            completed: false
        },
        {
            taskDescription: 'This is a test item',
            deadline: 'Friday - 09/25/2025',
            dateCompleted: '09/20/2025',
            completed: true
        }
    ] 
};

export function getUserTasks(userId) {
    return userTasks[userId];
}

