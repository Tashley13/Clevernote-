import TagEdit from "../TagEdit"
import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { thunkGetDetails} from '../../redux/tags';

const TagDetail = () => {
  const { setModalContent } = useModal();
  const {tagId} = useParams()
  const dispatch = useDispatch()
	const [isLoaded, setIsLoaded] = useState(false);
  const tag = useSelector(state => state.tags)

  const openEditTagModal = () => {
    setModalContent(<TagEdit />)
  }

  useEffect(() => {
    dispatch(thunkGetDetails(tagId)).then(() => setIsLoaded(true))
  }, [tagId, dispatch])

  return (
    isLoaded ? (
    <div>
    <h1>{tag.tag_name}</h1>
    <button onClick={openEditTagModal}>Edit</button>
    </div>
    ) : (
      <div>whoopsie</div>
    )
  );
};

export default TagDetail
