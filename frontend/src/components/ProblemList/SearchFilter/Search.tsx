import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { filterState } from '../../../recoils';

const SearchWrapper = styled.div`
  height: 3rem;
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 1rem;
  cursor: pointer;
`;

const SearchInput = styled.input`
  width: 18rem;
  height: 3rem;
  cursor: pointer;
  outline: none;
  border: 3px solid #b5d4a8;
  border-radius: 10px;
  text-align: right;
  font-size: 1.5rem;
  padding-right: 0.5rem;
  &:hover {
    border: 3px solid #80a471;
  }
`;

const SearchButton = styled.button`
  outline: none;
  background: #fff;
  border: 3px solid #b5d4a8;
  border-radius: 10px;
  font-size: 1.25rem;
  height: 3rem;
  cursor: pointer;
  width: 4.4rem;
  &:hover {
    border: 3px solid #80a471;
  }
`;

const Search = () => {
  const [filter, setFilter] = useRecoilState(filterState);
  const { search } = filter;
  return (
    <SearchWrapper>
      <SearchInput
        value={search || ''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFilter({ ...filter, search: e.target.value })
        }
      ></SearchInput>
      <SearchButton>검색</SearchButton>
    </SearchWrapper>
  );
};

export default Search;
