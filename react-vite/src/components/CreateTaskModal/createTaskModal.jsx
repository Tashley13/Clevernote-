import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../redux/tasks';
import { useModal } from '../../context/Modal';
import './createTaskModal.css';

const CreateTaskModal = () => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState(1);
  const [errors, setErrors] = useState({}); // State for storing error messages

  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation
    if (!title) newErrors.title = 'Title is required';
    if (!description) newErrors.description = 'Description is required';
    if (!dueDate) newErrors.dueDate = 'Due date is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Do not submit if there are errors
    }

    const newTask = {
      title,
      description,
      status,
      due_date: dueDate,
      priority,
    };

    dispatch(addTask(newTask))
      .then(() => {
        closeModal();
      })
      .catch((err) => {
        console.error('Error creating task:', err);
      });
  };

  return (
    <div className="modal-container">
      <div className="task-form" ref={modalRef}>
        <h2>Create a New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <p className="error">{errors.title}</p>}
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && <p className="error">{errors.description}</p>}
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
            {errors.dueDate && <p className="error">{errors.dueDate}</p>}
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
    </div>
  );
};

export default CreateTaskModal;
