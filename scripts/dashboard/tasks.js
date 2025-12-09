
import { changeDateCompleted, deleteTask, getUserTasks } from "../data/user-tasks.js";
import { getCurrentUser } from "../data/user-data.js";
import { isToday, shortFullDate } from "./calendar.js";
import { getShortDate } from "../utils/dates.js";

export function loadTasksToOverlay() {
    const currentUser = getCurrentUser();
    const userId = currentUser.userId;

    let tasksHTML = '';
    const tasks = getUserTasks(userId);
    
    if(tasks !== undefined){
        tasks.forEach((task) => {
            const dateCompleted = getShortDate(task.dateCompleted);

            if(isToday){
                console.log("task description: " + task.taskDescription);
                console.log("task.completed = " + task.completed);
                console.log("current date isn't date completed: " + (shortFullDate != dateCompleted));

                if(task.completed === true && shortFullDate != dateCompleted){
                    return;
                }

                document.querySelector('.js-portion-add-task').classList.add('add-task-clickable');
            } else {
                if(task.completed === false || shortFullDate != dateCompleted){
                    return;
                } 
                document.querySelector('.js-portion-add-task').classList.remove('add-task-clickable');
            }

            console.log("task " + task.taskDescription + " completed");
            tasksHTML += `
                <div class="task">
                    <input
                    class="task-button checkbox-input js-checkbox-input" 
                    type="checkbox" 
                    name="checklist" 
                    value="checklist" 
                    id="1" 
                    ${(!isToday) ? 'disabled': ''} 
                    ${(task.completed) ? 'checked' : ''}>
                    <p>${task.taskDescription}</p>
                    <p>Deadline: ${task.deadline}</p>
                    <img class="task-button js-delete-button" src="images/trash-icon.png" width="15px" height="15px">
                </div>
            `;
        });
    }

    if(tasksHTML.length === 0) {
        tasksHTML += `
            <p class="no-tasks">
                No tasks here. Look elsewhere!
            </p>
        `;
    }
    document.querySelector('.js-checklist-content-div').innerHTML = tasksHTML;

    document.querySelectorAll('.js-checkbox-input').forEach((task, index) => {
        task.addEventListener('change', (e) => {
            const tasks = getUserTasks(userId);
            const task = tasks[index];

            console.log("CHANGED THE TASK " + task.taskDescription);
            changeDateCompleted(userId, task.taskID);
        });
    });

    document.querySelectorAll('.js-delete-button').forEach((task, index) => {
        task.addEventListener('click', (e) => {
            e.stopPropagation();
            const tasks = getUserTasks(userId);
            const task = tasks[index];

            console.log("DELETING TASK");
            deleteTask(userId, task.taskID);
        });
    });
}

export function toggleAddTasks(show) {
    document.querySelector('.add-task-overlay')
    .classList.toggle('display-content', show);
}
