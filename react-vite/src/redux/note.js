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

//get details of a note

//create a note

//update a note

//delete a note

const initialState = {
    byid: {}, //load only the actual notes with ids as keys
    allIds: [] //grab all the ids
};

const noteReducer = (state= initialState, action) => {
    switch (action.type) {
        case LOAD_NOTES:
        const newState = { ...state } // spread the state

    }
}

export default noteReducer;
