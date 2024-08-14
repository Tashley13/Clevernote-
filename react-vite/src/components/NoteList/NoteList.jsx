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
  // console.log(note[0])


  useEffect(()=> {
    dispatch(noteActions.getDetailsofUserNote())
  }, [dispatch])

  if (!note.length) {
      return <div>Loading...</div>
  }

  return (
<div className='notes-display'>
  <ul>
    {note.length && note.map(note=> (
      <li key={note.id} className="note">
        <p>{note.title}</p>
        <p>{note.content}</p>
      </li>
    ))}
  </ul>
</div>
  );
};

export default NoteList;
