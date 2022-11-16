import React, { useState } from "react";
import styled from "styled-components";
import { MainHeader } from "../components/MainHeader";
import { SearchFilter, List } from "../components/ProblemList";
import { Footer } from "../components/Footer";

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
`;

const ListWrapper = styled.div`
  width: 100%;
  flex: 1;
  background: #f1f5ee;
`;

const FooterWrapper = styled.div`
  width: 100%;
  height: 400px;
`;

const ProblemList = () => {
  return (
    <MainWrapper>
      <HeaderWrapper>
        <MainHeader></MainHeader>
      </HeaderWrapper>
      <SearchFilter></SearchFilter>
      <ListWrapper>
        <List></List>
      </ListWrapper>
      <FooterWrapper>
        <Footer></Footer>
      </FooterWrapper>
    </MainWrapper>
  );
};

export default ProblemList;
