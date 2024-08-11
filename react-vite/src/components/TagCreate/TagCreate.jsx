import {useState} from 'react';
import {thunkCreateTag} from '../../redux/tags';
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
    dispatch(thunkCreateTag(newTag)).then(() => {closeModal()})
  }

  return (
    <div className="modal-container">
      <form onSubmit={handleSubmit} className='tag-form'>
      <h1>Create Tag</h1>
        <div className='form-group'>
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
    </div>
  );
};

export default TagCreate;
