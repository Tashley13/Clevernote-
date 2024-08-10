export const LOAD_NOTES = 'notes/LOAD_NOTES'
export const DETAIL_NOTE = 'notes/DETAIL_NOTE'
export const ADD_NOTE = 'notes/ADD_NOTE'
export const UPDATE_NOTE = 'notes/UPDATE_NOTE'
export const DELETE_NOTE = 'notes/DELETE_NOTE'


//POJO action creators
const loadNotes = (notes) => {
    return {
        type: LOAD_NOTES,
        notes
    }
}

const detailNote = (note) => {
    return {
        type: DETAIL_NOTE,
        note
    }
}

const addNotes = (note) => {
    return {
        type: ADD_NOTE,
        note
    }
}

const updateNotes = (note) => {
    return {
        type: UPDATE_NOTE,
        note
    }
}

const deleteNote = (noteId) => {
    return {
        type: DELETE_NOTE,
        noteId
    }
}

//thunks

//get all notes of user
export const getAllNotesUser = () => async (dispatch) => {
    const response = await fetch('/api/notes')

    if (response.ok) {
        const data = await response.json()
        // console.log('DATA: ', data)
        if(data.errors) {
            console.errors("Errors: ", data.errors);
            return;
        }
        dispatch(loadNotes(data))
        return data
    }
}
//get details of a note
// export const getNoteDetails = () => async (dispatch) => {

// }
//create a note
export const createNote = (note) => async (dispatch) => {
    const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(note)
    });

    if (response.ok) {
        const newNote = await response.json();
        dispatch(addNotes(newNote))
        return newNote;
    }
}
//update a note
export const editUserNote = (note) => async (dispatch) => {
    const response = await fetch(`/api/notes/${note.id}`, {
        method: "PUT",
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(note)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(updateNotes(data));
        return data;
    }
    return response;
}

//delete a note
export const deleteUserNote = (noteId) => async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}`, {
        method: "DELETE",
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteNote(noteId));
        return data
    }
    return response
}

const initialState = {
    // byid: {}, //load only the actual notes with ids as keys
    // allIds: [] //grab all the ids
};

const noteReducer = (state= initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_NOTES:
            console.log('NEW STATEL ', newState)
            return newState

        case DETAIL_NOTE:

            return newState // spread the state

        case ADD_NOTE:

            return newState // spread the state

        case UPDATE_NOTE:

            return newState // spread the state

        case DELETE_NOTE:

            return newState // spread the state

        default:
            return state
    }
}

export default noteReducer;
