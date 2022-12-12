import { MainHeader } from '../components/MainHeader';
import { Footer } from '../components/Footer';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useUserState } from '../hooks/useUserState';
import { MyInfo } from '../components/Ranking/MyInfo';
import {
  RankContainer,
  UserTableInfo,
} from '../components/Ranking/RankContainer';

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
  background: #e5ebdf;
  justify-content: space-around;
`;

const FooterWrapper = styled.div`
  min-width: 80rem;
  width: 80rem;
  min-height: 16rem;
  height: 16rem;
`;

interface UserSolvedInfo {
  loginId: string;
  solvedCount: number;
}

interface RankFetchResult {
  string: UserSolvedInfo;
}

const compare = (a: UserSolvedInfo, b: UserSolvedInfo) =>
  b.solvedCount - a.solvedCount;

const URL = import.meta.env.VITE_SERVER_URL;

export const Ranking = () => {
  const { user } = useUserState();
  const { isLoggedIn } = useMemo(() => user, [user, user.isLoggedIn]);
  const [userList, setUserList] = useState<Array<UserTableInfo>>([]);
  const [myRank, setMyRank] = useState(0);
  const [mySolved, setMySolved] = useState(0);

  useEffect(() => {
    fetch(`${URL}/rank`, {})
      .then((res) => res.json())
      .then((res: RankFetchResult) => {
        const tempUserList: Array<UserTableInfo> = Object.values(res)
          .sort(compare)
          .map((ele: UserSolvedInfo, idx) => {
            return {
              rank: idx + 1,
              ID: ele.loginId,
              count: ele.solvedCount,
            };
          });
        setUserList(tempUserList);
      });
  }, []);

  useEffect(() => {
    const myInfo = userList.find((ele) => ele.ID === user.ID);
    if (!myInfo) {
      return;
    }
    setMyRank(myInfo.rank);
    setMySolved(myInfo.count);
  }, [userList]);

  return (
    <Wrapper>
      <HeaderWrapper>
        <MainHeader></MainHeader>
      </HeaderWrapper>
      <ContentWrapper>
        {isLoggedIn && <MyInfo rank={myRank} count={mySolved} />}
        <RankContainer userList={userList} />
      </ContentWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </Wrapper>
  );
};
