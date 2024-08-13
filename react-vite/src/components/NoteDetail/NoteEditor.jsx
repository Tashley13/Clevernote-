import Quill from "quill";
import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";

//create Editor to import into NoteList component
const NoteEditor = forwardRef(
    ({defaultValue, onTextChange, onSelectionChange }, ref ) => {
        const containerRef = useRef(null);//create a container DOM element reference
        const defaultValueRef = useRef(defaultValue); //store initial default value of note
        const onTextChangeRef = useRef(onTextChange); //track text changes
        const onSelectionChangeRef = useRef(onSelectionChange); //track toolbar selection

        useLayoutEffect(() => { //useLayoutEffect fires nefre the browser repaints the screen
            onTextChangeRef.current = onTextChange; //watch for text changes
            onSelectionChangeRef.current = onSelectionChange //watch for selection changes
        });

        useEffect(() => {
            const container = containerRef.current;
            const editorContainer = container.appendChild(

            container.ownerDocument.createElement('div'),
            );
            const quill = new Quill(editorContainer, {
                theme: 'snow'
            });

            ref.current=quill;

            if (defaultValueRef.current) {
                quill.setContents(defaultValueRef.current);
            }

            quill.on(Quill.events.SELECTION_CHANGE,
                (...args) => {
                    onSelectionChangeRef.current?.(...args);
                }
            );

            return () => {
                ref.current = null;
                container.innerHTML = '';
            };
        }, [ref]); //listen for ref

        return <div ref={containerRef}></div>
    }
)

NoteEditor.displayName = 'NoteEditor'

export default NoteEditor;
