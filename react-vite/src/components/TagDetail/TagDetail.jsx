import TagEdit from "../TagEdit"
import { useModal } from "../../context/Modal";


const TagDetail = ({ tag }) => {

  const { setModalContent } = useModal();

  const openEditTagModal = () => {
    setModalContent(<TagEdit />)
  }

  return (
    <div>
    {tag.tag_name}
    <button onClick={openEditTagModal}>Edit</button>
    </div>
  );
};

export default TagDetail
