import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { ProblemType } from '@types';
import { Link } from 'react-router-dom';

type Prop = {
  active: boolean;
};

const ProblemWrapper = styled.div`
  border-radius: 16px;
  position: relative;
  border: 2px solid #dddddd;
  min-width: 36rem;
  background: #eff9f2;
  &:hover {
    background: #c9e2d1;
    border: none;
    box-shadow: 3px 3px 3px 3px #b9b9b9;
  }
`;

const Level = styled.div<Prop>`
  position: absolute;
  width: 20%;
  height: 2.5rem;
  left: 1rem;
  top: 1rem;
  border: 2px solid #34b35a;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 2rem;
  ${(props) =>
    props.active &&
    css`
      background: #caf7d9;
      border: none;
      box-shadow: 1px 1px 3px 1px #b9b9b9;
    `}
`;

const Name = styled.div`
  position: absolute;
  width: fit-content;
  height: 3rem;
  left: 2rem;
  top: 4.5rem;
  font-weight: 600;
  font-size: 2.3rem;
  line-height: 3rem;
  text-align: center;
  color: #104e22;
`;

const Description = styled.div`
  position: absolute;
  height: 1.5rem;
  left: 2rem;
  bottom: 1rem;
  font-weight: 500;
  font-size: 1rem;
`;

const Button = styled.button`
  position: absolute;
  width: 27%;
  height: 3rem;
  right: 1rem;
  bottom: 1rem;
  border: 2px solid #afd5bb;
  border-radius: 8px;
  background: #fff;
  font-weight: 500;
  font-size: 1.45rem;
  line-height: 2.5rem;
  text-align: center;
  cursor: pointer;
  &:hover {
    background: #9fcdad;
    color: white;
    font-weight: bold;
    box-shadow: 2px 2px 3px 2px #b9b9b9;
    border: none;
  }
`;

const Mark = styled.div`
  position: absolute;
  left: -0.5rem;
  top: -5rem;
  text-align: center;
  font-size: 6rem;
  color: #e69c9f;
  font-weight: bold;
  z-index: 2;
`;

const Problem = ({ problem }: ProblemType) => {
  const { level, title, problemId, isSolved } = problem;
  const [active, setActive] = useState(false);
  const problemURL = `/problem/single/${problemId}`;
  return (
    <ProblemWrapper
      onMouseOver={() => setActive(true)}
      onMouseOut={() => setActive(false)}
    >
      {isSolved && <Mark>✓</Mark>}
      <Level active={active}>LV. {level}</Level>
      <Name>{title}</Name>
      <Description>Lv{level}, Python, Javascript</Description>
      <Link to={problemURL}>
        <Button>{isSolved ? '다시 풀기' : '문제 풀기'}</Button>
      </Link>
    </ProblemWrapper>
  );
};

export default Problem;
