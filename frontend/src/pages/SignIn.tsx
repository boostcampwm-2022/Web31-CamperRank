import { MainHeader } from '../components/MainHeader';
import { Footer } from '../components/Footer';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { InputForm } from '../components/SignIn/InputForm';
import { useRecoilValue } from 'recoil';
import { userState } from '../recoils';
import { useNavigate } from 'react-router-dom';
import { useUserState } from '../hooks/useUserState';

const MainWrapper = styled.div`
  width: 100%;
  height: auto;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 8rem;
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
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  useUserState();
  useEffect(() => {
    if (!user.isLoggedIn) {
      return;
    }
    navigate(-1);
  }, []);

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
