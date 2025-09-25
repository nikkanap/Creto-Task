import { getCurrentDateString } from "../utils/dates.js"; 

// userdata for now
export let users = JSON.parse(localStorage.getItem('users')) || [
    {
        userId: 'HY0rGRVqjFOFkIrKcFDS',
        username: 'NioDilao',
        email: 'emailAddress@gmail.com',
        password: 'password123',
        dateJoined: 'May 3, 2025',
        dailyQuota: 5
    },
    {
        userId: 'uyPT3hwAq72LKLhvZpjH',
        username: 'NikkaNaputo',
        email: 'nikkanaputo@gmail.com',
        password: 'testPass',
        dateJoined: 'September 2, 2025',
        dailyQuota: 10
    }
];

// checks if user with username exists
export function userExists(username) {
    let doesUserExist = false;
    users.forEach((user) => {
        if(username === user.username) {
            console.log(user.username);
            doesUserExist = true;
        }
    });
    return doesUserExist;
} 

// gets a user object from username
export function getUser(username) {
    let matchingUser;
    users.forEach((user) => {
        if(username === user.username) 
            matchingUser = user;
    });
    return matchingUser;
} 

// validates the username, password login
export function validateLogin(username, password) {
    const user = getUser(username);
    return (user.password === password);
}

// saves a new account to users
export function saveNewAccount(username, email, password) {
    users.push({
        userId: makeID(),
        username,
        email,
        password,
        dateJoined: getCurrentDateString(),
        dailyQuota: 0 
    });
    saveToLocalStorage();
}

// save the current state of users to localStorage
function saveToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(users));
}

// generates a random ID
export function makeID() {
    var id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
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

// checks if userID exists
function userIdExists(userId) {
    let doesUserIdExist = false;
    users.forEach((user) => {
        if(userId === user.userId) {
            doesUserIdExist = true;
        }
    });
    return doesUserIdExist;
}

// saves the daily quota the account sets and saves it to localStorage
export function saveDailyQuota(username, dailyQuota) {
    const user = users.find(u => u.username === username);
    user.dailyQuota = dailyQuota;
    saveToLocalStorage();
}


