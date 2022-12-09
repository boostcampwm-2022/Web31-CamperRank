import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { gradingState } from '../../recoils';
import { useRecoilState } from 'recoil';

type ObjType = {
  [index: string]: string;
};

type CaseProp = {
  resultCode: number;
};

const ResultWrapper = styled.div`
  border: 2px double #cbcbcb;
  background: #f5fdf8;
  position: relative;
  height: 90%;
  border-radius: 5px;
  margin: 0.9rem;
  overflow: auto;
`;

const Text = styled.div`
  margin: 0.5rem;
  font-size: 0.8rem;
`;

const ErrorText = styled(Text)`
  color: #b75555;
  font-weight: 500;
`;

const Grade = styled.div`
  margin: 1rem 0.5rem;
  font-size: 0.9rem;
`;

const Case = styled.div<CaseProp>`
  padding: 0.3rem 0.5rem;
  width: fit-content;
  min-width: 50%;
  margin: 0.5rem;
  border-radius: 0.5rem;
  ${(props) => {
    if (props.resultCode === 1000) {
      return css`
        border: 3px solid #bad6db;
        background: #deedf0;
      `;
    } else {
      return css`
        border: 3px solid #ecd6d6;
        background: #faefef;
      `;
    }
  }}
`;
const CaseNumber = styled.div`
  font-size: 0.6rem;
  margin-bottom: 0.2rem;
  border-radius: 5px;
  width: fit-content;
`;
const CasePrint = styled.div`
  font-size: 0.8rem;
`;

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
    if (!grading.result) return;
    Object.keys(grading.result).length > 0 && checkGrading();
  }, [grading]);

  useEffect(() => {
    if (grading.status !== 'run') return;
    const interval = setInterval(() => {
      if (point === '.....') setPoint('.');
      else setPoint(point + '.');
    }, 800);
    return () => clearInterval(interval);
  });

  const textObj: ObjType = {
    ready: '코드를 테스트하거나 제출해주세요!!',
    run: '코드를 채점하고 있습니다',
    complete: '채점 결과',
  };

  const checkGrading = useCallback(() => {
    if (!grading.result) return;
    if (grading.kind === '테스트') {
      const resArr = Object.entries(grading.result);
      setCases(resArr);
      console.log(resArr, grading.result);
      let cnt = 0;
      let index = 0;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        if (grading.result[index]) {
          const obj = grading.result[index];
          const { resultCode } = obj;
          if (resultCode === 1000) cnt++;
          index++;
        } else break;
      }
      setNumber(cnt);
    } else {
      if (grading.kind === '제출') {
        const { solvedResult } = grading.result;
        solvedResult === 'Success'
          ? setResult('정답입니다!')
          : setResult('틀렸습니다!');
      }
      setCases([]);
    }
  }, [grading.result, grading.kind]);

  return (
    <ResultWrapper>
      <Text>
        {textObj[grading.status]}
        {grading.status === 'run' && point}
      </Text>
      <>
        {grading.status === 'complete' &&
          grading.kind === '테스트' &&
          cases.map((elem: any, idx: number) => {
            const { testCaseNumber, userPrint, userAnswer, resultCode } =
              elem[1];
            return (
              <Case key={idx} resultCode={resultCode}>
                <CaseNumber>{testCaseNumber}번 테스트</CaseNumber>
                <CasePrint>출력값 : {userPrint}</CasePrint>
                <CasePrint>실행 결과 : {userAnswer}</CasePrint>
              </Case>
            );
          })}
      </>
      {grading.status === 'complete' && (
        <>
          <Grade>
            {grading.kind === '제출' && result}{' '}
            {grading.kind === '테스트' &&
              `테스트케이스 ${cases.length}개 중 ${number}개 맞추셨습니다`}
          </Grade>
        </>
      )}
      {grading.status === 'error' && (
        <ErrorText>
          코드 실행 중 오류가 발생했습니다. 코드를 확인한 뒤 다시 실행해주세요.
        </ErrorText>
      )}
    </ResultWrapper>
  );
};

export default Result;
