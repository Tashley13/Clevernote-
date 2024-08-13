import {useState} from 'react';
import {thunkCreateTag} from '../../redux/tags';
import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal';
import './TagCreate.css'

const TagCreate = () => {
  const { closeModal } = useModal();
  const dispatch = useDispatch()
  const [tagName, setTagName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()

    const newTag = {
      tagName
    }
    dispatch(thunkCreateTag(newTag)).then(() => {closeModal()})
  }

  return (
      <form onSubmit={handleSubmit} className='tag-form'>
      <h2>Create Tag</h2>
        <div>
          <label>Tag Name</label>
          <input
          type="text"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          required
          />
        </div>
        <button className='submit-button' type="submit">Create Tag</button>
      </form>
  );
};

export default TagCreate;
