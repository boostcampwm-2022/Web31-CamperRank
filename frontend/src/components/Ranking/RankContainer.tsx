import React, { useMemo } from 'react';
import styled from 'styled-components';
import { RankTable } from './RankTable';

const RankWrapper = styled.div`
  width: 50rem;
  height: 34rem;
  min-width: 50rem;
  min-height: 34rem;
  background: #f1f9eb;
  border: 2px solid #9ccaaf;
  border-radius: 10px;
  margin-top: auto;
  margin-bottom: auto;
  position: relative;

  p {
    font-size: 1.5rem;
    font-weight: 500;
    margin: 1.5rem 0 0 2.2rem;
  }
`;

export interface UserTableInfo {
  rank: number;
  ID: number;
  count: number;
}

export const RankContainer = ({
  userList,
}: {
  userList: Array<UserTableInfo>;
}) => {
  const columns = useMemo(
    () => [
      {
        accessor: 'rank',
        Header: '순위',
      },
      {
        accessor: 'ID',
        Header: 'ID',
      },
      {
        accessor: 'count',
        Header: '푼 문제 수',
      },
    ],
    [],
  );
  const data = useMemo(() => userList, [userList]);

  return (
    <RankWrapper>
      <p>랭킹</p>
      <RankTable columns={columns} data={data} />
    </RankWrapper>
  );
};
