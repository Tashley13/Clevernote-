import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetTag } from "../../redux/tags";
import TagDetail from '../TagDetail'

const TagList = () => {
  const dispatch = useDispatch();
  const tags = useSelector(state => state.tags)
	const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(thunkGetTag()).then(() => setIsLoaded(true))
  }, [dispatch])

  return (
    isLoaded ? (
    <div>
      <h1>your tags</h1>
      {Object.values(tags).map((tag) => (
        <TagDetail key={tag.id} tag={tag} />
      ))}
    </div>
    ) : (
      <div>whoopsie</div>
    )
  )
};

export default TagList;
