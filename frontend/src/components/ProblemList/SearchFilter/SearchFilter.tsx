import React, { useState } from "react";
import styled from "styled-components";
import Filter from "./Filter";
import FiltersInfo from "../../../utils/FiltersInfo";
import Search from "./Search";
import { useRecoilState } from "recoil";
import { filterState } from "../../../recoils";

const FiltersWrapper = styled.div`
  width: 100%;
  height: 256px;
  position: relative;
  background: #e5ebdf;
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

const Button = styled.button`
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
  const [, setFilter] = useRecoilState(filterState);
  const handleButtonClick = () => {
    setFilter({
      solved: "푼 상태",
      level: "문제 레벨",
      search: "",
    });
  };
  return (
    <FiltersWrapper>
      <FilterTitle>Solve the Problems!</FilterTitle>
      <FilterContent>
        {FiltersInfo.map((elem, idx) => (
          <Filter key={idx} content={elem}></Filter>
        ))}
        <Search></Search>
        <Button onClick={handleButtonClick}>검색 초기화</Button>
      </FilterContent>
    </FiltersWrapper>
  );
};

export default SearchFilter;
