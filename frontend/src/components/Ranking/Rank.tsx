import React from 'react';
import styled from 'styled-components';

const RankWrapper = styled.div`
  width: 50rem;
  height: 34rem;
  min-width: 50rem;
  min-height: 34rem;
  background: #f1f9eb;
  border: 2px solid #9ccaaf;
  border-radius: 10px;
  margin-top: auto;
  margin-bottom: auto;
`;

export const RankDiv = () => {
  //fetch 쏴서 받고, 내 닉네임과 일치하는 것 찾아서 MyInfo로 props 전달 필요

  return <RankWrapper></RankWrapper>;
};
