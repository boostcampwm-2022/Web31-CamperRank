import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { RankTable } from './RankTable';
import { useTable } from 'react-table';

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
`;

// interface RankTableProps {
//   columns: Array<object>;
//   data: Array<object>;
// }

interface UserTableInfo {
  rank: number;
  ID: number;
  count: number;
}

interface UserSolvedInfo {
  userId: number;
  solvedCount: number;
}

interface RankFetchResult {
  string: UserSolvedInfo;
}

const URL = import.meta.env.VITE_SERVER_URL;

const compare = (a: UserSolvedInfo, b: UserSolvedInfo) => {
  return b.solvedCount - a.solvedCount;
};

export const RankContainer = () => {
  const [userList, setUserList] = useState<Array<UserTableInfo>>([]);
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

  useEffect(() => {
    fetch(`${URL}/rank`, {})
      .then((res) => res.json())
      .then((res: RankFetchResult) => {
        const tempUserList: Array<UserTableInfo> = Object.values(res)
          .sort(compare)
          .map((ele: UserSolvedInfo, idx) => {
            return {
              rank: idx + 1,
              ID: ele.userId,
              count: ele.solvedCount,
            };
          });
        setUserList(tempUserList);
        console.log(tempUserList);
      });
  }, []);

  useEffect(() => {
    if (userList.length === 0) {
      return;
    }
  }, [userList]);

  return (
    <RankWrapper>
      <RankTable columns={columns} data={data} />
    </RankWrapper>
  );
};
