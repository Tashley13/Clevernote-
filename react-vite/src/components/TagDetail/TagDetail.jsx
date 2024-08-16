import TagEdit from "../TagEdit"
import TagDelete from "../TagDelete";
import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { thunkGetDetails} from '../../redux/tags';
import './TagDetail.css';

const TagDetail = () => {
  const { setModalContent } = useModal();
	const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch()
  const {tagId} = useParams()
  const tag = useSelector(state => state.tags)

  const openDeleteTagModal = () => {
    setModalContent(<TagDelete tag={tag[0]}/>)
  }

  const openEditTagModal = () => {
    setModalContent(<TagEdit tag={tag[0]}/>)
  };

  useEffect(() => {
    dispatch(thunkGetDetails(tagId)).then(() => setIsLoaded(true))
  }, [tagId, dispatch])

  return (
    isLoaded ? (
    <div>
    <h1>{tag[0].tag_name}</h1>
    <div className="buttons-cell">
    <button onClick={openEditTagModal} >Edit</button>
    <button onClick={openDeleteTagModal}>Delete</button>
    </div>
    </div>
    ) : (
      <div></div>
    )
  );
};

export default TagDetail
