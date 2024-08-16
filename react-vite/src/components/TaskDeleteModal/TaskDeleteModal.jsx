import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeTask, fetchTasks } from '../../redux/tasks';
import { useModal } from '../../context/Modal';
import './TaskDeleteModal.css';

const TaskDeleteModal = ({ taskId }) => {
  const { closeModal } = useModal();
  const [errors, setErrors] = useState({
    delete: ''
  });

  const dispatch = useDispatch();

  const deleteTask = async (e) => {
    e.preventDefault();

    try {
      await dispatch(removeTask(taskId));
      await dispatch(fetchTasks());  // Refresh the list of tasks after deletion
      closeModal();
    } catch (error) {
      setErrors(prev => ({ ...prev, delete: "Failed to delete task" }));
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <form id="task-delete-form">
      <h2>Are you sure?</h2>
      <p className="error">{errors.delete}</p>
      <button style={{ backgroundColor: '#ff7272' }} onClick={deleteTask}>Delete</button>
      <button onClick={closeModal}>No</button>
    </form>
  );
};

export default TaskDeleteModal;
