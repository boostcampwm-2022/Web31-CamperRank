import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 48px;
  border: 2px solid black;
  box-sizing: border-box;
`;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid black;
  display: flex;
`;

const ProblemButtonWrapper = styled.div`
  height: 100%;
  width: 3%;
  border: 2px solid black;
`;

const ProblemWrapper = styled.div`
  width: 47%;
  height: 100%;
  border: 2px solid black;
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
  border: 2px solid black;
`;

const ResultWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
  border: 2px solid black;
`;

const ButtonsWrapper = styled.div`
  height: 6%;
  border: 2px solid black;
`;

const ColSizeController = styled.div`
  height: 100%;
  width: 1%;
  cursor: col-resize;
`;

const RowSizeController = styled.div`
  width: 100%;
  height: 1vw;
  cursor: row-resize;
`;
window.addEventListener("click", (e) => console.log(e));
const Problem = () => {
  const [moveColResize, setMoveColResize] = useState(false);
  const [moveRowResize, setMoveRowResize] = useState(false);

  const problemRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const resizeProblemWrapper = (x: number) => {
    if (problemRef.current != null) {
      problemRef.current.style.width = `${x - window.innerWidth * 0.0357}px`;
    }
  };
  const resizeEditorWrapper = (y: number) => {
    if (editorRef.current != null) {
      editorRef.current.style.height = `${
        y - 48 - window.innerWidth * 0.005
      }px`;
    }
  };
  const handleColSizeController = {
    onMouseDown: () => {
      setMoveColResize(true);
    },
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => {
      if (moveColResize) resizeProblemWrapper(e.clientX);
    },
    onMouseUp: () => {
      setMoveColResize(false);
    },
  };
  const handleRowSizeController = {
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => {
      console.log(e);
      setMoveRowResize(true);
    },
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => {
      if (moveRowResize) resizeEditorWrapper(e.clientY);
    },
    onMouseUp: (e: React.MouseEvent<HTMLDivElement>) => {
      setMoveRowResize(false);
    },
  };
  return (
    <Wrapper>
      <HeaderWrapper>Header</HeaderWrapper>
      <MainWrapper>
        <ProblemButtonWrapper>Problem Button</ProblemButtonWrapper>
        <ProblemWrapper ref={problemRef}>Problem</ProblemWrapper>
        <ColSizeController {...handleColSizeController}></ColSizeController>
        <SolvingWrapper>
          <EditorWrapper ref={editorRef}>Editor</EditorWrapper>
          <RowSizeController {...handleRowSizeController}></RowSizeController>
          <ResultWrapper>Result</ResultWrapper>
          <ButtonsWrapper>Buttons</ButtonsWrapper>
        </SolvingWrapper>
      </MainWrapper>
    </Wrapper>
  );
};

export default Problem;
