import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../redux/tasks';
import './HomePage.css'

const HomePage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);
  console.log("TASKS: ", typeof tasks)
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="homepage-container">

      <div className="notes-feature-tile">
        <h2>My Notes</h2>
        {/* Render tasks here */}
        <ul>
          {tasks && Object.values(tasks).map(task => (
            <li key={task.id} className="task">
              <p>{task.title}</p>
              <p>{task.due_date}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="tasks-feature-tile">
        <h2>My Tasks</h2>
        {/* Render tasks here */}
        <ul>
          {tasks && Object.values(tasks).map(task => (
            <li key={task.id} className="task">
              <p>{task.title}</p>
              <p>{task.due_date}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="notebooks-feature-tile">
        <h2>My Notebooks</h2>
        {/* Render tasks here */}
        <ul>
          {tasks && Object.values(tasks).map(task => (
            <li key={task.id} className="task">
              <p>{task.title}</p>
              <p>{task.due_date}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="tags-feature-tile">
        <h2>My Tags</h2>
        {/* Render tasks here */}
        <ul>
          {tasks && Object.values(tasks).map(task => (
            <li key={task.id} className="task">
              <p>{task.title}</p>
              <p>{task.due_date}</p>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default HomePage;
