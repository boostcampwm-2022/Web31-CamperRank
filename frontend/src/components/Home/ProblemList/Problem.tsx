import React from "react";
import styled from "styled-components";
import { ProblemType } from "@types";
import { Link } from "react-router-dom";

const ProblemWrapper = styled.div`
  border: 2px solid #888888;
  border-radius: 16px;
  position: relative;
  background: #ffffff;
  min-width: 36rem;
  &:hover {
    background: #e6f3ea;
    border: none;
    box-shadow: 3px 3px 3px 3px #b9b9b9;
  }
`;

const Level = styled.div`
  position: absolute;
  width: 20%;
  height: 3rem;
  left: 2rem;
  top: 1.5rem;
  border: 2px solid #33c363;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2.5rem;
`;

const Name = styled.div`
  position: absolute;
  width: fit-content;
  height: 3rem;
  left: 2rem;
  top: 6rem;
  font-weight: 600;
  font-size: 2rem;
  line-height: 3rem;
  text-align: center;
`;

const Description = styled.div`
  position: absolute;
  height: 1.5rem;
  left: 2rem;
  bottom: 1.5rem;
  font-weight: 500;
  font-size: 0.9rem;
`;

const Button = styled.button`
  position: absolute;
  width: 27%;
  height: 3.5rem;
  right: 2.5rem;
  bottom: 2rem;
  border: 2px solid #888888;
  border-radius: 8px;
  background: #fff;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 3rem;
  text-align: center;
  cursor: pointer;
  &:hover {
    background: #aad4b6;
    color: white;
    font-weight: bold;
    box-shadow: 2px 2px 2px 2px #b9b9b9;
    border: none;
  }
`;

const Problem = ({ problem }: ProblemType) => {
  const { level, title, problemId } = problem;
  const problemURL = `/problem/single/${problemId}`;
  return (
    <ProblemWrapper>
      <Level>LV. {level}</Level>
      <Name>{title}</Name>
      <Description>Lv{level}, Python, Javascript, Success Rate: 95.12%</Description>
      <Link to={problemURL}>
        <Button>문제 풀기</Button>
      </Link>
    </ProblemWrapper>
  );
};

export default Problem;
