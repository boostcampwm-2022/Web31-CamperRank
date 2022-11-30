import React, {useState, useEffect, useCallback} from "react";
import styled, { css } from "styled-components";
import { gradingState } from "../../recoils";
import {useRecoilState} from "recoil";
import { createTextNode } from "lib0/dom";

type ObjType = {
  [index: string]: string
}

type CaseProp = {
  resultCode: number;
}

const ResultWrapper = styled.div`
  border: 2px double #CBCBCB;
  background: #F5FDF8;
  position: relative;
  height: 90%;
  border-radius: 5px;
  margin: 0.9rem;  
  overflow: auto;
`

const Text = styled.div`
  margin: 0.5rem;
  font-size: 0.8rem;
`;

const Grade = styled.div`
  margin: 1rem 0.5rem;
  font-size: 0.9rem;
`;

const Case = styled.div<CaseProp>`
  padding: 0.3rem 0.5rem;
  width: fit-content;
  min-width: 10rem;
  margin: 0.5rem;
  border-radius: 0.5rem;
  ${props => {
    if (props.resultCode === 1000) {
      return css`
      border: 3px solid #BAD6DB`;
    } else {
      return css`
      border: 3px solid #D19292`;
    }
  }}
`
const CaseNumber = styled.div`
  font-size: 0.6rem;
  margin-bottom: 0.2rem;
  border-radius: 5px;
  width: fit-content;
`
const CasePrint = styled.div`
  font-size: 0.8rem;
`

const Result = () => {
  const [grading, setGrading] = useRecoilState(gradingState);
  const [result, setResult] = useState('');
  const [point, setPoint] = useState('');
  const [cases, setCases] = useState<any>([]);
  const [number, setNumber] = useState(0);

  useEffect(() => {
    setPoint('');
    setResult('');
    setCases([]);
    Object.keys(grading.result).length > 0 && checkGrading();
  }, [grading]);

  useEffect(() => {
    if (grading.status !== 'run') return;
    const interval = setInterval(() => setPoint(point + '.'), 800);
    return () => clearInterval(interval);
  });

  const textObj : ObjType = {
    ready: '코드를 테스트하거나 제출해주세요!!',
    run: '코드를 채점하고 있습니다',
    complete: '채점 결과'
  }

  const checkGrading = useCallback(() => {
    const resArr = Object.entries(grading.result);
    if (grading.kind === '테스트') setCases(resArr.slice(0, resArr.length - 1));
    else setCases([]);
    const results = resArr.filter(elem => elem[1].resultCode === 1000);
    setNumber(results.length);
    results.length === resArr.length - 1 ? setResult('정답입니다!') : setResult('틀렸습니다!');
  }, [grading.result, grading.kind]);

  return (
    <ResultWrapper>
      <Text>{textObj[grading.status]}{grading.status === 'run' && point}</Text>
      <>
        {grading.status === 'complete' && grading.kind === '테스트' && cases.map((elem: any, idx: number) => {
          const {testCaseNumber, userPrint, userAnswer, resultCode} = elem[1];
          return (
            <Case key={idx} resultCode={resultCode}>
              <CaseNumber>{testCaseNumber}번 테스트</CaseNumber>
              <CasePrint>출력값 : {userPrint}</CasePrint>
              <CasePrint>실행 결과 : {userAnswer}</CasePrint>
            </Case>
          )
        })}
      </>
      {
        grading.status === 'complete' &&
        (
          <>
          <Grade>{result} {grading.kind === '테스트' && `테스트케이스 ${cases.length}개 중 ${number}개 맞추셨습니다`}</Grade>
          </>
        )
      }
    </ResultWrapper>
  )
};

export default Result;