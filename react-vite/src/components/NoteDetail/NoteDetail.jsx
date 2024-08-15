import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import * as noteActions from "../../redux/note";
import { useParams } from "react-router-dom";


const NoteDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const userId = loggedIn.id;
  console.log("ID: ", noteId)

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const loggedIn = useSelector((state) => state.session.user)
  const userId=loggedIn.id
  console.log("USERID :", userId)

  // console.log("CURRENT NOTE: ", note)
  useEffect(()=> {
    if (!loggedIn) {
      navigate(`/`);
    }
  },[loggedIn, navigate])

  const note = useSelector((state) => state.notes[noteId])

  // useEffect(()=> {
  //   if (noteId) {
  //     dispatch(noteActions.getDetailsofUserNote(noteId))
  //   }
  // },[dispatch, noteId])

  // useEffect(()=> {
  //   if (noteId && note) {
  //     setTitle(note.title);
  //     setContent(note.content);
  //   }
  // }, [noteId, note])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      title,
      content,

    }
    console.log("PAYLOAD", payload)
    const created_note = await dispatch(noteActions.createNote(payload))
    //eventually navigate to edit component
    if(created_note) {
      navigate(`/notes`)
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="note-creator">
        <div className="title-editor">
        <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        />
        </div>
        <div className="content-editor">
          <input
          type='textarea'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          />
        </div>
        <button type='submit' onClick={handleSubmit}>Submit Note</button>
      </form>
    </div>
  );

};

export default NoteDetail;
