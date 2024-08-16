import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editTask } from '../../redux/tasks';
import { useModal } from '../../context/Modal';
// import './UpdateTask.css';

const UpdateTask = ({ task }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  // Initialize state with the task's current values
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);
  const [dueDate, setDueDate] = useState(task.due_date ? task.due_date.split('T')[0] : '');
  const [priority, setPriority] = useState(task.priority);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTask = {
      ...task,
      title,
      status,
      due_date: dueDate,
      priority,
    };

    try {
      await dispatch(editTask(updatedTask));
      closeModal(); // Close the modal upon successful task update
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  return (
    <div className="update-task-modal">
      <h2>Update Task</h2>
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
        <button type="submit" className="submit-button">Update Task</button>
      </form>
    </div>
  );
};

export default UpdateTask;
