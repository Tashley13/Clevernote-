import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../redux/tasks';
import { useModal } from '../../context/Modal';
import './createTaskModal.css'

const CreateTaskModal = () => {
  const dispatch = useDispatch();
  const { closeModal } = useModal(); // Getting closeModal from context
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      title,
      body,
      status,
      due_date: dueDate,
      priority
    };
    dispatch(addTask(newTask)).then(() => {
      closeModal(); // Close the modal upon successful task creation
    });
  };

  return (
    <div className="modal-container">
      <form onSubmit={handleSubmit} className="task-form">
        <h2>Create a New Task</h2>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Priority</label>
          <select value={priority} onChange={(e) => setPriority(Number(e.target.value))}>
            <option value={1}>Low</option>
            <option value={2}>Medium</option>
            <option value={3}>High</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Create Task</button>
      </form>
    </div>
  );
};

export default CreateTaskModal;
