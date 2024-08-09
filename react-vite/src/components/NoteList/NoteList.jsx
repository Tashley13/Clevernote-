import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as noteActions from "../../redux/note";
// import React from 'react';

const NoteList = () => {

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { noteId } = useParams();
  const loggedIn = useSelector((state) => state.session.user) // create log in credential check
  const allNotes = useSelector((state)=> state.notes)
  console.log('NOTES: ', allNotes)

  useEffect(() => {
    console.log('succesfully mounted')
    if (loggedIn) {
      dispatch(noteActions.getAllNotesUser())
    }
  }, [dispatch, loggedIn])

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        <li>Note 1</li>
        <li>Note 2</li>
        <li>Note 3</li>
      </ul>
    </div>
  );
};

export default NoteList;
