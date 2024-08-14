import { useDispatch } from "react-redux";
import { thunkDeleteTag } from "../../redux/tags";
import { useNavigate } from "react-router-dom";
import { useModal } from '../../context/Modal';

const TagDelete = ({tag}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate()
	const {closeModal} = useModal()

	const handleSubmit = (e) => {
		e.preventDefault()

		const payload = {
			...tag
		}
		dispatch(thunkDeleteTag(payload)).then(navigate('/tags'))
		closeModal()
	}

	return (
	<form onSubmit={handleSubmit}>
		<h1>Delete Tag</h1>
		<button type="submit">Delete</button>
	</form>
	)
}

export default TagDelete;
