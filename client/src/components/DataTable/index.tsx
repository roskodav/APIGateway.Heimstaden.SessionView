import React from 'react';
import { useTable, useExpanded, useResizeColumns, useFlexLayout } from 'react-table';
import TableColumn from './TableColumn';
import TableCell from './TableCell';

const DataTable = ({ columns, data, renderRowSubComponent }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { expanded },
  } = useTable(
    {
      columns,
      data,
    },
    useExpanded,
    useResizeColumns,
    useFlexLayout
  );
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, i) => (
          <tr
            key={i}
            className="list-item"
            id="header"
            {...headerGroup.getHeaderGroupProps()}
          >
            {headerGroup.headers.map((column) => (
              <TableColumn key={column.id} column={column} />
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <React.Fragment key={i}>
              <tr
                onClick={() => {
                  row.toggleRowExpanded();
                }}
                className={row.isExpanded ? 'list-item active' : 'list-item'}
                {...row.getRowProps()}
              >
                {row.cells.map((cell, i) => { return(
                  <TableCell key={i} cell={cell} />
                )})}
              </tr>
              {row.isExpanded ? (
                <>
                  {renderRowSubComponent({ row })}
                </>
              ) : null}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;
