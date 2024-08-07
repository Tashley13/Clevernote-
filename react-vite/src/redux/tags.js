
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

const initialState = {};

const tagReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_TAG: {
			const newState = {}
			newState[action.payload.newTag.id] = action.payload.newTag
		}
		default:
			return state
	}
}
