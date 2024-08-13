const CREATE_TAG = 'tags/createTag'
const UPDATE_TAG = 'tags/updateTag'
const DELETE_TAG = 'tags/deleteTag'
const LOAD_TAG = 'tags/loadTag'

const createTag = (payload) => ({
	type: CREATE_TAG,
	payload
})

const updateTag = (payload) => ({
	type: UPDATE_TAG,
	payload
})

const deleteTag = (payload) => ({
	type: DELETE_TAG,
	payload
})

const loadTag = (payload) => ({
	type: LOAD_TAG,
	payload
})

export const thunkCreateTag = (tag) => async (dispatch) => {
	const res = await fetch("/api/tags", {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(tag)
	})

	if (res.ok) {
		const data = await res.json()

		if(data.errors) {
			return;
		}

		dispatch(createTag(data))
		return data
	}
}

export const thunkEditTag = (tag) => async (dispatch) => {
	const res = await fetch(`/api/tags/${tag.id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(tag)
	})

	if (res.ok) {
		const data = await res.json()

		if(data.errors) {
			return;
		}

		dispatch(updateTag(data))
	}
}

export const thunkDeleteTag = (tag) => async (dispatch) => {
	console.log('TEST 3 ----->', tag)
	const res = await fetch(`/api/tags/${tag.id}`, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
	})

	if (res.ok) {
		const data = await res.json()

		if (data.errors) {
			return;
		}

		dispatch(deleteTag(data))
	}
}

export const thunkGetTag = () => async (dispatch) => {
	const res = await fetch('/api/tags')

	if (res.ok) {
		const data = await res.json()

		if (data.errors) {
			return;
		}

		dispatch(loadTag(data))
	}
}

<<<<<<< HEAD
=======
export const thunkGetDetails = (id) => async (dispatch) => {
	const res = await fetch(`/api/tags/${id}`)

	if (res.ok) {
		const data = await res.json()

		if (data.errors) {
			return;
		}

		dispatch(loadDetails(data))
	}
}

>>>>>>> 5d95b7a (delete tag implemented fully)
const initialState = {};

const tagReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_TAG: {
			const newState = {}
			action.payload.forEach(tag => {
				newState[tag.id] = tag
			});
			// console.log('TEST ---> ', newState)
			return {...newState}
		}
<<<<<<< HEAD
=======
		case LOAD_DETAILS: {
			console.log('TEST ---> ', action)
			return {...action.payload}
		}
>>>>>>> 5d95b7a (delete tag implemented fully)
		case CREATE_TAG: {
			const newState = {}
			newState[action.payload.id] = action.payload
			return {...state, ...newState}
		}
		case UPDATE_TAG: {
			return state.map(tag => tag.id === action.tag.id ? action.tag : tag)
		}
		case DELETE_TAG: {
			return Object.values(state).filter(tag => tag.id !== action.tag.id)
		}
		default:
			return state
	}
}

export default tagReducer;
