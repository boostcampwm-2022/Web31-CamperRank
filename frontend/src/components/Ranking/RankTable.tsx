import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTable, usePagination } from 'react-table';

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
    border: #9b9b9b 1px solid;
  }
`;

export const RankTable = ({ columns, data }: any) => {
  const tableInstance = useTable(
    {
      // @ts-ignore
      columns,
      data,
    },
    usePagination,
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
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
  );
};
