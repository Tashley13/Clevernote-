import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as noteActions from "../../redux/note";
import { useParams } from "react-router-dom";
import { thunkGetNotebooks } from "../../redux/notebooks";
import { thunkGetTag } from "../../redux/tags";

const NoteEdit = () => {
const {noteId} = useParams();
const dispatch=useDispatch();
const navigate=useNavigate();

const loggedIn= useSelector((state)=> state.session.user)
// const userId=loggedIn.id
const note_id=Number(noteId)
// console.log("ID: ", +noteId)



const notes = useSelector((state)=> state.notes.selectedNote[0])
const notebooks = useSelector(state => state.notebooks.allNotebooks)
const tags = useSelector(state=> state.tags)
// const eachNote=Object.values(notes)
// const note= Object.values(notes)[0]
console.log("TAGS: ", tags)
console.log("NOTEBOOKS: ", notebooks)


// const [note, setNote] = useState({})
const [title, setTitle ] = useState('')
const [content, setContent] = useState('')
const [notebookId, setNotebookId] = useState('')
const [tagId, setTagId] = useState('')
console.log("TITLE and CONTENT:", title,  '+', content, '+', notebookId, '+', tagId)



useEffect(()=> {
    dispatch(noteActions.getDetailsofUserNote(note_id))
    dispatch(thunkGetNotebooks())
    dispatch(thunkGetTag())
}, [dispatch, note_id])

useEffect(()=> {
    if (notes?.id) {
        setTitle(notes.title);
        setContent(notes.content);
        setNotebookId(notes.notebookId);
        setTagId(notes.tagId)
    }
}, [notes])

if (!notes) {
    return <div>Loading...</div>
}


const handleSubmit = async (e) => {
    e.preventDefault();

    const notePayload= {
        id:note_id,
        title,
        content,
        notebookId: notebookId,
        tagId : tagId
    }
    console.log("PAYLOAD: ", notePayload)
    await dispatch(noteActions.editUserNote(notePayload))
    navigate(`/notes`);
}



return(
<div>
    <form onSubmit={handleSubmit} className="note-editor">
        <div className="title-editor">
        <input
        type='text'
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        />
        </div>
        <div className="content-editor">
            <input
            type='textarea'
            value={content}
            onChange={(e)=>setContent(e.target.value)}
            />
        </div>

        <select value={notebookId} onChange={(e) => setNotebookId(+e.target.value)}>
            <option>Select a notebook</option>
            {notebooks ? Object.values(notebooks).map( item => (
                <option key={item.id} value={item.id}>{item.title}</option>
            )) : ''}
        </select>

        <select value={tagId} onChange={(e) => setTagId(+e.target.value)}>
            <option>Select a tag</option>
            {notebooks ? Object.values(tags).map( tag => (
                <option key={tag.id} value={tag.id}>{tag.tag_name}</option>
            )) : ''}
        </select>

        <button type='submit' onClick={handleSubmit}>Edit Note</button>
    </form>
</div>
)
}

export default NoteEdit;
