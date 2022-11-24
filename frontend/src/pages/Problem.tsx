import React, {useState, useRef, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {PageButtons, ProblemButtons} from "../components/Problem/Buttons";
import {ProblemHeader} from "../components/ProblemHeader";
import ProblemContent from "../components/Problem/Content";
import {ProblemInfo} from "@types";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 4rem;
  box-sizing: border-box;
`;

const MainWrapper = styled.div`
  height: calc(100vh - 6.5rem);
  max-height: calc(100vh - 6.5rem);
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
  display: flex;
  justify-content: center;
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
  border: 2px solid black;
  display: flex;
  flex-direction: column;
`;

const EditorWrapper = styled.div`
  width: 100%;
  height: 65%;
  min-height: 10%;
  border: 2px solid black;
`;

const ResultWrapper = styled.div`
  width: 100%;
  min-height: 10%;
  flex-grow: 1;
  border: 2px solid black;
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

const Problem = () => {
  const [moveColResize, setMoveColResize] = useState(false);
  const [moveRowResize, setMoveRowResize] = useState(false);
  const [problem, setProblem] = useState<ProblemInfo>({
    title: "",
    description: ""
  });
  const {id, version} = useParams();

  const problemRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${URL}/problem/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.statusCode !== 200) throw new Error();
        const {level, title, description} = res;
        setProblem({level, title, description});
      })
      .catch((err) => {
        alert("문제를 불러올 수 없습니다");
        navigate("/problems");
      });
  }, [id]);

  const resizeProblemWrapper = (x: number) => {
    if (problemRef.current != null) {
      problemRef.current.style.width = `${x - window.innerWidth * 0.032}px`;
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
      // else {
      //   setMoveColResize(false);
      //   setMoveRowResize(false);
      // }
    },
    onMouseUp: (e: React.MouseEvent<HTMLDivElement>) => {
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
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => {
      setMoveRowResize(true);
    }
  };
  return (
    <Wrapper {...mainEventHandler}>
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
          <ProblemContent problem={problem}></ProblemContent>
        </ProblemWrapper>
        <ColSizeController {...handleColSizeController}></ColSizeController>
        <SolvingWrapper>
          <EditorWrapper ref={editorRef}>Editor</EditorWrapper>
          <RowSizeController {...handleRowSizeController}></RowSizeController>
          <ResultWrapper>Result</ResultWrapper>
          <ButtonsWrapper>
            <ProblemButtons></ProblemButtons>
          </ButtonsWrapper>
        </SolvingWrapper>
      </MainWrapper>
    </Wrapper>
  );
};

export default Problem;
