import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Delete, RedDelete } from '../../../assets/icons';
import { useRecoilState } from 'recoil';
import { filterState } from '../../../recoils';

const SearchWrapper = styled.div`
  width: 13rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 4rem;
  margin-right: 3rem;
`;

const Title = styled.div`
  color: #888;
  font-size: 1.3rem;
  font-weight: bold;
  margin-right: 36px;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
`;

const Search = styled.div`
  width: 10rem;
  word-break: break-all;
  height: fit-content;
  border: 3px solid #b5d4a8;
  border-radius: 8px;
  background: #fff;
  font-size: 1.4rem;
  text-align: center;
  line-height: 2.5rem;
  margin-left: 2rem;
  text-overflow: ellipsis;
`;

const DeleteIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  filter: invert(0.3);
  cursor: pointer;
`;

const SearchBox = () => {
  const [filter, setFilter] = useRecoilState(filterState);
  const clickEvent = {
    solved: () => setFilter({ ...filter, solved: '푼 상태' }),
    level: () => setFilter({ ...filter, level: '문제 레벨' }),
    search: () => setFilter({ ...filter, search: '' }),
  };
  const handleImgClick = (kind: string) => {
    if (kind == 'solved' || kind == 'level' || kind == 'search')
      clickEvent[kind]();
  };
  const checkFilter = useCallback(() => {
    const { solved, level, search } = filter;
    return solved !== '푼 상태' || level !== '문제 레벨' || search !== '';
  }, [filter]);
  return (
    <SearchWrapper>
      <Title>{checkFilter() ? '현재 검색어' : ''}</Title>
      {Object.entries(filter).map((elem, idx) => {
        const [kind, value] = elem;
        if (
          (kind === 'solved' && value === '푼 상태') ||
          (kind === 'level' && value === '문제 레벨') ||
          value === '' ||
          kind === 'check'
        )
          return;
        return (
          <Box key={idx}>
            <DeleteIcon src={RedDelete} onClick={() => handleImgClick(kind)} />
            <Search>
              {value.length >= 20 ? `${value.slice(0, 20)}...` : value}
            </Search>
          </Box>
        );
      })}
    </SearchWrapper>
  );
};

export default SearchBox;
