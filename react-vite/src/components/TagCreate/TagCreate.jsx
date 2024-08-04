// import React from 'react';

const TagCreate = () => {
  return (
    <div>
      <h1>Create Tag</h1>
      <form>
        <div>
          <label htmlFor="tag_name">Tag Name:</label>
          <input type="text" id="tag_name" name="tag_name" />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default TagCreate;
