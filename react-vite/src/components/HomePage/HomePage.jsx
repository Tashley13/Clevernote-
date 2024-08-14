import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../redux/tasks';
import './HomePage.css'

const HomePage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

   const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

   return (
    <div className="homepage-container">

      <div className="notes-feature-tile">
        <h2>My Notes</h2>
        <ul>
          {tasks && Object.values(tasks).map(task => (
            <li key={task.id} className="task">
              <div className="task-title">{task.title}</div>
              <div className="task-status">{task.completed ? 'Completed' : 'Pending'}</div>
              <div className="task-due-date">{formatDate(task.due_date)}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="tasks-feature-tile">
        <h2>My Tasks</h2>
        <ul>
          {tasks && Object.values(tasks).map(task => (
            <li key={task.id} className="task">
              <div className="task-title">{task.title}</div>
              <div className="task-status">{task.completed ? 'Completed' : 'Pending'}</div>
              <div className="task-due-date">{formatDate(task.due_date)}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="notebooks-feature-tile">
        <h2>My Notebooks</h2>
        <ul>
          {tasks && Object.values(tasks).map(task => (
            <li key={task.id} className="task">
              <div className="task-title">{task.title}</div>
              <div className="task-status">{task.completed ? 'Completed' : 'Pending'}</div>
              <div className="task-due-date">{formatDate(task.due_date)}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="tags-feature-tile">
        <h2>My Tags</h2>
        <ul>
          {tasks && Object.values(tasks).map(task => (
            <li key={task.id} className="task">
              <div className="task-title">{task.title}</div>
              <div className="task-status">{task.completed ? 'Completed' : 'Pending'}</div>
              <div className="task-due-date">{formatDate(task.due_date)}</div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default HomePage;
