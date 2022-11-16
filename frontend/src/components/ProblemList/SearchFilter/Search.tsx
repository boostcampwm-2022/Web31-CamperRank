import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { filterState } from "../../../recoils";

const SearchWrapper = styled.div`
  height: 48px;
  width: 376px;
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 24px;
  cursor: pointer;
`;

const SearchInput = styled.input`
  width: 300px;
  height: 48px;
  cursor: pointer;
  outline: none;
  border: 3px solid #b5d4a8;
  border-radius: 10px;
  text-align: right;
  font-size: 24px;
  padding-right: 8px;
`;

const SearchButton = styled.button`
  border: none;
  outline: none;
  background: #fff;
  border: 3px solid #b5d4a8;
  border-radius: 10px;
  font-size: 20px;
  height: 48px;
  cursor: pointer;
  width: 72px;
`;

const Search = () => {
  const [filter, setFilter] = useRecoilState(filterState);
  const { search } = filter;
  return (
    <SearchWrapper>
      <SearchInput
        value={search || ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFilter({ ...filter, search: e.target.value })
        }
      ></SearchInput>
      <SearchButton>검색</SearchButton>
    </SearchWrapper>
  );
};

export default Search;
