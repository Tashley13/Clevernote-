import {thunkEditTag, thunkGetDetails} from '../../redux/tags';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useModal } from '../../context/Modal';


const TagEdit = () => {
  const { closeModal } = useModal();
  const dispatch = useDispatch()
  const [tagName, setTagName] = useState('')
  const {tagId} = useParams()
  const tag = useSelector(state => state.tags)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const editTag = {
      tagName: tagName || tag.tagName
    }

    const updatedTag = await dispatch(thunkEditTag(editTag)).then(() => {closeModal()})
    console.log(updatedTag)
  }

  useEffect(() => {
    dispatch(thunkGetDetails(tagId))
  }, [tagId, dispatch])

  return (
    <form onSubmit={handleSubmit} className='tag-form'>
        <h1>Edit Tag</h1>
        <div>
          <label>New Tag Name</label>
          <input type="text"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          required
          />
        </div>
        <button type="submit">Save</button>
      </form>
  );
};

export default TagEdit;
