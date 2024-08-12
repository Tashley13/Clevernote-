import Quill from 'quill';
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import * as noteActions from "../../redux/note";
// import Editor from 'quill/core/editor';
// import React from 'react';
//to create a note

// const quillDelta = Quill.import('delta')


const NoteList = () => {

  const dispatch = useDispatch();
  const { noteId, userId } = useParams()
  const [lastChange, setLastChange] = useState()
  // console.log('USERID: ', userId)

  //use a ref to access the quill instance directly
  const quillRef = useRef();



  useEffect(() => {
    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'header': [1, 2, 3, false] }]
    ]

    if (quillRef) {

      const quill = new Quill(quillRef.current, {
        theme: 'snow',
        modules: {
          toolbar: toolbarOptions
        },
        placeholder: 'Insert thoughts here...'
      });
      quill.on('text-change', () => {
        setLastChange(quill.getContents());
      })
    }
  }, [quillRef])

  //update title
  //update body

  return (
    <div>
      <div className="title">
      </div>
      <div className='editor-container'>
        <div ref={quillRef}></div>
      </div>

    </div>
  );
};

export default NoteList;
