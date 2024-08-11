import {thunkEditTag} from '../../redux/tags';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';

const TagEdit = () => {
  const dispatch = useDispatch()
	const navigate = useNavigate();
  const [tagName, setTagName] = useState('')
  const {tagId} = useParams()
  const tag = useSelector(state => state.tags)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const editTag = {
      tagName: tagName || tag.tagName
    }

    const updatedTag = await dispatch(thunkEditTag(editTag))
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
