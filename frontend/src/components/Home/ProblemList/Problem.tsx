import React, { useState } from "react";
import styled from "styled-components";
import { ProblemType } from "@types";

const ProblemWrapper = styled.div`
  border: 3px solid #888888;
  border-radius: 16px;
  position: relative;
  background: #ffffff;
`;

const Level = styled.div`
  position: absolute;
  width: 132px;
  height: 48px;
  left: 32px;
  top: 24px;
  border: 2px solid #33c363;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  font-size: 24px;
  line-height: 35px;
`;

const Name = styled.div`
  position: absolute;
  width: 160px;
  height: 48px;
  left: 32px;
  top: 96px;
  font-weight: 600;
  font-size: 32px;
  line-height: 46px;
  text-align: center;
`;

const Description = styled.div`
  position: absolute;
  width: 466px;
  height: 24px;
  left: 32px;
  bottom: 32px;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
`;

const Button = styled.button`
  position: absolute;
  width: 176px;
  height: 60px;
  right: 48px;
  bottom: 32px;
  border: 1px solid #888888;
  border-radius: 8px;
  background: #ffffff;
  font-weight: 500;
  font-size: 24px;
  line-height: 35px;
  text-align: center;
  cursor: pointer;
`;

const Problem = ({ problem }: ProblemType) => {
  const { level, title, description } = problem;
  return (
    <ProblemWrapper>
      <Level>LV. {level}</Level>
      <Name>{title}</Name>
      <Description>{description}</Description>
      <Button>문제 풀기</Button>
    </ProblemWrapper>
  );
};

export default Problem;
