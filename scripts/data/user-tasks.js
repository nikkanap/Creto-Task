import { shortFullDate } from "../dashboard/calendar.js";
import { loadTasksToOverlay } from "../dashboard/tasks.js";
import { getCurrentDate } from "../utils/dates.js";
import { setCurrentUser, userIdExists } from "./user-data.js";

const userTasks = JSON.parse(localStorage.getItem('user-tasks')) || {
    'HY0rGRVqjFOFkIrKcFDS' : [
        {
            taskID: "g3z0w9q7l2b8n4y1k6rt",
            taskDescription: "Cook dinner before mom comes home",
            deadline: "12/12/2025",
            dateCompleted: "N/A",
            completed: false
        },
        {
            taskID: "p4n8c1m0t7e2h9s6r3vd",
            taskDescription: "Program something in FlutterFlow",
            deadline: "12/01/2025",
            dateCompleted: "N/A",
            completed: false
        },
        {
            taskID: "u1d4s8a0m9q2j7f6k3pb",
            taskDescription: "This is a test item",
            deadline: "12/25/2025",
            dateCompleted: "12/01/2025",
            completed: true
        },
        {
            taskID: "k9b2x7p1t3h6v4c0m8re",
            taskDescription: "Review math notes for upcoming exam",
            deadline: "12/24/2025",
            dateCompleted: "12/01/2025",
            completed: true
        },
        {
            taskID: "z7m1f9r4a2c6p0h3t8wd",
            taskDescription: "Clean and organize study desk",
            deadline: "12/28/2025",
            dateCompleted: "12/01/2025",
            completed: true
        },
        {
            taskID: "q8v0y3l6b1f9s2p4k7nm",
            taskDescription: "Buy groceries (milk, eggs, bread)",
            deadline: "12/27/2025",
            dateCompleted: "12/01/2025",
            completed: true
        },
        {
            taskID: "r5c7a1x8t2d4n9m0q6vb",
            taskDescription: "Finish reading assigned literature chapter",
            deadline: "12/01/2025",
            dateCompleted: "N/A",
            completed: false
        },
        {
            taskID: "m2h9k0c6s1f8p4r7d3qw",
            taskDescription: "Pay electricity bill online",
            deadline: "12/30/2025",
            dateCompleted: "12/03/2025",
            completed: true
        },
        {
            taskID: "b1n4v7p0d9e3t6h2k8rq",
            taskDescription: "Prepare slides for group project presentation",
            deadline: "12/03/2025",
            dateCompleted: "N/A",
            completed: false
        },
        {
            taskID: "x9c3t1v6m4h8r0b2p7qd",
            taskDescription: "Water the plants in the backyard",
            deadline: "12/25/2025",
            dateCompleted: "12/03/2025",
            completed: true
        },
        {
            taskID: "s4e8m2h1p9c0t7v5n3bk",
            taskDescription: "Write journal entry about today’s events",
            deadline: "12/25/2025",
            dateCompleted: "12/01/2025",
            completed: true
        },
        {
            taskID: "a6k1b9x3t0r4v7q5m2sd",
            taskDescription: "Update resume and LinkedIn profile",
            deadline: "12/04/2025",
            dateCompleted: "N/A",
            completed: false
        },
        {
            taskID: "t0p6d3n1c8h5r7q2m9bv",
            taskDescription: "Schedule dentist appointment",
            deadline: "12/06/2025",
            dateCompleted: "N/A",
            completed: false
        }
    ] 
};

// this has been here since october pa and one of my first priorities with the app was retaining these tasks.
// so since october ko pa siya naimplement yung pagsusunod ng tasks to the next day

function makeID() {
    var id = '';
    var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    while(true){
        for(let i=0; i < 20; i++){
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        if(!userIdExists(id)){
            break;
        }
        id = ''; //reset the userid
    }
    return id;
}

function saveToLocalStorage() {
    localStorage.setItem('user-tasks', JSON.stringify(userTasks));
}

export function createEmptyTasks(userId) {
    userTasks[userId] = [];
    saveToLocalStorage();
}

export function addNewTask(userId, taskDescription, deadline) {
    userTasks[userId].push({
        taskID: makeID(),
        taskDescription,
        deadline: ((deadline === "") ? "N/A" : deadline),
        dateCompleted: 'N/A',
        completed: false
    });
    saveToLocalStorage();
    setCurrentUser(userId);
    loadTasksToOverlay();
}

export function getUserTasks(userId) {
    return userTasks[userId];
}

export function getNumberOfTasksCompleted(userId) {
    const userTasksCount = {};

    if(userTasks[userId])
    userTasks[userId].forEach((task) => {

        console.log("inside of function: " + task.dateCompleted);
        if (userTasksCount.hasOwnProperty(task.dateCompleted)){
            userTasksCount[task.dateCompleted] += 1;
        } else {
            userTasksCount[task.dateCompleted] = 1;
        }
    });
    return userTasksCount;
}

export function getDateCompleted(userId, taskID) {
    return userTasks[userId].find((task) => task.taskID === taskID).dateCompleted;
}

export function changeDateCompleted(userId, taskID) {
    const userTask = userTasks[userId].find((task) => task.taskID === taskID);
    userTask.completed = !userTask.completed;
    userTask.dateCompleted = userTask.completed ? shortFullDate : 'N/A';

    saveToLocalStorage();
    setCurrentUser(userId);
}

export function deleteTask(userId, taskID) {
    userTasks[userId] = userTasks[userId].filter((task) => task.taskID !== taskID);
    saveToLocalStorage();
    setCurrentUser(userId);
    loadTasksToOverlay();
}


