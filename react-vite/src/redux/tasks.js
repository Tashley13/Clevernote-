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
  try {
    const response = await fetch('/api/tasks');

    if (response.ok) {
      const data = await response.json();
      dispatch(getTasks(data));
    } else {
      const errorText = await response.text();
      console.error('Error response:', errorText);
    }
  } catch (error) {
    console.error('Network or other error:', error);

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
const initialState = {};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS:
      const tasksObj = {};
      action.tasks.forEach(task => {
        tasksObj[task.id] = task;
      });
      return tasksObj;

    case CREATE_TASK:
      return {
        ...state,
        [action.task.id]: action.task,
      };

    case UPDATE_TASK:
      return {
        ...state,
        [action.task.id]: action.task,
      };

    case DELETE_TASK:
      const newState = { ...state };
      delete newState[action.taskId];
      return newState;

    default:
      return state;
  }
};

export default taskReducer;
