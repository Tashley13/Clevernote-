import TagEdit from "../TagEdit"
import TagDelete from "../TagDelete";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useModal } from "../../context/Modal";


const TagDetail = ({ tag }) => {

  const { setModalContent } = useModal();

  const openEditTagModal = () => {
    setModalContent(<TagEdit />)
  }

const TagDetail = () => {
  // const { setModalContent } = useModal();
	const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch()
  const {tagId} = useParams()
  const tag = useSelector(state => state.tags)

  useEffect(() => {
    dispatch(thunkGetDetails(tagId)).then(() => setIsLoaded(true))
  }, [tagId, dispatch])

  console.log('TEST 2 ----->', tag)
  return (
    <div>
    {tag.tag_name}
    <button onClick={openEditTagModal}>Edit</button>
    <h1>{tag[0].tag_name}</h1>
    <OpenModalButton buttonText="Edit Tag"
    modalComponent={<TagEdit tag={tag[0]} />} />
    <OpenModalButton buttonText="Delete Tag"
    modalComponent={<TagDelete tag={tag[0]} />} />
    </div>
  );
};

export default TagDetail
