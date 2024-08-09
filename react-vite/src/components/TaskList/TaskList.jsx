import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../redux/tasks';
import './TaskList.css';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks); // Ensure 'tasks' is set correctly in the store

  useEffect(() => {
    dispatch(fetchTasks()); // Fetch tasks on component mount
  }, [dispatch]);

  return (
    <div className="task-list">
      <h2>My Tasks</h2>
      <ul>
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id} className={`task ${task.status === 'completed' ? 'completed' : ''}`}>
              <span>{task.title}</span>
              {/* Additional task details can be added here */}
            </li>
          ))
        ) : (
          <p>No tasks available.</p>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
