import React, {useState, useRef, useEffect, useMemo} from "react";
import {useParams, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {PageButtons, ProblemButtons} from "../components/Problem/Buttons";
import {ProblemHeader} from "../components/ProblemHeader";
import {ProblemContent, Result} from "../components/Problem";
import {ProblemInfo} from "@types";
import {useRecoilState} from "recoil";
import { userState, editorState } from "../recoils";
import {Video} from "../components/Problem/Video";

import * as Y from 'yjs'
// @ts-ignore
import {yCollab} from 'y-codemirror.next'
import {WebrtcProvider} from 'y-webrtc'

import {EditorView, basicSetup} from "codemirror";
import {EditorState} from "@codemirror/state";
import {javascript} from '@codemirror/lang-javascript'
import { keymap } from '@codemirror/view'
import {indentWithTab} from "@codemirror/commands"
import {} from '@codemirror/autocomplete'

import * as random from 'lib0/random'

export const usercolors = [
  {color: '#30bced', light: '#30bced33'},
  {color: '#6eeb83', light: '#6eeb8333'},
  {color: '#ffbc42', light: '#ffbc4233'},
  {color: '#ecd444', light: '#ecd44433'},
  {color: '#ee6352', light: '#ee635233'},
  {color: '#9ac2c9', light: '#9ac2c933'},
  {color: '#8acb88', light: '#8acb8833'},
  {color: '#1be7ff', light: '#1be7ff33'}
]

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 4rem;
  box-sizing: border-box;
`;

const MainWrapper = styled.div`
  height: calc(100vh - 5rem);
  min-width: 80rem;
  max-height: calc(100vh - 5rem);
  width: 100%;
  flex-grow: 1;
  border: 2px groove #DADADA;
  display: flex;
  background: #EEF5F0;
`;

const PageButtonsWrapper = styled.div`
  height: 100%;
  width: 2.5%;
  padding-top: 3rem;
`;

const ProblemWrapper = styled.div`
  width: 47%;
  min-width: 15%;
  height: auto;
  padding: 1rem;
  position: relative;

  word-break: break-all;
  overflow-x: hidden;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 20px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d6dee1;
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #a8bbbf;
  }
`;

const SolvingWrapper = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const EditorWrapper = styled.div`
  width: 100%;
  height: 65%;
  min-height: 10%;
  padding: 0.8rem;
  position: relative;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
  overflow: auto;
  .cm-editor.cm-focused { outline: none; }
  .cm-activeLine, .cm-activeLineGutter {
    background: none;
  }
  .cm-editor {
    border: 2px double #CBCBCB;
    background: #F5FDF8;
    border-radius: 5px;
    min-height: 95%;
  }
`;

const ResultWrapper = styled.div`
  width: 100%;
  min-height: 10%;
  flex-grow: 1;
`;

const ButtonsWrapper = styled.div`
  height: 6%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ColSizeController = styled.div`
  height: 100%;
  width: 1%;
  cursor: col-resize;
  background: #DCE2DE;
`;

const RowSizeController = styled.div`
  width: 100%;
  height: 1vw;
  cursor: row-resize;
  background: #DCE2DE;
`;

const URL = import.meta.env.VITE_SERVER_URL;
const REM = getComputedStyle(document.documentElement).fontSize;
const webRTCURL = import.meta.env.VITE_SOCKET_URL;

const Problem = () => {
  const [moveColResize, setMoveColResize] = useState(false);
  const [moveRowResize, setMoveRowResize] = useState(false);
  const [code, setCode] = useRecoilState(editorState);
  const [eState, setEState] = useState<EditorState>();
  const [eView, setEView] = useState<EditorView>();
  const [problem, setProblem] = useState<ProblemInfo>({
    title: "",
    description: ""
  });
  const {id, version} = useParams();
  const [user, setUser] = useRecoilState(userState);
  const problemRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const ydoc = useMemo(() => new Y.Doc(), []);
  const [provider, ytext] = useMemo(() => {
    return [
      // @ts-ignore
      new WebrtcProvider('codemirror6-demo-room', ydoc, {signaling: [webRTCURL]})
      , ydoc.getText('codemirror')
    ]
  }, []);
  const undoManager = useMemo(() => new Y.UndoManager(ytext), []);
  const userColor = useMemo(() => usercolors[random.uint32() % usercolors.length], []);
  const defaultCode = `/*
 함수 내부에 실행 코드를 작성하세요
*/

function solution(param) {

  let answer;
  
  return answer;

}`;

  useEffect(() => {
    provider.awareness.setLocalStateField('user', {
      name: 'Anonymous ' + Math.floor(Math.random() * 100),
      color: userColor.color,
      colorLight: userColor.light
    });

    const state = EditorState.create({
      doc: ytext.toString(),
      extensions: [
        basicSetup,
        javascript(),
        keymap.of([indentWithTab]),
        yCollab(ytext, provider.awareness, {undoManager}),
        EditorView.updateListener.of(function(e) {
          setCode({...code, text: e.state.doc.toString()});
        })
      ]
    });
    setEState(state);

    if (editorRef.current) {
      const view = new EditorView({state, parent: editorRef.current});
      setEView(view);
      let transaction = view.state.update({changes: {from: 0, to: view.state.doc.length, insert: defaultCode}})
      view.dispatch(transaction)
    }
  }, []);

  const clearEditor = () => {
    if (eView) {
      let transaction = eView.state.update({changes: {from: 0, to: eView.state.doc.length, insert: defaultCode}})
      eView.dispatch(transaction)
    }
  }

  useEffect(() => {
    if (user.isLoggedIn) {
      return;
    }
    const token = localStorage.getItem('camperRankToken');
    const camperID = localStorage.getItem('camperID');
    if (!token || !camperID) {
      navigate('/signin', {
        state: `problem/${version}/${id}`
      });
      return;
    }
    setUser({
      token,
      isLoggedIn: true,
      ID: camperID
    });
  }, []);

  useEffect(() => {
    fetch(`${URL}/problem/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.statusCode !== 200) throw new Error();
        const {level, title, description} = res;
        setProblem({level, title, description});
      })
      .catch(() => {
        alert("문제를 불러올 수 없습니다");
        navigate("/problems");
      });
  }, []);

  useEffect(() => {
    if (editorRef.current) editorRef.current.style.maxWidth = `${window.innerWidth * 0.485}px`;
  }, []);

  const resizeProblemWrapper = (x: number) => {
    if (problemRef.current != null && editorRef.current != null) {
      problemRef.current.style.width = `${x - window.innerWidth * 0.032}px`;
      const problemRefWidth = +problemRef.current.style.width.replace('px', '');
      editorRef.current.style.maxWidth = `${window.innerWidth * 0.95 - problemRefWidth}px`;
    }
  };
  const resizeEditorWrapper = (y: number) => {
    if (editorRef.current != null) {
      let PX = +REM.replace("px", "");
      editorRef.current.style.height = `${
        y - PX * 4 - window.innerWidth * 0.008
      }px`;
    }
  };

  const mainEventHandler = {
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => {
      if (moveColResize) resizeProblemWrapper(e.clientX);
      else if (moveRowResize) resizeEditorWrapper(e.clientY);
    },
    onMouseUp: () => {
      setMoveColResize(false);
      setMoveRowResize(false);
    },
    onMouseLeave: () => {
      setMoveColResize(false);
      setMoveRowResize(false);
    }
  };

  const handleColSizeController = {
    onMouseDown: () => {
      setMoveColResize(true);
    }
  };

  const handleRowSizeController = {
    onMouseDown: () => {
      setMoveRowResize(true);
    }
  };

  return (
    <Wrapper {...mainEventHandler} >
      <HeaderWrapper>
        <ProblemHeader
          URL={`/problem/${version}/${id}`}
          problemName={problem.title ? problem.title : ""}
          type={0}
        />
      </HeaderWrapper>
      <MainWrapper>
        <PageButtonsWrapper>
          <PageButtons></PageButtons>
        </PageButtonsWrapper>
        <ProblemWrapper ref={problemRef}>
          {version === "multi" && <Video/>}
          <ProblemContent problem={problem}></ProblemContent>
        </ProblemWrapper>
        <ColSizeController {...handleColSizeController}></ColSizeController>
        <SolvingWrapper>
          <EditorWrapper ref={editorRef}>
          </EditorWrapper>
          <RowSizeController {...handleRowSizeController}></RowSizeController>
          <ResultWrapper>
            <Result></Result>
          </ResultWrapper>
          <ButtonsWrapper>
            <ProblemButtons onClickClearBtn={clearEditor}/>
          </ButtonsWrapper>
        </SolvingWrapper>
      </MainWrapper>
    </Wrapper>
  );
};

export default Problem;
