import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTasks } from '../../redux/tasks';
import { getDetailsofUserNote } from '../../redux/note';
import { thunkGetNotebooks } from '../../redux/notebooks';
import { thunkGetTag } from '../../redux/tags';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();

  // Select tasks, notes, notebooks, tags, and the user from the Redux store
  const tasks = useSelector(state => state.tasks);
  const notes = useSelector(state => state.notes);
  const notebooks = useSelector(state => state.notebooks.allNotebooks);
  const tags = useSelector(state => state.tags);
  const userId = useSelector(state => state.session.user.id); // Get the logged-in user's ID

  useEffect(() => {
    dispatch(fetchTasks());          // Fetch tasks
    dispatch(getDetailsofUserNote()); // Fetch notes
    dispatch(thunkGetNotebooks());    // Fetch notebooks
    dispatch(thunkGetTag());          // Fetch tags
  }, [dispatch]);

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter notes and tags based on the logged-in user's ID
  const filteredNotes = Object.values(notes).filter(note => note.userId === userId);
  const filteredTags = Object.values(tags).filter(tag => tag.user_id === userId);

  console.log("User ID:", userId);
  console.log("Filtered Notes:", filteredNotes);
  console.log("Filtered Tags:", filteredTags);

  return (
    <div className="homepage-container">
      <div className="notes-feature-tile">
        <Link to="/notes"><h2>My Notes</h2></Link>
        <ul>
          {filteredNotes.map(note => (
            <li key={note.id} className="note">
              <div className="note-title">{note.title}</div>
              <div className="note-content">{note.content}</div>
              <div className="note-date">{formatDate(note.created_at)}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="tasks-feature-tile">
        <Link to="/tasks"><h2>My Tasks</h2></Link>
        <ul>
          {tasks && Object.values(tasks).map(task => (
            <li key={task.id} className="task">
              <div className="task-title">{task.title}</div>
              <div className="task-status">{task.status ? 'Completed' : 'Pending'}</div>
              <div className="task-due-date">{formatDate(task.due_date)}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="notebooks-feature-tile">
        <Link to="/notebooks"><h2>My Notebooks</h2></Link>
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
        <Link to="/tags"><h2>My Tags</h2></Link>
        <ul>
          {filteredTags.map(tag => (
            <li key={tag.id} className="tag">
              <div className="tag-title">{tag.tag_name}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
