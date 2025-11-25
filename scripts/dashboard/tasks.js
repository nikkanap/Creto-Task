
import { getUserTasks } from "../data/user-tasks.js";
import { getCurrentUser, getUserId } from "../data/user-data.js";

export function loadTasksToOverlay(isToday, shortFullDate) {
    const currentUser = getCurrentUser();
    const userId = currentUser.userId;

    let tasksHTML = '';
    const tasks = getUserTasks(userId);
    
    if(tasks !== undefined){
        tasks.forEach((task) => {
            if(task.archived === true){
                return;
            }

            if(isToday){
                if(task.completed === true && shortFullDate != task.dateCompleted){
                    return;
                }

                document.querySelector('.js-portion-add-task').classList.add('add-task-clickable');
            } else {
                if(task.completed === false || shortFullDate != task.dateCompleted){
                    return;
                } 
                document.querySelector('.js-portion-add-task').classList.remove('add-task-clickable');
            }

            tasksHTML += `
                <div class="task">
                    <input class="task-button checkbox-input" type="checkbox" name="checklist" value="checklist" id="1" ${(!isToday) ? 'onclick="return false"': ''} ${(task.completed) ? 'checked' : ''}>
                    <p>${task.taskDescription}</p>
                    <p>Deadline: ${task.deadline}</p>
                    <img class="task-button" src="images/trash-icon.png" width="15px" height="15px">
                    <img class="task-button" src="images/archive-icon.png" width="15px" height="15px">
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
}

