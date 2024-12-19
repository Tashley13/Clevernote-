/** @format */

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as noteActions from "../../redux/note";
import { useParams } from "react-router-dom";
import { thunkGetNotebooks } from "../../redux/notebooks";
import { thunkGetTag } from "../../redux/tags";
import ReactQuill from "react-quill";
import "./Editor.css";
import "./NoteEdit.css";

const NoteEdit = () => {
	const { noteId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const note_id = Number(noteId);

	const notes = useSelector((state) => state.notes.selectedNote[0]);
	// const notebooks = useSelector((state) => state.notebooks.allNotebooks);
	// const tags = useSelector((state) => state.tags);

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [notebookId, setNotebookId] = useState(null);
	const [tagId, setTagId] = useState(null);

	useEffect(() => {
		dispatch(noteActions.getDetailsofUserNote(note_id));
		dispatch(thunkGetNotebooks());
		dispatch(thunkGetTag());
	}, [dispatch, note_id]);

	useEffect(() => {
		if (notes?.id) {
			setContent(notes.content ? JSON.parse(notes.content) : "");
			setTitle(notes.title);
			setNotebookId(notes.notebookId);
			setTagId(notes.tagId);
		}
	}, [notes]);

	if (!notes) {
		return <div>Loading...</div>;
	}

	const handleChange = (content, delta, source, editor) => {
		setContent(editor.getContents());
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		const notePayload = {
			id: note_id,
			title,
			content: JSON.stringify(content),
			notebookId: notebookId,
			tagId: tagId,
		};
		await dispatch(noteActions.editUserNote(notePayload));
		navigate(`/notes`);
	};
	console.log("NOTES=====",content);
	return (
		<div className="note-edit-container">
			<input
				className="title-input"
				placeholder="Input title here..."
				onChange={(e) => setTitle(e.target.value)}
				value={title ? title : ""}
			/>

			<ReactQuill
				id="editor"
				theme="snow"
				value={content}
				onChange={handleChange}
			/>
			<button className="note-edit-btn" onClick={handleSubmit}>
				Save
			</button>
		</div>
	);
};

export default NoteEdit;
