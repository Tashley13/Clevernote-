const SET_NOTEBOOKS = "notebook/setNotebooks"
const ADD_NOTEBOOK = "notebook/addNotebook"
const REMOVE_NOTEBOOK = "notebook/removeNotebook"

const setNotebooks = (notebooks) => ({
    type: SET_NOTEBOOKS,
    payload: notebooks
})

const addNotebook = (notebook) => ({
    type: SET_NOTEBOOKS,
    payload: notebook
})

const removeNotebook = (id) => ({
    type: SET_NOTEBOOKS,
    payload: id
})

export const thunkGetNotebooks = () => async (dispatch) =>{
    const res = await fetch("/api/notebooks")

    if(res.ok){
        const data = await res.json()

        if(data.errors){
            return;
        }

        dispatch(setNotebooks(data))
    }
}

export const thunkAddNotebook = (newNotebook) => async (dispatch) =>{
    const res = await fetch("/api/notebooks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newNotebook)
    })

    if(res.ok){
        const data = await res.json()

        if(data.errors){
            return;
        }

        dispatch(addNotebook(data))
    }
}

export const thunkEditANotebook = (notebookId) => async (dispatch) =>{
    const res = await fetch(`/api/notebooks/${+notebookId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({notebook_id: notebookId})
    })

    if(res.ok){
        const data = await res.json()

        if(data.errors){
            return;
        }

        dispatch(addNotebook(data))
    }
}

export const thunkDeleteANotebook = (notebookId) => async (dispatch) =>{
    const res = await fetch(`/api/notebooks/${+ notebookId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({notebook_id: +notebookId})
    })

    if(res.ok){
        const data = await res.json()

        if(data.errors){
            return;
        }

        dispatch(removeNotebook(data))
    }
}

const initialState = { notebooks: null };

function notebookReducer(state = initialState, action) {
    switch (action.type) {
      case SET_NOTEBOOKS:
        return { ...state, notebooks: action.payload };
      case ADD_NOTEBOOK:
        return { ...state, notebooks: {...state.notebooks, [action.payload.id]: action.payload} };
      case REMOVE_NOTEBOOK:
        delete state.notebooks[action.payload]
        return state;
      default:
        return state;
    }
  }

  export default notebookReducer;