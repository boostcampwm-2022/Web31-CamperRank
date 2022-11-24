import { MainHeader } from "../components/MainHeader";
import { Footer } from "../components/Footer";
import React from "react";
import styled from "styled-components";
import { InputForm } from "../components/SignUp/InputForm";

const MainWrapper = styled.div`
  width: 100%;
  height: auto;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 10rem;
`;

const ContentWrapper = styled.div`
  width: 100%;
  flex: 1;
  background: #ecf5e3;
  display: flex;
  justify-content: center;
`;

const FooterWrapper = styled.div`
  width: 100%;
  height: 25rem;
`;

export const SignUp = () => {
  return (
    <MainWrapper>
      <HeaderWrapper>
        <MainHeader></MainHeader>
      </HeaderWrapper>
      <ContentWrapper>
        <InputForm />
      </ContentWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </MainWrapper>
  );
};
