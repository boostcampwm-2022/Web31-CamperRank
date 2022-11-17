import React, { useState } from "react";
import styled from "styled-components";
import { ProblemType } from "@types";

const ProblemWrapper = styled.div`
  width: 100%;
  height: 136px;
  border: 2px solid #888888;
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
  border: 2px solid #32c766;
  border-radius: 8px;
  background: #fff;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  box-shadow: 0.5px 0.5px 0.5px 0.5px #75efa2;
`;

const Problem = ({ problem }: ProblemType) => {
  return (
    <ProblemWrapper>
      <Title>{problem.title}</Title>
      <Description>{problem.description}</Description>
      <ButtonWrapper>
        <Button>혼자 풀기</Button>
        <Button>같이 풀기</Button>
      </ButtonWrapper>
    </ProblemWrapper>
  );
};

export default Problem;
