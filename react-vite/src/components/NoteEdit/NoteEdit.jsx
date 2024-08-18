import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as noteActions from "../../redux/note";
import { thunkGetTag } from "../../redux/tags";
import { useParams } from "react-router-dom";
import { thunkGetNotebooks } from "../../redux/notebooks";

const NoteEdit = () => {
    const { noteId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loggedIn = useSelector((state) => state.session.user)
    // const userId=loggedIn.id
    const note_id = Number(noteId)
    // console.log("ID: ", +noteId)



const notes = useSelector((state)=> state.notes.selectedNote[0])
const notebooks = useSelector(state => state.notebooks.allNotebooks)
// const eachNote=Object.values(notes)
// const note= Object.values(notes)[0]
console.log("NOTE", notes)

// const [note, setNote] = useState({})
const [title, setTitle ] = useState('')
const [content, setContent] = useState('')
const [notebookId, setNotebookId] = useState(null)
console.log("TITLE and CONTENT:", title,  '+', content, '+', notebookId)

    useEffect(() => {
        dispatch(thunkGetTag())
    }, [dispatch])


useEffect(()=> {
    dispatch(noteActions.getDetailsofUserNote(note_id))
    dispatch(thunkGetNotebooks())
}, [dispatch, note_id])

useEffect(()=> {
    if (notes?.id) {
        setTitle(notes.title);
        setContent(notes.content);
        setNotebookId(notes.notebookId)
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
        notebookId: notebookId
    }
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
                <option value={item.id}>{item.title}</option>
            )) : ''}
        </select>
        <button type='submit' onClick={handleSubmit}>Edit Note</button>
    </form>
</div>
)
}

export default NoteEdit;
