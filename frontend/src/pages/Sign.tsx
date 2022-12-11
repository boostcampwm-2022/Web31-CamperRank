import { Footer } from '../components/Footer';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { SignupInputForm } from '../components/SignUp/InputForm';
import { SigninInputForm } from '../components/SignIn/InputForm';
import { useLocation } from 'react-router-dom';

const MainWrapper = styled.div`
  width: 100%;
  min-width: 80rem;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #eef9f1;
`;

const ContentWrapper = styled.div`
  display: flex;
  min-width: 80rem;
  width: 80rem;
  flex-grow: 1;
  justify-content: space-around;
  align-items: center;
`;

const FooterWrapper = styled.div`
  min-width: 80rem;
  width: 80rem;
  min-height: 16rem;
  height: 16rem;
`;

export const Sign = () => {
  const { pathname } = useLocation();
  return (
    <MainWrapper>
      <ContentWrapper>
        {pathname.includes('signup') ? (
          <SignupInputForm />
        ) : (
          <SigninInputForm />
        )}
      </ContentWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </MainWrapper>
  );
};
