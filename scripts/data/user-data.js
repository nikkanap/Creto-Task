import { getCurrentDateString } from "../utils/dates.js"; 

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

export function getUser(username) {
    let matchingUser;
    users.forEach((user) => {
        if(username === user.username) 
            matchingUser = user;
    });
    return matchingUser;
} 

export function validateLogin(username, password) {
    const user = getUser(username);
    return (user.password === password);
}

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

function saveToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(users));
}

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

function userIdExists(userId) {
    let doesUserIdExist = false;
    users.forEach((user) => {
        if(userId === user.userId) {
            doesUserIdExist = true;
        }
    });
    return doesUserIdExist;
}

export function saveDailyQuota(username, dailyQuota) {
    const user = users.find(u => u.username === username);
    user.dailyQuota = dailyQuota;
    localStorage.setItem('users', JSON.stringify(users));
}


