// import Quill from 'quill';
// import { useEffect } from "react";
import { useDispatch} from "react-redux";
import React, { useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import * as noteActions from "../../redux/note";
import Editor from 'quill/core/editor';
// import React from 'react';
//to view users notes



const NoteDetail = () => {

  const dispatch = useDispatch();
  const { noteId, userId } = useParams()
  const [lastChange, setLastChange] = useState()
  // console.log('USERID: ', userId)

  //use a ref to access the quill instance directly
  const quillRef = useRef();


  return (
    <div>
      <div className="title">
        <input
          type="text"
          // value={title}
          //enter on change for update title
          />

      </div>
    </div>
  );
};

export default NoteDetail;
