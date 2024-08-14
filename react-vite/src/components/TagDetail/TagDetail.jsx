import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TagEdit from "../TagEdit";
import TagDelete from "../TagDelete";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useModal } from "../../context/Modal";
import { thunkGetDetails } from "../../redux/tags";

const TagDetail = () => {
  const { setModalContent } = useModal();
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const { tagId } = useParams();
  const tag = useSelector(state => state.tags[tagId]);

  useEffect(() => {
    dispatch(thunkGetDetails(tagId)).then(() => setIsLoaded(true));
  }, [tagId, dispatch]);

  const openEditTagModal = () => {
    setModalContent(<TagEdit tag={tag} />);
  };

  if (!isLoaded || !tag) return null;

  return (
    <div>
      <h1>{tag.tag_name}</h1>
      <OpenModalButton
        buttonText="Edit Tag"
        modalComponent={<TagEdit tag={tag} />}
      />
      <OpenModalButton
        buttonText="Delete Tag"
        modalComponent={<TagDelete tag={tag} />}
      />
    </div>
  );
};

export default TagDetail;

