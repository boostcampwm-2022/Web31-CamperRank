import React, {useCallback, useState, useEffect} from "react";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import { editorState, userState, gradingState } from "../../../recoils";
import {useRecoilState} from "recoil";

type ButtonProp = {
  name: string;
  callback: any
};

const URL = import.meta.env.VITE_SERVER_URL;

const ButtonWrapper = styled.button<ButtonProp>`
  width: 6rem;
  height: 80%;
  margin: 0.5rem;
  background: #ffffff;
  border: 2px solid ${(props) => (props.name === "제출" ? "#33C363" : "#888888")};
  box-shadow: ${(props) =>
    props.name === "제출"
    ? "0px 4px 4px rgba(51, 195, 99, 0.5);"
    : "0px 4px 4px rgba(0, 0, 0, 0.25);"};
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
  const [user] = useRecoilState(userState);
  const [grading, setGrading] = useRecoilState(gradingState);

  const reset = useCallback(() => {
    if (confirm("코드를 초기화하시겠습니까?")) onClickClearBtn();
    setGrading({
      status: 'ready',
      result: []
    })
  }, [content.text]);

  const {id} = useParams();

  const makeGradingObj = () => {
    const {text: userCode, language} = content;
    if (!id) return;
    return {
      userCode,
      language: 'JavaScript',
      problemId: +id,
      loginId: user.ID,
    }
  }

  const executeTest = useCallback(() => {
    setGrading({
      ...grading, 
      status: 'run',
      result: [],
    })
    const param = makeGradingObj();
    fetch(`${URL}/solved/test-case`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
      .then((res) => res.json())
      .then((response) => {
        if (Object.keys(response).length == 1) throw new Error();
        if (response.statusCode !== 200) throw new Error();
        setGrading({
          status: 'complete',
          result:response,
          kind:'테스트'
        })
      })
      .catch((err) => {
        setGrading({
          status: 'error',
          result: []
        });
      })
  }, [content.text]);

  const submit = useCallback(() => {
    setGrading({
      ...grading, 
      status: 'run',
      result: [],
    })
    const param = makeGradingObj();
    fetch(`${URL}/solved`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.statusCode !== 200) throw new Error();
        setGrading({
          status: 'complete',
          result: response,
          kind: '제출',
        })
      })
      .catch((err) => {
        setGrading({
          status: 'error',
          result: []
        });
      })
      .finally(() => {});
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
