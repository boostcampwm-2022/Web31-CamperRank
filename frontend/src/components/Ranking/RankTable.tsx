import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTable, usePagination } from 'react-table';
import PageController from './PageController';

const Table = styled.table`
  width: 90%;
  background: #ffffff;
  border: 1px solid #b9b9b9;
  border-radius: 2px;
  margin: 2rem auto;
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
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              // eslint-disable-next-line react/jsx-key
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    // eslint-disable-next-line react/jsx-key
                    <th {...column.getHeaderProps()}>
                      {
                        // Render the header
                        column.render('Header')
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                // eslint-disable-next-line react/jsx-key
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        // eslint-disable-next-line react/jsx-key
                        <td {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render('Cell')
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </Table>
      <PageController
        page={page}
        onClickPage={(now: number) => setPage({ ...page, now })}
      />
    </>
  );
};
