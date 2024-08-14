import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../redux/tasks';
import { getDetailsofUserNote } from '../../redux/note';
import { thunkGetNotebooks } from '../../redux/notebooks';
import { thunkGetTag } from '../../redux/tags';
import './HomePage.css'

const HomePage = () => {
  const dispatch = useDispatch();

  // Select tasks, notes, and notebooks, tags, from the Redux store
  const tasks = useSelector(state => state.tasks);
  const notes = useSelector(state => state.notes);
  const notebooks = useSelector(state => state.notebooks.allNotebooks);
  const tags = useSelector(state => state.tags);

  useEffect(() => {
    dispatch(fetchTasks());  // Fetch tasks
    dispatch(getDetailsofUserNote());  // Fetch notes
    dispatch(thunkGetNotebooks());  // Fetch notebooks
     dispatch(thunkGetTag());  // Fetch tags
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
          {notes && Object.values(notes).map(note => (
            <li key={note.id} className="note">
              <div className="note-title">{note.title}</div>
              <div className="note-content">{note.content}</div>
              <div className="note-date">{formatDate(note.created_at)}</div>
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
          {notebooks && Object.values(notebooks).map(notebook => (
            <li key={notebook.id} className="notebook">
              <div className="notebook-title">{notebook.title}</div>
              <div className="notebook-date">{formatDate(notebook.created_at)}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="tags-feature-tile">
        <h2>My Tags</h2>
        <ul>
          {tags && Object.values(tags).map(tag => (
            <li key={tag.id} className="tag">
              <div className="tag-title">{tag.name}</div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default HomePage;
