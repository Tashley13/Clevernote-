import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as noteActions from "../../redux/note";
import { thunkGetTag } from "../../redux/tags";
import { useParams } from "react-router-dom";
import "./NoteEdit.css"

const NoteEdit = () => {
    const { noteId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loggedIn = useSelector((state) => state.session.user)
    // const userId=loggedIn.id
    const note_id = Number(noteId)
    // console.log("ID: ", +noteId)



    const notes = useSelector((state) => state.notes.selectedNote[0])
    const tags = useSelector((state) => state.tags)
    // const eachTag= Object.values(tags)
    console.log("TAGS: ", tags)

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [noteTag, setNoteTag] = useState()
    // const [tagId, setTagId] = useState('')
    // console.log("NOTETAG: ", noteTag)
    // console.log("TITLE and CONTENT:", title,  '+', content)

    useEffect(() => {
        dispatch(thunkGetTag())
    }, [dispatch])

    useEffect(() => {
        dispatch(noteActions.getDetailsofUserNote(note_id))
    }, [dispatch, note_id])

    useEffect(() => {
        if (notes?.id) {
            setTitle(notes.title);
            setContent(notes.content);
        }
    }, [notes])


    if (!notes) {
        return <div>Loading...</div>
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const notePayload = {
            id: note_id,
            title,
            content
        }
        console.log("NOTE PAYLOAD", notePayload)
        await dispatch(noteActions.editUserNote(notePayload))
        navigate(`/notes`);
    }

    const handleTagSubmit = async (e) => {
        e.preventDefault();
        //updating note-tag thunk

        const tagPayload = {
            id: note_id,
            tagId: Number(noteTag)
        }
        console.log("TAG PAYLOAD", tagPayload)
        await dispatch(noteActions.editUserTag(tagPayload))
        navigate(`/notes`)
    }

    // console.log("VALUES: " ,Object.values(tags))

    return (
        <div>
            <form onSubmit={handleSubmit} className="note-editor">
                <div className="title-editor">
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="content-editor">
                    <input
                        type='textarea'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <button type='submit' >Edit Note</button>
            </form>
            <div className="note-tags">
                <form onSubmit={handleTagSubmit} className='note-tag-form'>
                    <label htmlFor='tag-select' id='select-tag'>
                        Tag:
                    </label>
                    <select name='Select Tags' id='select-tag' value={noteTag} onChange={(e) => setNoteTag(e.target.value)}>
                        {/* <option value=''>--Choose your Tag--</option> */}
                        {Object.values(tags).map((tag) => (

                                <option key={tag.id} value={noteTag}>{tag.tag_name}</option>

                        ))}
                    </select>
                    <button type="submit" >Save Tag</button>
                </form>
            </div>
        </div>
    )
}

export default NoteEdit;
