
import { getUserTasks } from "../data/user-tasks.js";
import { getUserId } from "../data/user-data.js";

export function loadTasksToOverlay(isToday, shortFullDate) {
    const params = new URLSearchParams(window.location.search);
    const usernameFromParams = params.get('uname');
    const userId = getUserId(usernameFromParams);

    let tasksHTML = '';
    const tasks = getUserTasks(userId);
    tasks.forEach((task) => {
        if(task.archived === true){
            return;
        }

        if(isToday){
            if(task.completed === true && shortFullDate != task.dateCompleted){
                return;
            }
        } else {
            if(task.completed === false || shortFullDate != task.dateCompleted){
                return;
            } 
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

    document.querySelector('.js-checklist-content-div').innerHTML = tasksHTML;
}

