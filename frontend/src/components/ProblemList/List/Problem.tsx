import React, { useState } from "react";
import styled from "styled-components";
import { ProblemType } from "@types";

const ProblemWrapper = styled.div`
  width: 100%;
  height: 8.5rem;
  border: 2px solid #888888;
  border-radius: 8px;
  background: #fff;
  position: relative;
  min-width: 800px;
  &: hover {
    background: #e6f3ea;
    border: none;
    box-shadow: 3px 3px 3px 3px #b9b9b9;
  }
`;

const Title = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 3rem;
  font-style: normal;
  font-weight: 500;
  font-size: 2rem;
`;

const Description = styled.div`
  position: absolute;
  bottom: 1.5rem;
  left: 3rem;
  font-style: normal;
  font-weight: 500;
  font-size: 1.2rem;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1.5rem;
  display: flex;
  gap: 1.5rem;
`;

const Button = styled.button`
  border: none;
  outline: none;
  width: 8rem;
  height: 2.6rem;
  border: 2px solid #32c766;
  border-radius: 8px;
  background: #fff;
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 1.5rem;
  text-align: center;
  box-shadow: 0.5px 0.5px 0.5px 0.5px #75efa2;
  &: hover {
    background: #aad4b6;
    color: white;
    font-weight: bold;
    box-shadow: 2px 2px 2px 2px #b9b9b9;
    border: none;
  }
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