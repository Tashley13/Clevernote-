import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../redux/tasks';
import { useModal } from '../../context/Modal'; // Assuming you have useModal from your context

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
    <div>
      <h2>Create a New Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div>
          <label>Priority</label>
          <select value={priority} onChange={(e) => setPriority(Number(e.target.value))}>
            <option value={1}>Low</option>
            <option value={2}>Medium</option>
            <option value={3}>High</option>
          </select>
        </div>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default CreateTaskModal;
