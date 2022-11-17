import {MainHeader} from "../components/MainHeader";
import {Footer} from "../components/Footer";
import React from "react";
import styled from "styled-components";
import {InputForm} from "../components/SignIn/InputForm";

const MainWrapper = styled.div`
  width: 1920px;
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
  display: flex;
  justify-content: center;
`;

const FooterWrapper = styled.div`
  width: 100%;
  height: 400px;
  box-sizing: border-box;
`;

export const SignIn = () => {
  return (
    <MainWrapper>
      <HeaderWrapper>
        <MainHeader></MainHeader>
      </HeaderWrapper>
      <ContentWrapper>
        <InputForm/>
      </ContentWrapper>
      <FooterWrapper>
        <Footer/>
      </FooterWrapper>
    </MainWrapper>
  );
};