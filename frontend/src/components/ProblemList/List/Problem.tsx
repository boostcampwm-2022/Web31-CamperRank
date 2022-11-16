import React, { useState } from "react";
import styled from "styled-components";

const ProblemWrapper = styled.div`
  width: 100%;
  height: 136px;
  border: 1px solid #888888;
  border-radius: 8px;
  background: #fff;
  position: relative;
`;

const Title = styled.div`
  position: absolute;
  top: 24px;
  left: 48px;
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
`;

const Description = styled.div`
  position: absolute;
  bottom: 24px;
  left: 48px;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 16px;
  right: 24px;
  display: flex;
  gap: 24px;
`;

const Button = styled.button`
  border: none;
  outline: none;
  width: 144px;
  height: 48px;
  border: 1px solid #32c766;
  border-radius: 8px;
  background: #fff;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
`;

const Problem = () => {
  return (
    <ProblemWrapper>
      <Title>A + B = ?</Title>
      <Description>Lv1, Python, Javascript, Success Rate: 95.12%</Description>
      <ButtonWrapper>
        <Button>혼자 풀기</Button>
        <Button>같이 풀기</Button>
      </ButtonWrapper>
    </ProblemWrapper>
  );
};

export default Problem;
