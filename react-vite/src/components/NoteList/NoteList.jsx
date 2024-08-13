import Quill from 'quill';
// import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from 'react';
// import { useParams } from "react-router-dom";
import * as noteActions from "../../redux/note";
import NoteEditor from "../NoteList";
// import React from 'react';
//to create a note

const Delta = Quill.import('delta')


const NoteList = () => {

  // const dispatch = useDispatch();
  // const { noteId, userId } = useParams()
  const [range, setRange ] = useState();
  const [readOnly, setReadOnly ] = useState(false);
  const [lastChange, setLastChange] = useState()
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
        readOnly={readOnly}
        defaultValue={new Delta()
          .insert('Insert thoughts here...')
        }
        onSelectionChange={setRange}
        onTextChange={setLastChange}
        />
        <div className='controls'>
          <label>
            Read Only:{''}
            <input
            type='checkbox'
            value={readOnly}
            onChange={(e) => setReadOnly(e.target.checked)}
          />
          </label>
        <button
          className="controls-rightside"
          type="button"
          onClick={()=> {
            alert(quillRef.current?.getLength());
          }}
          >
            Content Length
          </button>
        </div>
        <div className='state'>
          <div className='state-title'>Current Range: </div>
          {range ? JSON.stringify(range) : 'Empty'}
        </div>
        <div className='state'>
          <div className='state-title'>Last Change:</div>
          {lastChange ? JSON.stringify(lastChange.ops) : 'Empty'}
        </div>
      </div>
    </div>
  );
};

export default NoteList;
