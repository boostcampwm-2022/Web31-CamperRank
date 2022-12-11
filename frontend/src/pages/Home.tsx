import React from 'react';
import styled from 'styled-components';
import { Banner, List } from '../components/Home';
import { MainHeader } from '../components/MainHeader';
import { Footer } from '../components/Footer';
import { useUserState } from '../hooks/useUserState';

const MainWrapper = styled.div`
  width: 100%;
  height: fit-content;
  min-width: 80rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderWrapper = styled.div`
  min-width: 80rem;
  width: 80rem;
  min-height: 8rem;
  height: 8rem;
`;

const BannerWrapper = styled.div`
  width: 100%;
  height: 15rem;
  overflow: hidden;
  position: relative;
`;

const ListWrapper = styled.div`
  min-width: 80rem;
  width: 80rem;
  height: 55rem;
`;

const FooterWrapper = styled.div`
  min-width: 80rem;
  width: 80rem;
  min-height: 15rem;
  height: 15rem;
`;

const Main = () => {
  useUserState();
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
