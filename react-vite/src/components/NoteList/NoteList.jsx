import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import React, { useRef, useState } from 'react';
// import { useParams } from "react-router-dom";
import * as noteActions from "../../redux/note";
// import React from 'react';
//to view users notes



const NoteList = () => {

  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.session.user);
  const userId=loggedIn.id;
  const notes = useSelector((state) => state.notes);
  const note = Object.values(notes)
  // console.log('NOTE :', note[0])

  useEffect(()=> {
    dispatch(noteActions.getDetailsofUserNote())
  }, [dispatch])

  if (!note.length) {
      return <div>Loading...</div>
  }

  const deleteNoteButton = async (id) => {
    await dispatch(noteActions.deleteUserNote(id));
    dispatch(noteActions.getDetailsofUserNote(id))
  }

  return (
<div className='notes-display'>
  <ul>
    {note.length > 0 ? (
      note.map(note=> (
      note.userId === userId && (
      <div key={note.id} className="note">
        <div className="note-title">
          {note.title}
        </div>
        <div className="note-content">
          {note.content.slice(0,10) + "..."}
        </div>
        <div className="note-creation">
          {note.created_at.slice(0,-12)}
        </div>
      </div>
      )
    )))
    :(
      <li>No notes</li>
    )}
    {userId && (
      <ul className="delete-note">
        <button type="submit" onClick={()=>
          deleteNoteButton(userId)
        }>Delete Note</button>
        </ul>
    )}
  </ul>
</div>
  );
};

export default NoteList;
