import React from 'react';
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
  font-size: 1.25rem;
  height: 48px;
  cursor: pointer;

  &:hover {
    border: 3px solid #80a471;
  }
`;

const Checkbox = styled.input`
  width: 1.5rem;
  height: 1.5rem;
  appearance: none;
  border: 3px solid #b5d4a8;
  background: #fff;
  margin-left: -0.6rem;
  border-radius: 5px;
  &:hover {
    border: 3px solid #80a471;
  }
  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-color: #b5d5b6;
    border: 3px solid #e4e4e4;
  }
`;

const StyledP = styled.div`
  font-size: 1.2rem;
  height: 1.5rem;
  margin-left: 0.5rem;
  line-height: 1.5rem;
`;

const SearchFilter = () => {
  const [filter, setFilter] = useRecoilState(filterState);
  const handleButtonClick = () => {
    setFilter({
      ...filter,
      solved: '푼 상태',
      level: '문제 레벨',
      search: '',
    });
  };
  const handleCheckbtnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, check: e.target.checked });
  };
  return (
    <FiltersContainer>
      <FiltersWrapper>
        <FilterTitle>Select the Problems!</FilterTitle>
        <FilterContent>
          {FiltersInfo.map((elem, idx) => (
            <Filter key={idx} content={elem} />
          ))}
          <Search />
          <Button onClick={handleButtonClick}>검색 초기화</Button>
          <StyledP>풀이상태 표시</StyledP>
          <Checkbox type="checkbox" onChange={handleCheckbtnClick} />
        </FilterContent>
      </FiltersWrapper>
    </FiltersContainer>
  );
};

export default SearchFilter;
