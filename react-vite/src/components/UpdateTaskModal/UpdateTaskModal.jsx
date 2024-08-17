import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editTask } from '../../redux/tasks';
import { useModal } from '../../context/Modal';

const UpdateTask = ({ task }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  // Function to format the date to YYYY-MM-DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);
  const [dueDate, setDueDate] = useState(formatDate(task.due_date));
  const [priority, setPriority] = useState(task.priority);
  const [body, setBody] = useState(task.body);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTask = {
      ...task,
      title,
      description: body,
      status,
      due_date: dueDate,
      priority,
    };

    try {
      await dispatch(editTask(updatedTask));
      closeModal(); 
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
          <label>Body</label>
          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value === "true" ? true : false)}>
            <option value={false}>Pending</option>
            <option value={true}>Completed</option>
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
