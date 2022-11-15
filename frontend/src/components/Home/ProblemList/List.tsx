import React, { useState } from "react";
import styled from "styled-components";
import Problem from "./Problem";

const ListWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;

const ListTitle = styled.div`
  box-sizing: border-box;
  font-weight: 400;
  font-size: 32px;
  line-height: 46px;
  text-align: center;
  position: absolute;
  left: 96px;
  top: 128px;
`;

const ProblemListWrapper = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 243px;
  display: grid;
  grid-template-columns: 880px 880px;
  grid-template-rows: 240px 240px 240px;
  column-gap: 80px;
  row-gap: 37px;
`;

const problem = {
  level: 1,
  title: "A + B = ?",
  description: "Lv1, Python, Javascript, Success Rate: 95.12%",
};

const List = () => {
  return (
    <ListWrapper>
      <ListTitle>오늘의 랜덤 문제</ListTitle>
      <ProblemListWrapper>
        {new Array(6).fill(problem).map((elem, idx) => (
          <Problem key={idx} problem={elem}></Problem>
        ))}
      </ProblemListWrapper>
    </ListWrapper>
  );
};

export default List;
