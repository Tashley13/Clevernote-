import React from 'react';

const TaskEdit = () => {
  return (
    <div>
      <h1>Edit Task</h1>
      <form>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description"></textarea>
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select id="status" name="status">
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label htmlFor="due_date">Due Date:</label>
          <input type="date" id="due_date" name="due_date" />
        </div>
        <div>
          <label htmlFor="priority">Priority:</label>
          <select id="priority" name="priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default TaskEdit;
