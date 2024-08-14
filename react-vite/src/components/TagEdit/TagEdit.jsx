import {thunkEditTag, thunkGetDetails} from '../../redux/tags';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';

const TagEdit = () => {
  const {tagId} = useParams()
  const { closeModal } = useModal();
	const navigate = useNavigate()
  const dispatch = useDispatch()
  const [tagName, setTagName] = useState('')
  const tag = useSelector(state => state.tags)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      id: tagId,
      tag_name: tagName || tag.tagName
    }

    const updatedTag = dispatch(thunkEditTag(payload))
    navigate(`/tags`)
		closeModal()
    return updatedTag
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
