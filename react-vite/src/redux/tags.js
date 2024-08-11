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
	const res = await fetch("/api/tags/", {
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
	const res = await fetch(`/api/tags/${tag.id}`, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(tag)
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
	const res = await fetch('/api/tags/')

	if (res.ok) {
		const data = await res.json()

		if (data.errors) {
			return;
		}

		dispatch(loadTag(data))
	}
}

const initialState = {};

const tagReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_TAG: {
			const newState = {}
			action.payload.newTag.forEach(tag => {
				newState[tag.id] = tag
			});
			return newState
		}
		case CREATE_TAG: {
			const newState = {}
			console.log('TEST ---> ', action.payload.data)
			newState[action.payload.id] = action.payload
			return {...state, ...newState}
		}
		case UPDATE_TAG: {
			return state.map(tag => tag.id === action.tag.id ? action.tag : tag)
		}
		case DELETE_TAG: {
			return state.filter(tag => tag.id !== action.tag.id)
		}
		default:
			return state
	}
}

export default tagReducer;
