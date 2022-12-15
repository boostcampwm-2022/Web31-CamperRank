import React, { useState, useRef, useEffect, memo } from 'react';
import styled from 'styled-components';
import { SelectButton } from '../../../assets/icons';
import Modal from './Modal';
import { FilterType } from '@types';
import { useRecoilState } from 'recoil';
import { filterState } from '../../../recoils';

const FilterWrapper = styled.button`
  width: 10rem;
  height: 3rem;
  border: 3px solid #b5d4a8;
  border-radius: 10px;
  background: #fff;
  text-align: center;
  font-weight: 500;
  font-size: 1.45rem;
  line-height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  cursor: pointer;

  &:hover {
    border: 3px solid #80a471;
  }
`;

const ModalButton = styled.img`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
`;

const Filter = ({ content }: FilterType) => {
  const { name, elements } = content;
  const [open, setOpen] = useState(false);
  const [filter] = useRecoilState(filterState);
  const { solved, level } = filter;
  const filterRef = useRef<HTMLButtonElement>(null);
  const handleClickOutside = ({ target }: any) => {
    if (!filterRef.current || !filterRef.current.contains(target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <FilterWrapper ref={filterRef} onClick={() => setOpen(!open)}>
      {name === '상태' ? solved : level}
      <ModalButton
        src={SelectButton}
        alt={'필터 드롭다운 이미지'}
      ></ModalButton>
      {open && (
        <Modal
          onClick={() => setOpen(!open)}
          name={name}
          elements={elements}
        ></Modal>
      )}
    </FilterWrapper>
  );
};

export default memo(Filter);
