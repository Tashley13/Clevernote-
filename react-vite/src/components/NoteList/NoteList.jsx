import Quill from 'quill';
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import * as noteActions from "../../redux/note";
import NoteEditor from "../NoteList";
// import React from 'react';
//to create a note

const quillDelta = Quill.import('delta')


const NoteList = () => {

  const dispatch = useDispatch();
  const { noteId, userId } = useParams()
  const [setLastChange] = useState()
  // console.log('USERID: ', userId)

  //use a ref to access the quill instance directly
  const quillRef = useRef();

  // //update title
  // //update body

  return (
    <div>
      <div className="title">
      </div>
      <div className='editor-container'>
        <NoteEditor
        ref={quillRef}
        defaultValue={new quillDelta()
          .insert('Insert thoughts here...')
        }
        onTextChange={setLastChange}
        />
      </div>
    </div>
  );
};

export default NoteList;
