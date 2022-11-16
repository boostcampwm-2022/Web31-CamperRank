import React, { useState } from "react";
import styled from "styled-components";
import { FilterButton } from "../../assets/icons";
import Modal from "./Modal";
import { FilterType } from "@types";

const FilterWrapper = styled.div`
  width: 160px;
  height: 48px;
  border: 3px solid #c6dfbb;
  border-radius: 10px;
  background: #fff;
  text-align: center;
  font-weight: 500;
  font-size: 24px;
  line-height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
`;

const ModalButton = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const Filter = ({ content }: FilterType) => {
  const { name, elements } = content;
  const [open, setOpen] = useState(false);
  return (
    <FilterWrapper>
      {name}
      <ModalButton
        src={FilterButton}
        onClick={() => setOpen(!open)}
      ></ModalButton>
      {open && <Modal elements={elements}></Modal>}
    </FilterWrapper>
  );
};

export default Filter;
