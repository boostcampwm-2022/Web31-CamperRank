import React from "react";
import styled from "styled-components";

type ModalElements = {
  elements: string[];
};

const ModalWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 48px;
  border: 2px solid #c6dfbb;
  background: rgba(256, 256, 256, 0.8);
  border-radius: 10px;
  z-index: 1;
`;

const ModalElement = styled.div`
  font-size: 20px;
  cursor: pointer;
`;

const Modal = ({ elements }: ModalElements) => {
  return (
    <ModalWrapper>
      {elements.map((elem, idx) => (
        <ModalElement key={idx}>{elem}</ModalElement>
      ))}
    </ModalWrapper>
  );
};

export default Modal;
