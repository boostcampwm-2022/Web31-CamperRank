import React, {useCallback, useState} from "react";
import {useParams} from "react-router-dom";
import styled from "styled-components";
import {InviteModal} from "../InviteModal";
import useModal from "../../../hooks/useModal";

type ButtonProp = {
  name: string;
  callback: any;
};

const ButtonWrapper = styled.button`
  width: 100%;
  height: auto;
  padding: 1rem 0;
  background: #ffffff;
  border: 1px solid #888888;

  &:nth-child(1), &:hover {
    background: #EEF5F0;
    font-weight: 600;
    border: none;
  }

  span {
    writing-mode: vertical-lr;
    font-size: 1rem;
    letter-spacing: 3px;
  }

  :active {
    background: #ffffff;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }
`;

const Button = ({name, callback}: ButtonProp) => {
  return (
    <ButtonWrapper onClick={callback}>
      <span>{name}</span>
    </ButtonWrapper>
  );
};

const PageButtons = () => {
  const {version} = useParams();
  const {isShowing, toggle} = useModal();

  const setProblem = useCallback(() => {
  }, []);

  const setQuestion = useCallback(() => {
  }, []);

  const setTestcase = useCallback(() => {
  }, []);

  const invite = useCallback(() => {
    toggle();
  }, [isShowing, toggle]);

  const buttonNames = ["문제", "질문", "테스트케이스"];
  const callbackList = [setProblem, setQuestion, setTestcase];
  if (version === "multi") {
    buttonNames.push("초대");
    callbackList.push(invite);
  }

  return (
    <>
      {buttonNames.map((name, idx) => (
        <Button key={idx} name={name} callback={callbackList[idx]}/>
      ))}
      <InviteModal isShowing={isShowing}/>
    </>
  );
};
export default PageButtons;
