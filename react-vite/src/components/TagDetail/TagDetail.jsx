import TagEdit from "../TagEdit"
import TagDelete from "../TagDelete";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { thunkGetDetails} from '../../redux/tags';

const TagDetail = () => {
  // const { setModalContent } = useModal();
	const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch()
  const {tagId} = useParams()
  const tag = useSelector(state => state.tags)

  useEffect(() => {
    dispatch(thunkGetDetails(tagId)).then(() => setIsLoaded(true))
  }, [tagId, dispatch])

  return (
    isLoaded ? (
    <div>
    <h1>{tag[0].tag_name}</h1>
    <OpenModalButton buttonText="Edit Tag"
    modalComponent={<TagEdit tag={tag[0]} />} />
    <OpenModalButton buttonText="Delete Tag"
    modalComponent={<TagDelete tag={tag[0]} />} />
    </div>
    ) : (
      <div>whoopsie</div>
    )
  );
};

export default TagDetail
