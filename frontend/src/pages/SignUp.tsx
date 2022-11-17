import {MainHeader} from "../components/MainHeader";
import {Footer} from "../components/Footer";
import React from "react";
import styled from "styled-components";

const MainWrapper = styled.div`
  width: 1920px;
  //height: 2160px;
  height: auto;
  border: 1px solid black;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 160px;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  width: 100%;
  flex: 1;
  box-sizing: border-box;
  background: #e4e8e0;
`;

const FooterWrapper = styled.div`
  width: 100%;
  height: 400px;
  box-sizing: border-box;
`;

export const SignUp = () => {
  return (
    <MainWrapper>
      <HeaderWrapper>
        <MainHeader></MainHeader>
      </HeaderWrapper>
      <ContentWrapper>

      </ContentWrapper>
      <FooterWrapper>
        <Footer/>
      </FooterWrapper>
    </MainWrapper>
  );
};