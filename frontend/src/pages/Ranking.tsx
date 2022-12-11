import { MainHeader } from '../components/MainHeader';
import { Footer } from '../components/Footer';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useUserState } from '../hooks/useUserState';
import { MyInfo } from '../components/Ranking/MyInfo';
import { RankContainer } from '../components/Ranking/RankContainer';

const Wrapper = styled.div`
  width: 100%;
  min-width: 80rem;
  min-height: 66rem;
  height: 66rem;
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

const ContentWrapper = styled.div`
  display: flex;
  min-width: 80rem;
  width: 80rem;
  min-height: 38rem;
  height: 38rem;
  background: #e4e8e0;
  justify-content: space-around;
`;

const FooterWrapper = styled.div`
  min-width: 80rem;
  width: 80rem;
  min-height: 16rem;
  height: 16rem;
`;

interface UserRankInfo {
  rank: number;
  ID: string;
  count: number;
}

export const Ranking = () => {
  const { user } = useUserState();
  const { ID, isLoggedIn } = useMemo(() => user, [user, user.isLoggedIn]);
  const [userRank, setUserRank] = useState<UserRankInfo[]>([]);
  //fetch 쏴서 받고, 내 닉네임과 일치하는 것 찾아서 MyInfo로 props 전달 필요

  useEffect(() => {
    setUserRank([
      {
        rank: 1,
        ID: 'GOAT',
        count: 5173,
      },
      {
        rank: 2,
        ID: 'KONG',
        count: 22,
      },
    ]);
  }, []);

  return (
    <Wrapper>
      <HeaderWrapper>
        <MainHeader></MainHeader>
      </HeaderWrapper>
      <ContentWrapper>
        {isLoggedIn && <MyInfo />}
        <RankContainer />
      </ContentWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </Wrapper>
  );
};
