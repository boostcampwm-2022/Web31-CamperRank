import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Problem from './Problem';
import PageController from './PageController';
import { ProblemInfo } from '@types';
import SearchBox from './SearchBox';
import { useRecoilState } from 'recoil';
import { filterState } from '../../../recoils';

type ListType = {
  list: ProblemInfo[];
};

const ListContainer = styled.div`
  min-width: 80rem;
  width: 80rem;
  margin: 0 auto;
  display: flex;
  padding: 0 5rem;
`;

const ListWrapper = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
  position: relative;
`;

const SubWrapper = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Info = styled.div`
  font-size: 1.2rem;
  color: #537744;
  margin: 3rem 0 0 1rem;
`;

const List = ({ list }: ListType) => {
  const [page, setPage] = useState({ now: 1, max: Math.ceil(list.length / 7) });
  const [pagedList, setPagedList] = useState(list);
  const [filter, setFilter] = useRecoilState(filterState);

  useEffect(() => {
    const { now } = page;
    now && setPagedList([...list.slice(7 * (now - 1), 7 * now)]);
  }, [page]);

  useEffect(() => {
    setPage({
      now: 1,
      max: Math.ceil(list.length / 7),
    });
  }, [list]);
  return (
    <>
      <ListContainer>
        <ListWrapper>
          <Info>
            {list.length == 0
              ? '해당하는 문제가 존재하지 않습니다'
              : `총 ${list.length} 문제가 검색되었습니다`}
          </Info>
          {pagedList.length <= 7 &&
            pagedList.map((elem, idx) => (
              <Problem
                key={elem.problemId}
                problem={elem}
                check={filter.check}
              />
            ))}
          <PageController
            page={page}
            onClickPage={(now: number) => setPage({ ...page, now })}
          ></PageController>
        </ListWrapper>
        <SubWrapper>
          <SearchBox></SearchBox>
        </SubWrapper>
      </ListContainer>
    </>
  );
};

export default List;
