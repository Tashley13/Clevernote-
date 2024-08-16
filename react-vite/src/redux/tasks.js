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
  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(createTask(data));
      return data;
    } else {
      const errorText = await response.text();
      console.error('Failed to create task:', errorText);
      throw new Error('Failed to create task');
    }
  } catch (error) {
    console.error('Error in addTask thunk:', error);
    throw error;  // Re-throw the error so it can be handled in the component
  }
};

export const editTask = (task) => async (dispatch) => {
  try {
    console.log('Sending updated task:', task);

    const response = await fetch(`/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Updated task received from server:', data);

      dispatch(updateTask(data));
      return data;  // Return data for any follow-up actions
    } else {
      const errorText = await response.text();
      console.error('Failed to update task:', errorText);
      throw new Error('Failed to update task');
    }
  } catch (error) {
    console.error('Error in editTask thunk:', error);
    throw error;  // Re-throw the error for the component to handle
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
