import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ProblemType } from "@types";

const URL = import.meta.env.VITE_SERVER_URL;

const ProblemWrapper = styled.div`
  border: 1px solid black;
  width: 100%;
  margin-top: 1.5rem;
  padding: 0.3rem;
`;

const Level = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  font-weight: bold;
  font-size: 1rem;
  padding: 0.5rem;
`;

const ProblemDummy = `
<div><div>문제 내용</div><div>답은 1112</div></div>
`;

const ProblemContent = ({ problem }: ProblemType) => {
  const { level, description } = problem;

  return (
    <>
      <Level>LV. {level}</Level>
      <ProblemWrapper>
        <div
          dangerouslySetInnerHTML={{ __html: description ? description : "" }}
        ></div>
      </ProblemWrapper>
    </>
  );
};

export default ProblemContent;
