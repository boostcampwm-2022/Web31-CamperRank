import React, { useState } from "react";
import styled from "styled-components";
import Filter from "./Filter";
import FiltersInfo from "../../../utils/FiltersInfo";

const FiltersWrapper = styled.div`
  width: 100%;
  height: 256px;
  position: relative;
  background: #e5ebdf;
  border: 2px solid white;
`;

const FilterTitle = styled.div`
  font-weight: 700;
  font-size: 40px;
  position: absolute;
  top: 40px;
  left: 144px;
`;

const FilterContent = styled.div`
  position: absolute;
  bottom: 24px;
  left: 96px;
  width: 900px;
  height: 80px;
  display: flex;
  gap: 24px;
  align-items: center;
`;

const Search = styled.div`
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
`;

const SearchFilter = () => {
  return (
    <FiltersWrapper>
      <FilterTitle>Solve the Problems!</FilterTitle>
      <FilterContent>
        {FiltersInfo.map((elem, idx) => (
          <Filter key={idx} content={elem}></Filter>
        ))}
        <Search>
          <SearchInput></SearchInput>
          <SearchButton>검색</SearchButton>
        </Search>
        <SearchButton>검색초기화</SearchButton>
      </FilterContent>
    </FiltersWrapper>
  );
};

export default SearchFilter;
