import React, {useState, useEffect, useCallback} from "react";
import styled from "styled-components";
import { gradingState } from "../../recoils";
import {useRecoilState} from "recoil";
import { createTextNode } from "lib0/dom";

type ObjType = {
  [index: string]: string
}

const ResultWrapper = styled.div`
  border: 2px double #CBCBCB;
  background: #F5FDF8;
  position: relative;
  height: 90%;
  border-radius: 5px;
  margin: 0.9rem;
`

const Text = styled.div`
  margin: 0.5rem;
  font-size: 0.8rem;
`;

const Grade = styled.div`
  margin: 1rem 0.5rem;
  font-size: 0.9rem;
`;

const Result = () => {
  const [grading, setGrading] = useRecoilState(gradingState);
  const [result, setResult] = useState('');
  const [point, setPoint] = useState('');

  const checkGrading = useCallback(() => {
    const resArr = Object.entries(grading.result);
    const results = resArr.filter(elem => elem[1].resultCode === 1000);
    results.length > 0 ? setResult('정답입니다!') : setResult('틀렸습니다!');
  }, [grading.result]);

  useEffect(() => {
    setResult('');
    setPoint('');
    grading.kind && checkGrading();
    if (grading.status !== 'run') return;
    const interval = setInterval(() => setPoint(point + '.'), 500);
    return () => clearInterval(interval);
  }, [grading]);


  const textObj : ObjType = {
    ready: '코드를 테스트하거나 제출해주세요!!',
    run: '코드를 채점하고 있습니다',
    complete: '채점 결과'
  }

  return (
    <ResultWrapper>
      <Text>{textObj[grading.status]}{grading.status === 'run' && point}</Text>
      <Grade>{result}</Grade>
    </ResultWrapper>
  )
};

export default Result;