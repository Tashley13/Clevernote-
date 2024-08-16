import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import React, { useRef, useState } from 'react';
// import { useParams } from "react-router-dom";
import * as noteActions from "../../redux/note";
import { Link, useNavigate } from "react-router-dom";
// import React from 'react';
//to view users notes



const NoteList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.session.user);
  console.log("LOGGED IN: ", loggedIn)

  useEffect(()=> {
    if (!loggedIn) {
      navigate(`/`);
    }
  },[loggedIn, navigate])

  useEffect(()=> {
    dispatch(noteActions.getAllNotes())
  }, [dispatch])

  const userId=loggedIn?.id;
  const notes = useSelector((state) => state.notes);
  const eachNote = notes.allNotes
  const note=Object.values(eachNote)
  // console.log("NOTES:", note)


  if (!note?.length) {
      return <div>Loading...</div>
  }

  const deleteNoteButton = async (id) => {
    await dispatch(noteActions.deleteUserNote(id));
    dispatch(noteActions.getAllNotes())
  }

  return (
<div className='notes-display'>
  <ul>
    {note.length > 0 ? (
      note.map((note, key)=> (
      note.userId === userId && (
      <div key={key} className="note">
        <Link to={`/notes/${note.id}/edit`}>
        <div className="note-title">
          {note.title}
          {/* {note.id} */}
        </div>
        <div className="note-content">
          {note.content.slice(0,10) + "..."}
        </div>
        <div className="note-creation">
          {note.created_at.slice(0,-12)}
        </div>
        </Link>
        {userId && (
      <ul className="delete-note">
        <button type="submit" onClick={()=>
          deleteNoteButton(note.id)
        }>Delete Note</button>
        </ul>
    )}
      </div>
      )
    )))
    :(
      <li>No notes</li>
    )}

  </ul>
</div>
  );
};

export default NoteList;
