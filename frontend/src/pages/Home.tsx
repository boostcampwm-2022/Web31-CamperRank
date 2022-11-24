import React from "react";
import styled from "styled-components";
import { Banner, List } from "../components/Home";
import { MainHeader } from "../components/MainHeader";
import { Footer } from "../components/Footer";

const MainWrapper = styled.div`
  width: 100%;
  height: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 8rem;
`;

const BannerWrapper = styled.div`
  width: 100%;
  height: 20rem;
  border: 3px solid #e0dcdc;
  overflow: hidden;
  position: relative;
`;

const ListWrapper = styled.div`
  width: 100%;
  flex: 1;
  background: #e4e8e0;
`;

const FooterWrapper = styled.div`
  width: 100%;
  height: 20rem;
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
        <Footer />
      </FooterWrapper>
    </MainWrapper>
  );
};

export default Main;
