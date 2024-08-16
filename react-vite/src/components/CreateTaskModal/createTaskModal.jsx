import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../redux/tasks';
import { useModal } from '../../context/Modal';
import './createTaskModal.css';


const CreateTaskModal = () => {
  const dispatch = useDispatch();
  const { closeModal } = useModal(); // Getting closeModal from context
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(''); // Rename 'body' to 'description'
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState(1);

  // Reference for the modal content
  const modalRef = useRef();

  // Function to handle closing the modal when clicking outside of it
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
    const newTask = {
      title,
      description, // Ensure this matches the expected field name on the backend
      status,
      due_date: dueDate,
      priority,
    };

    dispatch(addTask(newTask))
      .then(() => {
        closeModal(); // Close the modal upon successful task creation
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
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label> {/* Update label to match new state name */}
            <textarea
              value={description} // Update this to 'description'
              onChange={(e) => setDescription(e.target.value)} // Update this to 'setDescription'
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
    </div>
  );
};

export default CreateTaskModal;
