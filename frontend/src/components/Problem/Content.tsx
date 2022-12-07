import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ProblemType } from '@types';

const ContentWrapper = styled.div`
  border: 3px double #cbcbcb;
  border-radius: 5px;
  width: 100%;
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f5fdf8;
  height: fit-content;
  min-height: 75%;
`;

const Level = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  font-weight: bold;
  font-size: 1rem;
  padding: 1rem;
`;

const ProblemDummy = `
<div>
  <h4>문제 내용</h4>
  <div>A와 B의 합을 출력하시오</div><br>
  <h4>입력 형태</h4>
  <div>A와 B가 담긴 배열을 요소로 가지는 배열</div><br>
  <h4>출력 형태</h4>
  <div>A와 B의 합을 요소로 가지는 배열</div><br>
  <h4>제한 사항</h4>
  <p>0 <= A <= 10</p>
  <p>0 <= B <= 10</p><br>
  <h4>예시 입력#1</h4>
  <div>[[3, 5], [4, 4], [10, 10]]</div><br>
  <h4>예시 출력#1</h4>
  <div>[8, 8, 20]</div><br>
  <h4>예시 입력#2</h4>
  <div>[[9, 9], [8, 8]]</div><br>
  <h4>예시 출력#2</h4>
  <div>[18, 16]</div>
  
</div>
`;

const ProblemContent = ({ problem }: ProblemType) => {
  if (!problem) return <></>;
  const { level, description } = problem;
  return (
    <>
      <Level>LV. {level}</Level>
      <ContentWrapper
        dangerouslySetInnerHTML={{
          __html: description
            ? description.slice(1, description.length - 1)
            : '',
        }}
      />
    </>
  );
};

export default ProblemContent;
