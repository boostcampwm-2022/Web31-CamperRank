import React, {useState, useCallback} from "react";
import styled from "styled-components";

const ResultWrapper = styled.div`
  border: 2px double #CBCBCB;
  background: #F5FDF8;
  position: relative;
  height: 90%;
  border-radius: 5px;
  margin: 0.9rem;
`

const Text = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  font-size: 0.9rem;
`;

const Result = () => {
  return (
    <ResultWrapper>
      <Text>코드를 테스트하거나 제출해주세요!!</Text>
    </ResultWrapper>
  )
};

export default Result;