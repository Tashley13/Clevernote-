import React from 'react';

const TagEdit = () => {
  return (
    <div>
      <h1>Edit Tag</h1>
      <form>
        <div>
          <label htmlFor="tag_name">Tag Name:</label>
          <input type="text" id="tag_name" name="tag_name" />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default TagEdit;
