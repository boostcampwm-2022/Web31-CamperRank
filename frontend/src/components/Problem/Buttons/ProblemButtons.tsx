import React, {useCallback, useState, useEffect} from "react";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import { editorState, userState } from "../../../recoils";
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
  const [isWorking, setIsWorking] = useState(false);


  const reset = useCallback(() => {
    if (confirm("코드를 초기화하시겠습니까?")) onClickClearBtn();
  }, [content.text]);

  const {id} = useParams();

  const makeGradingObj = () => {
    const {text: userCode, language} = content;
    if (!id) return;
    return {
      userCode,
      language,
      problemID: +id,
      userId: 1,
    }
  }

  const checkGrading = () =>{
    if (!isWorking) return true;
    return false;
  }

  useEffect(() => {
    console.log('채점', isWorking)
  }, [isWorking]);

  const executeTest = useCallback(() => {
    if (!checkGrading()) {
      alert('현재 채점 진행 중입니다. 잠시 기다려주세요..');
      return;
    }
    setIsWorking(true);
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
        console.log('response', response);
      })
      .catch((err) => {
        console.log('err', err);
      })
      .finally(() => {
        setIsWorking(false);
      })
  }, [content.text]);

  const submit = useCallback(() => {
    if (isWorking) alert("현재 작업 중");
    if (!checkGrading()) {
      alert('현재 채점 진행 중입니다. 잠시 기다려주세요.');
      return;
    }
    setIsWorking(true);
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
        console.log('response', response);
      })
      .catch((err) => {
        setIsWorking(false);
      });
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
