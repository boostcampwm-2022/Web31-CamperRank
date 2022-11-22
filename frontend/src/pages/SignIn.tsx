import {MainHeader} from "../components/MainHeader";
import {Footer} from "../components/Footer";
import React, {useEffect} from "react";
import styled from "styled-components";
import {InputForm} from "../components/SignIn/InputForm";
import {useRecoilValue} from "recoil";
import {userState} from "../recoils/userState";
import {useNavigate} from "react-router-dom";

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
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.isLoggedIn) {
      navigate('/');
    }
  }, [user, navigate]);

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