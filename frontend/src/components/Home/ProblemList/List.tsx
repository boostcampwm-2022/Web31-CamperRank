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
  font-weight: 500;
  font-size: 2.6rem;
  line-height: 2.9rem;
  text-align: center;
  position: absolute;
  left: 5rem;
  top: 6rem;
`;

const ProblemListWrapper = styled.div`
  position: absolute;
  top: 15rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 15rem 15rem 15rem;
  column-gap: 5rem;
  row-gap: 3rem;
  width: 95%;
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
