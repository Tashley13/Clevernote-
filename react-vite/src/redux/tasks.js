// Action Types
const GET_TASKS = 'tasks/GET_TASKS';
const CREATE_TASK = 'tasks/CREATE_TASK';
const UPDATE_TASK = 'tasks/UPDATE_TASK';
const DELETE_TASK = 'tasks/DELETE_TASK';

// Action Creators
const getTasks = (tasks) => ({
  type: GET_TASKS,
  tasks
});

const createTask = (task) => ({
  type: CREATE_TASK,
  task
});

const updateTask = (task) => ({
  type: UPDATE_TASK,
  task
});

const deleteTask = (taskId) => ({
  type: DELETE_TASK,
  taskId
});

// Thunk Actions
export const fetchTasks = () => async (dispatch) => {
  const response = await fetch('/api/tasks');
  const data = await response.json();
  if (response.ok) {
    dispatch(getTasks(data));
  }
};

export const addTask = (task) => async (dispatch) => {
  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(createTask(data));
  }
};

export const editTask = (task) => async (dispatch) => {
  const response = await fetch(`/api/tasks/${task.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(updateTask(data));
  }
};

export const removeTask = (taskId) => async (dispatch) => {
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: 'DELETE'
  });
  if (response.ok) {
    dispatch(deleteTask(taskId));
  }
};

// Reducer
const initialState = [];

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS:
      return action.tasks;
    case CREATE_TASK:
      return [...state, action.task];
    case UPDATE_TASK:
      return state.map(task => task.id === action.task.id ? action.task : task);
    case DELETE_TASK:
      return state.filter(task => task.id !== action.taskId);
    default:
      return state;
  }
};

export default taskReducer;
