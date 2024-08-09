import React, {useState} from 'react';
import {createTag} from '../../redux/tags';
import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal';

const TagCreate = () => {
  const { closeModal } = useModal();
  const dispatch = useDispatch()
  const [tagName, setTagName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()

    const newTag = {
      tagName
    }
    dispatch(createTag(newTag)).then(() => {closeModal()})
  }

  return (
    <div>
      <h1>Create Tag</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tag Name</label>
          <input
          type="text"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          required
          />
        </div>
        <button type="submit">Create Tag</button>
      </form>
    </div>
  );
};

export default TagCreate;
