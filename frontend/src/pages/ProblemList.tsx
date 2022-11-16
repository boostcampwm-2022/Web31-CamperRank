import React, { useState } from "react";
import styled from "styled-components";
import { MainHeader } from "../components/MainHeader";
import SearchFilter from "../components/ProblemList/SearchFilter";

const MainWrapper = styled.div`
  width: 1920px;
  height: 2160px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 160px;
  box-sizing: border-box;
`;

const ListWrapper = styled.div`
  width: 100%;
  flex: 1;
  box-sizing: border-box;
  background: #e4e8e0;
`;

const FooterWrapper = styled.div`
  width: 100%;
  height: 160px;
  box-sizing: border-box;
`;

const ProblemList = () => {
  return (
    <MainWrapper>
      <HeaderWrapper>
        <MainHeader></MainHeader>
      </HeaderWrapper>
      <SearchFilter></SearchFilter>
      <ListWrapper>List</ListWrapper>
      <FooterWrapper>Footer</FooterWrapper>
    </MainWrapper>
  );
};

export default ProblemList;
