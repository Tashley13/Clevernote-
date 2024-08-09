import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../redux/tasks'; // Make sure this path is correct

const HomePage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="homepage-container">
      <h2>My Tasks</h2>
      {/* Render tasks here */}
      {tasks && tasks.map(task => (
        <div key={task.id}>
          <p>{task.title}</p>
          <p>{task.due_date}</p>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
