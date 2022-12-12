import { useUserState } from '../../hooks/useUserState';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

const MyInfoWrapper = styled.div`
  min-width: 22rem;
  width: 22rem;
  min-height: 12rem;
  height: 12rem;
  border-radius: 0.75rem;
  border: 1px solid #9ccaaf;
  margin-top: 2rem;
  background: #f1f9eb;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  font-weight: 400;
`;

const MyInfoTitle = styled.p`
  min-width: 16rem;
  width: 16rem;
  min-height: 2rem;
  height: 2rem;
  margin-top: 1.5rem;
  font-size: 1.5rem;
  font-weight: 500;
`;

const NickNameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 16rem;
  width: 16rem;
  min-height: 2rem;
  height: 2rem;
  margin-top: 1.5rem;
`;

const MyRankWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 16rem;
  width: 16rem;
  min-height: 2rem;
  height: 2rem;
  margin-top: 1.5rem;
`;

export const MyInfo = ({ rank }: { rank: number }) => {
  const { user } = useUserState();
  const { ID } = useMemo(() => user, [user, user.ID]);
  const [myRank, setMyRank] = useState(0);

  useEffect(() => {
    setMyRank(rank);
  }, []);

  return (
    <MyInfoWrapper>
      <MyInfoTitle>내 정보</MyInfoTitle>
      <NickNameWrapper>
        <span>닉네임</span>
        <span>{ID}</span>
      </NickNameWrapper>
      <MyRankWrapper>
        <span>현재 순위</span>
        <span>{myRank ? myRank : 'unranked'}</span>
      </MyRankWrapper>
    </MyInfoWrapper>
  );
};
