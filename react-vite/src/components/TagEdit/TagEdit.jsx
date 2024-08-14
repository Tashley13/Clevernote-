import {thunkEditTag} from '../../redux/tags';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
<<<<<<< HEAD

const TagEdit = () => {
=======
import { useModal } from '../../context/Modal';

const TagEdit = () => {
  const {tagId} = useParams()
  const { closeModal } = useModal();
	const navigate = useNavigate()
>>>>>>> 0f75a11 (fully implemented edit tag component)
  const dispatch = useDispatch()
	const navigate = useNavigate();
  const [tagName, setTagName] = useState('')
  const tag = useSelector(state => state.tags)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      id: tagId,
      tag_name: tagName || tag.tagName
    }

<<<<<<< HEAD
    const updatedTag = await dispatch(thunkEditTag(editTag))
=======
    const updatedTag = dispatch(thunkEditTag(payload)).then(navigate('/tags'))
		closeModal()
    return updatedTag
>>>>>>> 0f75a11 (fully implemented edit tag component)
  }

  //use effect will go here once i make taglist component

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
