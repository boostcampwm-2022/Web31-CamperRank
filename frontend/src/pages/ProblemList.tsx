import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { MainHeader } from '../components/MainHeader';
import { SearchFilter, List } from '../components/ProblemList';
import { Footer } from '../components/Footer';
import { filterState } from '../recoils';
import { ProblemInfo } from '@types';
import { userState } from '../recoils';

const URL = import.meta.env.VITE_SERVER_URL;

const MainWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80rem;
  min-height: 123rem;
  height: 123rem;
`;

const HeaderWrapper = styled.div`
  min-width: 80rem;
  width: 80rem;
  min-height: 8rem;
  height: 8rem;
`;

const ListWrapper = styled.div`
  width: 100%;
  height: 90rem;
  background: #f1f5ee;
  display: flex;
`;

const FooterWrapper = styled.div`
  width: 100%;
  height: 20rem;
`;

const ProblemList = () => {
  const [filter, setFilter] = useRecoilState(filterState);
  const [list, setList] = useState<ProblemInfo[]>([]);
  const [filtered, setFiltered] = useState<ProblemInfo[]>([]);
  const [user] = useRecoilState(userState);

  useEffect(() => {
    const { ID } = user;
    const fetchURL = ID ? `${URL}/problem?loginId=${ID}` : `${URL}/problem`;
    setFilter({
      solved: '푼 상태',
      level: '문제 레벨',
      search: '',
      check: false,
    });
    fetch(fetchURL)
      .then((res) => res.json())
      .then((res) => {
        setList(Object.values(res));
      });
  }, [user]);

  useEffect(() => {
    const { solved, level, search } = filter;
    let filtered = [...list];
    if (level && level !== '문제 레벨')
      filtered = filtered.filter((elem) => elem.level === +level.slice(-1));
    if (search && search !== '')
      filtered = filtered.filter((elem) => {
        if (elem.title)
          return elem.title.toUpperCase().includes(search.toUpperCase());
        else return false;
      });
    if (solved && solved !== '푼 상태')
      filtered = filtered.filter((elem) => {
        return solved === '푼 문제'
          ? elem.isSolved === true
          : elem.isSolved === false;
      });

    setFiltered(filtered);
  }, [filter, list]);

  return (
    <MainWrapper>
      <HeaderWrapper>
        <MainHeader />
      </HeaderWrapper>
      <SearchFilter />
      <ListWrapper>
        <List list={filtered} />
      </ListWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </MainWrapper>
  );
};

export default ProblemList;
