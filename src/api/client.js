const defaultHeaders = {
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        /* "Access-Control-Allow-Origin" : "*", 
        "Access-Control-Allow-Credentials" : true, */
    },
}

export const getNotesAPIMethod = () => {
    return fetch(`/api/notes`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

export const createNoteAPIMethod = (note) => {
    console.log("note: " + note);
    return fetch(`/api/notes`, {
        ...defaultHeaders,
        method: 'POST', // The method defaults to GET
        body: JSON.stringify(note),
    }).then(checkStatus)
        .then(parseJSON);
}

export const updateNoteAPIMethod = (note) => {
    console.log("note: " + note);
    return fetch(`/api/notes/${note._id}`, {
        ...defaultHeaders,
        method: 'PUT', // The method defaults to GET
        body: JSON.stringify(note),
    }).then(checkStatus)
        .then(parseJSON);
}

export const deleteNoteByIdAPIMethod = (noteId) => {
    console.log("noteId: " + noteId);
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


//USERS
export const getUserAPIMethod = () => {
    return fetch(`/api/users`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

export const createUserAPIMethod = (user) => {
    return fetch(`/api/users`, {
        ...defaultHeaders,
        method: 'POST', // The method defaults to GET
        body: JSON.stringify(user),
    }).then(checkStatus)
        .then(parseJSON);
}

export const updateUserAPIMethod = (user) => {
    return fetch(`/api/users/${user._id}`, {
        ...defaultHeaders,
        method: 'PUT', // The method defaults to GET
        body: JSON.stringify(user),
    }).then(checkStatus)
        .then(parseJSON);
}

export const deleteUserByIdAPIMethod = (userId) => {
    return fetch(`/api/users/${userId}`, {
        ...defaultHeaders,
        method: 'DELETE',
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