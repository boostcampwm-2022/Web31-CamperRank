import { MainHeader } from '../components/MainHeader';
import { Footer } from '../components/Footer';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  min-height: 66rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderWrapper = styled.div`
  min-width: 80rem;
  min-height: 8rem;
`;

const ContentWrapper = styled.div`
  min-width: 80rem;
  flex: 1;
  background: #e4e8e0;
`;

const FooterWrapper = styled.div`
  min-width: 80rem;
  min-height: 20rem;
`;

export const Profile = () => {
  return (
    <Wrapper>
      <HeaderWrapper>
        <MainHeader></MainHeader>
      </HeaderWrapper>
      <ContentWrapper></ContentWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </Wrapper>
  );
};
