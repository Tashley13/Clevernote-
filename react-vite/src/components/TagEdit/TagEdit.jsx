import { thunkEditTag } from '../../redux/tags';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';

const TagEdit = () => {
  const { tagId } = useParams();
  const { closeModal } = useModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tagName, setTagName] = useState('');
  const tag = useSelector(state => state.tags[tagId]);

  useEffect(() => {
    if (tag) {
      setTagName(tag.tag_name);
    }
  }, [tag]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: tagId,
      tag_name: tagName || tag.tag_name
    };

    const updatedTag = await dispatch(thunkEditTag(payload));
    if (updatedTag) {
      navigate('/tags');
      closeModal();
    }
  };

  if (!tag) return null; // Ensure the tag exists before rendering

  return (
    <div>
      <h1>Edit Tag</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="tag_name">Tag Name:</label>
          <input
            type="text"
            id="tag_name"
            name="tag_name"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default TagEdit;

