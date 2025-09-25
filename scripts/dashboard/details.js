import { getUser } from "../data/user-data.js";

// render details from the dashboard like user 
export function renderDetails() {
    const params = new URLSearchParams(window.location.search);
    const usernameFromParams = params.get('uname');
    document.querySelectorAll('.js-username').forEach((username) => {
        username.innerHTML = usernameFromParams;
    });

    const user = getUser(usernameFromParams);
    document.querySelector('.js-email').innerHTML = user.email;
    document.querySelector('.js-date-joined').innerHTML = user.dateJoined;
    document.querySelector('.js-daily-quota-display').innerHTML = `${user.dailyQuota} tasks per day`;
}