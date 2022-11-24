import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { filterState } from "../../../recoils";

type ModalElements = {
  name: string;
  elements: string[];
  onClick: () => void;
};

const ModalWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 3rem;
  border: 2px solid #c6dfbb;
  background: rgba(256, 256, 256, 0.8);
  border-radius: 10px;
  z-index: 1;
`;

const ModalElement = styled.div`
  font-size: 20px;
  cursor: pointer;
`;

const Modal = ({ onClick, name, elements }: ModalElements) => {
  const [filter, setFilter] = useRecoilState(filterState);
  const handleClickElement = (element: string) => {
    name === "상태" ? changeStatus(element) : changeLevel(element);
    onClick();
  };
  const changeLevel = (level: string) => {
    setFilter({ ...filter, level });
  };
  const changeStatus = (solved: string) => {
    setFilter({ ...filter, solved });
  };
  return (
    <ModalWrapper>
      {elements.map((elem, idx) => (
        <ModalElement key={idx} onClick={() => handleClickElement(elem)}>
          {elem}
        </ModalElement>
      ))}
    </ModalWrapper>
  );
};

export default Modal;
