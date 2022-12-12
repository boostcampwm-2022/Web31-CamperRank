import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTable, usePagination } from 'react-table';
import PageController from './PageController';

const Table = styled.table`
  width: 90%;
  background: #ffffff;
  border: 1px solid #b9b9b9;
  border-radius: 2px;
  margin: 1rem auto;
  font-weight: 400;
  font-size: 1rem;
  font-family: Noto Sans KR, sans-serif;
  border-collapse: collapse;

  thead {
    background: rgba(141, 222, 233, 0.0001);
    background: #e7f1e0;
  }

  th,
  thead {
    border: #9b9b9b 2px solid;
  }

  tbody {
    background: rgba(255, 255, 255, 0.0001);
    text-align: center;
  }

  tr {
    height: 2rem;
  }

  td {
    border: silver 0.5px solid;
  }
`;

export const RankTable = ({ columns, data }: any) => {
  const [page, setPage] = useState({
    now: 1,
    max: Math.ceil(data.length / 10),
  });
  const [pagedList, setPagedList] = useState(data);

  useEffect(() => {
    const { now } = page;
    now && setPagedList([...data.slice(10 * (now - 1), 10 * now)]);
  }, [page]);

  useEffect(() => {
    setPage({
      now: 1,
      max: Math.ceil(data.length / 10),
    });
  }, [data]);

  const tableInstance = useTable(
    {
      // @ts-ignore
      columns,
      data: pagedList,
    },
    usePagination,
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-key
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              // eslint-disable-next-line react/jsx-key
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <PageController
        page={page}
        onClickPage={(now: number) => setPage({ ...page, now })}
      />
    </>
  );
};
