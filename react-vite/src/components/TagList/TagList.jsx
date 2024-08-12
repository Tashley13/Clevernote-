import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetTag } from "../../redux/tags";
import { useNavigate } from 'react-router-dom';

const TagList = () => {
  const dispatch = useDispatch();
  const tags = useSelector(state => state.tags)
	const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(thunkGetTag()).then(() => setIsLoaded(true))
  }, [dispatch])

  return (
    isLoaded ? (
    <div>
      <h1>your tags</h1>
      {Object.values(tags).map((tag) => (
        <button onClick={() => navigate(`/tags/${tag.id}`)} key={tag.id}>{tag.tag_name}</button>
      ))}
    </div>
    ) : (
      <div>whoopsie</div>
    )
  )
};

export default TagList;
