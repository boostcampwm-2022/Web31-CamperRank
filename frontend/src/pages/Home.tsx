import React from "react";
import styled from "styled-components";
import {Banner, List} from "../components/Home";
import {MainHeader} from "../components/MainHeader";
import {Footer} from "../components/Footer";

const MainWrapper = styled.div`
  width: 1920px;
  height: 2160px;
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

const BannerWrapper = styled.div`
  width: 1920px;
  height: 400px;
  border: 3px solid #e0dcdc;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
`;

const ListWrapper = styled.div`
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

const Main = () => {
  return (
    <MainWrapper>
      <HeaderWrapper>
        <MainHeader></MainHeader>
      </HeaderWrapper>
      <BannerWrapper>
        <Banner></Banner>
      </BannerWrapper>
      <ListWrapper>
        <List></List>
      </ListWrapper>
      <FooterWrapper>
        <Footer/>
      </FooterWrapper>
    </MainWrapper>
  );
};

export default Main;
