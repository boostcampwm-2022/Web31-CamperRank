import React, { useRef } from 'react';
import styled from 'styled-components';
import Filter from './Filter';
import FiltersInfo from '../../../utils/FiltersInfo';
import Search from './Search';
import { useRecoilState } from 'recoil';
import { filterState } from '../../../recoils';

const FiltersContainer = styled.div`
  width: 100%;
  height: 13rem;
  position: relative;
  background: #e5ebdf;
  display: flex;
`;

const FiltersWrapper = styled.div`
  min-width: 80rem;
  width: 80rem;
  min-height: 13rem;
  height: 13rem;
  position: relative;
  margin: 0 auto;
`;

const FilterTitle = styled.div`
  font-weight: 600;
  font-size: 2.5rem;
  position: absolute;
  top: 1.7rem;
  left: 8rem;
  color: #446635;
`;

const FilterContent = styled.div`
  position: absolute;
  bottom: 0.5rem;
  left: 6rem;
  height: 5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Button = styled.button`
  outline: none;
  background: #fff;
  border: 3px solid #b5d4a8;
  border-radius: 10px;
  font-size: 20px;
  height: 48px;
  cursor: pointer;

  &:hover {
    border: 3px solid #80a471;
  }
`;

const SearchFilter = () => {
  const [, setFilter] = useRecoilState(filterState);
  const handleButtonClick = () => {
    setFilter({
      solved: '푼 상태',
      level: '문제 레벨',
      search: '',
    });
  };
  return (
    <FiltersContainer>
      <FiltersWrapper>
        <FilterTitle>Select the Problems!</FilterTitle>
        <FilterContent>
          {FiltersInfo.map((elem, idx) => (
            <Filter key={idx} content={elem}></Filter>
          ))}
          <Search></Search>
          <Button onClick={handleButtonClick}>검색 초기화</Button>
        </FilterContent>
      </FiltersWrapper>
    </FiltersContainer>
  );
};

export default SearchFilter;
