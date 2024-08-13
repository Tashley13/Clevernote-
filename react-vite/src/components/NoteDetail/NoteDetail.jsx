import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import React, { useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import * as noteActions from "../../redux/note";
// import React from 'react';
//to view users notes



const NoteDetail = () => {

  const dispatch = useDispatch();
  const { noteId, userId } = useParams()
  const notes = useSelector((state)=> state.notes[noteId])
  // console.log(notes)

  useEffect(()=> {
    dispatch(noteActions.getAllNotesUser(userId))
  }, [dispatch, userId])

  return (
    <div>
      <div className="title">


      </div>
    </div>
  );
};

export default NoteDetail;
