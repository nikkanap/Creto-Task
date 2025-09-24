export const users = JSON.parse(localStorage.getItem('users')) || [
    {
        username: 'NioDilao',
        email: 'emailAddress@gmail.com',
        password: 'password123',
        dailyQuota: 5
    },
    {
        username: 'NikkaNaputo',
        email: 'nikkanaputo@gmail.com',
        password: 'testPass',
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

function saveToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(users));
}

