import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetTag } from "../../redux/tags";
import { Navigate, useNavigate } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import TagCreate from "../TagCreate"
import './TagList.css'

const TagList = () => {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();
  const tags = useSelector(state => state.tags)
	const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate()
  const user = useSelector(state => state.session.user)

  const openTagModal = () => {
    setModalContent(<TagCreate />)
  };

  useEffect(() => {
    dispatch(thunkGetTag()).then(() => setIsLoaded(true))
  }, [dispatch])

  return (
    user ?
      isLoaded ? (
        <div className="tag-list">
          <h1>Tags</h1>
          <h2>{Object.values(tags).length} tags</h2>
          {Object.values(tags).map((tag) => (
            <div className="tag-link" onClick={() => navigate(`/tags/${tag.id}`)} key={tag.id}>{tag.tag_name}</div>
          ))}
          <button className="tag-create-btn" onClick={openTagModal}>Create a new tag</button>
        </div>
      ) : (
        <div></div>
      ) :
    <Navigate to="/" />
  )
};

export default TagList;
