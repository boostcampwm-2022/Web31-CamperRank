import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Problem from './Problem';
import { userState } from '../../../recoils';
import { useRecoilState } from 'recoil';
import { ProblemInfo } from '@types';

const URL = import.meta.env.VITE_SERVER_URL;

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
  column-gap: 3rem;
  row-gap: 3rem;
  width: 95%;
`;

const List = () => {
  const [user] = useRecoilState(userState);
  const [problems, setProblems] = useState<ProblemInfo[]>([]);
  useEffect(() => {
    const { ID } = user;
    const fetchURL = ID
      ? `${URL}/problem/random?loginId=${ID}`
      : `${URL}/problem/random`;
    fetch(fetchURL)
      .then((res) => res.json())
      .then((res) => {
        setProblems(Object.values(res));
      });
  }, [user]);
  return (
    <ListWrapper>
      <ListTitle>오늘의 랜덤 문제</ListTitle>
      <ProblemListWrapper>
        {problems.map((elem, idx) => (
          <Problem key={idx} problem={elem}></Problem>
        ))}
      </ProblemListWrapper>
    </ListWrapper>
  );
};

export default List;
