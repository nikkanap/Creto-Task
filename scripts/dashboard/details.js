import { getCurrentUser } from "../data/user-data.js";

// render details from the dashboard like user 
export function renderDetails() {
    const currentUser = getCurrentUser();
    const currentUserUsername = currentUser.username;
    document.querySelectorAll('.js-username').forEach((username) => {
        username.innerHTML = currentUserUsername;
    });

    document.querySelector('.js-email').innerHTML = currentUser.email;
    document.querySelector('.js-date-joined').innerHTML = currentUser.dateJoined;
    document.querySelector('.js-daily-quota-display').innerHTML = `${currentUser.dailyQuota} tasks per day`;
}