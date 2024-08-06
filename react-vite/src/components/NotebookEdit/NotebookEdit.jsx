import React from 'react';

const NotebookEdit = () => {
  return (
    <div>
      <h1>Edit Notebook</h1>
      <form>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default NotebookEdit;
