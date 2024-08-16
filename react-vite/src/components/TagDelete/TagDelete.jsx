import { useDispatch } from "react-redux";
import { thunkDeleteTag } from "../../redux/tags";
import { useNavigate } from "react-router-dom";
import { useModal } from '../../context/Modal';
import './TagDelete.css';

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
		<div>
		<h1>Delete Tag</h1>
	<form className="delete-modal" onSubmit={handleSubmit}>
		<button type="submit">Delete</button>
		<button onClick={() => closeModal()}>Cancel</button>
	</form>
		</div>
	)
}

export default TagDelete;
