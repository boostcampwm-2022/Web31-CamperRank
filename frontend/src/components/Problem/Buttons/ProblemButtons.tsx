import React, {useCallback} from "react";
import styled from "styled-components";
import { editorState } from "../../../recoils";
import {useRecoilState} from "recoil";

type ButtonProp = {
  name: string;
  callback: any
};

const ButtonWrapper = styled.button<ButtonProp>`
  width: 6rem;
  height: 80%;
  margin: 0.5rem;
  background: #ffffff;
  border: 2px solid ${(props) => (props.name === "제출" ? "#33C363" : "#888888")};
  box-shadow: ${(props) =>
          props.name === "제출"
                  ? "0px 8px 24px rgba(51, 195, 99, 0.5);"
                  : "0px 4px 1px rgba(0, 0, 0, 0.25);"};
  border-radius: 4px;

  &:hover {
    background: ${(props) => (props.name === "제출" ? "#DBF6E4" : "#eeeeee")};
  }
`;

const Button = ({name, callback}: ButtonProp) => {
  return <ButtonWrapper name={name} onClick={callback} callback={callback}>{name}</ButtonWrapper>;
};

const ProblemButtons = ({onClickClearBtn} : {onClickClearBtn: () => void}) => {
  const buttonNames = ["초기화", "코드테스트", "제출"];
  const [content] = useRecoilState(editorState);
  const reset = useCallback(() => {
    if (confirm("코드를 초기화하시겠습니까?")) onClickClearBtn();
  }, [content.text]);

  const executeTest = useCallback(() => {

  }, [content.text]);

  const submit = useCallback(() => {
  }, [content.text]);

  const callbackList = [reset, executeTest, submit];

  return (
    <>
      {buttonNames.map((name, idx) => (
        <Button key={idx} name={name} callback={callbackList[idx]}/>
      ))}
    </>
  );
};
export default ProblemButtons;
