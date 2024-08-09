import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as noteActions from "../../redux/note";
import { useNavigate, useParams } from "react-router-dom";


const NoteDetail = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { noteId } = useParams();
  const loggedIn = useSelector((state) => state.session.user) // create log in credential check
  const allNotes = useSelector((state)=> state.notes.byId)
  console.log(allNotes)
  const notes = Object.values(allNotes)

  useEffect(() => {
    console.log('succesfully mounted')
    if (loggedIn) {
      dispatch(noteActions.getAllNotesUser())
    }
  }, [dispatch, loggedIn])

  return (
    <div>
      <h1>Note Details</h1>
      <p>Details about the selected note will be displayed here.</p>
    </div>
  );
};

export default NoteDetail;
