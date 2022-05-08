const defaultHeaders = {
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
}

export const getNotesAPIMethod = () => {
    return fetch(`/api/notes`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

export const createNoteAPIMethod = (note) => {
    return fetch(`/api/notes`, {
        ...defaultHeaders,
        method: 'POST', 
        body: JSON.stringify(note),
    }).then(checkStatus)
        .then(parseJSON);
}

export const updateNoteAPIMethod = (note) => {
    return fetch(`/api/notes/${note._id}`, {
        ...defaultHeaders,
        method: 'PUT', 
        body: JSON.stringify(note),
    }).then(checkStatus);
}

export const deleteNoteByIdAPIMethod = (noteId) => {
    return fetch(`/api/notes/${noteId}`, {
        ...defaultHeaders,
        method: 'DELETE',
    }).then(checkStatus)
        .then(parseJSON);
}

export const getNoteByIdAPIMethod = (noteId) => {
    return fetch(`/api/notes/${noteId}`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

export const getUserNotesAPIMethod = (userId) => {
    return fetch(`/api/notes/${userId}`, {
        ...defaultHeaders,
    }).then(checkStatus).then(parseJSON);
}


//USERS
/* export const getUsersAPIMethod = () => {
    return fetch(`/api/users`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
} */

export const getUsersAPIMethod = () => {
    return fetch(`/api/users`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

export const loginAPIMethod = (user) => {
    return fetch(`/api/login`, {
        ...defaultHeaders,
        method: 'POST',
        body: JSON.stringify(user)
    }).then(checkStatus)
        /* .then(parseJSON) */;
}

export const getUserByIdAPIMethod = (userId) => {
    return fetch(`/api/users/${userId}`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

export const createUserAPIMethod = (user) => {
    return fetch(`/api/register`, {
        ...defaultHeaders,
        method: 'POST', 
        body: JSON.stringify(user),
    }).then(checkStatus)
        .then(parseJSON);
}

export const updateUserAPIMethod = (user) => {
    return fetch(`/api/users/${user._id}`, {
        ...defaultHeaders,
        method: 'PUT', 
        body: JSON.stringify(user),
    }).then(checkStatus);
}

export const deleteUserByIdAPIMethod = (userId) => {
    return fetch(`/api/users/${userId}`, {
        ...defaultHeaders,
        method: 'DELETE',
    }).then(checkStatus)
        .then(parseJSON);
}


export const uploadImageToCloudinaryAPIMethod = (formData) => {
    const cloudName = 'samuelhan' // TODO: Write in your own Cloudinary account
    return fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        // We do NOT want to set the default headers – the formData will automatically set the
        // headers to tell the server of the data type (which is different than the JSON
        // standard all the other API calls have been sending
        method: 'POST',
        body: formData,
    }).then(checkStatus)
        .then(parseJSON);
}



function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(`HTTP Error: ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        console.log(error);
        throw error;
    }
}

function parseJSON(response) {
    console.log("response: " + response);
    return response.json();
}