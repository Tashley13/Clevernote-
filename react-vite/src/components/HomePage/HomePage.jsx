import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../redux/tasks';

const HomePage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div id="split-layout">
      <nav id="nav-main">
        {/* Your existing navigation */}
      </nav>
      <div className="homepage-container">
        <div className="tasks-sidebar">
          <h2>My Tasks</h2>
          {/* Render tasks here */}
          {tasks && tasks.map(task => (
            <div key={task.id} className="task">
              <p>{task.title}</p>
              <p>{task.due_date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
