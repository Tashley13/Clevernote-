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
export const getAllNotes = () => async (dispatch) => {
    const response = await fetch("/api/notes")

    if (response.ok) {
        const data = await response.json()
        console.log('DATA: ', data)
        if (data.errors) {
            return;
        }
        dispatch(loadNotes(data))//to properly access API
        return data
    }
}
//get note of user
export const getDetailsofUserNote = (noteId) => async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(detailNote(data))
        return data
    }
}

//get tags for notes
export const getTagsforNote = (noteId) => async (dispatch) => {
    const response = await fetch(`/api/notes/tags/${+noteId}`)

    if (response.ok) {
        const data = await response.json()
        if (data.errors) {
            return errors
        }
        dispatch(addNotes({ data }))
    }
}

//create a note

export const createNote = () => async (dispatch) => {
    // console.log("THUNK NOTE: ", note)
    const response = await fetch(`/api/notes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: 'Untitled',
            content: '',
            notebookId: '',
            tagId: ''
        })
    });

    if (response.ok) {
        const newNote = await response.json();
        console.log("NEWNOTE: ", newNote)
        dispatch(addNotes(newNote))
        return newNote;
    }
}
//update a note
export const editUserNote = (note) => async (dispatch) => {
    const response = await fetch(`/api/notes/${note.id}/edit`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(updateNotes(data));
        return data;
    }
    // return response;
}
//delete a note
export const deleteUserNote = (noteId) => async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}`, {
        method: "DELETE",
    });
    if (response.ok) {
        // const data = await response.json();
        dispatch(deleteNote(noteId));
        // return data
    }
    // return response
}

const initialState = {
    allNotes: {},
    selectedNote: {}
    // byid: {}, //load only the actual notes with ids as keys
    // allIds: [] //grab all the ids
};

const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_NOTES: {
            // console.log("STATE: ", state)
            return { ...state, allNotes: { ...action.notes } }
        }
        case DETAIL_NOTE: {
            return {
                ...state, selectedNote: { ...action.note }
            }
        }
        case ADD_NOTE: {
            // const newState = {}
            // newState[action.note.id] = action.note
            // return { ...state, ...newState }
            return {
                ...state,
                allNotes: { ...state.allNotes, [action.note.id]: { ...action.note } },
                selectedNote: { [action.note.id]: { ...action.note } }
            }
        }
        case UPDATE_NOTE:
            // console.log("STATE: ", state),
            return {
                ...state,
                allNotes: { ...state.allNotes, [action.note.id]: { ...action.note } },
                selectedNote: { [action.note.id]: { ...action.note } }
            }
        case DELETE_NOTE: {
            const newState = { ...state }
            delete newState.allNotes[action.noteId];
            return {
                ...newState
            }
        }
        default: {
            return state
        }
    }
}

export default noteReducer;
