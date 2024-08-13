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
  // const notes = useSelector((state) => state.notes)
  // console.log("NOTES: ", notes)


  useEffect(()=> {
    dispatch(noteActions.getAllNotesUser())
  }, [dispatch, userId])

  return (
    <div>

    </div>
  );
};

export default NoteList;
