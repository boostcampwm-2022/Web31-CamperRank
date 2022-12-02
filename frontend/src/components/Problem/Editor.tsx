import React, {useState, useRef, useEffect} from "react";
import styled from "styled-components";

import * as Y from 'yjs'
import {yCollab, yUndoManagerKeymap} from 'y-codemirror.next'
import {WebrtcProvider} from 'y-webrtc'
import {EditorView, basicSetup} from 'codemirror'
import {keymap} from '@codemirror/view'
import {javascript} from '@codemirror/lang-javascript'
import * as random from 'lib0/random'
import {EditorState} from '@codemirror/state'

const webRTCURL = import.meta.env.VITE_SOCKET_URL;
const ydoc = new Y.Doc()
// @ts-ignore
const provider = new WebrtcProvider('codemirror6-demo-room-2', ydoc, {signaling: [webRTCURL]})
const ytext = ydoc.getText('codemirror')

provider.awareness.setLocalStateField('user', {
  name: 'Anonymous ' + Math.floor(Math.random() * 100)
})

const state = EditorState.create({
  doc: ytext.toString(),
  extensions: [
    keymap.of([
      ...yUndoManagerKeymap
    ]),
    basicSetup,
    javascript(),
    EditorView.lineWrapping,
    yCollab(ytext, provider.awareness)
    // oneDark
  ]
})

const EditorWrapper = styled.div`
  display: flex;
  height: calc(100% - 2rem);
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  border: 1px solid blue;
  padding: 0.5rem;
`

const Title = styled.div`
  font-weight: 600;
  font-size: 0.8rem;
  padding: 0.5rem;
  border: 1px solid black;
`;

const Editor = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (editorRef.current) new EditorView({state, parent: editorRef.current})
  }, []);
  return (
    <>
      <Title>Solution</Title>
      <EditorWrapper ref={editorRef}>
      </EditorWrapper>
    </>
  );
}

export default Editor;