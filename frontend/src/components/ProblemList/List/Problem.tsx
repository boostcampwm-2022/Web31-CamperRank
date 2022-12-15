import React, { memo, useEffect } from 'react';
import styled from 'styled-components';
import { ProblemType } from '@types';
import { ProblemInfo } from '@types';
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';

type ProblemProps = {
  problem: ProblemInfo;
  check: boolean;
};

const ProblemWrapper = styled.div`
  width: 100%;
  height: 7.5rem;
  border: 3px solid #cbcbcb;
  border-radius: 8px;
  background: #fff;
  position: relative;
  min-width: 40rem;

  &:hover {
    background: #e6f3ea;
    border: none;
    box-shadow: 3px 3px 3px 3px #b9b9b9;
  }
`;

const Title = styled.div`
  position: absolute;
  top: 1rem;
  left: 3rem;
  font-style: normal;
  font-weight: 500;
  font-size: 2rem;
`;

const Description = styled.div`
  position: absolute;
  bottom: 0.8rem;
  left: 3rem;
  font-style: normal;
  font-weight: 500;
  font-size: 1.2rem;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0.9rem;
  right: 0.9rem;
  display: flex;
  gap: 1.5rem;
`;

const Button = styled.button`
  outline: none;
  width: 8rem;
  height: 2.6rem;
  border: 2px solid #32c766;
  border-radius: 8px;
  background: #fff;
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 1.5rem;
  text-align: center;
  box-shadow: 0.5px 0.5px 0.5px 0.5px #75efa2;
  position: relative;
  &:hover {
    background: #aad4b6;
    color: white;
    font-weight: bold;
    box-shadow: 2px 2px 2px 2px #b9b9b9;
    border: none;
  }
`;

const getRoomNumber = (id: number) => {
  let room = localStorage.getItem(`problem${id}`);
  if (!room) {
    room = btoa(uuid());
    localStorage.setItem(`problem${id}`, room);
  }
  return room;
};

const Mark = styled.div`
  position: absolute;
  left: 0rem;
  top: -2.2rem;
  text-align: center;
  font-size: 3rem;
  color: #e69c9f;
  font-weight: bold;
  z-index: 2;
`;

const Problem = ({ problem, check }: ProblemProps) => {
  const { problemId, title, level, isSolved } = problem;
  const singleURL = `/problem/single/${problemId}`;
  let multiURL = `/problem/multi/${problemId}/`;
  if (problemId != null) {
    multiURL = `/problem/multi/${problemId}/${getRoomNumber(problemId)}`;
  }

  return (
    <ProblemWrapper>
      {check && isSolved && <Mark>✓</Mark>}
      <Title>{title}</Title>
      <Description>Lv{level}, Python, Javascript</Description>
      <ButtonWrapper>
        <Link to={singleURL}>
          <Button>혼자 풀기</Button>
        </Link>
        <Link to={multiURL}>
          <Button>같이 풀기</Button>
        </Link>
      </ButtonWrapper>
    </ProblemWrapper>
  );
};

export default memo(Problem);
